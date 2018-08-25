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

shuffle(icons)

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(icons) {
    let counter = icons.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = icons[counter];
        icons[counter] = icons[index];
        icons[index] = temp;
    };

    return icons;
};

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

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
// First Click Indicator
let isFirstClick = true;

function click(card) {
    // card click event
    card.addEventListener("click", function() {

        if (isFirstClick) {
            // Start our timer
            startTimer();
            // Change our First Click indicator's value
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

            openedCards = [];

            // Check if the game is over!
            isOver();

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
function compare(currentCard, previousCard) { // change to matchedCards

    // Matcher
    if (currentCard.innerHTML === previousCard.innerHTML) {

        // Matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        //Check if the game is over!
        isOver();

    } else {

        // Wait 500 ms, then do this:
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");

        }, 500);

        openedCards = [];

    }
  
    // Add New move
    addMove();

}

/*
 * Check if the game is over!
 */
var modal = document.getElementById('modalAction').style.visibility = "hidden";
var span = document.getElementsByClassName("close")[0];

function isOver() {
   
    if (matchedCards.length === icons.length) {
        // Stop our timer
        modal.style.display = "block";
        stopTimer();
    }
}

function closeModal() {
    close.addEventListener('click', function() {
        modal.style.display = 'none';
        restartGame();
    });
};

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
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

function rating() {

    if (moves < 11) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

    } else if (moves > 10 && moves < 15) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

    } else if (moves > 14 && moves < 20) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

    } else if (moves > 19 && moves < 25) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

    } else {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;

    }

}

/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';

function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}

function stopTimer() {
    clearInterval(liveTimer);
}

/*
 * Restart button
 */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    // Delete all cards
    cardsContainer.innerHTML = "";

    init();

    // Reset ANY RELATED variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + 's';
});

///// Start the game for the first time!
init();
