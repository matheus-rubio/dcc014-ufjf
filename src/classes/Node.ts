class Node {
    private id: number;
    private value: string;
    private depth: number;

    constructor(id: number, value: string, depth: number) {
        this.id = id;
        this.value = value;
        this.depth = depth;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getValue(): string {
        return this.value;
    }

    setValue(value: string): void {
        this.value = value;
    }

    getDepth(): number {
        return this.depth;
    }

    setDepth(depth: number): void {
        this.depth = depth;
    }
}

export default Node;