let boardArray = [];

const creatBoardArray = (linhas, colunas) => {
    for(let linha = 0; linha < linhas; linha++){
        let linhaArray = [];
        for(let coluna = 0; coluna < colunas; coluna++){
            linhaArray.push('v');
        }
        boardArray.push(linhaArray);
    }
}; 

const registroMovimento = (divMove, jogador) => {
    let linhaColuna = divMove.getAttribute("data-linhaColuna").split(",");
    if(jogador === 'jogador1'){
        boardArray[linhaColuna[0]][linhaColuna[1]] = 'x';
    }
    if(jogador === 'jogador2'){
        boardArray[linhaColuna[0]][linhaColuna[1]] = 'o';
    }
};

const victHorizontal = () => {

}
const victHorizontal = () => {
    
}
const victHorizontal = () => {
    
}
const victHorizontal = () => {
    
}