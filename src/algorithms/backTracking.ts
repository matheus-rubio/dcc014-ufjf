import Logger from "../classes/Logger";
import Node from "../classes/Node";
import Tree from "../classes/Tree";
import AlgorithmResult from "../types/AlgorithmResult";
import getAllPossibilitiesFromNode from "../utils/getAllPossibilitiesFromNode";

const generateTree = async (tree: Tree, finalState: string) => {
    const currentDepth = tree.getDepth();
    const nodesToGenerateNewPossibilities = tree.getNodesByDepth(currentDepth);

    for (const currentNode of nodesToGenerateNewPossibilities) {
        tree.addVisitedNode(`${currentNode.getId()}-${currentNode.getValue()}`);

        if (currentNode.getValue() === finalState) {
            tree.setSolutionNode(currentNode);
            return tree;
        }

        if (currentNode.getDepth() === tree.getMaxDepth()) {
            return tree;
        }

        const newPossibilities = await getAllPossibilitiesFromNode(currentNode.getValue());
        tree.addExpandedNode(`${currentNode.getId()}-${currentNode.getValue()}`);
        

        for (const possibility of newPossibilities) {
            const childNode = new Node(tree.getNodes().length + 1, possibility.newState, currentNode.getDepth() + 1);

            tree.addNode(childNode);
            tree.addEdge(currentNode, childNode);

            tree.addVisitedNode(`${childNode.getId()}-${childNode.getValue()}`);
            
            if (tree.getDepth() < childNode.getDepth()) {
                tree.setDepth(childNode.getDepth());
            }
        }
    }
    
    await generateTree(tree, finalState);
    return tree;
};

const backTracking = async (gameTree: Tree, finalState: string) => {
    const resultInfo: AlgorithmResult = { algName: 'Backtracking' };

    try {
        const startDate = new Date();

        const generatedTree = await generateTree(gameTree, finalState);

        resultInfo.visitedNodes = generatedTree.getVisitedNodes().length;
        resultInfo.expandedNodes = generatedTree.getExpandedNodes().length;
        resultInfo.branchingFactor = generatedTree.getBranchingFactor().toFixed(2);
        
        const solutionNode = generatedTree.getSolutionNode();
        if (solutionNode) {
            resultInfo.cost = generatedTree.getSolutionNode()?.getDepth();
            resultInfo.solutionPath = await generatedTree.getPathFromNode(solutionNode);
        }

        const endDate = new Date();
        resultInfo.timeSpentInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
    } catch (error: any) {
        Logger.error(`Erro ao executar o algoritmo de Backtracking: ${error.message}`);
    } finally {
        return resultInfo;
    }
};

export default backTracking;