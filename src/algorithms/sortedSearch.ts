import Logger from "../classes/Logger";
import Node from "../classes/Node";
import Tree from "../classes/Tree";
import AlgorithmResult from "../types/AlgorithmResult";
import getAllPossibilitiesFromNode from "../utils/getAllPossibilitiesFromNode";

const getNodeWithLowestCost: any = async (nodesList: Node[]) => {
    let nodeWithLowestCost: Node | null = null;
    let indexWithLowestCost: number | null = null;

    for (const [index, node] of nodesList.entries()) {
        if (!nodeWithLowestCost || node.getCost() < nodeWithLowestCost.getCost()) {
            nodeWithLowestCost = node;
            indexWithLowestCost = index;
        }
    }

    if (nodeWithLowestCost && indexWithLowestCost !== null) {
        return indexWithLowestCost;
    } else {
        throw new Error('Erro ao buscar nó com menor custo!');
    }

};

const sortedSearch = async (tree: Tree, finalState: string) => {
    const resultInfo: AlgorithmResult = { algName: 'Busca ordenada' };
    
    try {
        const startDate = new Date();
        const nodesList = [tree.getInitialNode()];

        while (nodesList.length > 0 && !tree.isSolutionFound()) {
            const { indexWithLowestCost }: { indexWithLowestCost: number; } = await getNodeWithLowestCost(nodesList);

            const currentNode = nodesList.splice(indexWithLowestCost, 1)[0];

            if (tree.getVisitedNodes().includes(`${currentNode.getValue()}`)) {
                continue;
            }

            tree.addVisitedNode(`${currentNode.getValue()}`);

            if (currentNode.getValue() === finalState) {
                tree.setSolutionNode(currentNode);
                continue;
            }

            if (currentNode.getDepth() === tree.getMaxDepth()) {
                continue;
            }

            const newPossibilities = await getAllPossibilitiesFromNode(currentNode.getValue());
            tree.addExpandedNode(`${currentNode.getValue()}`);

            for (const possibility of newPossibilities) {
                const childNode = new Node(tree.getNodes().length + 1, possibility.newState, currentNode.getDepth() + 1);
                childNode.setCost(currentNode.getCost() + possibility.cost);

                tree.addNode(childNode);
                tree.addEdge(currentNode, childNode);
                
                if (tree.getDepth() < childNode.getDepth()) {
                    tree.setDepth(childNode.getDepth());
                }

                nodesList.push(childNode);
            }
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
        Logger.error(`Erro ao executar a busca em largura: ${error.message}`);
    } finally {
        return resultInfo;
    }
};

export default sortedSearch;