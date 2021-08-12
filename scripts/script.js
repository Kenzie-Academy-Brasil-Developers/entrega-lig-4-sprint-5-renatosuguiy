let boardArray = [];
let torrePreta = document.getElementById('torreCorPreta')
let torreVermelha = document.getElementById('torreCorVermelha')
let bolaPreta
let bolaVermelha
let tabela = document.getElementById('tabela')
let primeiroJogador = true;
let segundoJogador = false;
const volumeSliderFundo = document.getElementById('volume-musica-fundo');
const volumeBtnFundo = document.getElementById('play-btn-musica-fundo');
const audioFundo = document.getElementById('audio-fundo');
audioFundo.volume = 0.2;
let statusVolumeFundo = true;
const volumeSliderGeral = document.getElementById('volume-musica-geral');
const audiosGeral = document.querySelectorAll('.audio-geral');
const audioVitoria = document.getElementById('audio-vitoria');
const audioEmpate = document.getElementById('audio-empate');
const audioPeca = document.getElementById('audio-peca');
let tabelaEventListener = false;
let terminarJogo = false;
const addAnimacaoVitoriaPeca = (orientacaoVitoria, posicaoUltimaPeca) => {
  if(orientacaoVitoria === 'horizontal'){
    for(let index = 0; index < 4; index++){
      let posicaoPeca = posicaoUltimaPeca[1] - index;
      let selector = `[dataaddress="${posicaoPeca},${posicaoUltimaPeca[0]}"]`;
      document.querySelector(selector).lastElementChild.classList.remove("animacao");
      document.querySelector(selector).lastElementChild.style.animationName=""
      document.querySelector(selector).lastElementChild.style.animationDuration=""
      document.querySelector(selector).lastElementChild.classList.add("animacaoVitoriaPeca");
    }
  }
  if(orientacaoVitoria === 'vertical'){
    for(let index = 0; index < 4; index++){
      let posicaoPeca = posicaoUltimaPeca[0] - index;
      let selector = `[dataaddress="${posicaoUltimaPeca[1]},${posicaoPeca}"]`;
      document.querySelector(selector).lastElementChild.classList.remove("animacao");
      document.querySelector(selector).lastElementChild.style.animationName=""
      document.querySelector(selector).lastElementChild.style.animationDuration=""
      document.querySelector(selector).lastElementChild.classList.add("animacaoVitoriaPeca");
    }
  }
  if(orientacaoVitoria === 'diagonal1'){
    for(let index = 0; index < 4; index++){
      let posicaoPecaColuna = posicaoUltimaPeca[1] - index;
      let posicaoPecaLinha = posicaoUltimaPeca[0] - index;
      let selector = `[dataaddress="${posicaoPecaColuna},${posicaoPecaLinha}"]`;
      document.querySelector(selector).lastElementChild.classList.remove("animacao");
      document.querySelector(selector).lastElementChild.style.animationName=""
      document.querySelector(selector).lastElementChild.style.animationDuration=""
      document.querySelector(selector).lastElementChild.classList.add("animacaoVitoriaPeca");
    }
  }
  if(orientacaoVitoria === 'diagonal2'){
    for(let index = 0; index < 4; index++){
      let posicaoPecaColuna = posicaoUltimaPeca[1] - index;
      let posicaoPecaLinha = posicaoUltimaPeca[0] + index;
      let selector = `[dataaddress="${posicaoPecaColuna},${posicaoPecaLinha}"]`;
      document.querySelector(selector).lastElementChild.classList.remove("animacao");
      document.querySelector(selector).lastElementChild.style.animationName=""
      document.querySelector(selector).lastElementChild.style.animationDuration=""
      document.querySelector(selector).lastElementChild.classList.add("animacaoVitoriaPeca");
    }
  }
}

const verificaEmpate = () => {
  let flatBoardArray = [].concat(...boardArray);
  
  let counter = flatBoardArray.reduce((acc, item) => {
      if(item === 'v'){
        return  acc +1;
      }
      return acc;
  }, 0);
  if(counter === 0){
      return true;
  }
  return false;
};

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
  let inicioLinha = limiteLinnha(posicao[1]);
  let inicioColuna = limiteColuna(posicao[0] - 3);
  let finalLinha = limiteLinnha(posicao[1]);
  let finalColuna = limiteColuna(posicao[0] + 3);
  let contador = 0;
  for (let coluna = inicioColuna; coluna <= finalColuna; coluna++) {
    if (boardArray[inicioLinha][coluna] === undefined) {
      continue;
    }
    if (boardArray[inicioLinha][coluna] === simbolo) {
      contador++;
    }
    if (boardArray[inicioLinha][coluna] !== simbolo) {
      contador = 0;
    }
    if (contador === 4) {
      if(!terminarJogo){
        addAnimacaoVitoriaPeca('horizontal',[inicioLinha,coluna])
      }
      
      return true;
    }
  }
  return false;
};

const vitoriaVertical = (simbolo, posicao) => {
  let inicioLinha = limiteLinnha(posicao[1] - 3);
  let inicioColuna = limiteColuna(posicao[0]);
  let finalLinha = limiteLinnha(posicao[1] + 3);
  let finalColuna = limiteColuna(posicao[0]);
  let contador = 0;
  for (let linha = inicioLinha; linha <= finalLinha; linha++) {
    if (boardArray[linha][inicioColuna] === undefined) {
      continue;
    }
    if (boardArray[linha][inicioColuna] === simbolo) {
      contador++;
    }
    if (boardArray[linha][inicioColuna] !== simbolo) {
      contador = 0;
    }
    if (contador === 4) {
      if(!terminarJogo){
        addAnimacaoVitoriaPeca('vertical',[linha,inicioColuna])
      }
      
      return true;
    }
  }
  return false;
};
const vitoriaDiagonal1 = (simbolo, posicao) => {
  let inicioLinha = limiteLinnha(posicao[1] - 3);
  let inicioColuna = limiteColuna(posicao[0] - 3);
  let finalLinha = limiteLinnha(posicao[1] + 3);
  let finalColuna = limiteColuna(posicao[0] + 3);
  let linha = inicioLinha;
  let contador = 0;
  for (let coluna = inicioColuna; coluna <= finalColuna; coluna++) {
    if(linha < 0 || coluna < 0){
      linha++
      continue;
    }
    if(linha > boardArray.length - 1 || coluna > boardArray[0].length - 1){
      linha++
      continue;
    }
    if (boardArray[linha][coluna] === undefined) {
      linha++
      continue;
    }
    if (boardArray[linha][coluna] === simbolo) {
      contador++;
    }
    if (boardArray[linha][coluna] !== simbolo) {
      contador = 0;
    }
    if (contador === 4) {
      if(!terminarJogo){
        addAnimacaoVitoriaPeca('diagonal1',[linha,coluna])
      }
      
      return true;
    }
    linha++;
    if(linha > finalLinha){
      break;
    }
  }
  return false;
};
const vitoriaDiagonal2 = (simbolo, posicao) => {
  let inicioLinha = posicao[1] + 3; 
  let inicioColuna = posicao[0] - 3;
  let finalLinha = posicao[1] - 3;
  let finalColuna = posicao[0] + 3;
  let linha = inicioLinha;
  let contador = 0;
  for (let coluna = inicioColuna; coluna <= finalColuna; coluna++) {
    if(linha < 0 || coluna < 0){
      linha--
      continue;
    }
    if(linha > boardArray.length - 1 || coluna > boardArray[0].length - 1){
      linha--
      continue;
    }
    if (boardArray[linha][coluna] === undefined) {
      linha--
      continue;
    }
    if (boardArray[linha][coluna] === simbolo) {
      contador++;
    }
    if (boardArray[linha][coluna] !== simbolo) {
      contador = 0;
    }
    if (contador === 4) {
      if(!terminarJogo){
        addAnimacaoVitoriaPeca('diagonal2',[linha,coluna]);
      }
      
      return true;
    }
    linha--
    if(linha < 0){
      break;
    }
  }
  return false;
};

const checarVitoria = (divMove, jogador1, jogador2) => {
  let simbolo = '';
  let posicao = divMove.getAttribute("dataaddress").split(",");
  if(jogador1){
    simbolo = 'x';
  }
  if(jogador2){
    simbolo = 'o';
  }
  posicao[0] = Number(posicao[0]);
  posicao[1] = Number(posicao[1]);
  if (
    vitoriaDiagonal1(simbolo, posicao) ||
    vitoriaDiagonal2(simbolo, posicao) ||
    vitoriaHorizontal(simbolo, posicao) ||
    vitoriaVertical(simbolo, posicao)
  ) {
    return true;
  }
  return false;
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
    creatBoardArray(c,t);
    audioFundo.play();
}

function startGame() {
  tabela.innerHTML = ""; 
  criarTabela(7,6);

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

  function movimento(e){
      let filhos = e.target.closest('.torre').children
      let vazio = Array.from(filhos).filter((e)=>e.innerHTML==="")
      if(vazio.length!=0){
          if(primeiroJogador===true) {
              let bolap = torrePreta.lastElementChild
              bolap.classList.remove('horizontal');
              bolap.classList.add('vertical','animacao');
              bolap.style.animationName=`descer${vazio.length}`
              bolap.style.animationDuration=`${vazio.length/10+0.5}s`
              if(terminarJogo){
                bolap.classList.add('hidden');
              }
              vazio[vazio.length-1].appendChild(bolap);
          }
          if(segundoJogador===true){
              let bolav = torreVermelha.lastElementChild
              bolav.classList.remove('horizontal');
              bolav.classList.add('vertical','animacao');
              bolav.style.animationName=`descer${vazio.length}`
              bolav.style.animationDuration=`${vazio.length/10+0.5}s`
              if(terminarJogo){
                bolav.classList.add('hidden');
              }
              vazio[vazio.length-1].appendChild(bolav);   
          }
          console.log(vazio)
          registroMovimento(vazio[vazio.length-1],primeiroJogador,segundoJogador)
          if(!terminarJogo){
            audioPeca.play();
          }
          
          if(checarVitoria(vazio[vazio.length-1],primeiroJogador,segundoJogador)){
            if(primeiroJogador){
              audioVitoria.play();
              if(!terminarJogo){
                terminarJogo = true;
                setTimeout(function(){
                  mostraGanhador( "Victory" , "Player 1")
                },3000);
              }              
            }
            if(segundoJogador){
              audioVitoria.play();
              if(!terminarJogo){
                terminarJogo = true;
                setTimeout(function(){
                  mostraGanhador( "Victory" , "Player 2")
                },3000);
              }   

            }
          }
          if(verificaEmpate()){
            audioEmpate.play();
            if(!terminarJogo){
              terminarJogo = true;
              setTimeout(function(){
                mostraGanhador( "Draw" , " ")
              },3000);
            }  
          }

          if(primeiroJogador===true){
              primeiroJogador=false;
              segundoJogador=true;
          } else {
              primeiroJogador=true;
              segundoJogador=false;
          }
          if(!terminarJogo){
            showPlayer()
          }
          
      }
  
  }
  //Movimento:
  if(!tabelaEventListener){
  tabela.addEventListener('click',movimento);
  tabelaEventListener = true;
  }
  /*Lógica dos Botões*/
  let btnMenu = document.createElement("button")
  btnMenu.classList.add("btnMenu")
  let mainJogo = document.getElementById("jogo")
  mainJogo.appendChild(btnMenu)
  
  btnMenu.addEventListener('click',function() {
    setTimeout(function() {
    telaInicial.classList.remove('hidden')
    telaCreditos.classList.add('hidden')
    telaJogo.classList.add('hidden')}, 1500);
  });

  let display = document.createElement('div')
  display.classList.add("display")
  let texto = document.createElement('h3')
  display.classList.add('p1')
  texto.classList.add('texto')
  texto.innerText = "Turn"
  display.appendChild(texto)
  mainJogo.appendChild(display)

let player1 = document.createElement('div')
player1.classList.add("player1")
let textoP1 = document.createElement('p')
textoP1.classList.add("textoP1")
textoP1.innerText = "P1"
player1.appendChild(textoP1)

let player2 = document.createElement('div')
player2.classList.add("player2")
let textoP2 = document.createElement('p')
textoP2.classList.add("textoP2")
textoP2.innerText = "P2"
player2.appendChild(textoP2)

let painelJogadores = document.createElement('div')
painelJogadores.classList.add("painel")
mainJogo.appendChild(painelJogadores)

let placarJogador1 = document.createElement('div')
let textoPlacarJogador1 = document.createElement('p')
textoPlacarJogador1.classList.add("textoPlacarJogador1")
textoPlacarJogador1.innerText = "P1"
placarJogador1.classList.add("placarJogador1")
placarJogador1.appendChild(textoPlacarJogador1)
painelJogadores.appendChild(placarJogador1)


let placarJogador2 = document.createElement('div')
let textoPlacarJogador2 = document.createElement('p')
textoPlacarJogador2.classList.add("textoPlacarJogador2")
textoPlacarJogador2.innerText = "P2"
placarJogador2.classList.add("placarJogador2")
placarJogador2.appendChild(textoPlacarJogador2)
painelJogadores.appendChild(placarJogador2)


  mainJogo.appendChild(player1)
  mainJogo.appendChild(player2)

//função de mostrar de quem é a vez 

function showPlayer(){
  
  if(primeiroJogador === false){
    display.classList.remove('p1')
    display.classList.add('p2')
    }
   if(primeiroJogador === true){
      display.classList.remove('p2')
      display.classList.add('p1')
    }
  }

  if(audioFundo.paused === true){
    statusVolumeFundo = false;
    volumeBtnFundo.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    statusVolumeFundo = true;
    volumeBtnFundo.innerHTML = '<i class="fas fa-pause"></i>';
  }
}

//Efeitos sonoros
volumeSliderFundo.addEventListener('input', (event) => {
  const value = event.target.value;
  audioFundo.volume = value / 100;
});

if(audioFundo.paused === true){
  statusVolumeFundo = false;
  volumeBtnFundo.innerHTML = '<i class="fas fa-play"></i>';
} else {
  statusVolumeFundo = true;
  volumeBtnFundo.innerHTML = '<i class="fas fa-pause"></i>';
}

volumeBtnFundo.addEventListener('click', (event)=>{
  if(statusVolumeFundo === false) {
    statusVolumeFundo = true;
    audioFundo.play();
    volumeBtnFundo.innerHTML = '<i class="fas fa-pause"></i>';
} else {
    statusVolumeFundo = false;
    audioFundo.pause()
    volumeBtnFundo.innerHTML = '<i class="fas fa-play"></i>';
}
});

volumeSliderGeral.addEventListener('input', (event) => {
  const value = event.target.value;
  let audiosArray = [...audiosGeral];
  for(let index = 0; index < audiosArray.length; index++){
    audiosArray[index].volume = value / 100;
  }
  
});
//fim dos efeitos sonoros

 /* Tela de Jogo */
let telaJogo = document.getElementById("telaJogo")

/*Lógica dos Botões*/

let btnMenu = document.createElement("button")
btnMenu.classList.add("btnMenu")
let mainJogo = document.getElementById("jogo")
mainJogo.appendChild(btnMenu)

btnMenu.addEventListener('click',function() {
  telaJogo.classList.add('hidden')
  telaInicial.classList.remove('hidden')
});

/*Placar*/

let placar = document.createElement("div")
placar.classList.add("placar")
let score = document.createElement("h3")
score.innerText = "Score"
score.classList.add("score")
let player1 = document.createElement("p")
player1.innerText = "Player 1: "
let player2 = document.createElement("p")
player2.innerText = "Player 2: "

placar.appendChild(score)
placar.appendChild(player1)
placar.appendChild(player2)
mainJogo.appendChild(placar)


/* Tela inicial */

/* Elementos */
let telaInicial = document.getElementById('telaInicial')
telaInicial.classList.add("starter")
let starterMain = document.createElement("main")
starterMain.classList.add('starterMain')
let titleMain = document.createElement("h1")
titleMain.innerText="TOQUE DE CLASSE"
let subTitleMain = document.createElement("h2")
subTitleMain.innerText="Lig-4"
let starterBtns = document.createElement("div")
starterBtns.classList.add('btnContainer')
let btnPlay = document.createElement('button')
btnPlay.classList.add("btnPlay", "btnStarter")
let btnCredits = document.createElement('button')
btnCredits.classList.add('btnCredits', "btnStarter")
let btnMenuS = document.createElement('button')
btnMenuS.classList.add('btnMenuS', "btnStarter")

starterBtns.appendChild(btnPlay);
starterBtns.appendChild(btnMenuS)
starterBtns.appendChild(btnCredits)

starterMain.appendChild(titleMain)
starterMain.appendChild(subTitleMain)
starterMain.appendChild(starterBtns)

telaInicial.appendChild(starterMain)

// Funcionalidade botoes (BtnMenuS movido para secao modal)

btnPlay.addEventListener('click',function() {

  setTimeout(function() {startGame();

  telaJogo.classList.remove('hidden')
  telaInicial.classList.add('hidden')
  telaCreditos.classList.add('hidden')}, 1500);
});

btnCredits.addEventListener('click',function() {
  setTimeout(function() {
  telaJogo.classList.add('hidden')
  telaInicial.classList.add('hidden')
  telaCreditos.classList.remove("hidden")}, 1500);
  
});


/* Fim Tela Inicial*/

/* Creditos */

// Criar Html
audioFundo.play();
const membros = [
  {
    nome: 'Rafael G. de Sousa',
    LinkedIn: 'linkedin.com/in/rafael-sousa-61b654112',
    Github: 'https://github.com/rafaelgsousa',
    Email: 'elderrafaelgomes@gmail.com',
  },
  {
    nome: 'Thiago Trad',
    LinkedIn: 'https://www.linkedin.com/in/thiagotrad',
    Github: "https://github.com/TvsTrad",
    Email: "thiago_trad@Hotmail.com",
  },
  {
    nome: 'Renato T. Suguiy',
    LinkedIn: 'https://www.linkedin.com/in/renatosuguiy/',
    Github: 'https://github.com/renatosuguiy',
    Email: 'renatosuguiy@gmail.com',

  },
  {
    nome: 'Maria Eduarda B. Rubini',
    LinkedIn: 'https://www.linkedin.com/in/madurubini/',
    Github: 'https://github.com/madurubini',
    Email: 'mariaed.rubini@gmail.com',
  }
];
let telaCreditos = document.getElementById('telaCreditos')
let creditos = document.getElementById('creditos')

const gerarLista = () => {
  for (i = 0; i < membros.length ; i++){
    let nome = document.createElement('div');
    nome.classList.add('nome')
    nome.innerText = `${membros[i].nome}`;
    let socialsContainer = document.createElement('div')
    socialsContainer.classList.add('socials')
    let LinkedIn = document.createElement('span')
    LinkedIn.classList.add('socials')
    LinkedIn.innerHTML = `<a href='${membros[i].LinkedIn}'><img src='/assets/logos/linkedin.png'></a>`
    let Github = document.createElement('span')
    Github.classList.add('socials')
    Github.innerHTML = `<a href='${membros[i].Github}'><img src='/assets/logos/github.png'></a>`
    let Email = document.createElement('span')
    Email.classList.add('socials')
    Email.innerHTML = `<a href='${membros[i].Email}'><img src='/assets/logos/email.png'></a>`

    socialsContainer.append(LinkedIn, Github, Email);
    nome.appendChild(socialsContainer)
    creditos.append(nome);
  }
};

let btnBack = document.createElement('button')
btnBack.classList.add('btnBack', "btnStarter");
telaCreditos.appendChild(btnBack);
gerarLista();

btnBack.addEventListener('click',function() {
  setTimeout(function() {
  telaInicial.classList.remove('hidden')
  telaCreditos.classList.add('hidden')
  telaJogo.classList.add('hidden')}, 1500 );
});

/* Fim Creditos */

//função de mensagem vitoria 
function mostraGanhador(){
  let telaGanhador = document.createElement('div')
  telaGanhador.classList.add("telaGanhador")
  telaGanhador.innerText("oi")
  mainJogo.appendChild(telaGanhador)
}


/* Modal menu */
let modal = document.getElementById("modalMenuS")
let btnClose = [...document.getElementsByClassName("close")];
btnMenuS.addEventListener('click',function() {
  setTimeout(function() {
  modal.classList.remove('hidden');}, 1000);
});
console.log(btnClose)
btnClose[0].addEventListener('click',function() {
  modal.classList.add('hidden');
  console.dir(btnClose)
});


function mostraGanhador(status, ganhador ){
  let telaFinal = document.getElementById("telaVitoria")
  setTimeout(telaJogo.classList.add('hidden'),3000)
  telaFinal.classList.remove('hidden')
  let texto = document.createElement('h3')
  texto.classList.add('textoGanhador')
  texto.innerText =  ganhador + ' ' + status
  telaFinal.appendChild(texto)
  let btnVoltar = document.createElement('button') 
  btnVoltar.classList.add('btnVoltar')
  btnVoltar.innerText = "PRESS HERE to Return menu"
  telaFinal.appendChild(btnVoltar) 
  btnVoltar.addEventListener('click', function(){
    location.reload()
    
  }) 
  
}
