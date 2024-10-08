# Trabalho Prático (DCC014) - Régua-Puzzle

## Integrantes

- Matheus Rubio
- Giovane Nilmer

## Divisão de Tarefas

- **Matheus Rubio**

  - Implementação da estrutura inicial do projeto;
  - Implementação do algoritmo de backtracking;
  - Implementação do algoritmo de busca em largura;
  - Implementação do algoritmo de busca em profundidade;
  - Implementação do algoritmo de busca ordenada;

- **Giovane Nilmer**

  - Implementação do algoritmo de busca gulosa;
  - Implementação do algoritmo de busca A\*;
  - Implementação do algoritmo de busca IDA\*;

## Problemática

O jogo das fichas(régua-puzzle) consiste em um jogo de tabuleiro com uma única linha, um espaço vazio e um número igual de fichas pretas e brancas.

O jogo a princípio não possui um objetivo definido, depende de um contexto específico para que seja definido tal objetivo, dessa forma, existem várias possibilidades de objetivos para o jogo.

<p align="center">
   <img src="./img/regua-puzzle-example.jpeg" alt="Exemplo de jogo de régua-puzzle" />
<p>

### Exemplo de objetivo

- Colocar as peças pretas entre as peças brancas.

### Operações Permitidas

- Deslizar uma ficha para um espaço vazio.
- Saltar uma ficha sobre outra em direção ao espaço vazio.

## Implementação

O projeto foi desenvolvido utilizando a linguagem de programação Typescript, com o auxilio do runtime Node.js.

### Principais Classes

- **Logger.ts**: Classe responsável por exibir mensagens de erro, avisos, sucesso e informações no console.

- **Tree.ts**: Classe responsável por representar a árvore gerada em cada um dos algoritmos de busca.

- **Node.ts**: Classe responsável por representar um nó da árvore gerada em cada um dos algoritmos de busca.

- **Edge.ts**: Classe responsável por representar uma aresta da árvore gerada em cada um dos algoritmos de busca.

- **PriorityQueue.ts**: Classe responsável por representar as filas de prioridade utilizadas nos algoritmos de Busca Gulosa e A\*.

### Formato de Entrada

Para poder executar qualquer um dos algoritmos, somente 4 parâmetros são necessários:

- **Tamanho da régua**: Número de fichas no tabuleiro.
  - Deve ser sempre um número ímpar e maior que 3, que é o mínimo possível.
- **Estado inicial do jogo**: Estado inicial da régua.
  - String separada por vírgula onde cada caractere entre as vírgulas só poderá ser ‘P’(Preto), ‘B’(Branco) e ‘-’(Vazio) EX: `P,P,P,-,B,B,B`
  - Os números de peças pretas e brancas devem ser iguais.
  - Somente poderá haver um único espaço vazio.
- **Estado final desejado**: Estado final da régua.
  - As mesmas regras do estado inicial, mas deve ser diferente do estado inicial.
- **Altura máxima da árvore de solução**: Número inteiro que representa a altura máxima da árvore de solução.
  - Precisa ser um número maior que 0.

### Menu

Ao serem informadas as informações de entrada, o usuário terá a opção de escolher qual algoritmo deseja utilizar para resolver o problema através do menu abaixo:

```
   | Tamanho da régua: 7
   | Estado inicial do jogo: P,P,P,-,B,B,B
   | Estado final desejado: B,B,B,-,P,P,P
   | ↓ Selecione uma opção ↓ |
   | 1 - Backtracking
   | 2 - Busca em Largura
   | 3 - Busca em Profundidade
   | 4 - Busca Ordenada
   | 5 - Busca Gulosa
   | 6 - Busca A*
   | 7 - Busca IDA*
   | -1 - Sair
   | Opção: _
```

Para todos os algoritmos no menu disponíveis para execução, mais um parâmetro é solicitado ao usuário que é o tamanho máximo da árvore de solução, a presença desse parâmetro é necessária principalmente para evitar estouros de memórias em alguns casos.

```
| Digite a profundidade dá árvore desejada: _
```

### Resultado da Execução

Ao final da execução de qualquer um dos algoritmos, o usuário terá como retorno o caminho, a quantidade de nós expandidos, a quantidade de nós visitados, o custo, o fator de ramificação médio e o tempo de execução.

```
----------------------------------------
| Nós visitados: 12
| Nós expandidos: 11
| Custo da solução: 12
| Caminho: P,P,P,-,B,B,B -> P,P,-,P,B,B,B -> P,-,P,P,B,B,B -> -,P,P,P,B,B,B -> B,P,P,P,-,B,B -> B,P,P,-,P,B,B -> B,P,-,P,P,B,B -> B,-,P,P,P,B,B -> B,P,P,P,P,-,B -> B,P,P,P,-,P,B -> B,P,P,-,P,P,B -> B,P,-,P,P,P,B -> B,-,P,P,P,P,B -> B,P,P,P,P,P,-
| Fator de ramificação médio: 1.0909090909090908
| Tempo de execução: 0.002s
----------------------------------------
```

### Principais Funções

- **main**: Função principal do projeto, responsável por apresentar o menu ao usuário, solicitar as informações de entrada e chamar a função que executa o algoritmo escolhido.

- **getAllPossibilitiesFromNode**: Função responsável por gerar todos os possíveis estados a partir de um nó.

  - A partir da posição do espaço vazio no tabuleiro, a função gera todos os possíveis estados que podem ser alcançados a partir do estado atual.
  - **EX1**: [P,-,P,B,B] → [P,P,-,B,B]
  - **EX2**: [P,-,P,B,B] → [P,B,P,-,B]

- **getSelectedMaxDepth**: Função responsável por permitir ao usuário informar um número inteiro positivo para definir a profundidade máxima que a árvore poderá atingir em sua execução.

### Principais dificuldades encontradas

- **Definição da heurística**:

  Para tornar eficientes os algoritmos Guloso, A* e IDA*, foi pensada uma heurística que pudesse representar bem a "distância" entre o estado atual e o estado objetivo, dessa forma, pela representação ser feita numa cadeia de caracteres, optou-se por medir o número de posições nas quais - tanto para o estado atual como o objetivo - tem-se caracteres diferentes (entre "P", "B" ou "-"). Ex.: tendo respectivamente **[P,P,-,B,B]** e **[B,B,-,P,P]** como os estados atual e objetivo, a heurística para essa jogada seria de 4.

- **Estouro de memória**
  Devido a quantidade de estados possíveis que podem ser gerados a partir de um nó, a árvore de solução pode crescer de forma exponencial, dessa forma, foi necessário a definição de um limite para a altura da árvore de solução.

- **Backtracking sem estados repetidos**

  Não conseguimos implementar o backtracking sem estados repetidos.

### Estatísticas de Execução

   Considerando três partidas, com réguas de **5**, **7** e **9 posições** respectivamente, a execução de cada algoritmo foi impressa como segue (sessões onde faltarem algoritmos indicam que estes tiveram erro de memória sem dar resultados):

**5 posições: Estado inicial [-,P,B,B,P] e estado objetivo [B,B,-,P,P],**
<p align="center">
   <img src="./img/graph_5_posicoes.png" alt="Exemplo de jogo com 5 posições" />
<p>

```
----------------Resultado do Backtracking-----------------
| Nós visitados: 272
| Nós expandidos: 69
| Custo da solução: 4
| Caminho da solução: -,P,B,B,P -> B,P,-,B,P -> B,-,P,B,P -> B,B,P,-,P -> B,B,-,P,P
| Fator de ramificação: 2.93
| Tempo de execução: 0.001s


----------------Resultado do Busca em Largura-----------------
| Nós visitados: 18
| Nós expandidos: 17
| Custo da solução: 4
| Caminho da solução: -,P,B,B,P -> B,P,-,B,P -> B,-,P,B,P -> B,B,P,-,P -> B,B,-,P,P
| Fator de ramificação: 2.82
| Tempo de execução: 0s


----------------Resultado do Busca em Profundidade-----------------
| Nós visitados: 9
| Nós expandidos: 8
| Custo da solução: 8
| Caminho da solução: -,P,B,B,P -> B,P,-,B,P -> B,P,P,B,- -> B,P,P,-,B -> B,P,-,P,B -> B,P,B,P,- -> B,P,B,-,P -> B,-,B,P,P -> B,B,-,P,P
| Fator de ramificação: 2.88
| Tempo de execução: 0s


----------------Resultado do Busca ordenada-----------------
| Nós visitados: 18
| Nós expandidos: 17
| Custo da solução: 4
| Caminho da solução: -,P,B,B,P -> B,P,-,B,P -> B,-,P,B,P -> B,B,P,-,P -> B,B,-,P,P
| Fator de ramificação: 2.82
| Tempo de execução: 0s


----------------Resultado do Busca Gulosa-----------------
| Nós visitados: 5
| Nós expandidos: 4
| Custo da solução: 4
| Caminho da solução: -,P,B,B,P -> B,P,-,B,P -> B,-,P,B,P -> B,B,P,-,P -> B,B,-,P,P
| Fator de ramificação: 3.00
| Tempo de execução: 0.001s


----------------Resultado do A* Search-----------------
| Nós visitados: 9
| Nós expandidos: 8
| Custo da solução: 4
| Caminho da solução: -,P,B,B,P -> B,P,-,B,P -> B,-,P,B,P -> B,B,P,-,P -> B,B,-,P,P
| Fator de ramificação: 3.13
| Tempo de execução: 0s


----------------Resultado do IDA* Search-----------------
| Nós visitados: Não encontrado
| Nós expandidos: 11
| Custo da solução: 4
| Caminho da solução: -,P,B,B,P -> B,P,-,B,P -> B,-,P,B,P -> B,B,P,-,P -> B,B,-,P,P
| Fator de ramificação: 3.30
| Tempo de execução: 0s
```

**7 posições: Estado inicial [P,B,-,P,P,B,B] e estado objetivo [B,B,B,-,P,P,P],**
<p align="center">
   <img src="./img/graph_7_posicoes.png" alt="Exemplo de jogo com 7 posições" />
<p>

\* A busca IDA* está sem dados pois realizou 31909 expansões.

```
----------------Resultado do Busca em Largura-----------------
| Nós visitados: 136
| Nós expandidos: 135
| Custo da solução: 12
| Caminho da solução: P,B,-,P,P,B,B -> P,B,P,-,P,B,B -> P,B,P,B,P,-,B -> P,B,P,B,P,B,- -> P,B,P,B,-,B,P -> P,B,-,B,P,B,P -> -,B,P,B,P,B,P -> B,-,P,B,P,B,P -> B,B,P,-,P,B,P -> B,B,P,B,P,-,P -> B,B,P,B,-,P,P -> B,B,-,B,P,P,P -> B,B,B,-,P,P,P
| Fator de ramificação: 3.15
| Tempo de execução: 0.003s

----------------Resultado do Busca em Profundidade-----------------
| Nós visitados: 129
| Nós expandidos: 128
| Custo da solução: 65
| Caminho da solução: P,B,-,P,P,B,B -> P,B,P,P,-,B,B -> P,B,P,P,B,B,- -> P,B,P,P,B,-,B -> P,B,P,-,B,P,B -> P,B,P,B,-,P,B -> P,B,P,B,B,P,- -> P,B,P,B,B,-,P -> P,B,P,B,-,B,P -> P,B,P,B,P,B,- -> P,B,P,B,P,-,B -> P,B,P,-,P,B,B -> P,-,P,B,P,B,B -> P,P,-,B,P,B,B -> P,P,P,B,-,B,B -> P,P,P,B,B,B,- -> P,P,P,B,B,-,B -> P,P,P,-,B,B,B -> P,P,-,P,B,B,B -> P,P,B,P,-,B,B -> P,P,B,P,B,B,- -> P,P,B,P,B,-,B -> P,P,B,-,B,P,B -> P,P,B,B,-,P,B -> P,P,B,B,B,P,- -> P,P,B,B,B,-,P -> P,P,B,B,-,B,P -> P,P,B,B,P,B,- -> P,P,B,B,P,-,B -> P,P,B,-,P,B,B -> P,-,B,P,P,B,B -> -,P,B,P,P,B,B -> B,P,-,P,P,B,B -> B,P,P,P,-,B,B -> B,P,P,P,B,B,- -> B,P,P,P,B,-,B -> B,P,P,-,B,P,B -> B,P,P,B,-,P,B -> B,P,P,B,B,P,- -> B,P,P,B,B,-,P -> B,P,P,B,-,B,P -> B,P,P,-,B,B,P -> B,P,-,P,B,B,P -> B,P,B,P,-,B,P -> B,P,B,P,P,B,- -> B,P,B,P,P,-,B -> B,P,B,P,-,P,B -> B,P,B,P,B,P,- -> B,P,B,P,B,-,P -> B,P,B,-,B,P,P -> B,P,B,B,-,P,P -> B,P,B,B,P,P,- -> B,P,B,B,P,-,P -> B,P,B,-,P,B,P -> B,P,-,B,P,B,P -> B,-,P,B,P,B,P -> B,B,P,-,P,B,P -> B,B,P,B,P,-,P -> B,B,P,B,P,P,- -> B,B,P,B,-,P,P -> B,B,P,-,B,P,P -> B,B,-,P,B,P,P -> B,B,B,P,-,P,P -> B,B,B,P,P,P,- -> B,B,B,P,P,-,P -> B,B,B,-,P,P,P
| Fator de ramificação: 3.17
| Tempo de execução: 0.002s

----------------Resultado do Busca ordenada-----------------
| Nós visitados: 136
| Nós expandidos: 135
| Custo da solução: 12
| Caminho da solução: P,B,-,P,P,B,B -> P,B,P,-,P,B,B -> P,B,P,B,P,-,B -> P,B,P,B,P,B,- -> P,B,P,B,-,B,P -> P,B,-,B,P,B,P -> -,B,P,B,P,B,P -> B,-,P,B,P,B,P -> B,B,P,-,P,B,P -> B,B,P,B,P,-,P -> B,B,P,B,-,P,P -> B,B,-,B,P,P,P -> B,B,B,-,P,P,P
| Fator de ramificação: 3.15
| Tempo de execução: 0.007s

----------------Resultado do Busca Gulosa-----------------
| Nós visitados: 52
| Nós expandidos: 51
| Custo da solução: 14
| Caminho da solução: P,B,-,P,P,B,B -> P,B,P,-,P,B,B -> P,B,P,B,P,-,B -> P,B,P,B,-,P,B -> P,B,-,B,P,P,B -> -,B,P,B,P,P,B -> B,-,P,B,P,P,B -> B,B,P,-,P,P,B -> B,B,P,P,-,P,B -> B,B,P,P,B,P,- -> B,B,P,P,B,-,P -> B,B,P,-,B,P,P -> B,B,-,P,B,P,P -> B,B,B,P,-,P,P -> B,B,B,-,P,P,P
| Fator de ramificação: 3.24
| Tempo de execução: 0s

----------------Resultado do A* Search-----------------
| Nós visitados: 124
| Nós expandidos: 123
| Custo da solução: 12
| Caminho da solução: P,B,-,P,P,B,B -> P,B,P,-,P,B,B -> P,B,P,B,P,-,B -> P,B,P,B,P,B,- -> P,B,P,B,-,B,P -> P,B,-,B,P,B,P -> -,B,P,B,P,B,P -> B,-,P,B,P,B,P -> B,B,P,-,P,B,P -> B,B,P,B,P,-,P -> B,B,P,B,-,P,P -> B,B,-,B,P,P,P -> B,B,B,-,P,P,P
| Fator de ramificação: 3.15
| Tempo de execução: 0.002s

----------------Resultado do IDA* Search-----------------
| Nós visitados: Não encontrado
| Nós expandidos: 31909
| Custo da solução: 12
| Caminho da solução: P,B,-,P,P,B,B -> P,B,P,-,P,B,B -> P,B,P,B,P,-,B -> P,B,P,B,P,B,- -> P,B,P,B,-,B,P -> P,B,-,B,P,B,P -> -,B,P,B,P,B,P -> B,-,P,B,P,B,P -> B,B,P,-,P,B,P -> B,B,P,B,P,-,P -> B,B,P,B,-,P,P -> B,B,-,B,P,P,P -> B,B,B,-,P,P,P
| Fator de ramificação: 3.55
| Tempo de execução: 18.994s
```

**9 posições: Estado inicial [P,-,B,P,P,B,B,P,B] e estado objetivo [B,B,B,B,-,P,P,P,P],**

<p align="center">
   <img src="./img/graph_9_posicoes.png" alt="Exemplo de jogo com 9 posições" />
<p>

\* A busca IDA* está sem dados pois realizou 51032 expansões.

```
----------------Resultado do Busca em Largura-----------------
| Nós visitados: 626
| Nós expandidos: 625
| Custo da solução: 19
| Caminho da solução: P,-,B,P,P,B,B,P,B -> -,P,B,P,P,B,B,P,B -> B,P,-,P,P,B,B,P,B -> B,P,P,P,-,B,B,P,B -> B,P,P,P,B,-,B,P,B -> B,P,P,-,B,P,B,P,B -> B,P,-,P,B,P,B,P,B -> B,P,B,P,-,P,B,P,B -> B,P,B,P,B,P,-,P,B -> B,P,B,P,B,P,B,P,- -> B,P,B,P,B,P,B,-,P -> B,P,B,P,B,-,B,P,P -> B,P,B,-,B,P,B,P,P -> B,-,B,P,B,P,B,P,P -> B,B,-,P,B,P,B,P,P -> B,B,B,P,-,P,B,P,P -> B,B,B,P,B,P,-,P,P -> B,B,B,P,B,-,P,P,P -> B,B,B,-,B,P,P,P,P -> B,B,B,B,-,P,P,P,P
| Fator de ramificação: 3.34
| Tempo de execução: 0.03s

----------------Resultado do Busca em Profundidade-----------------
| Nós visitados: 220
| Nós expandidos: 219
| Custo da solução: 201
| Caminho da solução: P,-,B,P,P,B,B,P,B -> P,P,B,-,P,B,B,P,B -> P,P,B,B,P,-,B,P,B -> P,P,B,B,P,P,B,-,B -> P,P,B,B,P,P,B,B,- -> P,P,B,B,P,P,-,B,B -> P,P,B,B,P,-,P,B,B -> P,P,B,B,P,B,P,-,B -> P,P,B,B,P,B,P,B,- -> P,P,B,B,P,B,-,B,P -> P,P,B,B,P,B,B,-,P -> P,P,B,B,P,B,B,P,- -> P,P,B,B,P,B,-,P,B -> P,P,B,B,-,B,P,P,B -> P,P,B,B,B,-,P,P,B -> P,P,B,B,B,P,P,-,B -> P,P,B,B,B,P,P,B,- -> P,P,B,B,B,P,-,B,P -> P,P,B,B,B,P,B,-,P -> P,P,B,B,B,P,B,P,- -> P,P,B,B,B,P,-,P,B -> P,P,B,B,-,P,B,P,B -> P,P,B,-,B,P,B,P,B -> P,P,B,P,B,-,B,P,B -> P,P,B,P,B,P,B,-,B -> P,P,B,P,B,P,B,B,- -> P,P,B,P,B,P,-,B,B -> P,P,B,P,B,-,P,B,B -> P,P,B,P,B,B,P,-,B -> P,P,B,P,B,B,P,B,- -> P,P,B,P,B,B,-,B,P -> P,P,B,P,B,B,B,-,P -> P,P,B,P,B,B,B,P,- -> P,P,B,P,B,B,-,P,B -> P,P,B,P,-,B,B,P,B -> P,P,-,P,B,B,B,P,B -> P,P,P,-,B,B,B,P,B -> P,P,P,B,B,-,B,P,B -> P,P,P,B,B,P,B,-,B -> P,P,P,B,B,P,B,B,- -> P,P,P,B,B,P,-,B,B -> P,P,P,B,B,-,P,B,B -> P,P,P,B,B,B,P,-,B -> P,P,P,B,B,B,P,B,- -> P,P,P,B,B,B,-,B,P -> P,P,P,B,B,B,B,-,P -> P,P,P,B,B,B,B,P,- -> P,P,P,B,B,B,-,P,B -> P,P,P,B,-,B,B,P,B -> P,P,-,B,P,B,B,P,B -> P,-,P,B,P,B,B,P,B -> P,B,P,-,P,B,B,P,B -> P,B,P,B,P,-,B,P,B -> P,B,P,B,P,P,B,-,B -> P,B,P,B,P,P,B,B,- -> P,B,P,B,P,P,-,B,B -> P,B,P,B,P,-,P,B,B -> P,B,P,B,P,B,P,-,B -> P,B,P,B,P,B,P,B,- -> P,B,P,B,P,B,-,B,P -> P,B,P,B,P,B,B,-,P -> P,B,P,B,P,B,B,P,- -> P,B,P,B,P,B,-,P,B -> P,B,P,B,-,B,P,P,B -> P,B,P,B,B,-,P,P,B -> P,B,P,B,B,P,P,-,B -> P,B,P,B,B,P,P,B,- -> P,B,P,B,B,P,-,B,P -> P,B,P,B,B,P,B,-,P -> P,B,P,B,B,P,B,P,- -> P,B,P,B,B,P,-,P,B -> P,B,P,B,-,P,B,P,B -> P,B,P,-,B,P,B,P,B -> P,B,P,P,B,-,B,P,B -> P,B,P,P,B,P,B,-,B -> P,B,P,P,B,P,B,B,- -> P,B,P,P,B,P,-,B,B -> P,B,P,P,B,-,P,B,B -> P,B,P,P,B,B,P,-,B -> P,B,P,P,B,B,P,B,- -> P,B,P,P,B,B,-,B,P -> P,B,P,P,B,B,B,-,P -> P,B,P,P,B,B,B,P,- -> P,B,P,P,B,B,-,P,B -> P,B,P,P,-,B,B,P,B -> P,B,-,P,P,B,B,P,B -> -,B,P,P,P,B,B,P,B -> B,-,P,P,P,B,B,P,B -> B,P,P,-,P,B,B,P,B -> B,P,P,B,P,-,B,P,B -> B,P,P,B,P,P,B,-,B -> B,P,P,B,P,P,B,B,- -> B,P,P,B,P,P,-,B,B -> B,P,P,B,P,-,P,B,B -> B,P,P,B,P,B,P,-,B -> B,P,P,B,P,B,P,B,- -> B,P,P,B,P,B,-,B,P -> B,P,P,B,P,B,B,-,P -> B,P,P,B,P,B,B,P,- -> B,P,P,B,P,B,-,P,B -> B,P,P,B,-,B,P,P,B -> B,P,P,B,B,-,P,P,B -> B,P,P,B,B,P,P,-,B -> B,P,P,B,B,P,P,B,- -> B,P,P,B,B,P,-,B,P -> B,P,P,B,B,P,B,-,P -> B,P,P,B,B,P,B,P,- -> B,P,P,B,B,P,-,P,B -> B,P,P,B,-,P,B,P,B -> B,P,P,-,B,P,B,P,B -> B,P,P,P,B,-,B,P,B -> B,P,P,P,B,P,B,-,B -> B,P,P,P,B,P,B,B,- -> B,P,P,P,B,P,-,B,B -> B,P,P,P,B,-,P,B,B -> B,P,P,P,B,B,P,-,B -> B,P,P,P,B,B,P,B,- -> B,P,P,P,B,B,-,B,P -> B,P,P,P,B,B,B,-,P -> B,P,P,P,B,-,B,B,P -> B,P,P,P,-,B,B,B,P -> B,P,P,-,P,B,B,B,P -> B,P,P,B,P,-,B,B,P -> B,P,P,B,-,P,B,B,P -> B,P,P,-,B,P,B,B,P -> B,P,-,P,B,P,B,B,P -> B,P,B,P,-,P,B,B,P -> B,P,B,P,B,P,-,B,P -> B,P,B,P,B,P,P,B,- -> B,P,B,P,B,P,P,-,B -> B,P,B,P,B,P,-,P,B -> B,P,B,P,B,P,B,P,- -> B,P,B,P,B,P,B,-,P -> B,P,B,P,B,-,B,P,P -> B,P,B,P,B,B,-,P,P -> B,P,B,P,B,B,P,P,- -> B,P,B,P,B,B,P,-,P -> B,P,B,P,B,-,P,B,P -> B,P,B,P,-,B,P,B,P -> B,P,B,P,P,B,-,B,P -> B,P,B,P,P,B,P,B,- -> B,P,B,P,P,B,P,-,B -> B,P,B,P,P,B,-,P,B -> B,P,B,P,P,B,B,P,- -> B,P,B,P,P,B,B,-,P -> B,P,B,P,P,-,B,B,P -> B,P,B,-,P,P,B,B,P -> B,P,-,B,P,P,B,B,P -> B,-,P,B,P,P,B,B,P -> B,B,P,-,P,P,B,B,P -> B,B,P,P,P,-,B,B,P -> B,B,P,P,P,B,B,-,P -> B,B,P,P,P,B,B,P,- -> B,B,P,P,P,B,-,P,B -> B,B,P,P,P,B,P,-,B -> B,B,P,P,P,B,P,B,- -> B,B,P,P,P,B,-,B,P -> B,B,P,P,-,B,P,B,P -> B,B,P,P,B,-,P,B,P -> B,B,P,P,B,B,P,-,P -> B,B,P,P,B,B,P,P,- -> B,B,P,P,B,B,-,P,P -> B,B,P,P,B,-,B,P,P -> B,B,P,P,B,P,B,-,P -> B,B,P,P,B,P,B,P,- -> B,B,P,P,B,P,-,P,B -> B,B,P,P,B,P,P,-,B -> B,B,P,P,B,-,P,P,B -> B,B,P,P,-,B,P,P,B -> B,B,P,-,P,B,P,P,B -> B,B,P,B,P,-,P,P,B -> B,B,P,B,P,P,P,-,B -> B,B,P,B,P,P,P,B,- -> B,B,P,B,P,P,-,B,P -> B,B,P,B,P,P,B,-,P -> B,B,P,B,P,P,B,P,- -> B,B,P,B,P,P,-,P,B -> B,B,P,B,-,P,P,P,B -> B,B,P,-,B,P,P,P,B -> B,B,-,P,B,P,P,P,B -> B,B,B,P,-,P,P,P,B -> B,B,B,P,P,P,-,P,B -> B,B,B,P,P,P,B,P,- -> B,B,B,P,P,P,B,-,P -> B,B,B,P,P,P,-,B,P -> B,B,B,P,P,-,P,B,P -> B,B,B,P,P,B,P,-,P -> B,B,B,P,P,B,P,P,- -> B,B,B,P,P,B,-,P,P -> B,B,B,P,P,-,B,P,P -> B,B,B,P,-,P,B,P,P -> B,B,B,P,B,P,-,P,P -> B,B,B,P,B,P,P,P,- -> B,B,B,P,B,P,P,-,P -> B,B,B,P,B,-,P,P,P -> B,B,B,P,-,B,P,P,P -> B,B,B,-,P,B,P,P,P -> B,B,B,B,P,-,P,P,P -> B,B,B,B,P,P,P,-,P -> B,B,B,B,P,P,P,P,- -> B,B,B,B,P,P,-,P,P -> B,B,B,B,-,P,P,P,P
| Fator de ramificação: 3.33
| Tempo de execução: 0.004s

----------------Resultado do Busca ordenada-----------------
| Nós visitados: 626
| Nós expandidos: 625
| Custo da solução: 19
| Caminho da solução: P,-,B,P,P,B,B,P,B -> -,P,B,P,P,B,B,P,B -> B,P,-,P,P,B,B,P,B -> B,P,P,P,-,B,B,P,B -> B,P,P,P,B,-,B,P,B -> B,P,P,-,B,P,B,P,B -> B,P,-,P,B,P,B,P,B -> B,P,B,P,-,P,B,P,B -> B,P,B,P,B,P,-,P,B -> B,P,B,P,B,P,B,P,- -> B,P,B,P,B,P,B,-,P -> B,P,B,P,B,-,B,P,P -> B,P,B,-,B,P,B,P,P -> B,-,B,P,B,P,B,P,P -> B,B,-,P,B,P,B,P,P -> B,B,B,P,-,P,B,P,P -> B,B,B,P,B,P,-,P,P -> B,B,B,P,B,-,P,P,P -> B,B,B,-,B,P,P,P,P -> B,B,B,B,-,P,P,P,P
| Fator de ramificação: 3.34
| Tempo de execução: 0.018s

----------------Resultado do Busca Gulosa-----------------
| Nós visitados: 203
| Nós expandidos: 202
| Custo da solução: 30
| Caminho da solução: P,-,B,P,P,B,B,P,B -> P,P,B,-,P,B,B,P,B -> P,P,B,B,P,-,B,P,B -> P,P,B,B,-,P,B,P,B -> P,P,-,B,B,P,B,P,B -> P,-,P,B,B,P,B,P,B -> P,B,P,-,B,P,B,P,B -> P,B,P,B,-,P,B,P,B -> P,B,-,B,P,P,B,P,B -> P,B,B,-,P,P,B,P,B -> P,B,B,P,-,P,B,P,B -> P,B,B,P,B,P,-,P,B -> P,B,B,P,B,-,P,P,B -> P,B,B,-,B,P,P,P,B -> P,B,-,B,B,P,P,P,B -> -,B,P,B,B,P,P,P,B -> B,-,P,B,B,P,P,P,B -> B,B,P,-,B,P,P,P,B -> B,B,P,B,-,P,P,P,B -> B,B,P,B,P,P,-,P,B -> B,B,P,B,P,P,B,P,- -> B,B,P,B,P,P,B,-,P -> B,B,P,B,P,-,B,P,P -> B,B,P,B,-,P,B,P,P -> B,B,-,B,P,P,B,P,P -> B,B,B,-,P,P,B,P,P -> B,B,B,P,-,P,B,P,P -> B,B,B,P,B,P,-,P,P -> B,B,B,P,B,-,P,P,P -> B,B,B,-,B,P,P,P,P -> B,B,B,B,-,P,P,P,P
| Fator de ramificação: 3.38
| Tempo de execução: 0.003s

----------------Resultado do A* Search-----------------
| Nós visitados: 608
| Nós expandidos: 607
| Custo da solução: 19
| Caminho da solução: P,-,B,P,P,B,B,P,B -> -,P,B,P,P,B,B,P,B -> B,P,-,P,P,B,B,P,B -> B,P,P,P,-,B,B,P,B -> B,P,P,P,B,-,B,P,B -> B,P,P,-,B,P,B,P,B -> B,P,-,P,B,P,B,P,B -> B,P,B,P,-,P,B,P,B -> B,P,B,P,B,P,-,P,B -> B,P,B,P,B,P,B,P,- -> B,P,B,P,B,P,B,-,P -> B,P,B,P,B,-,B,P,P -> B,P,B,-,B,P,B,P,P -> B,-,B,P,B,P,B,P,P -> B,B,-,P,B,P,B,P,P -> B,B,B,P,-,P,B,P,P -> B,B,B,P,B,P,-,P,P -> B,B,B,P,B,-,P,P,P -> B,B,B,-,B,P,P,P,P -> B,B,B,B,-,P,P,P,P
| Fator de ramificação: 3.34
| Tempo de execução: 0.01s
```

## Nós visitados e expandidos

   A partir da relação entre nós visitados e expandidos, nota-se a menor eficiência no algoritmo **Backtracking**, com muitas visitas para relativamente poucas expansões. A **Busca em Largura** e a **Busca Ordenada** foram significativamente mais eficientes, visitando e expandindo um número similar de nós, e a **Busca em Profundidade**, embora tendo visitado 9 nós, resultou em uma solução de 8 movimentos. A **Busca Gulosa** teve a melhor eficiência, visitando apenas 5 nós, mas teve um fator de ramificação um pouco mais alto para chegar a tal. O **A\*** e o **IDA\*** expandiram poucos nós, 8 e 11, respectivamente, e também encontraram soluções ótimas, com o IDA* sendo ligeiramente menos eficiente em termos de expansão, o que demonstra que com o uso da heurística correta, pode-se atingir uma eficiência maior com os algoritmos que dependem desta.

## Custo da solução

   **Backtracking**, **Busca em Largura**, **Busca Ordenada**, **Busca Gulosa**, **A\*** e **IDA\*** encontraram a solução ótima com um custo de 4 movimentos. Por outro lado, a **Busca em Profundidade** encontrou uma solução com custo 8, demonstrando menor eficiência nesse quesito.

## Fator de ramificação

   Embora se mantivessem em níveis parecidos \(menos de 1.0 de diferença para todos\), houve diferenças para o fator de ramificação de cada algoritmo de busca. O **Backtracking** apresentou um fator de ramificação de 2.93, quase três novos nós para cada nó, uma taxa *relativamente* alta. A **Busca em Largura** e a **Busca Ordenada** pontuaram 2.82, sendo um pouco mais eficientes. A **Busca em Profundidade** teve um fator de 2.88, próximo ao da busca em largura, mas com uma solução de maior custo, como previamente apresentado. A **Busca Gulosa** já teve um fator de ramificação maior (3.00), indicando que, apesar de expandir menos nós, considerou mais opções para cada nível. O **A\*** pontuou 3.13, sugerindo que expandiu mais opções por nível, enquanto o **IDA\*** com 3.30 teve o fator mais alto, requerendo uma taxa maior para a obtenção da solução ótima.

## Tempo de Execução

   O **Backtracking** e a **Busca Gulosa** tiveram um tempo de execução de 0.001s, sendo ambos bastante rápidos, apesar de o backtracking visitar muitos nós. Já as buscas restantes foram ainda mais eficientes, com um tempo impresso em 0s, destacando-se pela rapidez até mesmo para a detecção do algoritmo.

## Conclusão

   Em termos de eficiência, na média, a busca que se saiu melhor foi a **Busca Gulosa**, por visitar e expandir menos nós e encontrar a solução ótima. Com exceção do **Backtracking** e da **Busca em Profundidade**, os algoritmos restantes foram também eficazes em encontrar a solução ótima. O pior desempenho foi do **Backtracking**, com muitos nós explorados e pouca eficiência, mesmo encontrando solução ótima. A **Busca em Profundidade** encontrou uma solução subótima, tornando a solução menos eficiente.

# Execução do projeto

Para que seja possível executar o projeto, será necessário cumprir alguns pré-requisitos.

## Pré-requisitos

Possuir o Node.js instalado em sua máquina, no link abaixo ensina como instalar em ambientes linux e windows.

- [Tutorial de instalação Node.JS](https://www.alura.com.br/artigos/como-instalar-node-js-windows-linux-macos?utm_term&utm_campaign=%5BSearch%5D+%5BPerformance%5D+-+Dynamic+Search+Ads+-+Artigos+e+Conte%C3%BAdos&utm_source=adwords&utm_medium=ppc&gad_source=1)

## Instalação das dependências

Após a instalação do Node.js, você terá disponível para utilização o NPM (Node Package Manager) que é o gerenciador de dependências nativo do node.

Para instalar as dependências do projeto, será necessário a utilização do comando

```bash
   npm install
```

Com as dependências instaladas, basta iniciar a execução do projeto com o comando

```bash
   npm run dev
```
