export default interface AlgorithmResult {
    algName: string;
    timeSpentInSeconds?: number;
    visitedNodes?: number;
    expandedNodes?: number;
    cost?: number;
    solutionPath?: string[];
    branchingFactor?: string;
}