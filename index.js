const readline = require('readline');
const logger = require('./Logger');

const sendQuestion = (rl, question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
          resolve(answer);
        });
    });
};

const main = async () => {
    let selectedOption = null;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const options = {
        0: { name: 'Sair', action: () => logger.info('Saindo...') },
        1: { name: 'Backtracking', action: () => logger.warn('Algoritmo ainda não implementado!') },
        2: { name: 'Busca em Largura', action: () => logger.warn('Algoritmo ainda não implementado!') },
        3: { name: 'Busca em Profundidade', action: () => logger.warn('Algoritmo ainda não implementado!') },
        4: { name: 'Busca Ordenada', action: () => logger.warn('Algoritmo ainda não implementado!') },
        5: { name: 'Busca Gulosa', action: () => logger.warn('Algoritmo ainda não implementado!') },
        6: { name: 'Busca A*', action: () => logger.warn('Algoritmo ainda não implementado!') },
        7: { name: 'Busca IDA*', action: () => logger.warn('Algoritmo ainda não implementado!') }
    };

    while (selectedOption !== '0') {
        const optionsInText = Object.keys(options).reduce((previousValue, optionIndex) => {
            return `${previousValue}\n| ${optionIndex} - ${options[optionIndex].name}`;
        }, '| ↓ Selecione uma opção ↓ |');

        console.log(optionsInText);
        selectedOption = await sendQuestion(rl, '| Opção: ');
        console.clear();

        if (!options[selectedOption]) {
            logger.error('Opção inválida!');
            continue;
        }

        await options[selectedOption].action();
    }

    rl.close();
};

main();