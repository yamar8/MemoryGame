let counter = 0;
const cards = ["A", "B", "C", "A", "B", "C"];

function init() {
  shuffle(cards);
  //append cards to board
  const board = document.getElementById("board");
  for (i in cards) {
    const element = createCard(i);
    board.appendChild(element);
  }
}

function createCard(idx) {
  const cardEl = document.createElement("div");
  cardEl.addEventListener('click', (e) => {
    if(counter < 2){
      cardEl.innerHTML = cards[idx];
    }
    counter++;
  }) 
  cardEl.id = idx;
  cardEl.className = "card";
  
  return cardEl;
}

function shuffle(array) {  //from stackoverflow
  let currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
  }
  return array;
}

init();