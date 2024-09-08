import { question } from 'readline-sync';
import Logger from './src/classes/Logger';
import MenuOptions from './src/types/MenuOptions';
import backTracking from './src/algorithms/backTracking';
import depthFirstSearch from './src/algorithms/depthFirstSearch';
import breadthFirstSearch from './src/algorithms/breadthFirstSearch';
import sortedSearch from './src/algorithms/sortedSearch';
import greedySearch from './src/algorithms/greedySearch';
import aStarSearch from './src/algorithms/aStarSearch';
import idaStarSearch from './src/algorithms/idaStarSearch';
import Tree from './src/classes/Tree';
import Node from './src/classes/Node';
import Edge from './src/classes/Edge';

const validateSelectedState = (state: string, rulerSize: number) => {
    const regex = /^([PB\-],)*[PB\-]$/;

    const selectedState = state.split(',');

    if (!regex.test(state)) {
        Logger.warn('Estado inválido! O estado deve conter apenas os caracteres P, B e -.');
        return false;
    }

    if (selectedState.length !== rulerSize) {
        Logger.warn('Tamanho do estado inválido! O tamanho do estado deve ser igual ao tamanho da régua.');
        return false;
    }

    const positionsWithPCharacter = selectedState.filter(character => character === 'P');
    const positionsWithBCharacter = selectedState.filter(character => character === 'B');
    const emptyPositions = selectedState.filter(character => character === '-');

    if (positionsWithPCharacter.length !== positionsWithBCharacter.length) {
        Logger.warn('Quantidade de posições com P e B devem ser iguais!');
        return false;
    }

    if (emptyPositions.length !== 1) {
        Logger.warn('Deve haver apenas uma posição vazia!');
        return false;
    }

    return true;
};

// const getFirstPossibililtyFromState = async (state: string) => {
//     const stateAux = state.split(',');
//     const allPossibilities = [];
//     let newState;
//     const emptyIndex = stateAux.indexOf('-');
//     for (const [index, positionValue] of stateAux.entries()) {
//         if (positionValue === '-') {
//             continue;
//         }

//         // VERIFICA SE À ESQUERDA DA POSIÇÃO TEM UM ESPAÇO VAZIO
//         if (index - 1 === emptyIndex || index - 2 === emptyIndex) {
//             newState = [...stateAux];
//             newState[emptyIndex] = positionValue;
//             newState[index] = '-';
//             allPossibilities.push(newState.join(','));
//         }

//         // VERIFICA SE À DIREITA DA POSIÇÃO TEM UM ESPAÇO VAZIO
//         if (index + 1 === emptyIndex || index + 2 === emptyIndex) {
//             newState = [...stateAux];
//             newState[emptyIndex] = positionValue;
//             newState[index] = '-';
//             allPossibilities.push(newState.join(','));
//         }
//     }

//     return allPossibilities;
// };

// const generateTree = async (initialState: string, depth: number) => {

//     const nodes = [];
//     const edges = [];
//     const tree = new Tree(initialState);

//     const initialNode = new Node(nodes.length + 1, initialState);
//     nodes.push(initialNode);

//     const newPossibilities = await getFirstPossibililtyFromState(initialState);

//     for (const possibility of newPossibilities) {
//         tree.addNode(possibility);
//         tree.addEdge(initialState, possibility);
//     }

//     return tree;
// };

const getFirstPossibililtyFromState = async (state: string) => {
    const stateAux = state.split(',');
    const allPossibilities = [];
    let newState;
    const emptyIndex = stateAux.indexOf('-');
    for (const [index, positionValue] of stateAux.entries()) {
        if (positionValue === '-') {
            continue;
        }

        // VERIFICA SE À ESQUERDA DA POSIÇÃO TEM UM ESPAÇO VAZIO
        if (index - 1 === emptyIndex || index - 2 === emptyIndex) {
            newState = [...stateAux];
            newState[emptyIndex] = positionValue;
            newState[index] = '-';
            allPossibilities.push(newState.join(','));
        }

        // VERIFICA SE À DIREITA DA POSIÇÃO TEM UM ESPAÇO VAZIO
        if (index + 1 === emptyIndex || index + 2 === emptyIndex) {
            newState = [...stateAux];
            newState[emptyIndex] = positionValue;
            newState[index] = '-';
            allPossibilities.push(newState.join(','));
        }
    }

    return allPossibilities;
};

const generateTree = async (tree: Tree, depth: number) => {
    const currentDepth = tree.getDepth();
    const nodesToGenerateNewPossibilities = tree.getNodesByDepth(currentDepth);
    if (currentDepth === depth) {
        return tree;
    }

    for (const node of nodesToGenerateNewPossibilities) {
        const newPossibilities = await getFirstPossibililtyFromState(node.getValue());

        for (const possibility of newPossibilities) {
            const newNode = tree.addNode(possibility);

            tree.addEdge(node.getId(), newNode.getId());
        }

    }
    
    await generateTree(tree, depth);
    return tree;
};

const main = async () => {
    let selectedMenuOption: string | number | null = null;
    let selectedRulerSize: number = 0;
    // let selectedInitialState: string | null = 'P,P,-,B,B';
    let selectedInitialState: string | null = null;
    // let selectedFinalState: string | null = 'B,B,-,P,P';
    let selectedFinalState: string | null = null;
    let selectedGameTreeDepth: number = 0;
    
    const options: MenuOptions = {
        [-1]: { name: 'Sair', action: () => Logger.info('Saindo...') },
        1: { name: 'Backtracking', action: async (tree) => {
            const teste = await backTracking(tree);
            console.log(JSON.stringify(teste));
        } },
        2: { name: 'Busca em Largura', action: depthFirstSearch },
        3: { name: 'Busca em Profundidade', action: breadthFirstSearch },
        4: { name: 'Busca Ordenada', action: sortedSearch },
        5: { name: 'Busca Gulosa', action: greedySearch },
        6: { name: 'Busca A*', action: aStarSearch },
        7: { name: 'Busca IDA*', action: idaStarSearch }
    };

    // INPUT DE TAMANHO DA RÉGUA
    while (selectedRulerSize === 0) {
        selectedRulerSize = Number(question('| Digite o tamanho da régua desejado: '));
        console.clear();
        
        // Sair
        if (selectedRulerSize === -1) {
            Logger.info('Saindo...');
            process.exit(0);
        }
        
        if (isNaN(selectedRulerSize) || selectedRulerSize < 3 || selectedRulerSize % 2 === 0) {
            Logger.warn('Tamanho da régua inválido! O tamanho da régua deve ser um número ímpar e maior que 2.');
            continue;
        }
    }

    // INPUTS DE ESTADOS INICIAL E FINAL
    while (selectedInitialState === null || selectedFinalState === null) {
        console.log(`| Tamanho da régua: ${selectedRulerSize}`);

        if (selectedInitialState !== null) {
            console.log(`| Estado inicial: [${selectedInitialState}]`);
        }
        
        if (selectedInitialState === null) {
            selectedInitialState = question('| Digite estado inicial do jogo: ').trim();
            console.clear();

            if (selectedInitialState === '-1') {
                Logger.info('Saindo...');
                process.exit(0);
            }

            if (!validateSelectedState(selectedInitialState, selectedRulerSize)) {
                selectedInitialState = null;
            }

            continue;
        }

        selectedFinalState = question('| Digite o estado final desejado do jogo: ').trim();
        console.clear();

        if (selectedFinalState === '-1') {
            Logger.info('Saindo...');
            process.exit(0);
        }

        if (!validateSelectedState(selectedFinalState, selectedRulerSize)) {
            selectedFinalState = null;
            continue;
        }

        if (selectedInitialState === selectedFinalState) {
            Logger.warn('Estados inicial e final não podem ser iguais!');
            selectedFinalState = null;
            continue;
        }
    }

    // INPUT DE PROFUNDIDADE DA ÁRVORE DE JOGO
    while (selectedGameTreeDepth === 0) {
        console.log(`| Tamanho da régua: ${selectedRulerSize}`);
        console.log(`| Estado inicial do jogo: [${selectedInitialState}]`);
        console.log(`| Estado final desejado: [${selectedFinalState}]`);
        selectedGameTreeDepth = Number(question('| Digite a profundidade da árvore de jogo desejada: '));
        console.clear();

        if (selectedGameTreeDepth === -1) {
            Logger.info('Saindo...');
            process.exit(0);
        }

        if (isNaN(selectedGameTreeDepth) || selectedGameTreeDepth < 1) {
            Logger.warn('Profundidade inválida! A profundidade da árvore de jogo deve ser um número inteiro positivo.');
            selectedGameTreeDepth = 0;
        }
    }

    const tree = new Tree(selectedInitialState);
    const gameTree = await generateTree(tree, selectedGameTreeDepth);

    console.log(gameTree.getNodes());

    // // MENU DE ALGORITMOS
    // while (selectedMenuOption !== '-1') {
    //     console.log(`| Tamanho da régua: ${selectedRulerSize}`);
    //     console.log(`| Estado inicial do jogo: [${selectedInitialState}]`);
    //     console.log(`| Estado final desejado: [${selectedFinalState}]`);
    //     console.log(`| Profundidade da árvore de jogo: ${selectedGameTreeDepth}`);

    //     const optionsInText = Object.keys(options).reduce((previousValue, optionIndex) => {
    //         return `${previousValue}\n| ${optionIndex} - ${options[optionIndex].name}`;
    //     }, '| ↓ Selecione uma opção ↓ |');

    //     console.log(optionsInText);
    //     selectedMenuOption = question('| Opção: ');
    //     console.clear();

    //     if (selectedMenuOption === null || !options[selectedMenuOption]) {
    //         Logger.error('Opção inválida!');
    //         continue;
    //     }

    //     await options[selectedMenuOption].action(gameTree);
    // }
};

main();