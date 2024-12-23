'use strict'

// HTML elements
const buttons = document.querySelectorAll("button")
const playBtn = document.querySelector(".play--btn")
const npcBtn = document.querySelector(".npc--btn")
const playerAction = document.querySelector(".player--action")
const npcAction = document.querySelector(".npc--action")
const revealBtns = document.querySelectorAll('.container--opponent button')
const body = document.querySelector(".body")
const wins = document.querySelector(".wins")
const losses = document.querySelector(".losses")
const ties = document.querySelector(".ties")
const npcScore = document.querySelector(".npcPoints");
const playerScore = document.querySelector(".playerPoints");
const roundsContainer = document.querySelector(".roundh2");


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

// NPC responses
const brainrotResponses = {
    win: [
        "HA! Your pixels are mine! Bow before my superiority, you blinking potato!",
        "I win, I grin, and now I spin!",
        "Victory tastes like... burnt toast and regret. Delicious!",
        "DID YOU EVEN TRY?! Or was that your cat playing for you?!",
        "I am the banana in your cereal! The ultimate disruptor!"
    ],
    loss: [
        "WHAT?! My hands are defective! My brain forgot the controls!",
        "This is fake! Rigged! The simulation hates me!",
        "You cheated. Or I let you win. Or both. Yeah, both!",
        "Nooooo! My dignity! My nonexistent dignity!",
        "It’s fine, I didn’t want to win anyway... (quiet sobbing)... totally fine."
    ],
    tie: [
        "A draw?! What are we, evenly matched spaghetti noodles?!",
        "Guess we both suck! Or we’re both amazing. One of those!",
        "Tie? More like... uh... well, I don’t have a pun. Whatever.",
        "So... does this mean we’re best friends now? Or worst enemies?",
        "A tie? I wanted glory, not... mediocrity! Ugh!"
    ]
};

let timeout;
let timeoutHide;
let timeoutChangeH2;
function animateBtns(gameState, npc) {
    clearTimeout(timeout)
    clearTimeout(timeoutHide)
    clearTimeout(timeoutChangeH2)
 
    // Calls animateBtns when game starts and reveals all buttons
    if (gameState === 'start') {

        playerAction.innerHTML = "";
        npcAction.innerHTML = "";
        npcBtn.style.backgroundImage = `url(./images/idle.png)`
        
    revealBtns.forEach(btn => {
        btn.style.transition = "bottom 1s ease, opacity 5s"
            btn.style.opacity = "1"
            btn.style.bottom = "0px"
            
       })

    return
}


// Ongoing game 
if (gameState === 'ongoing') {
    console.log("still going");
    npcBtn.style.transition = "all 0s"
   
    npcBtn.style.backgroundImage = `url("./images/${jajankenValues[npc]}.gif")`

    timeout = setTimeout(() => {
        npcBtn.style.transition = "all 1s";
        npcBtn.style.backgroundImage = `url("./images/rock.gif")`;

        npcAction.innerHTML = "";
        console.log('Timed Out');
    }, 2000);


    
}
    // Calls animateBtns when curRounds >= state
  if (gameState === 'end') {
    roundsContainer.innerHTML = "Game Ended!"
     revealBtns.forEach(btn => {
            btn.style.transition = "bottom 5s ease, opacity 4s ease"
            btn.style.opacity = "0"
        })
    timeoutHide = setTimeout(() => {
        revealBtns.forEach(btn => {
            btn.style.bottom = "-100px"
            
           })
           return
    }, 1000)

    timeoutChangeH2 = setTimeout(() => {
roundsContainer.innerHTML = "Start New Game?"
    }, 2500)
   
  }
    
  
}

// Function to cappitalize first letter
function capitalize(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1)
}

// Function to start Rock, Paper, Scissors
function jajanken(npc, player, maxRounds) {
    curRounds++
    // Shows user the rounds.
    animateBtns("ongoing", npc)


    // Stop game if current round reaches maxRounds
    if (curRounds >= maxRounds) {
        endGame();
        
        // See if player or NPC has more and say who wins.
        updateScore(npc, player, maxRounds);
        
    } else {
        console.log(roundsContainer.innerHTML);
        roundsContainer.innerHTML = `Round: <span class="setRounds">${curRounds + 1} / ${maxRounds}</span>`;
   
        // Allow NPC choice to fade in/out and only play once it's called for.
        
        // NPC button is revealed based off the choice they made.
   
        
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
    playerAction.innerHTML = `You picked ${jajankenValues[player]}!`
    npcAction.innerHTML = capitalize(jajankenValues[npc])

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
        const randomIndex = Math.floor(Math.random() * 4)
    

        if (playerPoints > npcPoints) {console.log("You won the game!")
            playerWins++
            wins.innerHTML = ` ${playerWins}`
            npcAction.innerHTML = brainrotResponses.loss[randomIndex];
            
            
        };
        if (playerPoints === npcPoints) {console.log("Nobody won!")
            playerTies++
        ties.innerHTML = ` ${playerTies}`
        npcAction.innerHTML = brainrotResponses.tie[randomIndex]
    };
    if (playerPoints < npcPoints) {console.log("You lost the game!")
        playerLosses++
    losses.innerHTML = ` ${playerLosses}`
    npcAction.innerHTML = brainrotResponses.win[randomIndex]
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
    
    
    // console.log(`That makes ${playerWins} wins, ${playerLosses} losses, and ${playerTies} ties`);
    console.log(`Game ${curRounds} / ${maxRounds}: Player - ${playerScore.innerHTML} NPC - ${npcScore.innerHTML}`);
}


// Mouse enter player choice
function playerSelectingChoice(e) {
    e.target.style.backgroundImage = `url(./images/${jajankenValues[e.target.id]}.gif)`;
}

// Mouse exit player choice
function playerExitChoice(e) {  e.target.style.backgroundImage = `url(./images/idle.png)`;}

// Player clicks choice
function playerChoice(userInput, rounds) {
    jajanken(getComputerChoice(), getPlayerChoice(userInput), rounds)
}



// Create a Play button that takes user input for rounds.
function startGame() {
    animateBtns('start')
    let gameRounds = setRounds(5)
    curRounds = 0;
    npcScore.innerHTML = 0
    playerScore.innerHTML = 0
    // h2 element above the game that mentions which round it is currently on.
    
    const insertRounds = `Round: <span class="setRounds">${curRounds + 1} / ${gameRounds}</span>`
    
    roundsContainer.innerHTML = insertRounds

    
    

       

        
    
    for (let i = 0; i < buttons.length; i++) {
        // If button has either the play--btn or npc--btn don't continue
        if (buttons[i].classList.contains("npc--btn") || buttons[i].classList.contains("play--btn")) return
        
        // Give each button an ID
        buttons[i].id = i
        
        // Player sets choice
 

       buttons[i].playerChoiceHandler = function (e) {
        playerChoice(buttons[i].id, gameRounds);
    };
        
   
        
        // Give each choice a static fist image
        buttons[i].style.backgroundImage = `url(./images/idle.png)`;
        
        // On mouse enter (hover) it'll play the gif
        buttons[i].addEventListener('mouseenter', playerSelectingChoice)
        
        // On mouse exit it'll switch back to static image
        buttons[i].addEventListener('mouseleave', playerExitChoice)
        
        // Runs the function to get the NPC choice and Player choice
        buttons[i].addEventListener("click", buttons[i].playerChoiceHandler);
        

            playBtn.removeEventListener("click", startGame)
    } 
   
}

// ends the current game
function endGame() {
    animateBtns('end');
    for (let i = 0; i < buttons.length; i++) {
        // If button has either the play--btn or npc--btn don't continue
        if (buttons[i].classList.contains("npc--btn") || buttons[i].classList.contains("play--btn")) return 

         // On mouse enter (hover) it'll play the gif
     buttons[i].removeEventListener('mouseenter', playerSelectingChoice)
        
     // On mouse exit it'll switch back to static image
     buttons[i].removeEventListener('mouseleave', playerExitChoice)
     
     // Runs the function to get the NPC choice and Player choice
     buttons[i].removeEventListener("click", buttons[i].playerChoiceHandler);
    playBtn.addEventListener("click", startGame);
    
    }
    
   


}

// Play Button event listener
playBtn.addEventListener("click", startGame);
    


// Change the scoreboard so that it can tally the rounds and add the score under the players.
//////////////////