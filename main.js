const body = document.querySelector("body");
const h1 = document.createElement("h1");
const NamesDiv = document.createElement("div");
const boarDiv = document.createElement("div");
h1.id = "title";
NamesDiv.id = "players";
boarDiv.id = "board";
body.append(h1, NamesDiv, boarDiv);

const cards = [
  createCard("A", 1),
  createCard("B", 2),
  createCard("C", 3),
  // createCard("D", 4),
  createCard("A", 1),
  createCard("B", 2),
  createCard("C", 3),
  // createCard("D", 4),
];
let openCards = [];
let tempOpenCards = [];
let isOpenCounter = 0;
let className = "color";

let counter = 0;
let target = null;
let numOfPlayers = 0;
gameStart();

const playersDiv = document.getElementById("players");

let players = [
  // createPlayer("Yossef", 0),
  // createPlayer("Dana", 0),
  // createPlayer("Gal", 0),
];
let turn = 0;

function gameStart() {
  let numOfPlayersEl = document.getElementById("numPlayers");
  numOfPlayersEl.addEventListener("change", (e) => {
    for (let i = 0; i < e.target.value; i++) {
      players.push(createPlayer("Player " + i, 0));
    }
    if (players.length > 0) {
      let firstScreen = document.querySelector(".firstScreen");
      firstScreen.innerHTML = "Please type the names of the players: ";
      let playerName = document.querySelector(".firstScreen");
      let playerNames = document.createElement("input");
      playerNames.setAttribute("type", "text");
      let button = document.createElement("button");
      button.innerText = "OK";
      firstScreen.append(playerNames, button);
      let arr = [];
      button.onclick = () => {
        console.log(playerNames.value);
        arr = playerNames.value.split(",");
        console.log(arr);
        for(let i = 0;i<players.length;i++){
          players[i] = createPlayer(arr[i], 0);
          if(i==arr.length-1){
            break;
          }
        }
        firstScreen.innerHTML = "";
        init()
      };
    }
  });
}

function initPlayers() {
  playersDiv.innerHTML = "";
  for (i in players) {
    const element = createPlayerElement(i, players[i].className);
    playersDiv.append(element);
  }
}

function createPlayerElement(id, classN) {
  const playerEl = document.createElement("div");
  playerEl.id = id;
  playerEl.className = classN;
  playerEl.innerText = `Name: ${players[id].name}, Score: ${players[id].score}`;
  return playerEl;
}

function createPlayer(name, score, className = "") {
  return {
    name: name,
    score: score,
    className: className,
  };
}
function createCard(value, id, element = null) {
  return {
    value: value,
    id: id,
    element: element,
    isOpen: false,
    revealCard() {
      this.element.innerText = value;
      this.isOpen = true;
    },
    hideCard() {
      this.element.innerText = "";
      this.isOpen = false;
    },
  };
}

function init() {
  shuffle(cards);
  //append cards to board
  const board = document.getElementById("board");
  for (i in cards) {
    const element = createCardEl(i);
    cards[i].element = element;
    // debugger;
    cards[i].element.addEventListener("click", (e) => {
      // playerEl.className = "turn";
      for (v of cards) {
        if (e.target.isSameNode(v.element)) {
          if (counter == players.length) {
            counter = 0;
          }

          v.revealCard();
          tempOpenCards.push(v);

          // if two cards are open
          if (tempOpenCards.length == 2) {
            players[counter].className = className;
            //if two cards are equal
            if (tempOpenCards[0].value == tempOpenCards[1].value) {
              openCards.push(tempOpenCards[0], tempOpenCards[1]);
              players[counter].score += 1;
              tempOpenCards = [];
            } else {
              //if two cards are open but not equal
              counter++; // move to next player
              setTimeout(() => {
                tempOpenCards[0].hideCard();
                tempOpenCards[1].hideCard();
                tempOpenCards = [];
              }, 1100);
            }
            // players[counter].className = "";
            initPlayers();
          } else {
            //one card is open
          }
        }
      }
    });
    board.appendChild(element);
  }
}

function createCardEl(idx) {
  const cardEl = document.createElement("div");
  cardEl.id = idx;
  cardEl.className = "card";
  return cardEl;
}

function shuffle(array) {
  //from stackoverflow
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
