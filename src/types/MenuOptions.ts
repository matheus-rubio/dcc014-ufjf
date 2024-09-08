import Tree from "../classes/Tree";
import AlgorithmResult from "./AlgorithmResult";

export default interface MenuOptions {
    [optionIndex: number | string]: {
        name: string;
        action: (tree: Tree, finalState: string) => void | Promise<void> | Promise<AlgorithmResult>;
    }
}