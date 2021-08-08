// Define GLOBAL scope variables:
let pieces = 10;  // Default difficulty select 10
let turns = 10;  // Default difficulty turns 10
let game_state = "unfinished";
let current_turn = 1;
let colors = ['DeNada', 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'square', 'diamond', 'asterisk', 'cross']
let winning_combo = [];
// End GLOBAL variable definitions


// Callback function on page load, initialize the difficulty selection menu
// :params: None
// :return: none
window.addEventListener('DOMContentLoaded', (event) => {
    select_difficulty()

});


// Function to draw the difficulty select screen
function select_difficulty() {
    backgroundMS()
    let game_container = document.getElementById("game-container");
    game_container.innerHTML = "" // Reset game board
    game_container.style.justifyContent = "space-evenly"
    game_container.style.alignContent = "center"

    // Create and handle user clicks on "start game" button:
    let button = document.createElement("div");
    game_container.appendChild(button);
    button.innerText = "Start Game";
    button.setAttribute("start_select_area", "")
    handle_start_select(game_container);

    // Create and handle user clicks on TURN difficulty select area
    let dif_sect = document.createElement("section");
    game_container.appendChild(dif_sect);
    game_container.children[1].setAttribute("turn_difficulty_select_area", "")
    handle_turn_select(game_container)

    // Create and handle user clicks on COLORS difficulty select area
    let dif_sect1 = document.createElement("section");
    game_container.appendChild(dif_sect1);
    game_container.children[2].setAttribute("color_difficulty_select_area", "")
    handle_color_select(game_container)
}

// Handle user clicks on the start select button
function handle_start_select(game_container) {
    // Listen for click on difficulty select buttons and update difficulty setting for TURN:
    game_container.children[0].addEventListener("click", function(event) {

        if (event.target.tagName === 'DIV') {
            console.log("Game Starting!");

            // Select the clicked button
            event.target.style.background = "url('assets/images/btn_select.png')";
            event.target.style.backgroundRepeat = "no-repeat";
            event.target.style.backgroundSize = "100% 100%";
            init_game_board()
            standby_game()
        }

    });
}

// Handle user clicks on the turn select area of the difficult select screen
function handle_turn_select(game_container) {
    let difficulty_img = document.createElement("section");
    game_container.children[1].appendChild(difficulty_img);
    game_container.children[1].children[0].setAttribute("difficulty_image", "")

    let easy = document.createElement("section");
    let name = document.createElement("section");
    let hard = document.createElement("section");
    game_container.children[1].children[0].appendChild(easy);
    game_container.children[1].children[0].appendChild(name);
    game_container.children[1].children[0].appendChild(hard);
    game_container.children[1].children[0].children[0].innerHTML = "Easier";
    game_container.children[1].children[0].children[1].innerHTML = "(Number of Turns)";
    game_container.children[1].children[0].children[2].innerHTML = "More Difficult";

    // Draw the 14 difficulty select TURN buttons:
    for (let t = 14; t >= 6; t--) {
        let game_container = document.getElementById("game-container");
        let difficulty_btn = document.createElement("div");
        game_container.children[1].appendChild(difficulty_btn);
        difficulty_btn.textContent = `${t}`
    }

    // Default set turn difficulty to 10 and have this button selected:
    turns = 10
    setBackground(game_container.children[1].children[5],
        "url('assets/images/btn_select.png')",
        "no-repeat",
        "100% 100%")

    // Listen for click on difficulty select buttons and update difficulty setting for TURN:
    game_container.children[1].addEventListener("click", function(event) {

        if (event.target.tagName === 'DIV') {

            // "Deselect" all buttons
            for(let i = 9; i >= 1; i--) {
                setBackground(game_container.children[1].children[i],
                    "url('assets/images/btn.png')",
                    "no-repeat",
                    "100% 100%")
            }

            turns = parseInt(event.target.innerText)  // set the turns variable to the button's difficulty clicked

            // Select the clicked button
            setBackground(event.target, "url('assets/images/btn_select.png')", "no-repeat", "100% 100%")
        }

    });
}

// Helper function setBackground applies CSS background styling to the target element
function setBackground (target, theURL, repeat, size) {
    target.style.background = `${theURL}`;
    target.style.backgroundRepeat = `${repeat}`;
    target.style.backgroundSize = `${size}`;

}


// Handle user clicks on the turn select area of the difficult select screen
function handle_color_select(game_container) {
    let difficulty_img = document.createElement("section");
    game_container.children[2].appendChild(difficulty_img);
    game_container.children[2].children[0].setAttribute("difficulty_image", "")
    let easy = document.createElement("section");
    let name = document.createElement("section");
    let hard = document.createElement("section");
    //game_container.children[2].children[0].innerHTML = "color choices";
    game_container.children[2].children[0].appendChild(easy)
    game_container.children[2].children[0].appendChild(name)
    game_container.children[2].children[0].appendChild(hard)
    game_container.children[2].children[0].children[0].innerText = "Easier";
    game_container.children[2].children[0].children[1].innerHTML = "(Color Choices)";
    game_container.children[2].children[0].children[2].innerText = "More Difficult";


    //
    //
    // Draw the 10 difficulty select COLOR buttons:
    for (let c = 4; c <= 10; c++) {
        let game_container = document.getElementById("game-container");
        let button = document.createElement("div");
        game_container.children[2].appendChild(button);
        button.textContent = `${c}`
    }
    // }
    //
    // Default set pieces difficulty to 10 and have this button selected:
    pieces = 10
    game_container.children[2].children[7].style.background = "url('assets/images/btn_select.png')";
    game_container.children[2].children[7].style.backgroundRepeat = "no-repeat";
    game_container.children[2].children[7].style.backgroundSize = "100% 100%";

    // Listen for click on difficulty select buttons and update difficulty setting for TURN:
    game_container.children[2].addEventListener("click", function(event) {

        if (event.target.tagName === 'DIV') {

            // "Deselect" all buttons
            for(let i = 1; i <= 7; i++) {
                game_container.children[2].children[i].style.background = "url('assets/images/btn.png')";
                game_container.children[2].children[i].style.backgroundRepeat = "no-repeat";
                game_container.children[2].children[i].style.backgroundSize = "100% 100%";
            }

            //console.log(event.target.innerText);
            pieces = parseInt(event.target.innerText)  // set the turns variable to the button's difficulty clicked

            // Select the clicked button
            event.target.style.background = "url('assets/images/btn_select.png')";
            event.target.style.backgroundRepeat = "no-repeat";
            event.target.style.backgroundSize = "100% 100%";

        }

    });
}


// Function to draw the base game board.
function init_game_board() {
    winning_combo = []         // Reset winning combo
    current_turn = 1           // Reset turns
    game_state = "unfinished"  // Reset game state
    // [Left column placement]
    let left_game_panel = document.createElement("div");
    let game_container = document.getElementById("game-container");
    game_container.innerHTML = "" // Reset game board

    game_container.style.justifyContent = "start"
    game_container.style.alignContent = "normal"

    game_container.appendChild(left_game_panel)
    game_container.children[0].id = "left-game-panel";

    // [Center column placement]:
    // Create the game guessing rows, number of rows drawn equals number of TURNS player selected
    for (let row = 1; row <= turns; row++) {
        let game_row = document.createElement("div");
        let game_container = document.getElementById("game-container");
        game_container.appendChild(game_row)
        game_container.children[row].setAttribute('row_number', `${row}`)

        // the game row area gets 90% (key panel already takes 10%), then divide this 90% by # of TURNS.
        // Prevents a row from growing too tall relative to the other rows.
        let row_height = 90 / turns
        game_container.children[row].style.maxHeight = `${row_height}%`

        // Initialize the individual sub-elements for each row:
        draw_game_row_elements(row)
    }


    // [Center column placement]:
    // The center column of game_container will fill to 100% with key_panel
    // and already placed game guessing rows:
    let key_panel = document.createElement("div");
    game_container.appendChild(key_panel);
    game_container.children[turns + 1].id = "key-panel";
    game_container.children[turns + 1].innerHTML = "Welcome to<br>MASTERMIND GAME<br>Can you crack the code?"

    // [Right column placement]
    // This will display on a new "rightmost" column based on CSS filling center column already
    let right_game_panel = document.createElement("div");
    game_container.appendChild(right_game_panel);
    game_container.children[turns + 2].id = "right-game-panel";

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
                green_arrow[0].style.background = "no-repeat url('assets/images/green_arrow.png') center";
                green_arrow[0].style.backgroundSize = "contain"
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
                peg_feedback.style.background = `url('assets/game_pegs/peg_empty.png') center no-repeat`;
                peg_feedback.style.backgroundSize = "contain"
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

    for (let piece = 1; piece <= pieces; piece++){
        let piece_div = document.createElement("div");
        left_panel.appendChild(piece_div)
        left_panel.children[piece].setAttribute("color", `${colors[piece]}`)
        left_panel.children[piece].style.background = `url('assets/game_pieces/${colors[piece]}.png') center center / contain no-repeat`;
        left_panel.children[piece].setAttribute('title', `[ ${colors[piece][0]} ] Pick up ${colors[piece]} game-piece`);
        left_panel.children[piece].style.backgroundSize = "contain";
    }

    let piece_div1 = document.createElement("div");
    left_panel.appendChild(piece_div1);
    left_panel.children[pieces + 1].setAttribute("color", `cancel`);
    left_panel.children[pieces + 1].innerText = "Undo";
    left_panel.children[pieces + 1].id = 'cancel';
    left_panel.children[pieces + 1].setAttribute('title', `(mobile friendly) Click to cancel a game piece, by default can click to remove gamepiece if no piece is picked up`);

}

// Function to randomly generate the winning pieces
function gen_win_pieces(){
    // randomly each of the 4 game piece spots on the key-panel:
    for (let choice = 1; choice <= 4; choice++){

        // Returns a random integer from 1 to number of game  piece colors in play
        let rand_piece = Math.floor(Math.random() * pieces) + 1;
        winning_combo.push(colors[rand_piece])
    }
    //console.log(winning_combo);
}



// function init_right_panel_elements initialized the right game panel items
// :params: None
// :return: none
function init_right_panel_elements() {
    // Column reverse ordering at this time has priority on the CSS:
    let r_panel = document.getElementById('right-game-panel')

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

    // Create a center dotted box area for the "selected" area to give feedback about selected piece
    let color_btn_ctnr = document.getElementById("color_btn_container")
    let feed_back_area = document.createElement("div");
    feed_back_area.id = "feed-back-text"
    feed_back_area.innerHTML= "<mark>Selected</mark>"
    color_btn_ctnr.appendChild(feed_back_area)

    // Create the " ? " button
    let div2 = document.createElement("div")
    div2.id = "directions_btn"
    div2.setAttribute('color', 'green');
    div2.setAttribute('title', 'Game directions');
    div2.innerText = "?"
    r_panel.appendChild(div2)
}







// This function only returns the "color" string in the cursor options
// Helper function for function listen_gameboard()
function parse_pointer_name(str_cursor) {
    let string = ""
    let write = 0
    for (let i = 0; i < str_cursor.length; i++) {
        if (str_cursor[i] === '/') {
            write += 1
            continue;
        } else if (str_cursor[i] === '.') {
            write = false
            break;
        } else if (write === 2){
            string += str_cursor[i]
        }
    }
    return string
}

// Function call to check for win/loss conditions, increment turn otherwise:
function validate_move() {
    document.body.style.cursor = ""
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

    // Now search for general matches (same color, wrong position)"
    for (let i = 0; i < winning_combo_spread.length; i++ ){
        if (row_combo.indexOf(winning_combo_spread[i]) != -1) {
            let pop_index = row_combo.indexOf(winning_combo_spread[i])
            general_match += 1
            row_combo.splice(pop_index, 1)
        }
    }

    //console.log("Perfect matches found: ", perfect_match)
    //console.log("General matches found: ", general_match)
    //console.log("row combo: ", row_combo);
    //console.log("winning combo: ", winning_combo);

    if (perfect_match == 4) {
        draw_feedback_area(sub_elements, perfect_match, general_match)
        console.log("Win condition found")
        game_state = "won"

        show_solution()
        prompt_replay()
        //select_difficulty()
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
            feed_back_area[i].style.background = `url('assets/game_pegs/peg_correct.png') center no-repeat`;
            perfect_matches -= 1;
        } else if (partial_matches > 0) {
            feed_back_area[i].style.background = `url('assets/game_pegs/peg_almost_correct.png') center no-repeat`;
            partial_matches -= 1;
        } else {
            feed_back_area[i].style.background = `url('assets/game_pegs/peg_empty.png') center no-repeat`;
        }
        feed_back_area[i].style.backgroundSize = "contain"
    }
}

//
// Arg: sub_elements: nodeList of game container. Index of this nodeList equals the respective turn # row
function increment_turn(sub_elements) {

    current_turn += 1;
    if (current_turn > turns) {
        console.log("Loss condition detected: Out of turns")
        game_state = "lost"
        show_solution()
        prompt_replay()
    } else {
        //console.log("incr ", sub_elements)
        let old_arrow_area = sub_elements[current_turn - 1].childNodes
        old_arrow_area[0].setAttribute("null", "");
        old_arrow_area[0].setAttribute("arrow", "null");
        old_arrow_area[0].style.background = "";

        let new_arrow_area = sub_elements[current_turn].childNodes
        new_arrow_area[0].setAttribute("arrow", "green");
        new_arrow_area[0].style.background = "url('assets/images/green_arrow.png') center center / contain no-repeat";
    }
}

// Function to be called on win/loss condition detection. Displays the secret code on the top center.
function show_solution() {
    let key_panel = document.getElementById('key-panel')
    key_panel.innerHTML = ""
    let piece_div = document.createElement("div");
    key_panel.appendChild(piece_div) // create an empty div so index 0 is ignored, game piece colors start at index 1
    key_panel.children[0].innerHTML = "The<br>winning<br>code:"


    for (let i = 1; i <= 4; i++){
        let div_placeholder = document.createElement("div");
        key_panel.appendChild(div_placeholder).setAttribute("color", `${winning_combo[i-1]}`);
        key_panel.children[i].style.backgroundImage = `url('assets/game_pieces/${winning_combo[i-1]}.png')`;
        key_panel.children[i].style.backgroundSize = "contain";


    }
}

// Function to be called on win/loss condition detection. Shows a win/lossprompt on right panel and creates
// a "new Game" button there as well.
function prompt_replay() {
    let r_panel = document.getElementById('right-game-panel')
    r_panel.innerHTML = ""
    r_panel.style.flexDirection = 'column';
    r_panel.style.justifyContent = 'start';

    let div1 = document.createElement("div");
    r_panel.appendChild(div1).id = "win_loss_Prompt"
    r_panel.children[0].innerText = `You ${game_state}! Click the button below to return to the difficulty selection screen:`;

    let new_game_btn = document.createElement("div")
    r_panel.appendChild(new_game_btn)
    r_panel.children[1].id = "new_game_btn"
    r_panel.children[1].innerText = "New Game"
    r_panel.children[1].setAttribute('title', `Click to return to difficulty select screen`);

    document.getElementById('new_game_btn').addEventListener("click", () => {select_difficulty()});
}

// function listen_gameboard adds event listeners to the gameboard elements to listen for user
// mouse clicks and key presses (where the user can place pieces)
// :params: None
// :return: none
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
                event.target.style.background = `no-repeat url('assets/game_pieces/${gp_color}.png') center`;
                event.target.style.backgroundSize = "55%";
                event.target.setAttribute('color_choice', `${gp_color}`)
            } else if (event.target.getAttribute('t_num') == current_turn.toString()
                && document.body.style.cursor === "") {
                //console.log("remove piece request")
                event.target.style.background = ``;
                event.target.setAttribute('color_choice', "")
            }
        });
    });
}


// function standby_game adds event listeners to the gameboard elements to listen for user
// mouse clicks and key presses (on the other elements)
// :params: None
// :return: none
function standby_game() {
    listen_left_panel();
    listen_guess_btn();
    listen_directions_btn();
    create_bindings();          // Create hotkey bindings
    listen_gameboard();         // Listen where the user can place pieces
}

function listen_left_panel() {
    //handle user picking up game piece on left panel
    document.getElementById('left-game-panel').addEventListener("click", function(event) {
        //console.dir(event.target.getAttribute('color'));  // use this in chrome
        //console.log(event.target);
        let possible_color = event.target.getAttribute('color')
        let color_feedback = document.getElementById('feed-back-text');
        //let colors = ['DeNada', 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'square', 'diamond', 'asterisk', 'cross']
        if (colors.includes(possible_color)){
            document.body.style.cursor = `url('assets/game_pieces/${possible_color}.png'), pointer`
            color_feedback.style.background = `url('assets/game_pieces/${possible_color}.png') center center / contain no-repeat`;
            color_feedback.style.backgroundSize = "contain";
        } else if (possible_color == 'cancel') {
            document.body.style.cursor = "";
            color_feedback.style.background = '';
        }
    });
}

function listen_guess_btn() {
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

            document.getElementById('feed-back-text').style.background = '';  // Reset "selected" area to empty

            // Function call to check for win/loss conditions, increment turn otherwise:
            validate_move()

            event.target.setAttribute('color', 'green');
            event.target.setAttribute('title', 'Submit your guess!');
            //event.target.style.color = '#BA0520FF';
            event.target.style.background = "darkgreen";
            event.target.innerText = "Guess!"
        }
    });
}

function listen_directions_btn() {
    //handle mouse clicks on direction area
    document.getElementById('directions_btn').addEventListener("click", function (event) {
        show_directions()
    });
}




//let colors = ['DeNada', 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'square', 'diamond', 'asterisk', 'cro
function create_bindings() {
    // Handle user having a game piece picked up and user hits "escape", then drop the game piece
    window.addEventListener("keydown", function(event) {
        let feedback_Area = document.getElementById('feed-back-text');
        if (`${event.key}` == "Escape") { document.body.style.cursor = "" }
        else if (`${event.key}` == "r") {
            document.body.style.cursor = `url('assets/game_pieces/red.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/red.png') center center / contain no-repeat`;
        } else if (`${event.key}` == "g") {
            document.body.style.cursor = `url('assets/game_pieces/green.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/green.png') center center / contain no-repeat`;
        } else if (`${event.key}` == "b") {
            document.body.style.cursor = `url('assets/game_pieces/blue.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/blue.png') center center / contain no-repeat`;
        }
        else if (`${event.key}` == "o"){
            document.body.style.cursor = `url('assets/game_pieces/orange.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/orange.png') center center / contain no-repeat`;
        }
        else if (`${event.key}` == "v" && pieces >= 5){
            document.body.style.cursor = `url('assets/game_pieces/violet.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/violet.png') center center / contain no-repeat`;
        }
        else if (`${event.key}` == "p" && pieces >= 5){
            document.body.style.cursor = `url('assets/game_pieces/violet.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/violet.png') center center / contain no-repeat`;
        }
        else if (`${event.key}` == "y" && pieces >= 6){
            document.body.style.cursor = `url('assets/game_pieces/yellow.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/yellow.png') center center / contain no-repeat`;
        }
        else if (`${event.key}` == "s" && pieces >= 7){
            document.body.style.cursor = `url('assets/game_pieces/square.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/square.png') center center / contain no-repeat`;
        }
        else if (`${event.key}` == "d" && pieces >= 8){
            document.body.style.cursor = `url('assets/game_pieces/diamond.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/diamond.png') center center / contain no-repeat`;
        }
        else if (`${event.key}` == "a" && pieces >= 9){
            document.body.style.cursor = `url('assets/game_pieces/asterisk.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/asterisk.png') center center / contain no-repeat`;
        }
        else if (`${event.key}` == "c" && pieces >= 10){
            document.body.style.cursor = `url('assets/game_pieces/cross.png'), pointer`;
            feedback_Area.style.background = `url('assets/game_pieces/cross.png') center center / contain no-repeat`;
        }
    }, true);
}

// function show_directions draws the game directions menu, and restores the game from it's saved state
// when the directions menu is closed.
// :params: None
// :return: none
function show_directions() {
    let gameBoard = document.getElementById('game-container')
    let nodeListLength = gameBoard.children.length

    // Save gameboard elements into divArray:
    let divArray = save_game_state(gameBoard, nodeListLength);

    // Create the instructions menu:
    initialize_directions(gameBoard);

    create_hidden(gameBoard);  // Handle if user clicks on a game-pice with directions open

    handle_close_directions(gameBoard, nodeListLength, divArray)

}

// function save_game_state will save the current game board, so that the directions menu
// can be displayed, and the game board restored later from it's saved state.
// :param board: DOM reference to the game-container DIV element
// :return: divArray_temp (type array), an array of the saved HTML elements of the current game state
function save_game_state(board, nodeLength) {
    let divArray_temp = ['DeNada']
    // Save the center game board and right panel into an array of DIVs

    for (let index = 1; index < nodeLength; index++)
    {
        divArray_temp.push(board.children[index])
    }
    // delete the gameBoard center panel and the right panel
    for (let index = 1; index < nodeLength; index++)
    {
        board.children[1].remove();
    }
    return divArray_temp
}

function initialize_directions(board) {
    let instructDIV = document.createElement("div")
    board.appendChild(instructDIV)
    board.children[1].id = "instructions-panel"
    let directions = document.createElement("div")
    board.children[1].appendChild(directions)
    board.children[1].children[0].id = "written-directions"
    board.children[1].children[0].innerHTML =
        "<br><b>Game Instructions:</b> <p>There are 4 randomly chosen colors on the top row (hidden). " +
        "This is the code created by the CPU. You are the codebreaker and must guess this code in as few " +
        "turns as possible." +
        "<p>1) The other empty rows are the amount of turns you have to correctly guess the colors and " +
        "their correct position." +
        "<p>2) Try picking up game pieces and placing them on the current row where it is your turn." +
        "<p>3) If you think you have a good guess, hit submit." +
        "<p>4) You will receive feedback from the CPU. A black dot means you guessed a correct color AND position. " +
        "A white dot means you guessed a correct color, but it's in the wrong position. An empty dot means that one of " +
        "your colors you guessed is not in the secret code." +
        "<p>5) If you guessed the 4 correct colors and 4 correct positions before running out of turns, you win! If " +
        "you run out of turns to guess, you lose." +
        "<p>6) Choose you difficulty level and play again!" +
        "<br><b><p>Gamepiece Selection Hotkeys:</p></b>" +
        "<p>&#8226;<b>R</b> - Red</p>" +
        "<p>&#8226;<b>G</b> - Green</p>" +
        "<p>&#8226;<b>B</b> - Blue</p>" +
        "<p>&#8226;<b>O</b> - Orange</p>" +
        "<p>&#8226;<b>P, V</b> - Purple / Violet</p>" +
        "<p>&#8226;<b>Y</b> - Yellow</p>" +
        "<p>&#8226;<b>S</b> - Square</p>" +
        "<p>&#8226;<b>D</b> - Diamond</p>" +
        "<p>&#8226;<b>A</b> - Asterisk</p>" +
        "<p>&#8226;<b>C</b> - Cross</p>" +
        "<p>&#8226;<b>Escape</b> - Deselect</p>" +
        "<p>&#8226; Want to learn more? Read about Mastermind with " +
        "<a href='https://en.wikipedia.org/wiki/Mastermind_(board_game)' target='_new'" +
        " title='Mastermind Wikipedia Page'>THIS</a> Wikepedia link.</p>" +
        "<p>&#8226; Visual learner? Click <a href='https://www.youtube.com/watch?v=dMHxyulGrEk' target='_new' " +
        "title='Youtube link'>HERE</a> to watch an instructional video on Youtube.</p>"
    let close = document.createElement("div")
    board.children[1].appendChild(close)
    board.children[1].children[1].id = "close-directions"
    board.children[1].children[1].innerText = "X"
    board.children[1].children[1].setAttribute('title', `Close directions`);
}

// Create a hidden, unused feedback area, in event user clicks a game piece while directions are open.
// Prevents developer console error message: "Cannot read property 'style' of null"
function create_hidden(board) {
    let feedbackHidden = document.createElement("div")
    feedbackHidden.id = "feed-back-text"
    feedbackHidden.style.width = '0px';
    feedbackHidden.style.height = '0px';
    board.children[1].appendChild(feedbackHidden)
}

function handle_close_directions(board, listLength, div_array) {
    // Await user to click on the "X" to close directions
    document.getElementById('close-directions').addEventListener("click", function(event) {
        // Delete the instructions DIV node:
        board.children[1].remove();

        // rebuild the gameBoard center panel and the right panel
        for (let index = 1; index < listLength; index++)
        {
            board.appendChild(div_array[index]);
        }
    });
}
function backgroundMS() {
    fetch('https://nature-image-web-scraper.wl.r.appspot.com/a-nature-image',
        {method: 'GET'})
        .then(response => response.json())
        .then(data => apply_background(data.imageUrl));
    function apply_background(theURL) {
        const page_body = document.body
        page_body.style.backgroundImage = `url(${theURL})`;
    }
}

