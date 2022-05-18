const body = document.querySelector("body");
const board = document.querySelector(".container");
const table = document.querySelector("table");
let cardForm = document.getElementById("cardForm");
let h2 = document.querySelector("#NumOfCards");
let numOfCards = document.querySelector("#numOfCards");
let button = document.querySelector("#verify");
numOfCards.style.display = "none";
button.style.display = "none"
table.style.display = "none"; // hide the table element

//arrays:
const cards = [];
let openCards = [];
let tempOpenCards = [];
let players = [];
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

let counter = 0; // run on the players array

initGame();


function initGame() {

  let ButtonEl = document.getElementById("VerifyPlayers");
  let playerInput = document.getElementById("playerInput");
  
  ButtonEl.addEventListener("click", () => {
    for (let i = 0; i < playerInput.value; i++) {
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
  numOfCards.style.display = "";
  button.style.display = ""

  h2.innerText = "Please choose the number of Cards: (max 92)";
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
    initCards();
  });
}

function initPlayersTable() {
  board.parentNode.removeChild(board); // remove the board
  table.style.display = ""; //show table
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
  return playerEl;
}

function createPlayer(name, score) {
  return {
    name: name,
    score: score,
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

function initCards() {
  shuffle(cards);
  const row = document.createElement("div");
  // row.className = "cards col-9 col-md-5 col-lg-2";
  row.className = "row";
  board.append(row);
  const turn = document.getElementById("turn");
  for (i in cards) {
    const element = createCardEl(i);
    cards[i].element = element;
    // debugger;
    turn.innerText = players[counter].name;
    cards[i].element.addEventListener("click", CardclickHandler);
    row.append(element);
  }
}


const CardclickHandler = (e)=>{
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
    board.innerHTML = "";
    initPlayersTable();
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
