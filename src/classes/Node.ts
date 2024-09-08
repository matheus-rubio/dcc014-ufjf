class Node {
    private id: number;
    private value: string;

    constructor(id: number, value: string) {
        this.id = id;
        this.value = value;
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
}

export default Node;