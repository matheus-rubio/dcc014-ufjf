import Logger from "../classes/Logger";
import Node from "../classes/Node";
import Tree from "../classes/Tree";
import AlgorithmResult from "../types/AlgorithmResult";
import getAllPossibilitiesFromNode from "../utils/getAllPossibilitiesFromNode";

const depthFirstSearch = async (tree: Tree, finalState: string) => {
    const resultInfo: AlgorithmResult = { algName: 'Busca em Profundidade' };
    
    try {
        const startDate = new Date();
        const stack = [tree.getInitialNode()];

        while (stack.length > 0 && !tree.isSolutionFound()) {
            const currentNode: any = stack.pop();

            if (tree.getVisitedNodes().includes(`${currentNode.getId()}-${currentNode.getValue()}`)) {
                continue;
            }

            tree.addVisitedNode(`${currentNode.getId()}-${currentNode.getValue()}`);

            if (currentNode.getValue() === finalState) {
                tree.setSolutionNode(currentNode);
                continue;
            }

            if (currentNode.getDepth() === tree.getMaxDepth()) {
                continue;
            }

            const newPossibilities = await getAllPossibilitiesFromNode(currentNode.getValue());
            tree.addExpandedNode(`${currentNode.getId()}-${currentNode.getValue()}`);

            for (const possibility of newPossibilities) {
                const childNode = new Node(tree.getNodes().length + 1, possibility.newState, currentNode.getDepth() + 1);

                tree.addNode(childNode);
                tree.addEdge(currentNode, childNode);
                
                if (tree.getDepth() < childNode.getDepth()) {
                    tree.setDepth(childNode.getDepth());
                }

                stack.push(childNode);
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

export default depthFirstSearch;