<<<<<<< HEAD
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
=======

let boardArray = [];
let torrePreta = document.getElementById('torreCorPreta')
let torreVermelha = document.getElementById('torreCorVermelha')
let bolaPreta
let bolaVermelha
let tabela = document.getElementById('tabela')
let primeiroJogador = true;
let segundoJogador = false;

const creatBoardArray = (linhas, colunas) => {
    for(let linha = 0; linha < linhas; linha++){
        let linhaArray = [];
        for(let coluna = 0; coluna < colunas; coluna++){
            linhaArray.push('v');
        }
        boardArray.push(linhaArray);
    }
}; 

const registroMovimento = (divMove, jogador1, jogador2) => {
    let linhaColuna = divMove.getAttribute("dataaddress").split(",");
    if(jogador1){
        boardArray[linhaColuna[1]][linhaColuna[0]] = 'x';
    }
    if(jogador2){
        boardArray[linhaColuna[1]][linhaColuna[0]] = 'o';
    }
};


//Função de criação da tabela : 
function criarTabela(t,c){
    for(let i=0; i < t; i ++){
        let torre = document.createElement('div')
        torre.classList.add('torre')
        tabela.appendChild(torre)
        for(let n=0; n < c; n ++){
            let celula = document.createElement('div')
            celula.classList.add('celula')
            torre.appendChild(celula)
            celula.setAttribute('dataaddress',`${i},${n}`)
        }
    }
    creatBoardArray(c,t)
}

criarTabela(7,6)


for(let i=0;i<21;i++){
    bolaPreta = document.createElement('div')
    bolaPreta.classList.add('horizontal','black')
    torrePreta.appendChild(bolaPreta)
}

for(let i=0;i<21;i++){
    bolaVermelha = document.createElement('div')
    bolaVermelha.classList.add('horizontal','red')        
    torreVermelha.appendChild(bolaVermelha)
}

//Movimento:
tabela.addEventListener('click',function(e){
    
    let filhos = e.target.closest('.torre').children
    
    let vazio = Array.from(filhos).filter((e)=>e.innerHTML==="")
    
    if(vazio.length!=0){
        if(primeiroJogador===true) {
            
            let bolap = torrePreta.lastElementChild
            bolap.classList.remove('horizontal');
            bolap.classList.add('vertical');
            vazio[vazio.length-1].appendChild(bolap);
            
        }
        if(segundoJogador===true){
        
            let bolav = torreVermelha.lastElementChild
            bolav.classList.remove('horizontal');
            bolav.classList.add('vertical');
            vazio[vazio.length-1].appendChild(bolav);
            
        }
        registroMovimento(vazio[vazio.length-1],primeiroJogador,segundoJogador)
        if(primeiroJogador===true){

            primeiroJogador=false;
            segundoJogador=true;

        } else {

            primeiroJogador=true;
            segundoJogador=false;

        }
    }
})

>>>>>>> feature/moveRegister
