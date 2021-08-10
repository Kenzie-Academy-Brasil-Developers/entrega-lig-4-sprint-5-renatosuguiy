
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

