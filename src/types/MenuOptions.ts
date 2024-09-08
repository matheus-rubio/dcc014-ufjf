import Tree from "../classes/Tree";

export default interface MenuOptions {
    [optionIndex: number | string]: {
        name: string;
        action: (tree: Tree) => void | Promise<void>;
    }
}