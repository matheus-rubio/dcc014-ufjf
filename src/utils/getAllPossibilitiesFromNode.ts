const getAllPossibilitiesFromNode = async (state: string) => {
    const stateAux = state.split(',');
    const allPossibilities = [];
    let newState;
    const emptyIndex = stateAux.indexOf('-');
    for (const [index, positionValue] of stateAux.entries()) {
        if (positionValue === '-') {
            continue;
        }

        if (index - 1 === emptyIndex || index + 1 === emptyIndex) {
            newState = [...stateAux];
            newState[emptyIndex] = positionValue;
            newState[index] = '-';

            allPossibilities.push({ newState: newState.join(','), cost: 1 });
        }

        // VERIFICA SE À ESQUERDA DA POSIÇÃO TEM UM ESPAÇO VAZIO
        if (index - 2 === emptyIndex || index + 2 === emptyIndex) {
            newState = [...stateAux];
            newState[emptyIndex] = positionValue;
            newState[index] = '-';
            allPossibilities.push({ newState: newState.join(','), cost: 2 });
        }

    }

    return allPossibilities;
};

export default getAllPossibilitiesFromNode;