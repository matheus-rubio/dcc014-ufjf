import Edge from "./Edge";
import Node from "./Node";

class Tree {
    private nodes: Node[];
    private edges: Edge[];
    private nodeDepths: { [node: string]: number };
    private depth: number;

    constructor(initialNode: string) {
        this.nodes = [];
        this.edges = [];
        this.nodeDepths = {};
        this.depth = 0;

        this.nodes.push(new Node(1, initialNode));
        this.nodeDepths[1] = 0;
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

    addNode(node: string): Node {
        const newNode = new Node(this.nodes.length + 1, node);
        this.nodes.push(newNode);

        return newNode;
    }

    addEdge(source: number, destiny: number): void {
        this.edges.push(new Edge(source, destiny));

        this.updateDepth(source, destiny);
    }

    getDepth(): number {
        return this.depth;
    }

    getNodesByDepth(depth: number): Node[] {
        return this.nodes.filter(node => this.nodeDepths[node.getId()] === depth);
    }

    private updateDepth(parentNodeId: number, newNodeId: number): void {
        // A profundidade do nó filho é a profundidade do nó pai + 1
        const parentDepth = this.nodeDepths[parentNodeId];
        if (parentDepth === undefined) {
            throw new Error(`Parent node ${parentNodeId} depth not found`);
        }

        this.nodeDepths[newNodeId] = parentDepth + 1;

        // Atualiza a profundidade máxima se necessário
        if (this.nodeDepths[newNodeId] > this.depth) {
            this.depth = this.nodeDepths[newNodeId];
        }
    }
}

export default Tree;