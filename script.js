'use strict'

// Selects all buttons in HTML
const buttons = document.querySelectorAll("button")

// Function to start Rock, Paper, Scissors
function jajanken(npc, player) {
console.log(npc);
console.log(player);
}

// Function to get NPC choice
function getComputerChoice() {
    return Math.floor(Math.random() * 3)
}

// Function to get player choice
function getPlayerChoice(num) {
    return num
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