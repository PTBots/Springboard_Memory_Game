document.addEventListener("DOMContentLoaded", function() {
// const gameContainer = document.getElementById("game");
// let noClick = false;
const cards = document.querySelectorAll(".card");
let numCards= cards.length;
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let currentScore = 0;
let lowScore = localStorage.getItem("low-score");
let start = document.getElementById("start");

if (lowScore) {
  document.getElementById("best-score").innerText = lowScore;
}

for (let card of cards) {
  card.addEventListener("click", handleCardClick);
}

function setScore(newScore) {
  currentScore = newScore;
  document.getElementById("current-score").innerText = currentScore;
}

function shuffle(array) {
  let arrayCopy = array.slice();
  for (let index1 = arrayCopy.length - 1; index1 > 0; index1--) {
    let index2 = Math.floor(Math.random() * (index1 + 1));
    
    let temp = arrayCopy[index1];
    arrayCopy[index1] = arrayCopy[index2];
    arrayCopy[index2] = temp;
  }
  return arrayCopy;
}

let startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", startGame);

function startGame() {
  setScore(0);
  start.classList.add("playing");
  let indices = [];
  for (let i = 1; i <= numCards / 2; i++) {
    indices.push(i.toString());
  }
  let pairs = shuffle(indices.concat(indices));

  for (let i = 0; i < cards.length; i++) {
    let path = "gifs/" + pairs[i] + ".gif";
    cards[i].children[1].children[0].src = path;
  }
}

// const COLORS = [
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple",
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple"
// ];

// // here is a helper function to shuffle an array
// // it returns the same array with values shuffled
// // it is based on an algorithm called Fisher Yates if you want ot research more
// function shuffle(array) {
//   let counter = array.length;

//   // While there are elements in the array
//   while (counter > 0) {
//     // Pick a random index
//     let index = Math.floor(Math.random() * counter);

//     // Decrease counter by 1
//     counter--;

//     // And swap the last element with it
//     let temp = array[counter];
//     array[counter] = array[index];
//     array[index] = temp;
//   }

//   return array;
// }

// let shuffledColors = shuffle(COLORS);

// // this function loops over the array of colors
// // it creates a new div and gives it a class with the value of the color
// // it also adds an event listener for a click for each card
// function createDivsForColors(colorArray) {
//   for (let color of colorArray) {
//     // create a new div
//     const newDiv = document.createElement("div");

//     // give it a class attribute for the value we are looping over
//     newDiv.classList.add(color);

//     // call a function handleCardClick when a div is clicked on
//     newDiv.addEventListener("click", handleCardClick);

//     // append the div to the element with an id of game
//     gameContainer.append(newDiv);
//   }
// }

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
if (!event.target.classList.contains("front")) return;

let currentCard = event.target.parentElement;

if (!card1 || !card2) {
  if (!currentCard.classList.contains("flipped")) {
    setScore(currentScore + 1);
  }
  currentCard.classList.add("flipped");
  card1 = card2 || currentCard;
  card2 = currentCard === card1 ? null : currentCard;
}

if (card1 && card2) {
  let gif1 = card1.children[1].children[0].src;
  let gif2 = card2.children[1].children[0].src;

  if (gif1 === gif2) {
    cardsFlipped += 2;
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
    card1 = null;
    card2 = null;
  } else {
    setTimeout(function() {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1 = null;
      card2 = null;
    }, 1000);
  }
}

if (cardsFlipped === numCards) gameOver();
}




function gameOver() {
  let end = docuemnt.getElementById("end");
  let scoreHeader = end.children[1];
  scoreHeader.innerText = "You scored: " + currentScore;
  let lowScore = +localStorage.getItem("low-score") || Infinity;
  if (currentScore < lowScore) {
    scoreHeader.innerText += "HIGH SCORE!";
    localStorage.setItem("low-score", currentScore);
  }
  docuemnt.getElementById("end").classList.add("game-over");
}




//   if (noClick) return;
//   if (event.target.classList.contains("flipped")) return;

//   let currentCard = event.target;
//   currentCard.style.backgroundColor = currentCard.classList[0];

//   if (!card1 || !card2) {
//     currentCard.classList.add("flipped");
//     card1 = card1 || currentCard;
//     card2 = currentCard === card1 ? null : currentCard;
//   }

//   if (card1 && card2) {
//     noClick = true;
//     let gif1 = card1.className;
//     let gif2 = card2.className;

//     if (gif1 === gif2) {
//       cardsFlipped += 2;
//       card1.removeEventListener("click", handleCardClick);
//       card2.removeEventListener("click", handleCardClick);
//       card1 = null;
//       card2 = null;
//       noClick = false;
//     } else {
//       setTimeout(function() {
//         card1.style.backgroundColor = "";
//         card2.style.backgroundColor = "";
//         card1.classList.remove("flipped");
//         card2.classList.remove("flipped");
//         card1= null;
//         card2 = null;
//         noClick = false;
//       }, 1000);
//     }
//   }

//   if (cardsFlipped === COLORS.length) alert ("YOU'VE GOT A GREAT MEMORY!");
});

// // when the DOM loads
// createDivsForColors(shuffledColors);
