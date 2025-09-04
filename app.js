const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const quizDiv = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const timerBar = document.getElementById("timerBar");
const leaderboardDiv = document.getElementById("leaderboard");
const rankingList = document.getElementById("rankingList");
const scoreChartCtx = document.getElementById("scoreChart").getContext("2d");

const categorySelect = document.getElementById("category");
const difficultySelect = document.getElementById("difficulty");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

let questions = [],
  currentIndex = 0,
  score = 0,
  timeLeft = 15,
  timerInterval = null;
let scoreData = [];
let playerName = "";

// Modal Elements
const modalName = document.getElementById("modalName");
const modalSettings = document.getElementById("modalSettings");
const playerNameInput = document.getElementById("playerName");
const nameSubmitBtn = document.getElementById("nameSubmitBtn");
const settingsSubmitBtn = document.getElementById("settingsSubmitBtn");

// Chart.js
const scoreChart = new Chart(scoreChartCtx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Pontuação",
        data: [],
        backgroundColor: "rgba(0,114,255,0.3)",
        borderColor: "#0072ff",
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  options: {
    scales: { y: { beginAtZero: true, stepSize: 1 } },
    responsive: true,
  },
});

// Shuffle
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Fetch questions
async function fetchQuestions(category = "", difficulty = "") {
  let url = `https://opentdb.com/api.php?amount=10&type=multiple`;
  if (category) url += `&category=${category}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results.map((q) => ({
    question: decodeURIComponent(q.question),
    correct: decodeURIComponent(q.correct_answer),
    answers: shuffle([
      ...q.incorrect_answers.map((a) => decodeURIComponent(a)),
      decodeURIComponent(q.correct_answer),
    ]),
  }));
}

// Show question
function showQuestion() {
  clearInterval(timerInterval);
  timeLeft = 15;
  timerEl.textContent = `⏰ ${timeLeft}`;
  timerBar.style.width = "100%";
  timerInterval = setInterval(updateTimer, 1000);

  nextBtn.classList.add("hidden");
  const q = questions[currentIndex];
  questionEl.innerHTML = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => checkAnswer(btn, q.correct));
    answersEl.appendChild(btn);
  });
}

// Timer
function updateTimer() {
  timeLeft--;
  timerEl.textContent = `⏰ ${timeLeft}`;
  timerBar.style.width = `${(timeLeft / 15) * 100}%`;
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    revealCorrect();
    nextBtn.classList.remove("hidden");
    updateChart();
  }
}

// Check answer
function checkAnswer(selectedBtn, correct) {
  clearInterval(timerInterval);
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  if (selectedBtn.textContent === correct) {
    selectedBtn.classList.add("correct");
    correctSound.play();
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    wrongSound.play();
    revealCorrect();
  }

  scoreEl.textContent = `Pontuação: ${score}`;
  nextBtn.classList.remove("hidden");
  updateChart();
}

function revealCorrect() {
  const buttons = answersEl.querySelectorAll("button");
  const correctAnswer = questions[currentIndex].correct;
  buttons.forEach((btn) => {
    if (btn.textContent === correctAnswer) btn.classList.add("correct");
    btn.disabled = true;
  });
}

// Next question
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) showQuestion();
  else endGame();
});

// Chart update
function updateChart() {
  scoreData.push(score);
  scoreChart.data.labels.push(`Q${currentIndex + 1}`);
  scoreChart.data.datasets[0].data = scoreData;
  scoreChart.update();
}

// End game
function endGame() {
  quizDiv.classList.add("hidden");
  saveScore();
  showLeaderboard();
}

// Save score
function saveScore() {
  if (!playerName) return;
  let leaderboard = JSON.parse(localStorage.getItem("triviaLeaderboard")) || [];
  leaderboard.push({ name: playerName, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("triviaLeaderboard", JSON.stringify(leaderboard));
}

// Show leaderboard
function showLeaderboard() {
  leaderboardDiv.classList.remove("hidden");
  rankingList.innerHTML = "";
  let leaderboard = JSON.parse(localStorage.getItem("triviaLeaderboard")) || [];
  leaderboard.slice(0, 10).forEach((entry, idx) => {
    const li = document.createElement("li");
    li.textContent = `${idx + 1}. ${entry.name} - ${entry.score}`;
    rankingList.appendChild(li);
  });
}

// Restart game
restartBtn.addEventListener("click", () => {
  leaderboardDiv.classList.add("hidden");
  modalName.classList.remove("hidden");
});

// Modal lógica
nameSubmitBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (!name) return alert("Por favor, insira seu nome.");
  playerName = name;
  modalName.classList.add("hidden");
  modalSettings.classList.remove("hidden");
});

settingsSubmitBtn.addEventListener("click", async () => {
  modalSettings.classList.add("hidden");
  quizDiv.classList.remove("hidden");
  score = 0;
  currentIndex = 0;
  scoreData = [];
  questions = await fetchQuestions(
    categorySelect.value,
    difficultySelect.value
  );
  showQuestion();
});
