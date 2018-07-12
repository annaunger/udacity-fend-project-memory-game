/*
 * Create a list that holds all of your cards
 */
const icons = [
    'fa fa-diamond',
    'fa fa-diamond',
    'fa fa-anchor',
    'fa fa-anchor',
    'fa fa-paper-plane-o',
    'fa fa-paper-plane-o',
    'fa fa-bolt',
    'fa fa-bolt',
    'fa fa-bomb',
    'fa fa-bomb',
    'fa fa-leaf',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-bicycle',
    'fa fa-cube',
    'fa fa-cube'
];

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

/*
 * Initialize the game
 */

function init() {
  for (let i = 0; i < icons.length; i++) {
      const card = document.createElement("li");
      card.classList.add("card");
      card.innerHTML = `<i class="${icons[i]}"></i>`;
      cardsContainer.appendChild(card);

      // Add Click Event to each card
      click(card);
      }
}


  /*
   * Click event
   */
   function click(card) {



    // card click event
    card.addEventListener("click", function() {

        const currentCard = this;
        const previousCard = openedCards[0];

        // We have an existing OPENED card
        if (openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);

            // We should compare our 2 opened cards!
            compare(currentCard, previousCard);

            // den här blev kvar --> jag tar den till rad 103 }

        } else {
            // We don't have any opened cards
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
    });
} /* den här har jag satt dit */

/*
 * Compare the two cards
 */
 function compare(currentCard, previousCard) {

   // Matcher
   if (currentCard.innerHTML === previousCard.innerHTML) {

       // Matched
       currentCard.classList.add("match");
       previousCard.classList.add("match");

       matchedCards.push(currentCard, previousCard);

       openedCards = [];

       // Check if the game is over!
       isOver();

   } else {

       // Wait 500 ms, then do this:
       setTimeout(function() {
           currentCard.classList.remove("open", "show", "disable");
           previousCard.classList.remove("open", "show", "disable");
           openedCards = [];
       }, 500);
 } /*<--*/

 // Add New move
 addMove();


}

/*
 * Check if the game is over!
 */
function isOver() {
    if (matchedCards.length === icons.length) {
        alert("Well done, you made it!");
    }
  }

/*
 * Add move
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  // Set the Rating
  rating();
}

/*
 * Rating
 */

 const starsContainer = document.querySelector(".stars");
 starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
 <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
 function rating() { /*
   switch (moves) {
     case 20:
       starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
       <li><i class="fa fa-star"></i></li>`;
       break;
     case 25:
     starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
     break;
   } */

   if(20 > moves > 25) {
     starsContainer,innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;
   } else if(moves > 25) {
     starsContainer,innerHTML = `<li><i class="fa fa-star"></i></li>`;
   }
 }

/*
 * Restart button
 */
 const restartBtn = document.querySelector(".restart");
 restartBtn.addEventListener("click", function() {
   // Delete all cards
   cardsContainer.innerHTML = "";

   // Call ``ìnit` to create new cards
   init();

   // Reset ANY RELATED variables
   matchedCards = [];
   moves = 0;
   movesContainer.innerHTML = moves;
   starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
 });


///// Start the game for the first time!
init();




/* } ?*/


/*if(openedCards.length === i)
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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

 /*
 if (currentCard.innerHTML === previousCard.innerHTML) {

     // Matched
     currentCard.classList.add("match");
     previousCard.classList.add("match");

     matchedCards.push(currentCard, previousCard);

     openedCards = [];

     // Check if the game is over!
     isOver();

 } else {

     // Wait 500 ms, then do this:
     setTimeout(function() {
         currentCard.classList.remove("open", "show");
         previousCard.classList.remove("open", "show");
         openedCards = [];
     }, 500);
     */
