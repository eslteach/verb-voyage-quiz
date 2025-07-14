let xp = 0;
let level = 1;
let streak = 0;
let currentIndex = 0;
let activeQuestions = [];

const tiers = {
  1: {
    name: "Present Simple — Simple Shores",
    questions: [
      { prompt: "She ____ breakfast at 7. (eat) ", answer: "eats" },
      { prompt: "They ____ soccer on Sundays. (play) ", answer: "play" },
      { prompt: "He ____ TV in the evening. (watch) ", answer: "watches" },
      { prompt: "We ____ our grandparents weekly. (visit) ", answer: "visit" },
      { prompt: "I ____ novels often. (read) ", answer: "read" }
    ]
  },
  2: {
    name: "Present Continuous — Continuous Cove",
    questions: [
      { prompt: "She ____ for her exam. (study)", answer: "is studying" },
      { prompt: "They ____ a sandcastle. (build) ", answer: "are building" },
      { prompt: "He ____ through the park. (run) ", answer: "is running" },
      { prompt: "We ____ English together. (learn) ", answer: "are learning" },
      { prompt: "I ____ a landscape. (paint) ", answer: "am painting" },
      { prompt: "It ____ outside. (rain) ", answer: "is raining" },
      { prompt: "You ____ dinner, right? (cook) ", answer: "are cooking" }
    ]
  },
  3: {
    name: "Past Simple — History Hollow",
    questions: [
      { prompt: "She ____ to school yesterday. (walk) ", answer: "walked" },
      { prompt: "They ____ video games last night. (play) ", answer: "played" },
      { prompt: "He ____ a letter to his friend. (write) ", answer: "wrote" },
      { prompt: "I ____ spaghetti for lunch. (eat) ", answer: "ate" },
      { prompt: "We ____ a movie on Friday. (watch) ", answer: "watched" },
      { prompt: "It ____ last winter. (snow) ", answer: "snowed" },
      { prompt: "You ____ me last weekend. (call) ", answer: "called" }
    ]
  },
  4: {
    name: "Tense Challenge — Verb Valley (present simple, present continuous or simple past?)",
    questions: [
      { prompt: "She usually ____ breakfast at 7. (eat) ", answer: "eats" },
      { prompt: "Right now, they ____ soccer. (play) ", answer: "are playing" },
      { prompt: "He ____ TV last night. (watch) ", answer: "watched" },
      { prompt: "We often ____ our grandparents. (visit) ", answer: "visit" },
      { prompt: "I ____ a novel at the moment. (read) ", answer: "am reading" },
      { prompt: "Yesterday, it ____. (rain) ", answer: "rained" },
      { prompt: "You ____ dinner every evening. (cook) ", answer: "cook" }
    ]
  },
  5: {
    name: "Present Perfect — Perfect Peninsula",
    questions: [
      { prompt: "She ____ Paris several times. (visit) ", answer: "has visited" },
      { prompt: "They ____ their homework. (finish) ", answer: "have finished" },
      { prompt: "He ____ his glasses. (break) ", answer: "has broken" },
      { prompt: "We ____ that movie already. (see) ", answer: "have seen" },
      { prompt: "I ____ five books this month. (read) ", answer: "have read" },
      { prompt: "It ____ a lot lately.(rain) ", answer: "has rained" },
      { prompt: "You ____ your keys again? (lose)", answer: "have lost" }
    ]
  },
  6: {
    name: "Past Perfect — Memory Marsh",
    questions: [
      { prompt: "She ____ before the show started. (leave) ", answer: "had left" },
      { prompt: "They ____ dinner by 6. (eat) ", answer: "had eaten" },
      { prompt: "He ____ before I arrived. (fall asleep) ", answer: "had fallen asleep" },
      { prompt: "We ____ our work before sunset. (finish) ", answer: "had finished" },
      { prompt: "I ____ the tickets earlier.(buy) ", answer: "had bought" },
      { prompt: "You ____ the book before school. (read) ", answer: "had read" },
      { prompt: "It ____ all night before the match. (rain) ", answer: "had rained" }
    ]
  },
  7: {
    name: "Perfect Mix — Grammar Glacier (present perfect, past perfect or simple past?)",
    questions: [
      { prompt: "She ____ five books this month. (read) ", answer: "has read" },
      { prompt: "He ____ the report before the deadline. (write) ", answer: "had written" },
      { prompt: "I ____ to London last year. (go) ", answer: "went" },
      { prompt: "They ____ lunch before the movie began. (finish) ", answer: "had finished" },
      { prompt: "We ____ that play already. (see) ", answer: "have seen" },
      { prompt: "You ____ your bag on the train. (lose) ", answer: "lost" },
      { prompt: "It ____ raining before we arrived. (start) ", answer: "had started" }
    ]
  },
  8: {
    name: "Final Mix — Mixed Mountains (choose the correct tense)",
    questions: [
      { prompt: "She usually ____ at 7. (eat) ", answer: "eats" },
      { prompt: "Right now, he ____ a magazine. (read) ", answer: "is reading" },
      { prompt: "I ____ to the museum last weekend. (go)", answer: "went" },
      { prompt: "We ____ our project yesterday afternoon. (finish) ", answer: "finished" },
      { prompt: "They ____ a dog since 2019. (have) ", answer: "have had" },
      { prompt: "You ____ an email this morning. (write) ", answer: "wrote" },
      { prompt: "It ____ rains a lot in winter. (rain)", answer: "rains" },
      { prompt: "She ____ before I got there. (leave) ", answer: "had left" },
      { prompt: "He ____ to Japan before the pandemic began. (travel) ", answer: "had travelled" },
      { prompt: "We ____ a lot of English so far this year. (learn) ", answer: "have learned" }
    ]
  }
};

function loadLevelQuestions() {
  const tier = tiers[level] || tiers[1];
  activeQuestions = tier.questions;
  currentIndex = 0;

  document.getElementById("level").textContent = level;
  document.querySelector(".instructions").textContent = `🌴 Level ${level}: ${tier.name}`;
  document.getElementById("xp").textContent = xp;
  document.getElementById("streak").textContent = streak;

  loadQuestion();
}

function loadQuestion() {
  const q = activeQuestions[currentIndex];
  document.getElementById("question").textContent = q.prompt;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("answer").focus();
}

function checkAnswer() {
  const input = document.getElementById("answer").value.trim().toLowerCase();
  const correctAnswer = activeQuestions[currentIndex].answer;
  const correct = correctAnswer.toLowerCase();
  const feedback = document.getElementById("feedback");

  if (input === correct) {
    xp += 10;
    streak++;
    feedback.textContent = "✅ Correct!";
    if (streak % 3 === 0) {
      xp += 5;
      feedback.textContent += " Bonus XP for a 3-answer streak!";
    }
  } else {
    feedback.textContent = `❌ Incorrect. The correct answer is '${correctAnswer}'.`;
    streak = 0;
  }

  document.getElementById("xp").textContent = xp;
  document.getElementById("streak").textContent = streak;

  currentIndex++;
  if (currentIndex >= activeQuestions.length) {
    level++;
    setTimeout(() => {
      alert("🎉 Level up! New island unlocked!");
      loadLevelQuestions();
    }, 1000);
  } else {
    setTimeout(loadQuestion, 1500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadLevelQuestions();

  document.getElementById("answer").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      checkAnswer();
    }
  });
});
