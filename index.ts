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
import getSelectedMaxDepth from './src/utils/getSelectedMaxDepth';

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



const main = async () => {
    let selectedMenuOption: string | number | null = null;
    let selectedRulerSize: number = 0;
    // let selectedInitialState: string | null = 'P,P,P,P,-,B,B,B,B';
    let selectedInitialState: string | null = null;
    // let selectedFinalState: string | null = 'B,B,B,B,-,P,P,P,P';
    let selectedFinalState: string | null = null;
    
    const options: MenuOptions = {
        [-1]: { name: 'Sair', action: () => Logger.info('Saindo...') },
        1: { name: 'Backtracking', action: async (tree, finalState) => await backTracking(tree, finalState) },
        2: { name: 'Busca em Largura', action: async (tree, finalState) => await breadthFirstSearch(tree, finalState) },
        3: { name: 'Busca em Profundidade', action: async (tree, finalState) => await depthFirstSearch(tree, finalState) },
        4: { name: 'Busca Ordenada', action: async (tree, finalState) => await sortedSearch(tree, finalState) },
        5: { name: 'Busca Gulosa', action: async (tree, finalState) => await greedySearch(tree, finalState) },
        6: { name: 'Busca A*', action: async (tree, finalState) => await aStarSearch(tree, finalState) },
        7: { name: 'Busca IDA*', action: async (tree, finalState) => await idaStarSearch(tree, finalState) }
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

    // MENU DE ALGORITMOS
    while (selectedMenuOption !== '-1') {
        console.log(`| Tamanho da régua: ${selectedRulerSize}`);
        console.log(`| Estado inicial do jogo: [${selectedInitialState}]`);
        console.log(`| Estado final desejado: [${selectedFinalState}]`);

        const optionsInText = Object.keys(options).reduce((previousValue, optionIndex) => {
            return `${previousValue}\n| ${optionIndex} - ${options[optionIndex].name}`;
        }, '| ↓ Selecione uma opção ↓ |');

        console.log(optionsInText);
        selectedMenuOption = question('| Opção: ');
        console.clear();

        if (selectedMenuOption === null || !options[selectedMenuOption]) {
            Logger.error('Opção inválida!');
            continue;
        }

        if (selectedMenuOption !== '-1') {
            const selectedTreeDepth = await getSelectedMaxDepth();
            const tree = new Tree(selectedInitialState, selectedTreeDepth);
            const algorithmResult = await options[selectedMenuOption].action(tree, selectedFinalState);

            if (algorithmResult) {
                console.log(`----------------Resultado do ${algorithmResult.algName}-----------------`);
                console.log(`| Nós visitados: ${algorithmResult.visitedNodes || 'Não encontrado'}`);
                console.log(`| Nós expandidos: ${algorithmResult.expandedNodes || 'Não encontrado'}`);
                console.log(`| Custo da solução: ${algorithmResult.solutionPath ? algorithmResult.cost : 'Não encontrado'}`);
                console.log(`| Caminho da solução: ${algorithmResult.solutionPath?.reverse().join(' -> ') || 'Não encontrado'}`);
                console.log(`| Fator de ramificação: ${algorithmResult.branchingFactor || 'Não encontrado'}`);
                console.log(`| Tempo de execução: ${algorithmResult.timeSpentInSeconds}s`);
                console.log('----------------------------------------------------------');
            }
        } 

    }
};

main();