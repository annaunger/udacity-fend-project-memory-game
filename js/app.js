/*
 * Create a list that holds all of your cards
 */
 const deck = document.getElementById('totalDeck');
 const matchingCardsArray = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
/*
 * Create new cards
 */
 function createNewCards() {
     shuffledArray = shuffle(matchingCardsArray);
     for (var i = 0; i < matchingCardsArray.length; i++) {
         let currentCards = document.createElement('li');
         currentCards.currentCards.add('card');
         let cardIcon = document.createElement('i');
         cardIcon.classList.add('fa');
         cardIcon.classList.add(shuffledArray[i]);
         currentCards.appendChild(cardDesign);
         deck.appendChild(currentCards);
         currentCards.addEventlistener('click', clicked);
     }
 };
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function clicked(event) {
    event.target.classList.add('open', 'show');
    event.target.removeEventListener('click', clicked);
    checkCard(event);
    if (timeStart === false) {
        startTimer()
    }
};

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
