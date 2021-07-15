// Define GLOBAL scope variables:
let PIECES = 6;  // Planned option to increase/decrease this later to change difficulty (MAX colors: 10)
let TURNS = 10;  // Planned option to increase/decrease this later to change difficulty
let game_state = "unfinished";
let current_turn = 1;
let colors = ['DeNada', 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'square', 'diamond', 'asterisk', 'cross']
// End GLOBAL variable definitions


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    init_game_board()
    standby_game()
});

// Function to draw the base game board.
function init_game_board() {

    // [Left column placement]
    let left_game_panel = document.createElement("div");
    let game_container = document.getElementById("game-container");
    game_container.appendChild(left_game_panel)
    game_container.children[0].id = "left-game-panel";

    // [Center column placement]:
    // Create the game guessing rows, number of rows drawn equals number of TURNS player selected
    for (let row = 1; row <= TURNS; row++) {
        let game_row = document.createElement("div");
        let game_container = document.getElementById("game-container");
        game_container.appendChild(game_row)
        game_container.children[row].setAttribute('row_number', `${row}`)

        // the game row area gets 90% (key panel already takes 10%), then divide this 90% by # of TURNS.
        // Prevents a row from growing too tall relative to the other rows.
        let row_height = 90 / TURNS
        game_container.children[row].style.maxHeight = `${row_height}%`

        // Initialize the individual sub-elements for each row:
        draw_game_row_elements(row)
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

    // [Center column placement]:
    // The center column of game_container will fill to 100% with key_panel
    // and already placed game guessing rows:
    let key_panel = document.createElement("div");
    game_container.appendChild(key_panel);
    game_container.children[TURNS + 1].id = "key-panel";

    // [Right column placement]
    // This will display on a new "rightmost" column based on CSS filling center column already
    let right_game_panel = document.createElement("div");
    game_container.appendChild(right_game_panel);
    game_container.children[TURNS + 2].id = "right-game-panel";

    // Draw the selectable game pieces on the left column:
    draw_piece_choices()
    gen_win_pieces()
}

// Initialize each game row's child elements:
// Each game row consists of:
// - Current turn arrow indicator
// - Four user game piece placement spots
// - Four small feed back peg squares
function draw_game_row_elements(row) {
    let row_string = row.toString();
    let cur_game_row = document.querySelectorAll(`[row_number=${CSS.escape(row_string)}]`);
    for (let col = 1; col <= 6; col++) {
        if (col === 1) {
            let green_arrow_area = document.createElement("div");
            cur_game_row[0].appendChild(green_arrow_area)
            let green_arrow = cur_game_row[0].querySelectorAll("div");
            green_arrow[0].setAttribute("t_num", `${row}`);
            if (col == 1 && row == 1) {
                //green_arrow[0].setAttribute("hidden", "false");
                green_arrow[0].setAttribute("arrow", "green");
                green_arrow[0].style.background = "no-repeat url('images/green_arrow.png') center";
            } else {
                //green_arrow[0].setAttribute("null", "");
                green_arrow[0].setAttribute("arrow", "null");
                green_arrow[0].innerHTML = ""
            }

        } else if (col == 6) {
            // create the 4 peg areas
            let piece_placement_area = document.createElement("div");
            cur_game_row[0].appendChild(piece_placement_area)
            let cur_piece_area = cur_game_row[0].querySelectorAll("div");
            cur_piece_area[col-1].setAttribute("peg_placement_area", `${col - 1}`);
            //cur_piece_area[col-1].setAttribute("turn_number", `${col}`);
        } else {
            // Create the four game piece placement areas
            let piece_placement_area = document.createElement("div");
            cur_game_row[0].appendChild(piece_placement_area)
            let cur_piece_area = cur_game_row[0].querySelectorAll("div");
            cur_piece_area[col-1].setAttribute("p_num", `${col - 1}`);
            cur_piece_area[col-1].setAttribute("t_num", `${row}`);
        }
    }
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
        left_panel.children[piece].style.backgroundImage = `url('images/${colors[piece]}.png')`;
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
        key_panel.children[choice].style.backgroundImage = `url('images/${colors[rand_piece]}.png')`;

    }
}

// Function to listen for and to handle mouse and keyboard events.
function standby_game() {
    document.getElementById('left-game-panel').addEventListener("click", function(event) {
        //console.dir(event.target.getAttribute('color'));  // use this in chrome
        //console.log(event.target);
        let possible_color = event.target.getAttribute('color')

        let colors = ['DeNada', 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'square', 'diamond', 'asterisk', 'cross']


        if (colors.includes(possible_color)){
            document.body.style.cursor = `url('images/${possible_color}.png'), pointer`
        }
    });

    window.addEventListener("keydown", function(event) {
        if (`${event.code}` == "Escape"){
            document.body.style.cursor = ""
        }
    }, true);

    listen_gameboard()
}


function listen_gameboard(){
    let str_turn = current_turn.toString()
    let all_pieces = document.querySelectorAll('[p_num]')
    all_pieces.forEach((element) => {
        element.addEventListener('mousedown', function(event) {
            //console.dir(event.target.getAttribute('color'));  // use this in chrome


            if (event.target.getAttribute('t_num') == str_turn
                && document.body.style.cursor !== ""){
                console.log(event.target);
                console.log("p_num: ",event.target.getAttribute('p_num'));
                console.log("t_num: ", event.target.getAttribute('t_num'));
                console.log("success");

                let gp_color = parse_pointer_name(document.body.style.cursor)

                event.target.style.background = `no-repeat url('images/${gp_color}.png') center`;
                event.target.setAttribute('color_choice', `${gp_color}`)
            } else if (event.target.getAttribute('t_num') == str_turn
                && document.body.style.cursor === "") {
                console.log("remove piece request")
                event.target.style.background = ``;
                event.target.setAttribute('color_choice', "")
            }

        });
    });

    function parse_pointer_name(str_cursor) {
        let string = ""
        let write = false

        for (let i = 0; i < str_cursor.length; i++) {
            if (str_cursor[i] === '/') {
                write = true
                continue;
            }
            if (str_cursor[i] === '.') {
                write = false
                break;
            }
            if (write === true){
                string += str_cursor[i]
            }
        }

        return string
    }
}


