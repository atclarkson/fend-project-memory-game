// Hold a list of all cards
let card = document.getElementsByClassName("card");
let allCards = [...card]
// deck of all cards in game
const deck = document.querySelector(".deck");

// Reset Button
const restart = document.querySelector(".restart");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Get list of Star classes
let stars = document.getElementsByClassName('star');

// Star rating function based on ratio of correct matches to incorrect matches.
// This is a mess and should be refactored at some point.
function starRating(num) {
  if (num > .50) {
    //3 stars
    stars[0].classList.add('fa-star');
    stars[1].classList.add('fa-star');
    stars[2].classList.add('fa-star');
    stars[0].classList.remove('fa-star-o');
    stars[1].classList.remove('fa-star-o');
    stars[2].classList.remove('fa-star-o');
  } else if (num > .25) {
    //2 stars
    stars[0].classList.add('fa-star');
    stars[1].classList.add('fa-star');
    stars[2].classList.add('fa-star-o');
    stars[0].classList.remove('fa-star-o');
    stars[1].classList.remove('fa-star-o');
    stars[2].classList.remove('fa-star');
  } else if (num > .10){
    //1 star
    stars[0].classList.add('fa-star');
    stars[1].classList.add('fa-star-o');
    stars[2].classList.add('fa-star-o');
    stars[0].classList.remove('fa-star-o');
    stars[1].classList.remove('fa-star');
    stars[2].classList.remove('fa-star');
  } else {
    //0 stars
    stars[0].classList.add('fa-star-o');
    stars[1].classList.add('fa-star-o');
    stars[2].classList.add('fa-star-o');
    stars[0].classList.remove('fa-star');
    stars[1].classList.remove('fa-star');
    stars[2].classList.remove('fa-star');
  }
}

// Update move counter
let updateMoves = function() {
  document.getElementById('moves').innerHTML = movesCounter;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // Start  timerInstance
 var timer = new Timer();
 timer.start();
 timer.addEventListener('secondsUpdated', function (e) {
     $('#clock').html(timer.getTimeValues().toString());
 });

// Array to hold currently open cards
var openCards = [];
// Mover counter
let movesCounter = 0;
let correctMoves = 0;

document.body.onload = startGame();

function startGame() {
  // Shuffle the deck
  allCards = shuffle(allCards);
  // remove all exisiting classes from each card
  for (var i = 0; i < allCards.length; i++){
      deck.innerHTML = '';
      [].forEach.call(allCards, function(item) {
          deck.appendChild(item);
      });
      allCards[i].classList.remove('show', 'open', 'match', 'locked', 'unmatched');
  }
  // reset open cards Array
  openCards = [];
  // reset moves counter to 0
  movesCounter = 0;
  correctMoves = 0;
  updateMoves();
  // reset star starRating
  starRating(100);
  // reset timer
  timer.reset();

}

// Function to check if the game is over
function isGameOver() {
  if (correctMoves >= (allCards.length / 2)) {
    console.log("Game Over!");
    timer.pause();
    return true;
  } else {
    return false;
  }
}

// matched cards
let matched = function() {
  openCards[0].classList.add('match', 'rubberBand');
  openCards[1].classList.add('match', 'rubberBand');
  correctMoves++;
  openCards = [];
}


// unmatched cards
let unmatched = function() {
  openCards[0].classList.add('unmatched', 'shake');
  openCards[1].classList.add('unmatched', 'shake');
  allCards.forEach(function(card) {
    card.classList.add('disabled');
  });
  setTimeout(function(){
    openCards[0].classList.remove('show', 'open', 'locked', 'unmatched', 'shake');
    openCards[1].classList.remove('show', 'open', 'locked', 'unmatched', 'shake');
    allCards.forEach(function(card) {
      card.classList.remove('disabled');
    });
    openCards = [];
  }, 1000);
}

// Add clicked cards to array and check if the cards match or not
let openedCards = function() {
  openCards.push(this);
  if (openCards.length == 2) {
    if (openCards[0].innerHTML == openCards[1].innerHTML) {
      matched();
    } else {
      unmatched();
    }
    movesCounter++;
  }
  // Update the moves counter
  updateMoves();
  // update the star rating
  starRating(correctMoves / movesCounter);
  // Check if the game is over
  isGameOver();
}

// Create showCard function
let showCard = function() {
  this.classList.toggle('show');
  this.classList.toggle('open');
  this.classList.toggle('locked');
};

// Loop through and apply an event listener to each card
allCards.forEach(function(card) {
  card.addEventListener('click', showCard);
  card.addEventListener('click', openedCards);
});

// Event listend for restart
restart.addEventListener('click', startGame);
