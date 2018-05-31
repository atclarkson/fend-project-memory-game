// Hold a list of all cards
let card = document.getElementsByClassName("card");
let allCards = [...card]
// deck of all cards in game
const deck = document.querySelector(".deck");

// Reset Button
const restart = document.querySelector(".restart");

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
    allCards[i].classList.remove('show', 'open', 'match', 'locked', 'unmatched', 'rubberBand', 'shake');
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

//------------------------------------------------
//TODO TEST CODE REMOVE PRIOR TO PRODUCTION
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// When the user clicks the button, open the modal
btn.onclick = function() {
    gameOverModal();
}
//-----------------------------------------------


// Game Over Modal
// Used modal from W3Schools https://www.w3schools.com/howto/howto_css_modals.asp
function gameOverModal() {
  // Get timer value in minutes and seconds
  timer.addEventListener('secondsUpdated', function (e) {
    $('#gettingTotalValuesExample .minutes').html(timer.getTotalTimeValues().minutes);
    $('#gettingValuesExample .seconds').html(timer.getTimeValues().seconds);
  });
  // Get the modal
  var modal = document.getElementById('gameOverModal');
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user wins the game, open the modal
  modal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// Function to check if the game is over
function isGameOver() {
  if (correctMoves >= (allCards.length / 2)) {
    console.log("Game Over!");
    timer.pause();
    gameOverModal();
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
