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
import { readdirSync } from 'fs';

const main = async () => {
    let selectedMenuOption: string | number | null = null;
    let selectedFileIndex: string | number | null = null;

    const inputFiles = readdirSync('./inputFiles');

    if (inputFiles.length === 0) {
        Logger.error('Nenhum arquivo de entrada encontrado!');
        process.exit(0);
    }

    while (selectedFileIndex === null) {
        const optionsInText = inputFiles.reduce((previousValue, __, fileIndex) => {
            return `${previousValue}\n| ${fileIndex} - ${inputFiles[fileIndex]}`;
        }, '| ↓ Selecione um arquivo de entrada ↓ |');
        console.log(optionsInText);

        selectedFileIndex = question('| Arquivo: ');
        console.clear();

        if (selectedFileIndex === null || !inputFiles[Number(selectedFileIndex)]) {
            Logger.error('Arquivo inválido!');
            selectedFileIndex = null;
            continue;
        }

        Logger.info(`Arquivo selecionado: ${inputFiles[Number(selectedFileIndex)]}`);
    }

    const options: MenuOptions = {
        0: { name: 'Sair', action: () => Logger.info('Saindo...') },
        1: { name: 'Backtracking', action: backTracking },
        2: { name: 'Busca em Largura', action: depthFirstSearch },
        3: { name: 'Busca em Profundidade', action: breadthFirstSearch },
        4: { name: 'Busca Ordenada', action: sortedSearch },
        5: { name: 'Busca Gulosa', action: greedySearch },
        6: { name: 'Busca A*', action: aStarSearch },
        7: { name: 'Busca IDA*', action: idaStarSearch }
    };

    while (selectedMenuOption !== '0') {
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

        await options[selectedMenuOption].action();
    }
};

main();