// Hold a list of all cards
let allCards = document.querySelectorAll('.card');
console.log(allCards);
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(card);
console.log(cards);

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
console.log(stars);
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

// Array to hold currently open cards
var openCards = [];
// Mover counter
let numMoves = 0;
let correctMoves = 0;
starRating(correctMoves / numMoves);
console.log(correctMoves / numMoves);

// matched cards
let matched = function() {
  console.log("match");
  openCards[0].classList.add("match");
  openCards[1].classList.add("match");
  correctMoves++;
  openCards = [];
}

// unmatched cards
let unmatched = function() {
  console.log("No Match");
  openCards[0].classList.add("unmatched");
  openCards[1].classList.add("unmatched");
  setTimeout(function(){
    openCards[0].classList.remove('show', 'open', 'locked', 'unmatched');
    openCards[1].classList.remove('show', 'open', 'locked', 'unmatched');
    openCards = [];
  }, 1000);
}

// Update move counter
let updateMoves = function() {
  document.getElementById('moves').innerHTML = numMoves;
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
    numMoves++;
  }
  updateMoves();
  starRating(correctMoves / numMoves);
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
