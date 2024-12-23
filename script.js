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
let curRounds;

function animateBtns(gameState) {
    // Get the buttons
    const revealBtns = document.querySelectorAll('.container--opponent button')
 
    // Calls animateBtns when game starts and reveals all buttons
    if (gameState === 'start') {
    revealBtns.forEach(btn => {
        btn.style.opacity = "1"
        btn.style.bottom = "0px"
       })

    return
}
    // Calls animateBtns when curRounds >= state
  if (gameState === 'end') {
    endGame();
    revealBtns.forEach(btn => {
        btn.style.opacity = "0"
        btn.style.bottom = "-100px"
       })

       return
  }
    
  
}

// Function to start Rock, Paper, Scissors
function jajanken(npc, player, maxRounds) {
    curRounds++
    
    
    // Shows user the rounds.
    
    // Stop game if current round reaches maxRounds
    if (curRounds >= maxRounds) {
        animateBtns('end');
        
        
        // See if player or NPC has more and say who wins.
        
        updateScore(npc, player, maxRounds);
        
    } else {
        body.firstChild.innerHTML = `Round: <span class="setRounds">${curRounds + 1} / ${maxRounds}</span>`;
   
        // Allow NPC choice to fade in/out and only play once it's called for.
        
        // NPC button is revealed based off the choice they made.
        npcBtn.style.backgroundColor = "white"
        npcBtn.style.backgroundImage = `url(./images/${jajankenValues[npc]}.gif)`
        
        // Check who wins / loses
        updateScore(npc, player, maxRounds);
        
    };
    
    

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

// Function to update score
function updateScore(npc, player, maxRounds) {

    function lose() {
        console.log(`You Lose! ${jajankenValues[npc]} beats ${jajankenValues[player]}`);
        npcScore.innerHTML++
    }
    function win() {
        console.log(`You win! ${jajankenValues[player]} beats ${jajankenValues[npc]}`);
        playerScore.innerHTML++
    }
    function tie() {
        console.log(`It's a tie! You both picked ${jajankenValues[npc]}`);
    }
    function compareScore() {
        const playerPoints = playerScore.innerHTML
        const npcPoints = npcScore.innerHTML

        if (playerPoints > npcPoints) {console.log("You won the game!")
            playerWins++
            wins.innerHTML = ` ${playerWins}`

        };
        if (playerPoints === npcPoints) {console.log("Nobody won!")
            playerTies++
            ties.innerHTML = ` ${playerTies}`
        };
        if (playerPoints < npcPoints) {console.log("You lost the game!")
            playerLosses++
            losses.innerHTML = ` ${playerLosses}`
        };
    }

    function results() {
        if (npc > player && !(player === 0 && npc === 2) || player === 2 && npc === 0){
 
            if (maxRounds > curRounds) lose();
            else compareScore()
        }

        if (npc === player) {
            if (maxRounds > curRounds) tie();
            else compareScore()
        }

        if (npc < player && !(player === 2 && npc === 0) || player === 0 && npc === 2) {
            if (maxRounds > curRounds) win();
            else compareScore()
        }    }

    results();
    // Building one based off rounds

    /*//////////////////////////
    // Handles losing (No rounds)
    if (npc > player && !(player === 0 && npc === 2) || player === 2 && npc === 0) {
        playerLosses++
        lose()
        losses.innerHTML = ` ${playerLosses}`
        
    }
    
    
    // Handles tie (No rounds)
    if (npc === player) {
        playerTies++;
        tie()
        ties.innerHTML = ` ${playerTies}`
        
        
    }
    
    // Handles win (No rounds)
    if (npc < player && !(player === 2 && npc === 0) || player === 0 && npc === 2) {
        playerWins++
        win()
        wins.innerHTML = ` ${playerWins}`
    }
    /////////////////////////////*/
    
    // console.log(`That makes ${playerWins} wins, ${playerLosses} losses, and ${playerTies} ties`);
    console.log(`Game ${curRounds} / ${maxRounds}: Player - ${playerScore.innerHTML} NPC - ${npcScore.innerHTML}`);
}



//////////////////

// Add a h2 element above the game that mentions which round it is currently on.

// Mouse enter player choice
function playerSelectingChoice(e) {
    e.target.style.backgroundImage = `url(./images/${jajankenValues[e.target.id]}.gif)`;
}

// Mouse exit player choice
function playerExitChoice(e) {  e.target.style.backgroundImage = `url(./images/idle.png)`;}

// Player clicks choice
function playerChoice(userInput, rounds) {
    jajanken(getComputerChoice(), getPlayerChoice(userInput), setRounds(rounds))
}



// Create a Play button that takes user input for rounds.
function startGame() {
    curRounds = 0;
    const roundsContainer = `<h2>Start Game!!!<span class="setRounds"></span></h2>`
        body.insertAdjacentHTML("afterbegin", roundsContainer)
        animateBtns('start')
    
        for (let i = 0; i < buttons.length; i++) {
            // If button has either the play--btn or npc--btn don't continue
               if (buttons[i].classList.contains("npc--btn") || buttons[i].classList.contains("play--btn")) return
    
            // Give each button an ID
               buttons[i].id = i

               function playerChoiceHandler() {
                playerChoice(buttons[i].id, 5)
            }
               
               // Give each choice a static fist image
               buttons[i].style.backgroundImage = `url(./images/idle.png)`;
    
               // On mouse enter (hover) it'll play the gif
                buttons[i].addEventListener('mouseenter', playerSelectingChoice)
    
                // On mouse exit it'll switch back to static image
                buttons[i].addEventListener('mouseleave', playerExitChoice)
    
                // Runs the function to get the NPC choice and Player choice
                buttons[i].addEventListener("click", playerChoiceHandler);

            playBtn.removeEventListener("click", startGame)
    } 
   
}

// ends the current game
function endGame() {
    playBtn.addEventListener("click", startGame);

}

// Play Button event listener
playBtn.addEventListener("click", startGame);
    


// Change the scoreboard so that it can tally the rounds and add the score under the players.
//////////////////