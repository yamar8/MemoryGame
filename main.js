const body = document.querySelector("body");
const h1 = document.createElement("h1");
const NamesDiv = document.createElement("div");
const boarDiv = document.createElement("div");
const table = document.querySelector("table");
h1.id = "title";
NamesDiv.id = "players";
// boarDiv.className = "row justify-content-center p-3 p-md-0";
boarDiv.className = "container";
body.append(h1, NamesDiv, boarDiv);

let emojiArray = [
  "✌",
  "😂",
  "😝",
  "😁",
  "😱",
  "👉",
  "🙌",
  "🍻",
  "🔥",
  "🌈",
  "☀",
  "🎈",
  "🌹",
  "💄",
  "🎀",
  "⚽",
  "🎾",
  "🏁",
  "😡",
  "👿",
  "🐻",
  "🐶",
  "🐬",
  "🐟",
  "🍀",
  "👀",
  "🚗",
  "🍎",
  "💝",
  "💙",
  "👌",
  "❤",
  "😍",
  "😉",
  "😓",
  "😳",
  "💪",
  "💩",
  "🍸",
  "🔑",
  "💖",
  "🌟",
  "🎉",
  "🌺",
  "🎶",
  "👠",
  "🏈",
  "⚾",
  "🏆",
  "👽",
  "💀",
  "🐵",
  "🐮",
  "🐩",
  "🐎",
  "💣",
  "👃",
  "👂",
  "🍓",
  "💘",
  "💜",
  "👊",
  "💋",
  "😘",
  "😜",
  "😵",
  "🙏",
  "👋",
  "🚽",
  "💃",
  "💎",
  "🚀",
  "🌙",
  "🎁",
  "⛄",
  "🌊",
  "⛵",
  "🏀",
  "🎱",
  "💰",
  "👶",
  "👸",
  "🐰",
  "🐷",
  "🐍",
  "🐫",
  "🔫",
  "👄",
  "🚲",
  "🍉",
  "💛",
  "💚",
];

const cards = [];
let openCards = [];
let tempOpenCards = [];
let isOpenCounter = 0;
let className = "color";

let counter = 0;
let target = null;
let numOfPlayers = 0;
gameStart();

const playersDiv = document.querySelector(".table");

let players = [];
let turn = 0;

function gameStart() {
  table.style.display = "none";
  let ButtonEl = document.getElementById("VerifyPlayers");
  let numOfPlayersEl = document.getElementById("numPlayers");
  ButtonEl.addEventListener("click", () => {
    for (let i = 0; i < numOfPlayersEl.value; i++) {
      players.push(createPlayer("Player " + i, 0));
    }
    if (players.length > 0) {
      let firstScreen = document.querySelector(".firstScreen");
      firstScreen.innerHTML = "Please type the names of the players: ";
      let playerNames = document.createElement("input");
      playerNames.setAttribute("type", "text");
      playerNames.class = "btn btn-primary";
      let button = document.createElement("button");
      button.innerText = "OK";
      firstScreen.append(playerNames, button);
      let arr = [];
      button.onclick = () => {
        console.log(playerNames.value);
        arr = playerNames.value.split(",");
        console.log(arr);
        for (let i = 0; i < players.length; i++) {
          players[i] = createPlayer(arr[i], 0);
          if (i == arr.length - 1) {
            break;
          }
        }
        document.getElementById("playerForm").innerHTML = "";
        chooseCards();
      };
    }
  });
}

function chooseCards() {
  let cardForm = document.getElementById("cardForm");
  let h2 = document.createElement("h2");
  cardForm.append(h2);
  h2.innerText = "Please choose the number of Cards: (max 92)";
  let numOfCards = document.createElement("input");
  let button = document.createElement("input");
  cardForm.append(numOfCards, button);
  numOfCards.id = "numOfCards";
  numOfCards.type = "text";
  button.id = id = "verify";
  button.type = "button";
  button.value = "Submit";

  button.addEventListener("click", (e) => {
    if(numOfCards.value>92){
      return;
    }
    shuffle(emojiArray);
    for (let i = 0; i < numOfCards.value; i++) {
      cards.push(createCard(emojiArray[i]));
      cards.push(createCard(emojiArray[i]));
    }
    cardForm.innerHTML = "";
    init();
  });
}

function initPlayers() {
  table.style.display = "";
  let sortedPlayers = players.sort(
    (a, b) => parseFloat(b.score) - parseFloat(a.score)
  );
  let tbody = document.querySelector("tbody");
  for (i in sortedPlayers) {
    const element = createPlayerElement(i);
    tbody.append(element);
  }
}

function createPlayerElement(id) {
  const playerEl = document.createElement("tr");
  playerEl.innerHTML = `<th scope="row">${id}</th> 
  <td>${players[id].name.split(" ")[0]}</td>
  <td>${players[id].name.split(" ")[1]}</td>
  <td>${players[id].score}</td>`;
  // playerEl.innerHTML = `Name: ${players[id].name}, Score: ${players[id].score}`;
  return playerEl;
}

function createPlayer(name, score, className = "") {
  return {
    name: name,
    score: score,
    className: className,
  };
}
function createCard(value) {
  return {
    value: value,
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
  const row = document.createElement("div");
  // row.className = "cards col-9 col-md-5 col-lg-2";
  row.className = "row";
  boarDiv.append(row);
  const turn = document.getElementById("turn");
  for (i in cards) {
    const element = createCardEl(i);
    cards[i].element = element;
    // debugger;
    turn.innerText = players[counter].name;
    cards[i].element.addEventListener("click", (e) => {
      if(tempOpenCards.length == 2){ //prevent third click
        return;    
      }
      for (v of cards) {
        if (e.target.isSameNode(v.element)) {
          //find the clicked element in the array
          if (v.isOpen == true) {
            //prevent from user to click on card twice
            return;
          }
          v.revealCard();
          tempOpenCards.push(v);
          // e.target.style.transform = "rotateY(180deg)";

          // if two cards are open
          if (tempOpenCards.length == 2) {
            //if two cards are equal
            if (tempOpenCards[0].value == tempOpenCards[1].value) {
              openCards.push(tempOpenCards[0], tempOpenCards[1]);
              players[counter].score += 1;
              tempOpenCards = [];
            } else {
              //if two cards are open but not equal
              counter++; // move to next player
              if (counter == players.length) {
                counter = 0;
              }
              turn.innerText = players[counter].name;

              setTimeout(() => {
                tempOpenCards[0].hideCard();
                tempOpenCards[1].hideCard();
                tempOpenCards = [];
              }, 1100);
            }
          } else {
            //one card is open
          }
        }
      }
      if (cards.length == openCards.length) {
        console.log("game is finished");
        boarDiv.innerHTML = "";
        initPlayers();
      }
    });
    row.append(element);
  }
}

function createCardEl(idx) {
  const cardEl = document.createElement("div");
  cardEl.id = idx;
  cardEl.className = "col";
  // cardEl.sytle = "max-width: 18rem;";
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

// const button = document.getElementById("NewGame");
// button.addEventListener("click",()=>{
//   gameStart();

// });
