//variaveis globais:
let torrePreta = document.getElementById('torreCorPreta')
let torreVermelha = document.getElementById('torreCorVermelha')
let bolaPreta
let bolaVermelha
let primeiroJogador = true;
let segundoJogador = false;
let tabela = document.getElementById('tabela')

//Função de criação da tabela : 
function criarTabela(t,c){
    for(let i=0; i < t; i ++){
        let torre = document.createElement('div')
        torre.classList.add('torre')
        tabela.appendChild(torre)
        for(let n=0; n < c+1; n ++){
            let celula = document.createElement('div')
            if(n>0){
                celula.classList.add('celula')
                celula.setAttribute('dataaddress',`${i},${n}`)
            }
            torre.appendChild(celula)
        }
    }
    torres()
}

criarTabela(7,6)

//Função criar torres
function torres(){
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
}

//Movimento:
tabela.addEventListener('click',function(e){
    console.log(e)
    
    let filhos = e.target.closest('.torre').children
    
    let vazio = Array.from(filhos).filter((e)=>e.innerHTML==="")
    
    if(vazio.length!=1){
        
        if(primeiroJogador===true) {
            
            let bolap = torrePreta.firstElementChild
            bolap.classList.remove('horizontal');
            bolap.classList.add('vertical');
            vazio[vazio.length-1].appendChild(bolap)
                
        }
        if(segundoJogador===true){
        
            let bolav = torreVermelha.firstElementChild
            bolav.classList.remove('horizontal');
            bolav.classList.add('vertical');
            vazio[vazio.length-1].appendChild(bolav);
            
        }
        
        if(primeiroJogador===true){

            primeiroJogador=false;
            segundoJogador=true;

        } else {

            primeiroJogador=true;
            segundoJogador=false;

        }
    }
})



//Ideias para movimentação:
//1- Criar mais uma celula em cada coluna, mas deixa-la sem tamanho, cor ou borda.
//   Não lhe dar class, e mudar a validação do movimento na função movimento para
//   que as bolinhas não entrem nela. Com forEach fazer com que a bola passe por 
//   cada celula até chegar na correta, incluive das celulas invisiveis. Usar um 
//   setTime dentro da forEach para que as bolinhas passem devagar.

//2- Pegar a posição left do evento e usando position fazer a bola aparecer acima
//   da coluna escolida e ir descendo até a posição desejada. As altura teria de 
//   ser controlada.

//3- Estudar arrastar.