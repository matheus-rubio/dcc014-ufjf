import Logger from "../classes/Logger";
import Node from "../classes/Node";
import Tree from "../classes/Tree";
import AlgorithmResult from "../types/AlgorithmResult";
import getAllPossibilitiesFromNode from "../utils/getAllPossibilitiesFromNode";

// Heurística: caracteres distintos entre estado atual e final
const heuristic = (currentState: string, goalState: string): number => {
    let mismatchCount = 0;

    for (let i = 0; i < currentState.length; i++) {
        if (currentState[i] !== goalState[i]) {
            mismatchCount++;
        }
    }

    return mismatchCount;
};

// Busca recursiva com valor limite
const searchWithLimit = async (tree: Tree, node: Node, finalState: string, g: number, bound: number): Promise<number | null> => {
    const f = g + heuristic(node.getValue(), finalState);

    if (f > bound) {
        return f; // Valor f é o novo limite para a próxima iteração
    }

    if (node.getValue() === finalState) {
        tree.setSolutionNode(node);
        return null; // Solução encontrada
    }

    let minBound = Infinity;

    const newPossibilities = await getAllPossibilitiesFromNode(node.getValue());
    tree.addExpandedNode(`${node.getId()}-${node.getValue()}`);

    for (const possibility of newPossibilities) {
        const childNode = new Node(
            tree.getNodes().length + 1,
            possibility.newState,
            node.getDepth() + 1,
            g + 1 // Cada movimento acrescenta 1 ao custo
        );

        tree.addNode(childNode);
        tree.addEdge(node, childNode);

        if (tree.getDepth() < childNode.getDepth()) {
            tree.setDepth(childNode.getDepth());
        }

        const result = await searchWithLimit(tree, childNode, finalState, g + 1, bound);
        
        if (result === null) {
            return null; // Solução encontrada
        }
        
        minBound = Math.min(minBound, result);
    }

    return minBound; 
};

// Busca IDA*
const idaStarSearch = async (tree: Tree, finalState: string) => {
    const resultInfo: AlgorithmResult = { algName: 'IDA* Search' };

    try {
        const startDate = new Date();
        const initialNode = tree.getInitialNode();
        let bound = heuristic(initialNode.getValue(), finalState);

        while (true) {
            const result = await searchWithLimit(tree, initialNode, finalState, 0, bound);

            if (result === null) {
                break; // Encontra solução
            }

            if (result === Infinity) {
                Logger.warn("No solution found.");
                break; // Não existe solução
            }

            bound = result; // Atualiza o limite para próxima iteração
        }

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
        Logger.error(`Erro ao executar a busca IDA*: ${error.message}`);
    } finally {
        return resultInfo;
    }
};

export default idaStarSearch;
