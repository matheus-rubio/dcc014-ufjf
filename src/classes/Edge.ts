import Node from "./Node";

class Edge {
    private source: Node;
    private target: Node;

    constructor(source: Node, target: Node) {
        this.source = source;
        this.target = target;
    }

    getSource(): Node {
        return this.source;
    }

    getTarget(): Node {
        return this.target;
    }

    setSource(source: Node): void {
        this.source = source;
    }

    setTarget(target: Node): void {
        this.target = target;
    }
}

export default Edge;