const cards = ['A','B','C','A','B','C'];

// const element = document.createElement("div"); // create new element
// element.innerHTML = "Hello";
// console.log(element);
// const board = document.getElementById("board");
// board.appendChild(element);

// const cards = ["A", "B", "C", "A", "B", "C"];
// const board = document.getElementById("board");
// for (i of cards) {
//   let element = document.createElement("div");
//   element.innerHTML = i;
//   board.appendChild(element);
// }


function createCard(idx){
    const cardEl = document.createElement("div");
    cardEl.innerHTML = cards[idx];
    cardEl.id = idx;
    cardEl.className = "card";
    return cardEl;
}


function init(){
    //shuffle(cards);
    //append cards to board
    const board = document.getElementById("board");
    for(i in cards){
        const element = createCard(i);
        board.appendChild(element);
    }
}

init();