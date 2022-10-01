 const cellElements=document.querySelectorAll('[data-cell]');
 const x_class='x',o_class='o';
 let oTurn;
 const board=document.getElementById('board');
 const winmessagelement=document.getElementById('winning-message');
 const winning_combination=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];
 const restart=document.getElementById('restart');
 const winMessage=document.querySelector("[data-winning-message-text]");
 start();
 restart.addEventListener('click',start);
 function start(){
    oTurn=false;
    cellElements.forEach(cell=>{
        cell.classList.remove(x_class);
        cell.classList.remove(o_class);
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick,{once:true})
     });
     setBoard();
     winmessagelement.classList.remove('show');

 }
 function handleClick(e){
    const cell=e.target;
    const currClass= oTurn ? o_class : x_class;
    //placeMark
    placeMark(cell,currClass);
    //checkwin
    if(checkwin(currClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true)
    }
    else{

    }
    //checkdraw
    //switchturn
    swap();
    setBoard();
 } 
 function placeMark(cell,currClass){
    cell.classList.add(currClass);
 }
 function swap(){
    oTurn=!oTurn;
 }
 function setBoard(){
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    if(oTurn){
        board.classList.add(o_class);
    }
    else{
        board.classList.add(x_class);
    }
 }
 function checkwin(currClass){
    return winning_combination.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currClass);
        })
    })
 };

 function endGame(draw){
    if(draw){
        winMessage.innerText="Draw Game";
    }
    else{
        winMessage.innerText=`${oTurn ? "O wins ":"X wins"}`;
        
    }
    winmessagelement.classList.add('show');  
 }
 function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(x_class) || cell.classList.contains(o_class);
    })
  }