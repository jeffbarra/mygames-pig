"use strict";

// Selecting Elements by ID NOT Class

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0"); // Player 1 Score
const score1El = document.getElementById("score--1"); // Player 2 Score
const current0El = document.getElementById("current--0"); // Current Score for Player 1
const current1El = document.getElementById("current--1"); // Current Score for Player 2

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Starting Conditions
const init = function () {
  scores = [0, 0]; // Big score display for each player [Player 1, Player 2]
  currentScore = 0;
  activePlayer = 0; // Current Player (0 = Player 1)
  playing = true;

  score0El.textContent = 0; // Makes text inside Score 0 Element = 0
  score1El.textContent = 0; // Makes text inside Score 1 Element = 0
  current0El.textContent = 0; // Makes text inside Current Score = 0
  current1El.textContent = 0; // "  "

  diceEl.classList.add("hidden"); // Hides the dice element
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // Selects current player and sets their score to "0"
  currentScore = 0; // Larger score display is "0"
  activePlayer = activePlayer === 0 ? 1 : 0; // If current player is Player 0, then new active player is 1 - ELSE player 0
  player0El.classList.toggle("player--active"); // Toggles the shading of current player
  player1El.classList.toggle("player--active"); // Toggles the shading of current player
};

// Rolling Dice Functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; // Random number between 1 - 6 (no decimals)
    diceEl.classList.remove("hidden"); // Dice Element will be displayed
    diceEl.src = `dice-${dice}.png`; // Picture of corresponding dice roll will be displayed in Dice Element area

    if (dice !== 1) {
      // If any number > 1 is rolled, the dice number gets added to the score
      currentScore += dice; // Dice number is added to the current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Selects the score of the current player (active player)
    } else {
      // If "1" is rolled, current player (Active Player) loses turn and players are switched

      switchPlayer();
    }
  }
});

// What Happens When Player Clicks "Hold"

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore; // Add current score to active player's total score

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // Displays Active Players score

    // 2. Check if player's score is >= 100

    if (scores[activePlayer] >= 100) {
      // Finish the game!

      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer(); // Switch to the next player
    }
  }
});

btnNew.addEventListener("click", init); // Calls function from above and resets game
