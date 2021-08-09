let boardArray = [];
const simbolJogador = { jogador1: "x", jogador2: "o" };

const creatBoardArray = (linhas, colunas) => {
  for (let linha = 0; linha < linhas; linha++) {
    let linhaArray = [];
    for (let coluna = 0; coluna < colunas; coluna++) {
      linhaArray.push("v");
    }
    boardArray.push(linhaArray);
  }
};

const registroMovimento = (divMove, jogador) => {
  let linhaColuna = divMove.getAttribute("data-linhaColuna").split(",");
  boardArray[Number(linhaColuna[0])][Number(linhaColuna[1])] = simbolJogador[jogador];
};

const vitoriaHorizontal = (simbolo,posicao) => {
    let inicioLinha = posicao[0];
    let inicioColuna = posicao[1] - 3;
    let finalLinha = posicao[0];
    let finalColuna = posicao[1] + 3;
    let contador = 0;
    for(let coluna = inicioColuna; coluna <= finalColuna; coluna++){
        if(boardArray[inicioLinha][coluna] === undefined){
            continue;
        }
        if(boardArray[inicioLinha][coluna] === simbolo ){
            contador++;
        }
        if(contador === 4){
            return true;
        }
    }
    return false;
};
const vitoriaVertical = (simbolo,posicao) => {
    let inicioLinha = posicao[0] -3;
    let inicioColuna = posicao[1];
    let finalLinha = posicao[0] + 3;
    let finalColuna = posicao[1];
    let contador = 0;
    for(let linha = inicioLinha; linha <= finalLinha; linha++){
        if(boardArray[linha][inicioColuna] === undefined){
            continue;
        }
        if(boardArray[linha][inicioColuna] === simbolo ){
            contador++;
        }
        if(contador === 4){
            return true;
        }
    }
    return false;
};
const vitoriaDiagonal1 = (simbolo,posicao) => {
    let inicioLinha = posicao[0] - 3;
    let inicioColuna = posicao[1] - 3;
    let finalLinha = posicao[0] + 3;
    let finalColuna = posicao[1] + 3;
    let linha =  inicioLinha;
    let contador = 0;
    for(let coluna = inicioColuna; coluna <= finalColuna; coluna++){
        if(boardArray[linha][coluna] === undefined){
            continue;
        }
        if(boardArray[linha][coluna] === simbolo ){
            contador++;
        }
        if(contador === 4){
            return true;
        }
        linha++;
    }
    return false;
};
const vitoriaDiagonal2 = (simbolo,posicao) => {
    let inicioLinha = posicao[0] + 3;
    let inicioColuna = posicao[1] - 3;
    let finalLinha = posicao[0] - 3;
    let finalColuna = posicao[1] + 3;
    let linha =  inicioLinha;
    let contador = 0;
    for(let coluna = inicioColuna; coluna <= finalColuna; coluna++){
        if(boardArray[linha][coluna] === undefined){
            continue;
        }
        if(boardArray[linha][coluna] === simbolo ){
            contador++;
        }
        if(contador === 4){
            return true;
        }
        linha--;
    }
    return false;
};

const checarVitoria = (jogador, posicao) => {
  let simbolo = simbolJogador[jogador];
  if (
    victDiagonal1(simbolo, posicao) ||
    victDiagonal2(simbolo, posicao) ||
    victHorizontal(simbolo, posicao) ||
    victVertical(simbolo, posicao)
  ) {
    return true;
  }
  return false;
};
