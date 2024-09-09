class Node {
    private id: number;
    private value: string;
    private depth: number;
    private cost: number;

    constructor(id: number, value: string, depth: number, cost: number = 0) {
        this.id = id;
        this.value = value;
        this.depth = depth;
        this.cost = cost;
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

    getCost(): number {
        return this.cost;
    }

    setCost(cost: number): void {
        this.cost = cost;
    }
}

export default Node;