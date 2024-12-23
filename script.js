'use strict'

// HTML elements
const buttons = document.querySelectorAll("button")
const npcBtn = document.querySelector(".npc--btn")
const wins = document.querySelector(".wins")
const losses = document.querySelector(".losses")
const ties = document.querySelector(".ties")

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

// Function to start Rock, Paper, Scissors
function jajanken(npc, player, rounds) {
npcBtn.style.backgroundColor = "white"
npcBtn.style.backgroundImage = `url(./images/${jajankenValues[npc]}.gif)`
// Handles losing
if (npc > player && !(player === 0 && npc === 2) || player === 2 && npc === 0) {
    playerLosses++
    console.log(`You Lose! ${jajankenValues[npc]} beats ${jajankenValues[player]}`);
    losses.innerHTML = ` ${playerLosses}`
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

// Gives each button an ID, added - 1 to ignore the last button
for (let i = 0; i < buttons.length - 1; i++) {
    buttons[i].id = i
    buttons[i].style.backgroundImage = `url(./images/idle.png)`;

    buttons[i].addEventListener('mouseenter', function(e) {
        
        e.target.style.backgroundImage = `url(./images/${jajankenValues[e.target.id]}.gif)`;
    })

    buttons[i].addEventListener('mouseleave', function(e) {
        e.target.style.backgroundImage = `url(./images/idle.png)`;

        
    })

    
}

// For each button we added an event listener that calls both NPC, and Player choices.
buttons.forEach(button => {

    // Don't add event listener to npc button
    if (button.classList.contains("npc--btn")) return
    button.addEventListener("click", function() {
        jajanken(getComputerChoice(), getPlayerChoice(button.id))
    });
})