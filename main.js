let start = document.querySelector(".start div");
let correctAnswer = new Audio("audio/Correct Answer Sound Effect.mp3");
let wrongAnswer = new Audio("audio/Wrong Answer - Sound Effect [HD].mp3");
let backgroundMusic = new Audio(
  "audio/Elevator Music (Kevin MacLeod) - Gaming Background Music (HD).mp3"
);
let popUp = `<div class="game-over">
      <div class="pop-up">
          <p>Game Over</p>
          <div class="re">
              <span class="material-symbols-outlined">
                  refresh
              </span>
          </div>
      </div>
  </div>`;
let newGame = `<div class="new-game">
  <div class="pop-up">
      <p>You Win!</p>
      <div class="new">
      <span class="material-symbols-outlined">
      fiber_new
      </span>
      </div>
  </div>
</div>`;
let score = document.querySelector(".score span");
let time = document.querySelector(".time span");
let wrong = document.querySelector(".wrong span");
let container = document.querySelector(".container");
let boxes = [...container.children];
let shuffleArray = [...boxes.keys()];
let targerTime = 2;
start.addEventListener("click", () => {
  backgroundMusic.play();
  backgroundMusic.volume = 0.4;
  start.parentElement.remove();
  timer(targerTime);
  wrong.innerHTML = 0;
  score.innerHTML = 0;
  boxes.forEach((box) => {
    box.classList.remove("match");
    box.classList.remove("flip");
  });
});

shuffle(shuffleArray);
boxes.forEach((box, index) => {
  box.style.order = shuffleArray[index];
  box.addEventListener("click", () => {
    flipBox(box);
  });
});
function flipBox(box) {
  box.classList.add("flip");
  let allFlipped = boxes.filter((box) => {
    return box.classList.contains("flip");
  });
  if (allFlipped.length == 2) {
    stopClick();
    checkMatch(allFlipped[0], allFlipped[1]);
  }
}
function stopClick() {
  container.style.pointerEvents = "none";
  setTimeout(() => {
    container.style.pointerEvents = "all";
  }, 1000);
}
function checkMatch(boxOne, boxTwo) {
  if (boxOne.getAttribute("data-att") == boxTwo.getAttribute("data-att")) {
    correctAnswer.play();
    score.innerHTML = Number(score.innerHTML) + 2;
    if (score.innerHTML == 20) {
      clearInterval(inte);
      setTimeout(() => {
        backgroundMusic.pause();
      }, 2000);
      container.style.pointerEvents = "none";
      container.insertAdjacentHTML("afterend", newGame);
      let re = document.querySelector(".new");
      re.addEventListener("click", newgame);

      return 0;
    }
    boxOne.classList.add("match");
    boxTwo.classList.add("match");
    boxOne.classList.remove("flip");
    boxTwo.classList.remove("flip");
  } else {
    wrongAnswer.play();
    wrongAnswer.volume = 0.1;
    wrong.innerHTML = Number(wrong.innerHTML) + 1;

    setTimeout(() => {
      boxOne.classList.remove("flip");
      boxTwo.classList.remove("flip");
    }, 1000);
  }
}
function shuffle(array) {
  let random,
    arrLength = array.length;
  while (arrLength > 0) {
    arrLength--;
    random = Math.floor(Math.random() * array.length);
    [array[arrLength], array[random]] = [array[random], array[arrLength]];
  }
  return array;
}
let inte;
function timer(minute) {
  let minutes;
  let secs;
  let timinsec = minute * 60;
  inte = setInterval(() => {
    minutes = Math.trunc(timinsec / 60);
    secs = timinsec % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    secs = secs < 10 ? `0${secs}` : secs;

    time.innerHTML = `${minutes}:${secs}`;
    timinsec--;
    if (timinsec < 0) {
      clearInterval(inte);
      container.insertAdjacentHTML("afterend", popUp);
      backgroundMusic.pause();
      let re = document.querySelector(".re");
      re.addEventListener("click", reload);
    }
  }, 1000);
}
function reload() {
  document.querySelector(".game-over").remove();
  document.body.appendChild(start.parentElement);
  shuffle(shuffleArray);
  boxes.forEach((box, index) => {
    box.style.order = shuffleArray[index];
  });
}
function newgame() {
  document.querySelector(".new-game").remove();
  document.body.appendChild(start.parentElement);
  shuffle(shuffleArray);
  boxes.forEach((box, index) => {
    box.style.order = shuffleArray[index];
  });
}
