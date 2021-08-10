let boardArray = [];
const simbolJogador = { jogador1: "x", jogador2: "o" };

const creatBoardArray = (linhas, colunas) => {
  boardArray = [];
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
  boardArray[Number(linhaColuna[0])][Number(linhaColuna[1])] =
    simbolJogador[jogador];
};

const limiteLinnha = (numero) => {
  let boardArrayLinhas = boardArray.length - 1;
  if (numero < 0) {
    return 0;
  }
  if (numero > boardArrayLinhas) {
    return boardArrayLinhas;
  }
  return numero;
};

const limiteColuna = (numero) => {
  let boardArrayColunas = boardArray[0].length - 1;
  if (numero < 0) {
    return 0;
  }
  if (numero > boardArrayColunas) {
    return boardArrayColunas;
  }
  return numero;
};

const vitoriaHorizontal = (simbolo, posicao) => {
  let inicioLinha = limiteLinnha(posicao[0]);
  let inicioColuna = limiteColuna(posicao[1] - 3);
  let finalLinha = limiteLinnha(posicao[0]);
  let finalColuna = limiteColuna(posicao[1] + 3);
  let contador = 0;
  for (let coluna = inicioColuna; coluna <= finalColuna; coluna++) {
    if (boardArray[inicioLinha][coluna] === undefined) {
      continue;
    }
    if (boardArray[inicioLinha][coluna] === simbolo) {
      contador++;
    }
    if (boardArray[inicioLinha][coluna] === "v") {
      contador = 0;
    }
    if (contador === 4) {
      return true;
    }
  }
  return false;
};

const vitoriaVertical = (simbolo, posicao) => {
  let inicioLinha = limiteLinnha(posicao[0] - 3);
  let inicioColuna = limiteColuna(posicao[1]);
  let finalLinha = limiteLinnha(posicao[0] + 3);
  let finalColuna = limiteColuna(posicao[1]);
  let contador = 0;
  for (let linha = inicioLinha; linha <= finalLinha; linha++) {
    if (boardArray[linha][inicioColuna] === undefined) {
      continue;
    }
    if (boardArray[linha][inicioColuna] === simbolo) {
      contador++;
    }
    if (boardArray[linha][inicioColuna] === "v") {
      contador = 0;
    }
    if (contador === 4) {
      return true;
    }
  }
  return false;
};
const vitoriaDiagonal1 = (simbolo, posicao) => {
  let inicioLinha = limiteLinnha(posicao[0] - 3);
  let inicioColuna = limiteColuna(posicao[1] - 3);
  let finalLinha = limiteLinnha(posicao[0] + 3);
  let finalColuna = limiteColuna(posicao[1] + 3);
  let linha = inicioLinha;
  let contador = 0;
  for (let coluna = inicioColuna; coluna <= finalColuna; coluna++) {
    if (boardArray[linha][coluna] === undefined) {
      continue;
    }
    if (boardArray[linha][coluna] === simbolo) {
      contador++;
    }
    if (boardArray[linha][coluna] === "v") {
      contador = 0;
    }
    if (contador === 4) {
      return true;
    }
    linha++;
  }
  return false;
};
const vitoriaDiagonal2 = (simbolo, posicao) => {
  let inicioLinha = limiteLinnha(posicao[0] + 3);
  let inicioColuna = limiteColuna(posicao[1] - 3);
  let finalLinha = limiteLinnha(posicao[0] - 3);
  let finalColuna = limiteColuna(posicao[1] + 3);
  let linha = inicioLinha;
  let contador = 0;
  for (let coluna = inicioColuna; coluna <= finalColuna; coluna++) {
    if (boardArray[linha][coluna] === undefined) {
      continue;
    }
    if (boardArray[linha][coluna] === simbolo) {
      contador++;
    }
    if (boardArray[linha][coluna] === "v") {
      contador = 0;
    }
    if (contador === 4) {
      return true;
    }
    linha--;
  }
  return false;
};

const checarVitoria = (divMove, jogador) => {
  let simbolo = simbolJogador[jogador];
  let posicao = divMove.getAttribute("data-linhaColuna").split(",");
  posicao[0] = Number(posicao[0]);
  posicao[1] = Number(posicao[1]);
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
