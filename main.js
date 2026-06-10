let currentQuestion = 0;

const scores = {
    fox: 0,
    owl: 0,
    wolf: 0
};

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");

const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");

function showQuestion() {

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    choicesElement.innerHTML = "";

    q.choices.forEach(choice => {

        const button = document.createElement("button");

        button.textContent = choice.text;

        button.addEventListener("click", () => {

            scores[choice.animal]++;

            currentQuestion++;

            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        });

        choicesElement.appendChild(button);
    });
}

function showResult() {

    document.getElementById("question-container").classList.add("hidden");

    resultContainer.classList.remove("hidden");

    let winner = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

   const animal = animals[winner];

resultTitle.textContent =
    `あなたの動物は「${animal.name}」です！`;

function showResult() {

    document.getElementById("question-container").classList.add("hidden");

    resultContainer.classList.remove("hidden");

    let winner = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    const animal = animals[winner];

    resultTitle.textContent =
        `あなたの動物は「${animal.name}」です！`;

function showResult() {

    document.getElementById("question-container").classList.add("hidden");

    resultContainer.classList.remove("hidden");

    let winner = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    const animal = animals[winner];

    resultTitle.textContent =
        `あなたの動物は「${animal.name}」です！`;

    resultText.textContent =
        animal.keywords.join(" ・ ");
}
showQuestion();
