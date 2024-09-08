import Logger from "../classes/Logger";
import Node from "../classes/Node";
import Tree from "../classes/Tree";

const getFirstPossibililtyFromState = async (state: string[]) => {
    let newState = [...state];
    const emptyIndex = state.indexOf('-');
    for (const [index, positionValue] of state.entries()) {
        if (positionValue === '-') {
            continue;
        }

        // VERIFICA SE À ESQUERDA DA POSIÇÃO TEM UM ESPAÇO VAZIO
        if (index - 1 === emptyIndex || index - 2 === emptyIndex) {
            newState[emptyIndex] = positionValue;
            newState[index] = '-';
            return newState;
        }

        // VERIFICA SE À DIREITA DA POSIÇÃO TEM UM ESPAÇO VAZIO
        if (index + 1 === emptyIndex || index + 2 === emptyIndex) {
            newState[emptyIndex] = positionValue;
            newState[index] = '-';
            return newState;
        }
    }

    return false;
};

const backTracking = async (tree: Tree) => {



    console.log(tree);
    // if (firstPossibililty) {
    //     const parent = await backTracking(firstPossibililty);
    //     tree.setParent(parent);
    // }


    
    return tree;

    // Logger.warn('Algoritmo ainda não implementado!');
};

export default backTracking;