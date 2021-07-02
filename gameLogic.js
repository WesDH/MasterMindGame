let PIECES = 6;  // Planned option to increase/decrease this later to change difficulty (MAX colors: 10)
let TURNS = 10;  // Planned option to increase/decrease this later to change difficulty
let game_state = "unfinished";
let colors = [null, 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'darkgreen', 'pink', 'aqua', 'ruby']
let turn = 1

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    init_game_board()

    standby_game()
});

// Function to draw the base game board.
function init_game_board() {
    let left_game_panel = document.createElement("div");
    let game_container = document.getElementById("game-container");
    game_container.appendChild(left_game_panel)
    game_container.children[0].id = "left-game-panel";

    // Create the game piece containers. 5 containers for each of the 36 game squares.
    for (let row = 1; row <= TURNS; row++) {
        let game_row = document.createElement("div");
        let game_container = document.getElementById("game-container");
        game_container.appendChild(game_row)
        game_container.children[row].setAttribute('turn_number', `${row}`)
        for (let col = 1; col < 6; col++) {
            if (col == 5) {
                //let game_piece = document.createElement("div");
            } else {
                //
            }
        }
    }

    // let all_game_rows = document.querySelectorAll('[turn_number]')
    // all_game_rows.forEach((element) => {
    //     element.style.background = "red";
    //     let rand = window.innerHeight * 0.7;
    //     rand = Math.floor(rand / TURNS)
    //     let rand2 = "9" + "vh"
    //     element.style.height = rand2
    //     let testvar = 123123
    // });

    let key_panel = document.createElement("div");
    game_container.appendChild(key_panel);
    game_container.children[TURNS + 1].id = "key-panel";

    let right_game_panel = document.createElement("div");
    game_container.appendChild(right_game_panel);
    game_container.children[TURNS + 2].id = "right-game-panel";

    // Draw the selectable game pieces on the left column:
    draw_piece_choices()
    gen_win_pieces()
}

// Draw the pieces that the player can select from the panel and place on the guess area
function draw_piece_choices() {


    let left_panel = document.getElementById("left-game-panel");
    let piece_div = document.createElement("div");
    left_panel.appendChild(piece_div) // create an empty div so index 0 is ignored, game piece colors start at index 1
    //left_panel.children[0].style.height = "5vh"

    for (let piece = 1; piece <= PIECES; piece++){
        let piece_div = document.createElement("div");
        left_panel.appendChild(piece_div)
        left_panel.children[piece].setAttribute("color", `${colors[piece]}`)
        left_panel.children[piece].style.backgroundImage = `url('images/gp_${colors[piece]}.png')`;
    }
}

// Function to randomly generate the winning pieces
function gen_win_pieces(){
    let key_panel = document.getElementById('key-panel')
    let piece_div = document.createElement("div");
    key_panel.appendChild(piece_div) // create an empty div so index 0 is ignored, game piece colors start at index 1

    // randomly each of the 4 game piece spots on the key-panel:
    for (let choice = 1; choice <= 4; choice++){

        // Returns a random integer from 1 to number of game  piece colors in play
        let rand_piece = Math.floor(Math.random() * PIECES) + 1;

        let div_placeholder = document.createElement("div");

        key_panel.appendChild(div_placeholder).setAttribute("color", `${colors[rand_piece]}`);
        key_panel.children[choice].style.backgroundImage = `url('images/gp_${colors[rand_piece]}.png')`;

    }
}

// Function to listen for and to handle mouse and keyboard events.
function standby_game() {
    document.getElementById('left-game-panel').addEventListener("click", function(event) {
        console.dir(event.target.getAttribute('color'));  // use this in chrome
        //console.log(event.target);
        let possible_color = event.target.getAttribute('color')
        let colors = [null, 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'darkgreen', 'pink', 'aqua', 'ruby']

        if (colors.includes(possible_color)){
            document.body.style.cursor = `url('images/gp_${possible_color}.png'), pointer`
        }
    });



    window.addEventListener("keydown", function(event) {
        if (`${event.code}` == "Escape"){
            document.body.style.cursor = ""
        }
    }, true);
}


