import Node from "./Node";

class Edge {
    private source: number | Node;
    private target: number | Node;
    private value: number | null;

    constructor(source: number, target: number, value: number | null) {
        this.source = source;
        this.target = target;
        this.value = value;
    }

    getSource(): number | Node {
        return this.source;
    }

    getTarget(): number | Node {
        return this.target;
    }

    getValue(): number | null {
        return this.value;
    }

    setSource(source: number): void {
        this.source = source;
    }

    setTarget(target: number): void {
        this.target = target;
    }


    setValue(value: number): void {
        this.value = value;
    }
}

export default Edge;