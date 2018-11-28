/*
 * Create a list that holds all of your cards
 */
 let cardsListContainer = document.querySelector('.deck');
 let cardsList = cardsListContainer.querySelectorAll('li');

/*
 * Display the cards on the page
 *   - (done) shuffle the list of cards using the provided "shuffle" method below
 *   - (done) loop through each card and create its HTML
 *   - (done) add each card's HTML to the page
 */

 let cardIcon = [];
 for (let i = 0; i < cardsList.length; i++) {
   cardIcon[i] = cardsList[i].innerHTML;
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// shuffle the list of cards
cardIcon = shuffle(cardIcon);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - (done) display the card's symbol (put this functionality in another function that you call from this one)
 *  - (done) add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  -  (done) if the list already has another card, check to see if the two cards match
 *    + (done) if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + (done) if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + (done) increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one) */

// set up the event listener for a card & loop through each card and create its HTML
for (let i = 0; i < cardsList.length; i++) {
  cardsList[i].addEventListener('click',displayCardSymbol);
  cardsList[i].innerHTML = cardIcon[i];
}

// display the card's symbol
let clickNo = 0;
function displayCardSymbol() {
  this.setAttribute("style", "transition: transform .9s; transform-style: preserve-3d;");
  let cardsClassAttribute = this.getAttribute("class");
  switch (cardsClassAttribute) {
    case 'card':
      this.setAttribute("class" ,'card open show');
      addToListOfOpenCard(this); //add card to list of open card
      break;
  }

  clickNo++;
  if (clickNo === 1) {
    theTimer(false);
  }
  incrementMove(clickNo);
}

// add the card to a *list* of "open" cards & check if list has another card
const listOfOpenCard = [];
function addToListOfOpenCard(cards) {
  listOfOpenCard.push(cards);
  if ((listOfOpenCard.length > 1) && ((listOfOpenCard.length % 2 ) === 0)) {
    checkMatch(listOfOpenCard.length);
  }
}

// check to see if the open card matches
function checkMatch(length) {
   listOfOpenCard[length-1].innerHTML === listOfOpenCard[length-2].innerHTML?
   lockMatchCards(length):
   removeUnMatchCards(length);
}

// if the tow cards match call this function
function lockMatchCards(length) {
  for (let i = length-2; i < length; i++) {
    listOfOpenCard[i].setAttribute("class", 'card match');
  }
}

// if the tow cards dosen't match call this function
function removeUnMatchCards(length) {
setTimeout(remove,700,length);
}

//helper method for close unmatch cards & remove them from a list
function remove(ln) {
  for (let i = ln-2; i < ln; i++) {
    listOfOpenCard[i].setAttribute("class", 'card');
  }
  listOfOpenCard.splice(ln-2,2); //remove unmatch cards from list
}

//this function for increment the move counter and display it on the page
let counter = document.querySelector('.moves');
function incrementMove(numOfClick) {
 counter.textContent = numOfClick;
 isMatch(); //check if the cards matches when user click this card
}

//when all cards have matched we call this function
function isMatch() {
  if (listOfOpenCard.length === cardsList.length) {
    theTimer(true); //stop time
  }
  changeRating(clickNo); //trake the rating
}


// this function call when we press restart button
let restartBtn = document.querySelector('.restart');
restartBtn.onclick = refresh;
function refresh() {
  location.reload();
}

//this function for change the star rating depends on number of moves
let starContainer = document.querySelector('.stars');
function changeRating(clickNo) {
   if (clickNo === 26) {
      starContainer.children[0].remove()
   } else if (clickNo === 32 ) {
      starContainer.children[0].remove()
   } else if (clickNo === 40) {
      starContainer.children[0].remove()
   }
}


//this function call to start & stop timer https://stackoverflow.com/questions/41709953/creating-a-stopwatch-from-scratch-in-javascript
let timeHeader = document.querySelector('.timer');

let seconds = 0;
let minutes = 0;
function startCounting() {
    if (seconds < 59) {
        seconds += 1;
    } else {
      seconds = 0;
      minutes +=1;
    }

    seconds < 10 ?
    timeHeader.innerHTML = `0${minutes}:0${seconds}`:
    timeHeader.innerHTML = `0${minutes}:${seconds}`;
}
//helper method for start and stop time
function theTimer(cardsMatch) {
    if (!cardsMatch) {
        timer = setInterval(startCounting, 1000);
    } else {
        clearInterval(timer);
        winningMessage(); //display winning massege to user
    }
}


//display winning message when user finish the game
let winningCard = document.querySelector('.winning-card');
let Conatiner = document.querySelector('.container');

let btn = document.querySelector('.button');

function winningMessage() {
  winningCard.setAttribute('style',
  'display:block;box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);width: 680px;height: 680px;'); //show winning cards

  Conatiner.setAttribute('style','display:none;'); //hide game cards

       switch (starContainer.childElementCount) {
         case 1:
         timeHeader.insertAdjacentHTML('afterbegin',
          `<h3>Congratulation<br><i class="fa fa-star"></i></br></h3>`);
           break;
         case 2:
         timeHeader.insertAdjacentHTML('afterbegin',
          `<h3>Congratulation<br><i class="fa fa-star"></i>\t<i class="fa fa-star"></i></br></h3>`);
           break;
         case 3:
         timeHeader.insertAdjacentHTML('afterbegin',
          `<h3>Congratulation<br><i class="fa fa-star"></i>\t<i class="fa fa-star"></i>\t<i class="fa fa-star"></i></br></h3>`);
           break;
         case 0:
         timeHeader.insertAdjacentHTML('afterbegin',
          `<h3>Congratulation</h3>`);
           break;
         }

  winningCard.appendChild(timeHeader);
}

btn.onclick = refresh; // when press restart button in massage card call refresh();
