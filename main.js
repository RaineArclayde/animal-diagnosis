alert("main.js 読み込み成功");

let currentQuestion = 0;

// MBTIのスコア
const scores = {
    E: 0,
    I: 0,
    N: 0,
    S: 0,
    F: 0,
    T: 0,
    J: 0,
    P: 0
};

// MBTIタイプ → 動物
const typeToAnimal = {
    ISTP: "fox",
    ISFP: "rabbit",
    ESTP: "badger",
    ESFP: "duck",

    INFJ: "deerFemale",
    INFP: "sheepChild",
    ENFJ: "squirrel",
    ENFP: "flyingSquirrel",

    INTJ: "snake",
    INTP: "hedgehog",
    ENTJ: "cat",
    ENTP: "goat",

    ISTJ: "turtle",
    ISFJ: "sheepAdult",
    ESTJ: "deerMale",
    ESFJ: "bird"
};

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");

const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progress-text");

function showQuestion() {

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    
    // 進捗表示
    progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;
    
    const percentage = (currentQuestion / questions.length) * 100;
    progress.style.width = `${percentage}%`;
    choicesElement.innerHTML = "";

    q.choices.forEach(choice => {

        const button = document.createElement("button");

        button.textContent = choice.text;

        button.addEventListener("click", () => {

            // MBTIスコア加算
            scores[choice.type]++;

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

    progress.style.width = "100%";
    progressText.textContent = `${questions.length} / ${questions.length}`;
    
    document.getElementById("question-container").classList.add("hidden");
    resultContainer.classList.remove("hidden");

    // MBTIタイプを作る
    let type = "";

    type += scores.E >= scores.I ? "E" : "I";
    type += scores.N >= scores.S ? "N" : "S";
    type += scores.F >= scores.T ? "F" : "T";
    type += scores.J >= scores.P ? "J" : "P";

    // 動物を取得
    const animalKey = typeToAnimal[type];
    const animal = animals[animalKey];

    resultTitle.textContent =
        `あなたは ${type}「${animal.name}」タイプ！`;

    resultText.textContent =
        animal.description;
}

showQuestion();

const loadingContainer =

    document.getElementById("loading-container");

const loadingProgress =

    document.getElementById("loading-progress");
