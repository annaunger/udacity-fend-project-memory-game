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

// Hide modal

/*
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
    };

    return array;
};
*/
//counter, index, temp
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    };

    return array;
};
/*
 * Initialize the game
 */

function init() {
  //card = shuffle(icons);  // <-- ?
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

      if(isFirstClick) {
        startTimer();
        isFirstClick = false;
      }

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
}

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
        //isOver();

    } else {

        // Wait 500 ms, then do this:
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");

        }, 500);
        //isOver();

        function isOver() {
          const totalSeconds = document.querySelector("#totalSeconds");
          totalSeconds.innerHTML = seconds;
            /*if (matchedCards.length === icons.length) {
                alert("Well done, you made it!");*/
            if(matchedCards === 8) {
              modal.innerHTML = "Well done!";
            }
            }
        }

        openedCards = [];
    //}  // <--- ?

    // Add New move
    addMove();


}  // <--- ?

/*
 * Check if the game is over!
 */

/*function isOver() {
    if (matchedCards.length === icons.length) {
        alert("Well done, you made it!");
    }
}*/

/*// Wait 500 ms, then do this:
setTimeout(function() {
    currentCard.classList.remove("open", "show", "disable");
    previousCard.classList.remove("open", "show", "disable");

}, 500);*/

/*
 * Add move
 */

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    //Set the Rating
    rating();
}

/*
 * Rating
 */

 const starsContainer = document.querySelector(".stars");
 starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
 <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
 <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

 function rating() {

     if (moves < 11) {
         starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li>`;

     } else if (moves > 10 && moves < 15) {
         starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;

 } else if (moves > 14 && moves < 20) {
         starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

 } else if (moves > 19 && moves < 25) {
             starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
       <li><i class="fa fa-star"></i></li>`;

         } else {
         starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;

     }

 }


 /*
  * Timer Start
  */
  function startTimer() {
    liveTimer = setInterval(function() {
      totalSeconds++;
      timerContainer.innerHTML = totalSeconds;
    }, 1000);
  }

const timerContainer = document.querySelector("timer");
let liveTimer,
  totalSeconds = 0;
  timerContainer.innerHTML = totalSeconds;

  /*
   * Timer Stop
   */
function stopTimer() {
  clearInterval(incrementer);
}

/*
 * Restart button
 */

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    // Delete all cards
    cardsContainer.innerHTML = "--";

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



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};
*/
