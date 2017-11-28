/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Variables
var scores, roundScores, activePlayer, dice, gamePlaying, scoreToWin;

//Se setea todo en 0 para empezar el juego
initGame();

//cuando el button con la clase btn-roll se le da click se llama a la funcion anonima, Tambien se le llama event lisener
document.querySelector('.btn-roll').addEventListener('click', function(){ //Funcion anonima (no tiene nombre y solo se puede usar aqui mismo)
    
    //Checa si el juego esta activo
    if (gamePlaying) {
    //Si si
        
        //1. Se genera un numero random
        dice = Math.floor(Math.random() * 6) + 1;
        dice1 = Math.floor(Math.random() * 6) + 1;

        //2. se desplega el resultado
        var diceDOM = document.querySelector('.dice'); //Se pone en variable para no escribirlo muchas veces, del dado
        var dice1DOM = document.querySelector('.dice1'); //Se pone en variable para no escribirlo muchas veces, del dado1
        diceDOM.style.display = "block";//Se muestra la imagen del dado
        dice1DOM.style.display = "block";//Se muestra la imagen del dado1
        diceDOM.src = "dice-" + dice + ".png";//Se cambia a la imagen del dado
        dice1DOM.src = "dice-" + dice1 + ".png";//Se cambia a la imagen del dado 1

        //3. Actuliza la ronda y el score IF el numero NOT es 1
        if (dice !== 1 && dice1 !== 1) { //Si uno de los 2 es 1 se va al else
            //Agregar score
            roundScores += dice + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScores; //Solo cambia el text
        } else{
            console.log(dice, dice1);
            //Siguiente jugador
            nextPlayer();
        }

        if( dice == 6 && dice1 == 6 ){
            //El jugador pierde todo su score global
            scores[activePlayer] = 0;
            // Se actuliza el UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            
            //Siguiente jugador
            nextPlayer();
        }

    }

});

//cuando el button con la clase btn-roll se le da click se llama a la funcion anonima, Tambien se le llama event lisener
document.querySelector('.btn-hold').addEventListener('click', function () { //Funcion anonima (no tiene nombre y solo se puede usar aqui mismo)
    
    //Checa si el juego esta activo
    if (gamePlaying) {
    //Si si

        // Se agregar el score actual del jugador al score global
        scores[activePlayer] += roundScores; //se suma el score al score global del jugador

        // Se actuliza el UI
        document.querySelector('#score-' + activePlayer ).textContent = scores[activePlayer];

        // Checa si el jugador gano el juego
        if (scores[activePlayer] >= scoreToWin){
        // Si el jugador gano
            // Se cambia el texto a winner
            document.querySelector('#name-' + activePlayer ).textContent = 'Winner!';
            // Se esconde los dados
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';
            // Se agrega la clase winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // Se quita la clase active del ganador
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //Se desabilitan los bottones
            document.querySelector(".btn-roll").disabled = true;
            document.querySelector(".btn-hold").disabled = true;
            //Se pone la variable del juego en falso
            gamePlaying = false;
        } else{
        // Si no    
            // Se cambia de jugador
            nextPlayer();
        }
    }



});

//cuando el button con la clase btn-new se le da click se llama a la funcion initGame, Tambien se le llama event lisener
document.querySelector('.btn-new').addEventListener('click', initGame);// Al darle click se corre la funcion que resetea todo

//cuando el button con la clase btn-scores se le da click se llama a la funcion initGame, Tambien se le llama event lisener
document.querySelector('.btn-scores').addEventListener('click', initGame);  // Se cambia el score del juego y se reinicia

//Funcion para cambiar de jugador, usando la logica de don't repeat code
function nextPlayer(){
    //Si el activeplayer es 0 cambiar a 1 si no cambiar a 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 //Lo mismo que un if, se llama turning operator

    //Se reinician los valores a 0 
    roundScores = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Se agrega o quita el active class usando toggle
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Se esconde los dados
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';

}

function initGame() {

    // Se cambia el score del juego
    scoreToWin = document.getElementById('new-score').value

    //Se pone la variable de gamePlaying a true para saber si el juego esta activo o no
    gamePlaying = true;

    //El score global de los 2 jugadores empieza en 0
    scores = [0, 0];

    //Score de la ronda
    roundScores = 0;

    //El jugador activo en 0 base
    activePlayer = 0;

    //Esconde los dados usando DOM selector
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';

    //Se pone todos los valores en 0, getElementById es mas rapido que querySelector
    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-0').textContent = "0";

    // Se cambia el texto a winner a los nombre de los jugadores
    document.getElementById('name-0').textContent = 'Player 0';
    document.getElementById('name-1').textContent = 'Player 1';

    // Se quita la clase winner
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // Se quita la clase active del ganador
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //Se agrega la clase active al jugador 0
    document.querySelector('.player-0-panel').classList.add('active');

    //Se activan los bottones
    document.querySelector(".btn-roll").disabled = false;
    document.querySelector(".btn-hold").disabled = false;
}



/***********************************
 * Funciones extras o notas extra  *
 ***********************************/

//var dice =  Math.floor(Math.random() * 6) + 1;

//Seleciona el id y cambia el contenido
//document. se utiliza para leer en el DOM
//document.querySelector('#current-' + activePlayer ).textContent = dice; //Solo cambia el text
//document.querySelector('#current-' + activePlayer ).innerHTML = '<em>' + dice + '</em>'; //Se agrega html

//Lee el valor del ide desde el dom (en texto)
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//Se agrega o quita el active class
// document.querySelector('.player-0-panel').classList.remove('active');
// document.querySelector('.player-1-panel').classList.add('active');