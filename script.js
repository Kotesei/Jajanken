'use strict'

// Selects all buttons in HTML
const buttons = document.querySelectorAll("button")

// Jajanken values
const jajankenValues = {
    0: "Rock",
    1: "Paper",
    2: "Scissors"
}

// Scoreboard variables
let playerWins = 0;
let playerLosses = 0;
let playerTies = 0;

// Function to start Rock, Paper, Scissors
function jajanken(npc, player) {

// Handles losing
if (npc > player && !(player === 0 && npc === 2) || player === 2 && npc === 0) {
    console.log(`You Lose! ${jajankenValues[npc]} beats ${jajankenValues[player]}`);
}
// Handles tie
if (npc === player) {
    console.log(`It's a tie! You both picked ${jajankenValues[npc]}`);
}

// Handles win
if (npc < player && !(player === 2 && npc === 0) || player === 0 && npc === 2) {
    console.log(`You win! ${jajankenValues[player]} beats ${jajankenValues[npc]}`);
}
}

// Function to get NPC choice
function getComputerChoice() {
    return Math.floor(Math.random() * 3)
}

// Function to get player choice
function getPlayerChoice(num) {
    return Number(num)
}

// Gives each button an ID, added - 1 to ignore the last button
for (let i = 0; i < buttons.length - 1; i++) {
    buttons[i].id = i
}

// For each button we added an event listener that calls both NPC, and Player choices.
buttons.forEach(button => {

    // Don't add event listener to npc button
    if (button.classList.contains("npc--btn")) return
    button.addEventListener("click", function() {
        jajanken(getComputerChoice(), getPlayerChoice(button.id))
    });
})