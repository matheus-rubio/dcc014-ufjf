export default interface MenuOptions {
    [optionIndex: number | string]: {
        name: string;
        action: () => void | Promise<void>;
    }
}