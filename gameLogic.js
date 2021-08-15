/*******************
Author: Wesley Havens
Date: August 8th, 2021
Title: MasterMind Board Game
Description: This is the primary logic file for the board game. The game board is initialized and
             modified via Javascript DOM manipulation.

******************/

// Define GLOBAL scope variables:
let pieces = 10;  // Default # of game pieces = 10
let turns = 10;   // Default   #   of  turns  = 10
let game_state = "unfinished";
let current_turn = 1;
let colors = ['DeNada', 'red', 'green', 'blue', 'orange', 'violet', 'yellow', 'square', 'diamond', 'asterisk', 'cross']
let winning_combo = [];
let first_pass = true;
// End GLOBAL variable definitions

/*
Callback function on page load, initialize the difficulty selection menu
:params: none
:return: none
*/
window.addEventListener('DOMContentLoaded', (event) => {
    select_difficulty()
});

/*
Function to draw the difficulty select screen
:params: none
:return: none
*/
function select_difficulty() {
    background_microservice()       // Call microService to receive a random nature image

    // Set up a blank game container:
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

    // Create and handle user clicks on TURN difficulty select area:
    let dif_sect = document.createElement("section");
    game_container.appendChild(dif_sect);
    game_container.children[1].setAttribute("turn_difficulty_select_area", "")
    handle_turn_select(game_container)

    // Create and handle user clicks on COLORS difficulty select area:
    let dif_sect1 = document.createElement("section");
    game_container.appendChild(dif_sect1);
    game_container.children[2].setAttribute("color_difficulty_select_area", "")
    handle_color_select(game_container)
}

/*
Handle user clicks on the start select button
:params: game-container DIV element
:return: none
*/
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

/*
Handle user clicks on the turn select area of the difficult select screen
:params: game-container DIV element
:return: none
*/
function handle_turn_select(game_container) {
    draw_turn_gradient(game_container)
    draw_turn_btns(game_container)

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
            // Select the clicked button:
            setBackground(event.target, "url('assets/images/btn_select.png')", "no-repeat", "100% 100%")
        }
    });
}

/*
Function to draw the difficulty gradient and text overlay for the turn select area
:params: game-container DIV element
:return: none
*/
function draw_turn_gradient(game_container) {
    // Create the difficulty gradient image:
    let difficulty_img = document.createElement("section");
    game_container.children[1].appendChild(difficulty_img);
    game_container.children[1].children[0].setAttribute("difficulty_image", "")

    // Create text overlay for the difficulty gradient image:
    let easy = document.createElement("section");
    let name = document.createElement("section");
    let hard = document.createElement("section");
    game_container.children[1].children[0].appendChild(easy);
    game_container.children[1].children[0].appendChild(name);
    game_container.children[1].children[0].appendChild(hard);
    game_container.children[1].children[0].children[0].innerHTML = "Easier";
    game_container.children[1].children[0].children[1].innerHTML = "(Number of Turns)";
    game_container.children[1].children[0].children[2].innerHTML = "More Difficult";
}

/*
Function to draw the 14 turn buttons for difficulty select menu.
:params: game-container DIV element
:return: none
*/
function draw_turn_btns(game_container) {
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
}

/*
Handle user clicks on the color select area of the difficulty select screen
:params: game-container DIV element
:return: none
*/
function handle_color_select(game_container) {
    draw_color_gradient(game_container)
    draw_color_btns(game_container)

    // Listen for click on difficulty select buttons and update difficulty setting for TURN:
    game_container.children[2].addEventListener("click", function(event) {
        if (event.target.tagName === 'DIV') {
            // "Deselect" all buttons:
            for(let i = 2; i <= 8; i++) {
                game_container.children[2].children[i].style.background = "url('assets/images/btn.png')";
                game_container.children[2].children[i].style.backgroundRepeat = "no-repeat";
                game_container.children[2].children[i].style.backgroundSize = "100% 100%";
            }

            pieces = parseInt(event.target.innerText)  // set the pieces variable to the button's difficulty clicked

            // Select the "clicked" button:
            event.target.style.background = "url('assets/images/btn_select.png')";
            event.target.style.backgroundRepeat = "no-repeat";
            event.target.style.backgroundSize = "100% 100%";
        }
    });
}

/*
Function to draw the difficulty gradient and text overlay for the COLOR select area
:params: game-container DIV element
:returns: none
*/
function draw_color_gradient(game_container) {
    // Create title
    // Create the color gradient area for easy to hard.
    let title_text = document.createElement("section");
    game_container.children[2].appendChild(title_text);
    game_container.children[2].children[0].setAttribute("title_text", "")
    game_container.children[2].children[0].innerHTML = "Welcome to<br><b>Mastermind Board Game</b>" +
        "<br>To begin, select # of color choices and # of turns";

    // Create the color gradient area for easy to hard.
    let difficulty_img = document.createElement("section");
    game_container.children[2].appendChild(difficulty_img);
    game_container.children[2].children[1].setAttribute("difficulty_image", "")

    // Create text overlay for the difficulty gradient image:
    let easy = document.createElement("section");
    let name = document.createElement("section");
    let hard = document.createElement("section");
    game_container.children[2].children[1].appendChild(easy)
    game_container.children[2].children[1].appendChild(name)
    game_container.children[2].children[1].appendChild(hard)
    game_container.children[2].children[1].children[0].innerText = "Easier";
    game_container.children[2].children[1].children[1].innerHTML = "(Color Choices)";
    game_container.children[2].children[1].children[2].innerText = "More Difficult";
}

/*
Function to draw the 10 COLOR buttons for difficulty select menu.
:params: game-container DIV element
:returns: none
*/
function draw_color_btns(game_container) {
    // Draw the [4 to 10] difficulty select: # of COLOR buttons:
    for (let c = 4; c <= 10; c++) {
        let game_container = document.getElementById("game-container");
        let button = document.createElement("div");
        game_container.children[2].appendChild(button);
        button.textContent = `${c}`
    }

    // Default set pieces difficulty to 10 and have this button selected:
    pieces = 10
    game_container.children[2].children[8].style.background = "url('assets/images/btn_select.png')";
    game_container.children[2].children[8].style.backgroundRepeat = "no-repeat";
    game_container.children[2].children[8].style.backgroundSize = "100% 100%";
}

/*
Function to draw the base game board
:params: game-container DIV element
:returns: none
*/
function init_game_board() {
    winning_combo = []         // Reset winning combo
    current_turn = 1           // Reset turns
    game_state = "unfinished"  // Reset game state

    // [Left game panel creation]:
    let left_game_panel = document.createElement("div");
    let game_container = document.getElementById("game-container");
    game_container.innerHTML = "" // Clear the game board

    // Apply different CSS styling from the difficulty select menu prior:
    game_container.style.justifyContent = "start"
    game_container.style.alignContent = "normal"

    game_container.appendChild(left_game_panel)
    game_container.children[0].id = "left-game-panel";

    // [Center Column Creation] (1 of 2)
    // Creates the game guessing rows, where number of rows drawn equals number of TURNS player selected
    for (let row = 1; row <= turns; row++) {
        let game_row = document.createElement("div");
        let game_container = document.getElementById("game-container");
        game_container.appendChild(game_row)
        game_container.children[row].setAttribute('row_number', `${row}`)

        // the game row area gets 90% (key panel already takes 10%), then divide this 90% by # of TURNS.
        // Prevents a row from growing too tall relative to the other rows.
        let row_height = 90 / turns
        game_container.children[row].style.maxHeight = `${row_height}%` //CSS styling to row height by a %'age

        // Initialize the individual sub-elements for each row:
        draw_game_row_elements(row)
    }
    // [Center column creation] (2 of 2)
    // The center column of game_container will fill to 100% with key_panel
    // and already placed game guessing rows:
    let key_panel = document.createElement("div");
    game_container.appendChild(key_panel);
    game_container.children[turns + 1].id = "key-panel";
    game_container.children[turns + 1].innerHTML = "Welcome to<br>MASTERMIND GAME<br>Can you crack the code?"

    // [Right column placement]
    // This will display on a new "rightmost" column based on CSS flex filling center column already
    let right_game_panel = document.createElement("div");
    game_container.appendChild(right_game_panel);
    game_container.children[turns + 2].id = "right-game-panel";

    draw_piece_choices()     // To draw the selectable game pieces on the left column
    gen_win_pieces()         // Randomly generate a secret combination of pieces
    init_right_panel_elements() // To draw the right panel elements
}

/*
Function draw_game_row_elements is a sub function for init_game_board()
Initializes each game row's child elements:
Each game row consists of:
- Current turn green arrow indicator placeholder
- Four empty game piece placement squares
- Peg feedback area:
-         |----> 4 small empty feedback circles
:params: row: type string, current "guess area" row being initialized
:returns: none
*/
function draw_game_row_elements(row) {
    // Select the current row based on the row number passed in:
    let row_string = row.toString();
    let cur_game_row = document.querySelectorAll(`[row_number=${CSS.escape(row_string)}]`);

    // Initialize for the current row:
    // 1) Green arrow placement area
    // 2) The 4 squares where user can place a guess:
    // 3) Peg feed back area
    for (let col = 1; col <= 6; col++) {
        if (col === 1) { // Draw the green arrow placeholder area, and ONLY draw the green arrow for the first turn:
            let green_arrow_area = document.createElement("div");
            cur_game_row[0].appendChild(green_arrow_area)
            let green_arrow = cur_game_row[0].querySelectorAll("div");
            green_arrow[0].setAttribute("t_num", `${row}`);
            if (col == 1 && row == 1) {
                green_arrow[0].setAttribute("arrow", "green");
                green_arrow[0].style.background = "no-repeat url('assets/images/green_arrow.png') center";
                green_arrow[0].style.backgroundSize = "contain"
            } else {
                green_arrow[0].setAttribute("arrow", "null");
                green_arrow[0].innerHTML = ""
            }

        } else if (col === 6) { // Create the peg feedback placement area:
            let piece_placement_area = document.createElement("div");
            cur_game_row[0].appendChild(piece_placement_area)
            let cur_piece_area = cur_game_row[0].querySelectorAll("div");
            cur_piece_area[col-1].setAttribute("peg_placement_area", `${col - 1}`);
            for (let i = 1; i < 5; i++) { // create the small 4 peg feedback circles:
                let peg_feedback = document.createElement("div");
                peg_feedback.setAttribute("t_num", `${row}`);
                peg_feedback.setAttribute("feedback_num", `${i}`);
                peg_feedback.style.background = `url('assets/game_pegs/peg_empty.png') center no-repeat`;
                peg_feedback.style.backgroundSize = "contain"
                peg_feedback.id = 'peg_feedback'
                cur_piece_area[col-1].appendChild(peg_feedback)
            }
        } else { // Create the four game piece placement areas:
            let piece_placement_area = document.createElement("div");
            cur_game_row[0].appendChild(piece_placement_area)
            let cur_piece_area = cur_game_row[0].querySelectorAll("div");
            cur_piece_area[col-1].setAttribute("p_num", `${col - 1}`);  // piece number left to right
            cur_piece_area[col-1].setAttribute("t_num", `${row}`);      // Turn number equals the row
            cur_piece_area[col-1].setAttribute("color_choice", "None");
        }
    }
}

/*
Draw the pieces that the player can select from the LEFT panel
:params: none
:returns: none
*/
function draw_piece_choices() {
    let left_panel = document.getElementById("left-game-panel");

    // Add a "padder" section to move the game pieces vertically down a bit with CSS
    let section_padder = document.createElement("section");
    section_padder.id = 'L_panel_top_padding';
    left_panel.appendChild(section_padder);

    // create an empty div so index 0 is ignored, because
    // the game piece colors array starts at index 1:
    let piece_div = document.createElement("div");
    left_panel.appendChild(piece_div)

    // Create game pieces, set the background color to the current piece value, related to the "colors" array:
    // Pieces created starts from 1 (red), to the total number of pieces global value
    for (let piece = 1; piece <= pieces; piece++){
        let piece_div = document.createElement("div");
        left_panel.appendChild(piece_div)
        left_panel.children[piece].setAttribute("color", `${colors[piece]}`)
        left_panel.children[piece].style.background = `url('assets/game_pieces/${colors[piece]}.png') center center / contain no-repeat`;
        // Add in mouse hover information for the user:
        let color_letter_upper = colors[piece][0].toUpperCase()
        left_panel.children[piece].setAttribute('title', `[${color_letter_upper}] Pick up ${colors[piece]} game-piece`);
        left_panel.children[piece].style.backgroundSize = "contain";
    }

    // Initialize the "undo" button area:
    let piece_div1 = document.createElement("div");
    left_panel.appendChild(piece_div1);
    left_panel.children[pieces + 1].setAttribute("color", `cancel`);
    left_panel.children[pieces + 1].innerText = "Undo";
    left_panel.children[pieces + 1].id = 'cancel';
    left_panel.children[pieces + 1].setAttribute('title', `[~] Click on any already placed game piece to remove from current turn.`);
}

/*
Function to randomly generate the winning combination
:params: none
:returns: none
*/
function gen_win_pieces(){
    for (let choice = 1; choice <= 4; choice++){
        // Returns a random integer from 1 to number of game  piece colors in play
        let rand_piece = Math.floor(Math.random() * pieces) + 1;
        winning_combo.push(colors[rand_piece])
    }
}

/*
Function init_right_panel_elements initializes the right game panel items
:params: none
:returns: none
*/
function init_right_panel_elements() {
    // Column reverse ordering has priority on the CSS, so place items bottom to top as they appear
    let r_panel = document.getElementById('right-game-panel')

    // Create the submit button
    let div1 = document.createElement("div")
    div1.id = "submit_btn"
    div1.setAttribute('color', 'green');
    div1.setAttribute('title', '[Spacebar] Submit your guess!');
    div1.innerText = "Guess!"
    r_panel.appendChild(div1)

    // Create an outer container to hold the "selected" color user feedback area
    let clr_btn_ctnr = document.createElement("div")
    clr_btn_ctnr.id = "color_btn_container"
    r_panel.appendChild(clr_btn_ctnr)

    // Create an inner center dotted box area for the "selected" area to give feedback about selected piece
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


/*
Helper function for function listen_gameboard()
Function parse_pointer_name only returns the "color" string in the cursor options. Used to extract
the selected color from the cursor, to potentially place it on the gameboard.
:params: str_cursor, the cursor information
:returns: string representing the color currently selected as mouse cursor, empty string otherwise.
*/
function parse_pointer_name(str_cursor) {
    let string = ""
    let write = 0
    for (let i = 0; i < str_cursor.length; i++) {
        if (str_cursor[i] === '/') { // Bypass the first two /'s before writing the string
            write += 1
            continue;
        } else if (str_cursor[i] === '.') { // break out of for loop, reached the file name extension ".png"
            write = false
            break;
        } else if (write === 2){  // Reached the "color" portion of the input string, start building the output string
            string += str_cursor[i]
        }
    }
    return string
}

/*
Function call to check for win/loss conditions, increment turn otherwise:
:params: none
:returns: none
*/
function validate_move() {
    document.body.style.cursor = ""        // Reset cursor after submission of a guess
    let game_container = document.getElementById('game-container')

    // Sub elements to contain: Left panel, all guess rows, key panel, and Right panel
    let sub_elements = game_container.childNodes;
    let row_combo = []

    // current turn equals the index of the child node of sub elements (points to guess row).
    // Meaning: guess row number = current turn
    sub_elements[current_turn].childNodes.forEach((child) => {
        // Below- grab the "color_choice" value of each game piece placement square:
        // Ignores green arrow area and peg placement area, since these have no attribute "color_choice"
        let tmp_selection = child.getAttribute("color_choice")
        if (tmp_selection != null) {
            row_combo.push(tmp_selection)  // Push the color value into array row_combo
        }
    });

    // Logic below to find perfect matches, and general matches
    let perfect_match = 0
    let general_match = 0

    // Make shallow copy of winning_combo using spread operator
    let winning_combo_spread = [...winning_combo]

    // Iterate the four colors in the row combination, and the winning combination, checking for perfect matches:
    for (let i = 0; i < winning_combo_spread.length; i++ ){
        if (winning_combo_spread[i] === row_combo[i]) { // Compare the winning combo element to the row combination
            perfect_match += 1;  // If both arrays match at the current index, means we have a perfect match

            // Delete the array element of the "perfect match" found, so we dont accidentally find it again:
            // Delete from both arrays being searched.
            row_combo.splice(i, 1)            // Delete match found in the current row color combination
            winning_combo_spread.splice(i, 1) // Delete match found in the winning combination deep copy
            i -= 1; // Decrement index, since the "next" value now occupies this index # just deleted.
        }
    }

    // Now search for general matches (same color, wrong position)
    // Iterate through remaining winning combo elements, looking for value matches in all of row  array
    for (let i = 0; i < winning_combo_spread.length; i++ ){
        // if conditional entered IF we found a winning combination color in row combo:
        if (row_combo.indexOf(winning_combo_spread[i]) != -1) {
            let pop_index = row_combo.indexOf(winning_combo_spread[i])  // So grab the index to this number in row combo
            general_match += 1
            row_combo.splice(pop_index, 1)  // Delete the value in row combo, since it's already been accounted for
        }
    }

    if (perfect_match == 4) {   // 4 perfect matches means the secret code was solved
        draw_feedback_area(sub_elements, perfect_match, general_match)
        console.log("Win condition found")
        game_state = "won"
        show_solution()
        prompt_replay()
    } else {  // Else show peg feedback, increment turn
        draw_feedback_area(sub_elements, perfect_match, general_match)
        increment_turn(sub_elements)
    }

}

/*
Function draw_feedback_area is called after validate_move(), to give peg feedback for the made move.
:param sub_elements: array of all game-board children
:param perfect_matches: Perfect matches found for the guess just submitted.
:param partial_matches: Partial matches found for the guess just submitted.
:returns: none
*/
function draw_feedback_area(sub_elements, perfect_matches, partial_matches) {
    // Point to div container current guess row, where guess row # = the current turn
    let feed_back_area = sub_elements[current_turn].childNodes;

    // Now make the variable point to the four feedback peg sub elements
    // Feedback area is the 5th child node of the row turn
    feed_back_area = feed_back_area[5].childNodes;

    // Apply background based on # of perfect matches, # of partial matches, or if no matches remaining
    for (let i = 0; i < 4; i++) {
        if (perfect_matches > 0) { // Still have perfect matches to display, draw a "black" peg:
            feed_back_area[i].style.background = `url('assets/game_pegs/peg_correct.png') center no-repeat`;
            perfect_matches -= 1; // decrement perfect matches, since one was just drawn to feedback area
        } else if (partial_matches > 0) { // Still have partial matches to display, draw a "white" peg:
            feed_back_area[i].style.background = `url('assets/game_pegs/peg_almost_correct.png') center no-repeat`;
            partial_matches -= 1; // decrement partial matches, since one was just drawn to feedback are
        } else { // No perfect or partial matches remaining, draw an "empty" peg.
            feed_back_area[i].style.background = `url('assets/game_pegs/peg_empty.png') center no-repeat`;
        }
        feed_back_area[i].style.backgroundSize = "contain"
    }
}

/*
Function increment_turn does these tasks:
1) Increment the current turn
2) Check if current turn is > turns
        |--- If yes, end game on a loss condition
3) Otherwise, move the game arrow to the next turn "guess row"
:param sub_elements: array of all game-board children
:returns: none
*/
function increment_turn(sub_elements) {
    current_turn += 1;
    if (current_turn > turns) {
        console.log("Loss condition detected: Out of turns")
        game_state = "lost"
        show_solution()
        prompt_replay()
    } else {  // Erase current green arrow background for previous turn row:
        let old_arrow_area = sub_elements[current_turn - 1].childNodes
        old_arrow_area[0].setAttribute("null", "");
        old_arrow_area[0].setAttribute("arrow", "null");
        old_arrow_area[0].style.background = "";

        // Display arrow on row for the current turn:
        let new_arrow_area = sub_elements[current_turn].childNodes
        new_arrow_area[0].setAttribute("arrow", "green");
        new_arrow_area[0].style.background = "url('assets/images/green_arrow.png') center center / contain no-repeat";
    }
}

/*
Function to be called on win/loss condition detection. Displays the secret code on the top center.
:params: none
:returns: none
*/
function show_solution() {
    let key_panel = document.getElementById('key-panel')
    key_panel.innerHTML = ""         // Erase current right panel content
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

/*
Function to be called on win/loss condition detection. Shows a win/loss prompt on right panel and creates
a "new Game" button there as well.
:params: none
:returns: none
*/
function prompt_replay() {
    let r_panel = document.getElementById('right-game-panel')
    r_panel.innerHTML = ""
    r_panel.style.flexDirection = 'column';
    r_panel.style.justifyContent = 'start';

    let div1 = document.createElement("div");
    r_panel.appendChild(div1).id = "win_loss_Prompt"
    r_panel.children[0].innerText = `You ${game_state}! Click the button below to return to the difficulty selection screen:`;

    // Create new game button
    let new_game_btn = document.createElement("div")
    r_panel.appendChild(new_game_btn)
    r_panel.children[1].id = "new_game_btn"
    r_panel.children[1].innerText = "New Game"
    r_panel.children[1].setAttribute('title', `Click to return to difficulty select screen`);

    document.getElementById('new_game_btn').addEventListener("click", () => {select_difficulty()});
}
/*
Function listen_gameboard adds event listeners to the gameboard elements to listen for user
mouse clicks and key presses (where the user can place pieces)
:params: none
:returns: none
*/
function listen_gameboard(){
    let all_pieces = document.querySelectorAll('[p_num]')
    // Listen to game board where user can place game pieces:
    all_pieces.forEach((element) => {
        element.addEventListener('click', function(event) {
            if (event.target.getAttribute('t_num') == current_turn.toString()
                && document.body.style.cursor !== ""){

                // Grab the current pointer color from the cursor info
                let gp_color = parse_pointer_name(document.body.style.cursor)

                // Place the selected game piece on the guess row:
                event.target.style.background = `no-repeat url('assets/game_pieces/${gp_color}.png') center`;
                event.target.style.backgroundSize = "65%";
                event.target.setAttribute('color_choice', `${gp_color}`)
            } else if (event.target.getAttribute('t_num') == current_turn.toString()
                && document.body.style.cursor === "") {
                event.target.style.background = ``;
                event.target.setAttribute('color_choice', "")
            }
        });
    });
}

/*
Function standby_game adds event listeners to the gameboard elements to listen for user
mouse clicks and key presses (on the other elements)
:params: none
:returns: none
*/
function standby_game() {
    listen_left_panel();
    listen_guess_btn();
    listen_directions_btn();

    // Bind the hotkeys only once, rebinding them causes multiple events to be triggered by each rebinding
    if (first_pass === true) {
        first_pass = false;
        create_bindings();          // Create hotkey bindings
    }
    listen_gameboard();         // Listen where the user can place pieces
}

/*
listen_left_panel() adds event listeners to the gameboard elements to listen for user
mouse clicks and key presses (on the other elements)
:params: none
:returns: none
*/
function listen_left_panel() {
    //handle user picking up game piece on left panel
    document.getElementById('left-game-panel').addEventListener("click", function(event) {;
        let possible_color = event.target.getAttribute('color')
        let color_feedback = document.getElementById('feed-back-text');
        if (colors.includes(possible_color)) { // Set cursor icon to clicked gamepiece icon
                                               // and set feedback are to gamepiece icon on Right Panel
            document.body.style.cursor = `url('assets/game_pieces/${possible_color}.png'), pointer`
            color_feedback.style.background = `url('assets/game_pieces/${possible_color}.png') center center / contain no-repeat`;
            color_feedback.style.backgroundSize = "contain";
        } else if (possible_color == 'cancel') {// If user clicked cancel
            document.body.style.cursor = "";
            color_feedback.style.background = '';
        }
    });
}

/*
listen_guess_btn() listens for clicks on the guess button, and switches between "submit" and "confirm" states
:params: none
:returns: none
*/
function listen_guess_btn() {
    // Handle mouse clicks on guess button:
    document.getElementById('submit_btn').addEventListener("click", function(event) {
        let possible_color = event.target.getAttribute('color')
        if (possible_color == 'green' ){
            event.target.setAttribute('color', 'red');
            event.target.setAttribute('title', '[Spacebar] Confirm');
            //event.target.style.color = '#BA0520FF';
            event.target.style.background = "#BA0520FF";
            event.target.innerText = "Confirm"
        } else if (possible_color == 'red' ){
            document.getElementById('feed-back-text').style.background = '';  // Reset "selected" area to empty
            // Function call to check for win/loss conditions, increment turn otherwise:
            validate_move()
            event.target.setAttribute('color', 'green');
            event.target.setAttribute('title', '[Spacebar] Submit your guess!');
            //event.target.style.color = '#BA0520FF';
            event.target.style.background = "darkgreen";
            event.target.innerText = "Guess!"
        }
    });
}

/*
listen_directions_btn() listens for clicks on the directions button
:params: none
:returns: none
*/
function listen_directions_btn() {
    //handle mouse clicks on direction area
    document.getElementById('directions_btn').addEventListener("click", function (event) {
        show_directions()
    });
}

/*
create_bindings() creates hotkey binding for game pieces and submit button
:params: none
:returns: none
*/
function create_bindings() {
    // Handle user having a game piece picked up and user hits "~", then drop the game piece
    window.addEventListener("keypress", function(event) {

        let feedback_Area = document.getElementById('feed-back-text');

        // Handle situations where the game does not currently have
        // a feedback_Area (directions menu open, difficulty select screen open, win/loss prompt displayed)
        if (feedback_Area === null) { return; }

        // Switch like statement to handle key presses to select game pieces and submit button
        if (`${event.key}` === "`"){
            document.body.style.cursor = ""
            feedback_Area.style.background = ``;
        }
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
        else if (`${event.key}` == " ") { // Space bar hotkey, same functionality below as listen_guess_btn()
            let sbmt_btn = document.getElementById('submit_btn')

                // Handle situations where the game does not currently have
                // a submit button (ie directions menu open, difficulty select screen open, win/loss prompt displayed)
                if (sbmt_btn === null) { return; }

                let possible_color = sbmt_btn.getAttribute('color')
                if (possible_color == 'green' ){
                    sbmt_btn.setAttribute('color', 'red');
                    sbmt_btn.setAttribute('title', '[Spacebar] Confirm');
                    sbmt_btn.style.background = "#BA0520FF";
                    sbmt_btn.innerText = "Confirm"
                } else if (possible_color == 'red' ){
                    document.getElementById('feed-back-text').style.background = '';  // Reset "selected" area to empty
                    // Function call to check for win/loss conditions, increment turn otherwise:
                    validate_move()
                    sbmt_btn.setAttribute('color', 'green');
                    sbmt_btn.setAttribute('title', '[Spacebar] Submit your guess!');
                    sbmt_btn.style.background = "darkgreen";
                    sbmt_btn.innerText = "Guess!"
                }
        }
    }, true);
}

/*
Function show_directions draws the game directions menu, and restores the game from it's saved state
when the directions menu is closed.
:params: none
:returns: none
*/
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

/*
Function save_game_state will save the current game board, so that the directions menu
can be displayed, and the game board restored later from it's saved state.
:param board: DOM reference to the game-container DIV element
:return: divArray_temp (type array), an array of the saved HTML elements of the current game state
*/
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

/*
Function initialize_directions will draw the game directions screen
:param board: DOM reference to the game-container DIV element
:return: none
*/
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
        "<p>5) If you guessed the 4 correct colors and 4 correct positions before running out of turns, you win. If " +
        "you run out of turns to guess, you lose." +
        "<p>6) Choose your difficulty level to play again!" +
        "<br><br><b><p>Gamepiece Selection Hotkeys:</p></b>" +
        "<div id=\"hotkey_directions\">" +
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
        "<p>&#8226;<b>Tilde ~</b> - Deselect</p>" +
        "<p>&#8226;<b>Spacebar</b> - Submit Guess/Confirm</p>" +
        "</div>" +
        "<br><p>&#8226; Want to learn more? Read about Mastermind with " +
        "<a href='https://en.wikipedia.org/wiki/Mastermind_(board_game)' target='_new'" +
        " title='Mastermind Wikipedia Page'>THIS</a> Wikepedia link.</p>" +
        "<p>&#8226; Visual learner? Click <a href='https://www.youtube.com/watch?v=dMHxyulGrEk' target='_new' " +
        "title='Youtube link'>HERE</a> to watch an instructional video on Youtube.</p>" +
        "<p>&#8226; View game source files on GitHub <a href='https://github.com/WesDH/MasterMindGame' target='_new' " +
        "title='GitHub'>HERE</a>.</p>" +
        "<p>&#8226; Credit to my Summer 2021 CS361 team member Hae Ji Park, for which their micro-service returns a random nature themed image after an HTTP request is sent, " +
        "which is then applied as the current game's background image.</p>";

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

/*
Function handle_close_directions will handle the user clicking on the "x" button to close directions
:param board: DOM reference to the game-container DIV element
:param listLength: The length the game-container child elements
:param div_array: The saved game board consisting of DIV elements
:return: none
*/
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

/*
Function background_microservice will call the micro-service "random nature image",
then use a callback function to apply the nature image as background
:params" none
:return: none
*/
function background_microservice() {
    fetch('https://nature-image-web-scraper.wl.r.appspot.com/a-nature-image',
        {method: 'GET'})
        .then(response => response.json())
        .then(data => apply_background(data.imageUrl));
    function apply_background(theURL) {
        const page_body = document.body
        page_body.style.backgroundImage = `url(${theURL})`;
    }
}

// Helper function setBackground applies CSS background styling to the target element
function setBackground (target, theURL, repeat, size) {
    target.style.background = `${theURL}`;
    target.style.backgroundRepeat = `${repeat}`;
    target.style.backgroundSize = `${size}`;
}
