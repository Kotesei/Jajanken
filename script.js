'use strict'

// HTML elements
const buttons = document.querySelectorAll("button")
const playBtn = document.querySelector(".play--btn")
const npcBtn = document.querySelector(".npc--btn")
const body = document.querySelector(".body")
const wins = document.querySelector(".wins")
const losses = document.querySelector(".losses")
const ties = document.querySelector(".ties")
const npcScore = document.querySelector(".npcPoints");
const playerScore = document.querySelector(".playerPoints");

// Jajanken values
const jajankenValues = {
    0: "rock",
    1: "paper",
    2: "scissors"
}

// Scoreboard variables
let playerWins = 0;
let playerLosses = 0;
let playerTies = 0;
let curRounds = 0;


// Function to start Rock, Paper, Scissors
function jajanken(npc, player, maxRounds) {
    // Stop game if current round reaches maxRounds
    if (curRounds >= maxRounds) {
        // See if player or NPC has more and say who wins.
        return
    };
    curRounds++

    // Shows user the rounds.
    body.firstChild.innerHTML = `Round: <span class="setRounds">${curRounds} / ${maxRounds}</span>`;
   
// Allow NPC choice to fade in/out and only play once it's called for.

// NPC button is revealed based off the choice they made.
npcBtn.style.backgroundColor = "white"
npcBtn.style.backgroundImage = `url(./images/${jajankenValues[npc]}.gif)`

// Handles losing
if (npc > player && !(player === 0 && npc === 2) || player === 2 && npc === 0) {
    playerLosses++
    console.log(`You Lose! ${jajankenValues[npc]} beats ${jajankenValues[player]}`);
    losses.innerHTML = ` ${playerLosses}`
    npcScore.innerHTML++

}


// Handles tie
if (npc === player) {
    playerTies++;
    console.log(`It's a tie! You both picked ${jajankenValues[npc]}`);
    ties.innerHTML = ` ${playerTies}`
    
    
}

// Handles win
if (npc < player && !(player === 2 && npc === 0) || player === 0 && npc === 2) {
    playerWins++
    console.log(`You win! ${jajankenValues[player]} beats ${jajankenValues[npc]}`);
    wins.innerHTML = ` ${playerWins}`
    playerScore.innerHTML++
}

console.log(`That makes ${playerWins} wins, ${playerLosses} losses, and ${playerTies} ties`);

}

// Function to get NPC choice
function getComputerChoice() {
    return Math.floor(Math.random() * 3)
}

// Function to get player choice
function getPlayerChoice(num) {
    return Number(num)
}

// Function to set rounds
function setRounds(num) {
    return Number(num)
}



//////////////////

// Add a h2 element above the game that mentions which round it is currently on.


// Create a Play button that takes user input for rounds.
playBtn.addEventListener("click", function() {
    const roundsContainer = `<h2>Start Game!!!<span class="setRounds"></span></h2>`
    body.insertAdjacentHTML("afterbegin", roundsContainer)
   

    for (let i = 0; i < buttons.length; i++) {
        // If button has either the play--btn or npc--btn don't continue
           if (buttons[i].classList.contains("npc--btn") || buttons[i].classList.contains("play--btn")) return

        // Give each button an ID
           buttons[i].id = i
           
           // Give each choice a static fist image
           buttons[i].style.backgroundImage = `url(./images/idle.png)`;

           // On mouse enter (hover) it'll play the gif
            buttons[i].addEventListener('mouseenter', function(e) {
                
                e.target.style.backgroundImage = `url(./images/${jajankenValues[e.target.id]}.gif)`;})

            // On mouse exit it'll switch back to static image
            buttons[i].addEventListener('mouseleave', function(e) {

                e.target.style.backgroundImage = `url(./images/idle.png)`;})

            // Runs the function to get the NPC choice and Player choice
            buttons[i].addEventListener("click", function() {

                jajanken(getComputerChoice(), getPlayerChoice(buttons[i].id), setRounds(5))
        });

}

// Only listen once.
}, {once: true})


// Change the scoreboard so that it can tally the rounds and add the score under the players.
//////////////////