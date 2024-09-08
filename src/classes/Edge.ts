import Node from "./Node";

class Edge {
    private source: number | Node;
    private target: number | Node;

    constructor(source: number, target: number) {
        this.source = source;
        this.target = target;
    }

    getSource(): number | Node {
        return this.source;
    }

    getTarget(): number | Node {
        return this.target;
    }

    setSource(source: number): void {
        this.source = source;
    }

    setTarget(target: number): void {
        this.target = target;
    }
}

export default Edge;