import { question } from "readline-sync";
import Logger from "../classes/Logger";

const getSelectedMaxDepth = async () => {
    let selectedGameTreeDepth = 0;
    // INPUT DE PROFUNDIDADE DA ÁRVORE DE JOGO
    while (selectedGameTreeDepth === 0) {
        selectedGameTreeDepth = Number(question('| Digite a profundidade da árvore desejada: '));
        console.clear();

        if (selectedGameTreeDepth === -1) {
            Logger.info('Saindo...');
            process.exit(0);
        }

        if (isNaN(selectedGameTreeDepth) || selectedGameTreeDepth < 1) {
            Logger.warn('Profundidade inválida! A profundidade da árvore deve ser um número inteiro positivo.');
            selectedGameTreeDepth = 0;
        }
    }

    return selectedGameTreeDepth;
}

export default getSelectedMaxDepth;