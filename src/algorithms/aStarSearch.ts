import Logger from "../classes/Logger";
import Node from "../classes/Node";
import Tree from "../classes/Tree";
import AlgorithmResult from "../types/AlgorithmResult";
import getAllPossibilitiesFromNode from "../utils/getAllPossibilitiesFromNode";

// Fila de prioridade:
class PriorityQueue<T> {
    private items: { element: T; priority: number }[];

    constructor() {
        this.items = [];
    }

    enqueue(element: T, priority: number): void {
        const queueElement = { element, priority };
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue(): T | null {
        return this.items.length > 0 ? this.items.shift()!.element : null;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Heurística: caracteres diferentes dependendo do estado
const heuristic = (currentState: string, goalState: string): number => {
    let mismatchCount = 0;

    // Assuming both states are strings of equal length
    for (let i = 0; i < currentState.length; i++) {
        if (currentState[i] !== goalState[i]) {
            mismatchCount++;
        }
    }

    return mismatchCount;
};

// Busca A*
const aStarSearch = async (tree: Tree, finalState: string) => {
    const resultInfo: AlgorithmResult = { algName: 'A* Search' };

    try {
        const startDate = new Date();
        const priorityQueue = new PriorityQueue<Node>();

        // Enfileira na lista de prioridades baseado em Heurística + Custo
        const initialNode = tree.getInitialNode();
        priorityQueue.enqueue(initialNode, heuristic(initialNode.getValue(), finalState) + initialNode.getCost());

        while (!priorityQueue.isEmpty() && !tree.isSolutionFound()) {
            const currentNode = priorityQueue.dequeue();

            if (currentNode === null || tree.getVisitedNodes().includes(`${currentNode.getId()}-${currentNode.getValue()}`)) {
                continue;
            }

            tree.addVisitedNode(`${currentNode.getId()}-${currentNode.getValue()}`);

            // Marca solução quando encontrada
            if (currentNode.getValue() === finalState) {
                tree.setSolutionNode(currentNode);
                continue;
            }

            // Para de expandir se chegar à profundidade máxima
            if (currentNode.getDepth() === tree.getMaxDepth()) {
                continue;
            }

            // Gerar possibilidades
            const newPossibilities = await getAllPossibilitiesFromNode(currentNode.getValue());
            tree.addExpandedNode(`${currentNode.getId()}-${currentNode.getValue()}`);

            for (const possibility of newPossibilities) {
                const childNode = new Node(
                    tree.getNodes().length + 1,
                    possibility.newState,
                    currentNode.getDepth() + 1,
                    currentNode.getCost() + 1 // Custo de mover estado sempre 1
                );

                tree.addNode(childNode);
                tree.addEdge(currentNode, childNode);

                if (tree.getDepth() < childNode.getDepth()) {
                    tree.setDepth(childNode.getDepth());
                }

                // Enfilera n ó com seu custo total (g + h)
                const totalCost = childNode.getCost() + heuristic(childNode.getValue(), finalState);
                priorityQueue.enqueue(childNode, totalCost);
            }
        }

        // Grava os resultados após a busca
        resultInfo.visitedNodes = tree.getVisitedNodes().length;
        resultInfo.expandedNodes = tree.getExpandedNodes().length;
        resultInfo.branchingFactor = tree.getBranchingFactor().toFixed(2);

        const solutionNode = tree.getSolutionNode();
        if (solutionNode) {
            resultInfo.cost = solutionNode.getDepth();
            resultInfo.solutionPath = await tree.getPathFromNode(solutionNode);
        }

        const endDate = new Date();
        resultInfo.timeSpentInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
    } catch (error: any) {
        Logger.error(`Erro ao executar a busca A*: ${error.message}`);
    } finally {
        return resultInfo;
    }
};

export default aStarSearch;
