const verificaEmpate = () => {
    let flatBoardArray = [].concat(...boardArray);
    let counter = flatBoardArray.reduce((acc, item) => {
        if(item === 'v'){
            acc++;
        }
    }, 0);
    if(counter !== 0){
        return true;
    }
    return false;
};