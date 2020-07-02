const Player = (name, symbol, turn, score) => {
    return { name, symbol, turn, score }
}

const gameBoard = (() => {

  const player1 = Player("Player1", "X", 0, 0);
  const player2 = Player("Player2", "O", 0, 0);
  let botMove = [];
  let origBoard = ["0","1","2","3","4","5","6","7","8"];
  const switchScreen = () => {
    //check Loading Screen or Ingame Screen is loaded
    let loadingScreen = document.getElementsByClassName("loadingScreen")[0];
    let inGameScreen = document.getElementsByClassName("inGameScreen")[0];
    if (loadingScreen.classList.contains("hideDisplay")) {
      loadingScreen.classList.remove("hideDisplay");
      inGameScreen.classList.add("hideDisplay");
      addEventLoadingScreen();
    }
    else{
      loadingScreen.classList.add("hideDisplay");
      inGameScreen.classList.remove("hideDisplay");
      addEventGamingScreen();
    }
  }

  const chooseDifficulty = (e => {
    if (e.target.classList.contains("human")) {
      switchScreen();
    }
    else if(e.target.classList.contains("normal")){
      switchScreen();
      player2.name = "NormalBot";
    }
    else if(e.target.classList.contains("extreme")){
      switchScreen()
      player2.name = "ExtremeBot";
    }
  })

  const addEventLoadingScreen = (() => {
    let click = document.getElementsByClassName("click");

    for (let i in click){
      document.addEventListener("click", chooseDifficulty);
    }
  })

  const resetPlayer = (() => {
    player1.turn = 0;
    player1.score = 0;
    player2.turn = 0;
    player2.score = 0;
    botMove = [];
    origBoard = ["0","1","2","3","4","5","6","7","8"];
    let result = document.getElementsByClassName('result')[0];
    let gameContainer = document.getElementsByClassName('gameContainer')[0];
    let player1Score = document.getElementsByClassName('pScore')[0];
    let player2Score = document.getElementsByClassName('cScore')[0];

    player1Score.innerHTML = "0";
    player2Score.innerHTML = "0";
    result.classList.add('hideDisplay');
    gameContainer.classList.remove('blur');
  })

  const resetMatch = (() => {
    player1.turn = 0;
    player2.turn = 0;
    botMove = [];
    origBoard = ["0","1","2","3","4","5","6","7","8"];
    let result = document.getElementsByClassName('result')[0];
    let gameContainer = document.getElementsByClassName('gameContainer')[0];
    result.classList.add('hideDisplay');
    gameContainer.classList.remove('blur');
  })

  const checkTurn = (() => {
    if (player1.turn == player2.turn){
      player1.turn++;
      return player1.symbol;
    }
    else if (player1.turn > player2.turn){
      player2.turn++;
      return player2.symbol;
    }
  })

  const winnerScreen = ((finalResult = "notTie") => {
    let result = document.getElementsByClassName('result')[0];
    let gameContainer = document.getElementsByClassName('gameContainer')[0];
    let resultText = document.getElementsByClassName('resultText')[0];
    if(finalResult == "notTie" && player1.turn > player2.turn){
      resultText.innerHTML = `${player1.name} WIN!.`;
    }
    else if (finalResult == "notTie" && player1.turn == player2.turn){

      resultText.innerHTML = `${player2.name} WIN!.`;
    }
    else if (finalResult == "Tie"){
      resultText.innerHTML = "IT'S A TIE!";
    }
    result.classList.remove('hideDisplay');
    gameContainer.classList.add('blur');
  })

  const updateScore = (() => {
    let player1Score = document.getElementsByClassName('pScore')[0];
    let player2Score = document.getElementsByClassName('cScore')[0];

    if (player1.turn > player2.turn){
      player1.score += 1;
      player1Score.innerHTML = player1.score.toString();
    }
    else{
      player2.score += 1;
      player2Score.innerHTML = player2.score.toString();
    }

  })

  const onWin = (() => {
    let tile1 = document.getElementsByClassName("0")[0].innerText;
    let tile2 = document.getElementsByClassName("1")[0].innerText;
    let tile3 = document.getElementsByClassName("2")[0].innerText;
    let tile4 = document.getElementsByClassName("3")[0].innerText;
    let tile5 = document.getElementsByClassName("4")[0].innerText;
    let tile6 = document.getElementsByClassName("5")[0].innerText;
    let tile7 = document.getElementsByClassName("6")[0].innerText;
    let tile8 = document.getElementsByClassName("7")[0].innerText;
    let tile9 = document.getElementsByClassName("8")[0].innerText;

    if (tile1 == tile2 && tile2 == tile3 && tile1 !=""){
      winnerScreen("notTie");
      updateScore();
      return true;
    }
    else if(tile1 == tile4 && tile4 == tile7 && tile1 !=""){
      winnerScreen("notTie");
      updateScore();
      return true;
    }
    else if(tile1 == tile5 && tile5 == tile9 && tile1 !=""){
      winnerScreen("notTie");
      updateScore();
      return true;
    }
    else if(tile2 == tile5 && tile5 == tile8 && tile2 !=""){
      winnerScreen("notTie");
      updateScore();
      return true;
    }
    else if(tile3 == tile5 && tile5 == tile7 && tile3 !=""){
      winnerScreen("notTie");
      updateScore();
      return true;
    }
    else if(tile3 == tile6 && tile6 == tile9 && tile3 !=""){
      winnerScreen("notTie");
      updateScore();
      return true;
    }
    else if(tile4 == tile5 && tile5 == tile6 && tile4 !=""){
      winnerScreen("notTie");
      updateScore();
      return true;
    }
    else if(tile7 == tile8 && tile8 == tile9 && tile7 !=""){
      winnerScreen("notTie");
      updateScore();
      return true;
    }
    else if (tile1 != "" && tile2 != "" && tile3 != "" && tile4 != "" && tile5 != "" && tile6 != "" && tile7 != "" && tile8 != "" && tile9 != ""){
      winnerScreen("Tie");
      return true;
    }
    return false;
  })

  const checkTiles = ((e) => {
    if (e.target.innerText == ""){
      return true;
    }
    return false;
  })

  const gamePlay = ((e)=>{

    if (checkTiles(e)){
      if(player1.turn == player2.turn){
        botMove.push(e.target.classList[2]);
      }

      e.target.innerHTML = checkTurn();
      origBoard.splice(origBoard.indexOf(e.target.classList[2]), 1,e.target.innerHTML);
      if(!onWin()){
        normalBot();
        extremeBot();
      }

    }

  })


  const addGameTiles = (e => {

    if (e.target.classList.contains('home')){
      let allTiles = document.getElementsByClassName("gameSquare");
      for (let i in allTiles){
        allTiles[i].innerHTML = "";
      }
      home();
      switchScreen();
      resetPlayer();
    }
    else if (e.target.classList.contains('restart')){
      let allTiles = document.getElementsByClassName("gameSquare");
      for (let i in allTiles){
        allTiles[i].innerHTML = "";
      }

      resetMatch();
    }
    else if (e.target.classList.contains('gameSquare')){
      gamePlay(e);
    }
  })


  const normalBot = (() => {
    if (player2.name == "NormalBot" && player1.turn > player2.turn){
      let randomMove = Math.floor(Math.random() * (9 - 1)) + 1;
      while(botMove.includes(randomMove.toString())){
        randomMove = Math.floor(Math.random() * (9 - 1)) + 1;
      }
      botMove.push(randomMove.toString());
      let nextMove = document.getElementsByClassName(randomMove.toString())[0];
      nextMove.click();
    }
  })

  const extremeBot = (() => {
    if (player2.name == "ExtremeBot" && player1.turn > player2.turn){


      // human
      var huPlayer = "X";
      // ai
      var aiPlayer = "O";

      let oriBoard = origBoard.map(element => {
        if (element != "X" && element != "O"){
          return parseInt(element);
        }
        else{
          return element;
        }
      });

      console.log(oriBoard);
      // keep track of function calls
      var fc = 0;

      // finding the ultimate play on the game that favors the computer
      var bestSpot = minimax(oriBoard, aiPlayer);
      console.log(bestSpot);
      let nextMove = document.getElementsByClassName(bestSpot.index.toString())[0];
      console.log(nextMove);
      nextMove.click();
      //loging the results
      console.log("index: " + bestSpot.index);
      console.log("function calls: " + fc);

      // the main minimax function
      function minimax(newBoard, player){

        //keep track of function calls;
        fc++;

        //available spots
        var availSpots = emptyIndexies(newBoard);

        // checks for the terminal states such as win, lose, and tie and returning a value accordingly
        if (winning(newBoard, huPlayer)){
           return {score:-10};
        }
      	else if (winning(newBoard, aiPlayer)){
          return {score:10};
      	}
        else if (availSpots.length === 0){
        	return {score:0};
        }

      // an array to collect all the objects
        var moves = [];

        // loop through available spots
        for (var i = 0; i < availSpots.length; i++){
          //create an object for each and store the index of that spot that was stored as a number in the object's index key
          var move = {};
        	move.index = newBoard[availSpots[i]];

          // set the empty spot to the current player
          newBoard[availSpots[i]] = player;

          //if collect the score resulted from calling minimax on the opponent of the current player
          if (player == aiPlayer){
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
          }
          else{
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
          }

          //reset the spot to empty
          newBoard[availSpots[i]] = move.index;

          // push the object to the array
          moves.push(move);
        }

      // if it is the computer's turn loop over the moves and choose the move with the highest score
        var bestMove;
        if(player === aiPlayer){
          var bestScore = -10000;
          for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        }else{

      // else loop over the moves and choose the move with the lowest score
          var bestScore = 10000;
          for(var i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        }

      // return the chosen move (object) from the array to the higher depth
        return moves[bestMove];
      }

      // returns the available spots on the board
      function emptyIndexies(board){

        return  board.filter(s => s != "O" && s != "X");
      }

      // winning combinations using the board indexies for instace the first win could be 3 xes in a row
      function winning(board, player){
       if (
           (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
              ) {
              return true;
          } else {
              return false;
          }
      }
    }
  })


  const home = (() => {
    let click = document.getElementsByClassName("click");
    for (let i in click){
      document.removeEventListener("click", chooseDifficulty);
    }
    let clicks = document.getElementsByClassName("clicks");
    for (let j in clicks){
      document.removeEventListener("click", addGameTiles);
    }
  })

  const addEventGamingScreen = (() => {
    let clicks = document.getElementsByClassName("clicks");

    for (let i in clicks){
      document.addEventListener("click", addGameTiles);

    }
  })

  const init = (() =>{
    addEventLoadingScreen();
  })
  return {init}
})()
//Switch Screen

window.addEventListener("DOMContentLoaded", gameBoard.init);
