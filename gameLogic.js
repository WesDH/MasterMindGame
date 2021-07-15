// Define GLOBAL scope variables:
let PIECES = 6;  // Planned option to increase/decrease this later to change difficulty (MAX colors: 10)
let TURNS = 10;  // Planned option to increase/decrease this later to change difficulty
let game_state = "unfinished";
let current_turn = 1;
let colors = ['DeNada', 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'square', 'diamond', 'asterisk', 'cross']
let winning_combo = [];
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
    init_right_panel_elements()
}

// Sub function for init_game_board()
// Param: row: type string, current "guess area" row being initialized
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
            // create the 4 peg feedback areas
            let piece_placement_area = document.createElement("div");
            cur_game_row[0].appendChild(piece_placement_area)
            let cur_piece_area = cur_game_row[0].querySelectorAll("div");
            cur_piece_area[col-1].setAttribute("peg_placement_area", `${col - 1}`);
            for (let i = 1; i < 5; i++) {
                let peg_feedback = document.createElement("div");
                peg_feedback.setAttribute("t_num", `${row}`);
                peg_feedback.setAttribute("feedback_num", `${i}`);
                peg_feedback.style.background = `url('images/peg_empty.png') center no-repeat`;
                peg_feedback.id = 'peg_feedback'
                cur_piece_area[col-1].appendChild(peg_feedback)
            }
            //cur_piece_area[col-1].setAttribute("turn_number", `${col}`);
        } else {
            // Create the four game piece placement areas
            let piece_placement_area = document.createElement("div");
            cur_game_row[0].appendChild(piece_placement_area)
            let cur_piece_area = cur_game_row[0].querySelectorAll("div");
            cur_piece_area[col-1].setAttribute("p_num", `${col - 1}`);
            cur_piece_area[col-1].setAttribute("t_num", `${row}`);
            cur_piece_area[col-1].setAttribute("color_choice", "None");
        }
    }
}

// Draw the pieces that the player can select from the LEFT panel and place on the guess area
function draw_piece_choices() {

    let left_panel = document.getElementById("left-game-panel");

    let section_padder = document.createElement("section");
    section_padder.id = 'L_panel_top_padding';
    left_panel.appendChild(section_padder);

    let piece_div = document.createElement("div");
    left_panel.appendChild(piece_div) // create an empty div so index 0 is ignored, game piece colors start at index 1
    //left_panel.children[0].style.height = "5vh"

    for (let piece = 1; piece <= PIECES; piece++){
        let piece_div = document.createElement("div");
        left_panel.appendChild(piece_div)
        left_panel.children[piece].setAttribute("color", `${colors[piece]}`)
        left_panel.children[piece].style.background = `url('images/${colors[piece]}.png') center no-repeat`;
        left_panel.children[piece].setAttribute('title', `Pick up ${colors[piece]} game-piece`);
        left_panel.children[piece].style.backgroundSize = "contain";
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
        winning_combo.push(colors[rand_piece])

        let div_placeholder = document.createElement("div");

        key_panel.appendChild(div_placeholder).setAttribute("color", `${colors[rand_piece]}`);
        key_panel.children[choice].style.backgroundImage = `url('images/${colors[rand_piece]}.png')`;

    }
}

// Draws the right panel items
// - "Submit" guess button
// - TODO Initialize game piece buttons to send colors direct to guess area
function init_right_panel_elements() {
    let r_panel = document.getElementById('right-game-panel')

    // Column reverse ordering at this time has priority on the CSS:
    // Create the submit button
    let div1 = document.createElement("div")
    div1.id = "submit_btn"
    div1.setAttribute('color', 'green');
    div1.setAttribute('title', 'Submit your guess!');
    div1.innerText = "Guess!"
    r_panel.appendChild(div1)

    // Create a container to hold the color buttons on the right panel
    let clr_btn_ctnr = document.createElement("div")
    clr_btn_ctnr.id = "color_btn_container"
    r_panel.appendChild(clr_btn_ctnr)
}






// Function to listen for and to handle mouse and keyboard events.
function standby_game() {

    //handle user picking up game piece on left panel
    document.getElementById('left-game-panel').addEventListener("click", function(event) {
        //console.dir(event.target.getAttribute('color'));  // use this in chrome
        //console.log(event.target);
        let possible_color = event.target.getAttribute('color')
        //let colors = ['DeNada', 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'square', 'diamond', 'asterisk', 'cross']
        if (colors.includes(possible_color)){
            document.body.style.cursor = `url('images/${possible_color}.png'), pointer`
        }
    });

    // Handle mouse clicks on guess button:
    document.getElementById('submit_btn').addEventListener("click", function(event) {
        //console.dir(event.target.getAttribute('color'));  // use this in chrome
        //console.log(event.target);
        let possible_color = event.target.getAttribute('color')
        //let colors = ['DeNada', 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'square', 'diamond', 'asterisk', 'cross']
        if (possible_color == 'green' ){
            event.target.setAttribute('color', 'red');
            event.target.setAttribute('title', 'Confirm');
            //event.target.style.color = '#BA0520FF';
            event.target.style.background = "#BA0520FF";
            event.target.innerText = "Confirm"
        } else if (possible_color == 'red' ){

            // Function call to check for win/loss conditions, increment turn otherwise:
            validate_move()

            event.target.setAttribute('color', 'green');
            event.target.setAttribute('title', 'Submit your guess!');
            //event.target.style.color = '#BA0520FF';
            event.target.style.background = "darkgreen";
            event.target.innerText = "Guess!"
        }

    });

    // Handle user having a game piece picked up and user hits "escape", then drop the game piece
    window.addEventListener("keydown", function(event) {
        if (`${event.code}` == "Escape"){
            document.body.style.cursor = ""
        }
    }, true);

    listen_gameboard()
}

// Create event listeners for all possible game piece placement locations:
// Handle placing game-pieces on game-board if user drops a piece onto board with mouse cursor
// Handle removing game pieces if user clicks on already placed piece
function listen_gameboard(){
    //let str_turn = current_turn.toString()
    let all_pieces = document.querySelectorAll('[p_num]')
    all_pieces.forEach((element) => {
        element.addEventListener('mousedown', function(event) {
            //console.dir(event.target.getAttribute('color'));  // use this in chrome
            if (event.target.getAttribute('t_num') == current_turn.toString()
                && document.body.style.cursor !== ""){
                //console.log(event.target);
                //console.log("p_num: ",event.target.getAttribute('p_num'));
                //console.log("t_num: ", event.target.getAttribute('t_num'));
                //console.log("success");

                // Grab the current pointer color from the cursor info
                let gp_color = parse_pointer_name(document.body.style.cursor)

                // Place the selected game piece on the guess row:
                event.target.style.background = `no-repeat url('images/${gp_color}.png') center`;
                event.target.style.backgroundSize = "40%";
                event.target.setAttribute('color_choice', `${gp_color}`)
            } else if (event.target.getAttribute('t_num') == current_turn.toString()
                && document.body.style.cursor === "") {
                console.log("remove piece request")
                event.target.style.background = ``;
                event.target.setAttribute('color_choice', "")
            }
        });
    });
}

// This function only returns the "color" string in the cursor options
// Helper function for function listen_gameboard()
function parse_pointer_name(str_cursor) {
    let string = ""
    let write = false
    for (let i = 0; i < str_cursor.length; i++) {
        if (str_cursor[i] === '/') {
            write = true
            continue;
        } else if (str_cursor[i] === '.') {
            write = false
            break;
        } else if (write === true){
            string += str_cursor[i]
        }
    }
    return string
}

// Function call to check for win/loss conditions, increment turn otherwise:
function validate_move() {
    let game_container = document.getElementById('game-container')
    let sub_elements = game_container.childNodes;
    let row_combo = []

    sub_elements[current_turn].childNodes.forEach((child) => {
        let tmp_selection = child.getAttribute("color_choice")
        if (tmp_selection != null) {
            row_combo.push(tmp_selection)
        }
    });

    let perfect_match = 0
    let general_match = 0

    // Make shallow copy of winning_combo using spread operator
    let winning_combo_spread = [...winning_combo]
    //console.log("row combo before: ", row_combo);
    //console.log("winning_combo_spread before: ", winning_combo_spread);

    for (let i = 0; i < winning_combo_spread.length; i++ ){
        if (winning_combo_spread[i] === row_combo[i]) {
            //console.log("same color and pos detected")
            perfect_match += 1;

            // delete the array reference to the perfect match found, so we dont find it again
            row_combo.splice(i, 1)
            winning_combo_spread.splice(i, 1)
            i -= 1;
        }
    }

    //console.log("length winning combo interim ", winning_combo_spread.length)
    //console.log("row combo INTERIM: ", row_combo);
    //console.log("winning_combo_spread INTERIM: ", winning_combo_spread);
    // Now search for general matches (same color, wrong position)
    for (let i = 0; i < winning_combo_spread.length; i++ ){
        if (row_combo.indexOf(winning_combo_spread[i]) != -1) {
            let pop_index = row_combo.indexOf(winning_combo_spread[i])
            general_match += 1
            row_combo.splice(pop_index, 1)
        }
    }

    console.log("Perfect matches found: ", perfect_match)
    console.log("General matches found: ", general_match)
    //console.log("row combo: ", row_combo);
    //console.log("winning combo: ", winning_combo);

    if (perfect_match == 4) {
        console.log("Win condition found")
    } else {
        draw_feedback_area(sub_elements, perfect_match, general_match)
        increment_turn(sub_elements)
    }

}

function draw_feedback_area(sub_elements, perfect_matches, partial_matches) {
    //let game_container = document.getElementById('game-container')
    //let sub_elements = game_container.childNodes;

    // Point to div container containing the four feedback pegs for the current turn:
    let feed_back_area = sub_elements[current_turn].childNodes;

    // Now make the variable point to the four feedback peg elements
    feed_back_area = feed_back_area[5].childNodes;
    // Feedback area is the 5th child node of the row turn
    //console.log(feed_back_area)

    for (let i = 0; i < 4; i++) {
        if (perfect_matches > 0) {
            feed_back_area[i].style.background = `url('images/peg_correct.png') center no-repeat`;
            perfect_matches -= 1;
        } else if (partial_matches > 0) {
            feed_back_area[i].style.background = `url('images/peg_almost_correct.png') center no-repeat`;
            partial_matches -= 1;
        } else {
            feed_back_area[i].style.background = `url('images/peg_empty.png') center no-repeat`;
        }
    }
}

//
// Arg: sub_elements: nodeList of game container. Index of this nodeList equals the respective turn # row
function increment_turn(sub_elements) {

    current_turn += 1;
    if (current_turn > TURNS) {
        console.log("Loss condition detected: Out of turns")
    } else {
        console.log("incr ", sub_elements)
        let old_arrow_area = sub_elements[current_turn - 1].childNodes
        old_arrow_area[0].setAttribute("null", "");
        old_arrow_area[0].setAttribute("arrow", "null");
        old_arrow_area[0].style.background = "";

        let new_arrow_area = sub_elements[current_turn].childNodes
        new_arrow_area[0].setAttribute("arrow", "green");
        new_arrow_area[0].style.background = "no-repeat url('images/green_arrow.png') center";
    }
}

