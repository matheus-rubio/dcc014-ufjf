const getAllPossibilitiesFromNode = async (state: string) => {
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

export default getAllPossibilitiesFromNode;