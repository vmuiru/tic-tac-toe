/*----- constants -----*/
// Model

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4 ,7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; 

const LOOKUP = {
    '1': 'X',
    '-1': 'O',
    'null': ''
};
/*----- app's state (variables) -----*/
// Model

let turn, winner, gameboard;

/*----- cached element references -----*/
// View

const $gameboardEl = $('#gameboard');
const $squareEls = $('.square');
const $buttonEl = $('#reset-btn');
const $messageEl = $('#message');


/*----- event listeners -----*/
// Controller

$gameboardEl.on('click', handleMove);
$buttonEl.on('click', handleInit);




/*----- functions -----*/
// Controler
// Start the game once browser loads 
handleInit();

function handleInit() {
    // This function will start the game
    // a. create an empty game board
    gameboard = new Array(9).fill().map(() => null);
    // b. assign the turn - player 1 goes first - X goes
    turn = 1;
    // c. set winner to false
    winner = false;
    // d. visualize the state of the game to the DOM - render()
    render();

    // Then reset the game
}

function checkWinner() {
    //compare the positions of the players pieces in the combos array
    for(let i =0; i < COMBOS.length; i++) {
        if(Math.abs(
                    gameboard[COMBOS[i][0]] + 
                    gameboard[COMBOS[i][1]] +
                    gameboard[COMBOS[i][2]]) === 3) {
                return gameboard[COMBOS[i][0]]
            }
    } 
    if(gameboard.includes(null)) return false;
    return 'T'
}

function handleMove(event) {
    const position = event.target.dataset.index;
    // this code prevents players for changing choices during the play
    if(winner || gameboard[position] !== null) return;

        gameboard[position] = turn; 

        // check to see if we have a winner
        winner = checkWinner();
        turn *= -1;
        render();

}
function render() {
    // render will look at the gameboard array
    gameboard.forEach(function(value, index) {
        $($squareEls[index]).text(LOOKUP[value]);

    }); 


    //  it will update our message based on turn won
    if(!winner) {
        $messageEl.text(`It's player ${LOOKUP[turn]}'s turn`);
    } else if (winner === 'T') {
        $messageEl.text('Tie Game');
    } else {
        $messageEl.text(`Congratulations ${LOOKUP[winner]} wins`);
    }
}

