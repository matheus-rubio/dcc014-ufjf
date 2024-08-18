class Node {
    private id: number;

    constructor(id: number) {
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }
}

export default Node;