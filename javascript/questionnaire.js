let answerList = [];
let questionsList = [];
let fakeList = [];
let lengthAnswer = 0;
let lengthFake = 0;
let randomLabel = 0;
let usedQuestions = JSON.parse(localStorage.getItem("usedQuestions") || "[]");
let argent = JSON.parse(localStorage.getItem("argent") || '{"monnaie":1000}');

async function readFile() {
  await fetch("../texte/reponses.txt")
    .then((res) => res.text())
    .then((data) => {
      const lines = data.replace(/\r/g, "").split("\n");
      answerList.push(...lines);
    })
    .catch((err) => console.error("Erreur fetch:", err));

  await fetch("../texte/questions.txt")
    .then((res) => res.text())
    .then((data) => {
      const lines = data.replace(/\r/g, "").split("\n");
      questionsList.push(...lines);
      lengthAnswer = answerList.length;
    })
    .catch((err) => console.error("Erreur fetch:", err));

  await fetch("../texte/faux.txt")
    .then((res) => res.text())
    .then((data) => {
      const lines = data.replace(/\r/g, "").split("\n");
      fakeList.push(...lines);
      flengthFake = fakeList.length;
    })
    .catch((err) => console.error("Erreur fetch:", err));
}

function nextQuestion() {
  const radios = document.getElementsByName("answer");

  Array.from(radios).forEach((r) => (r.style.visibility = "visible"));

  const remaining = questionsList.filter((q) => !usedQuestions.includes(q));
  if (remaining.length === 0) {
    document.getElementById("question").textContent =
      "Toutes les questions ont été posées !";

    Array.from(radios).forEach((r) => (r.style.visibility = "hidden"));
    usedQuestions = [];
    localStorage.removeItem("usedQuestions");
  } else {
    const r = Math.floor(Math.random() * remaining.length);
    const question = remaining[r];

    document.getElementById("question").textContent = question;

    randomLabel = Math.floor(Math.random() * 3) + 1;
    const labels = [1, 2, 3];
    const otherLabels = labels.filter((l) => l !== randomLabel);

    document.getElementById("label" + randomLabel).textContent = answerList[r];

    randomFake1 = Math.floor(Math.random() * lengthFake);
    randomFake2 = Math.floor(Math.random() * lengthFake);
    document.getElementById("label" + otherLabels[0]).textContent =
      fakeList[randomFake1];
    document.getElementById("label" + otherLabels[1]).textContent =
      fakeList[randomFake2];

    usedQuestions.push(question);
    localStorage.setItem("usedQuestions", JSON.stringify(usedQuestions));

    console.log("length : " + remaining.length);
  }
}

function end() {
  alert("fin");
  return;
}

function verify() {
  let checked = document.querySelector('input[name="answer"]:checked');

  if (checked == null) {
    alert("Il faut cocher");
  } else if (checked.id == randomLabel) {
    argent.monnaie += 200;
    console.log("monnaie : " + argent.monnaie);
    localStorage.setItem("argent", JSON.stringify(argent));
    alert("Bien jouer");
  } else {
    alert("Faux");
  }
  location.reload(true);
}

async function startQuiz() {
  await readFile();
  nextQuestion();
}

startQuiz();
