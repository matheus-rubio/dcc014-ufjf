import Edge from "./Edge";
import Node from "./Node";

class Tree {
    private nodes: Node[];
    private edges: Edge[];
    private depth: number;
    private maxDepth: number;
    private solutionNode: Node | null;
    private visitedNodes: string[];
    private expandedNodes: string[];

    constructor(initialNode: string, maxDepth: number) {
        this.nodes = [new Node(1, initialNode, 0)];
        this.edges = [];
        this.depth = 0;
        this.solutionNode = null;
        this.maxDepth = maxDepth;
        this.visitedNodes = [];
        this.expandedNodes = [];
    }

    getNodes(): Node[] {
        return this.nodes;
    }

    getEdges(): Edge[] {
        return this.edges;
    }

    getInitialNode(): Node {
        const initialNode = this.nodes.find(node => node.getId() === 1);

        if (!initialNode) {
            throw new Error('Initial node not found');
        }

        return initialNode;
    }

    addNode(node: Node): void {
        this.nodes.push(node);
    }

    addEdge(source: Node, destiny: Node): void {
        this.edges.push(new Edge(source, destiny));
    }

    getDepth(): number {
        return this.depth;
    }

    getNodesByDepth(depth: number): Node[] {
        return this.nodes.filter(node => node.getDepth() === depth);
    }

    setDepth(depth: number): void {
        this.depth = depth;
    }

    getMaxDepth(): number {
        return this.maxDepth;
    }

    getSolutionNode(): Node | null {
        return this.solutionNode;
    }

    setSolutionNode(node: Node): void {
        this.solutionNode = node;
    }

    isSolutionFound(): boolean {
        return this.solutionNode !== null;
    }

    async getPathFromNode(node: Node): Promise<string[]> {
        const path: string[] = [];

        return this.auxGetPathFromNode(node, path);
    }

    private auxGetPathFromNode(node: Node, path: string[]): string[] {
        path.push(node.getValue());

        const edge = this.edges.find(edge => edge.getTarget().getId() === node.getId());

        if (!edge) {
            return path;
        }

        const parentNode = edge.getSource();

        return this.auxGetPathFromNode(parentNode, path);
    }

    getVisitedNodes(): string[] {
        return this.visitedNodes;
    }

    getExpandedNodes(): string[] {
        return this.expandedNodes;
    }

    addVisitedNode(node: string): void {
        this.visitedNodes.push(node);
    }

    addExpandedNode(node: string): void {
        this.expandedNodes.push(node);
    }

    getBranchingFactor(): number {
        const notLeafNodes = this.nodes.filter(node => this.edges.some(edge => edge.getSource().getId() === node.getId()));
        return this.edges.length / notLeafNodes.length;
    }
}

export default Tree;