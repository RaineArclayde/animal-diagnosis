let currentQuestion = 0;

// ======================
// MBTIスコア
// ======================

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

// ======================
// MBTI → 動物
// ======================

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

// ======================
// HTML取得
// ======================

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");

const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");

const progress = document.getElementById("progress");
const progressText = document.getElementById("progress-text");

const keywordContainer =
    document.getElementById("result-keywords");

const restartBtn =
    document.getElementById("restart-btn");

// ======================
// 質問表示
// ======================
restartBtn.onclick = ()=>{

    location.reload();

};

function showQuestion() {
    
        const q = questions[currentQuestion];

        questionElement.textContent = q.question;

        progressText.textContent =
            `${currentQuestion + 1} / ${questions.length}`;

        progress.style.width =
            `${currentQuestion / questions.length * 100}%`;

        choicesElement.innerHTML = "";

        q.choices.forEach(choice => {

            const button = document.createElement("button");

            button.textContent = choice.text;

            button.onclick = () => {

    scores[choice.type]++;

    currentQuestion++;

    if(currentQuestion < questions.length){

        const container =
            document.getElementById("question-container");

        container.classList.add("fade-out");

        setTimeout(() => {

            container.classList.remove("fade-out");

            showQuestion();

        },300);

    }else{

        showResult();

    }

};
    const container = document.getElementById("question-container");

    container.classList.add("fade-out");

    setTimeout(() => {

        showQuestion();

        container.classList.remove("fade-out");

    },300);

}else{

    showResult();

}
            };

            choicesElement.appendChild(button);

        });

        container.classList.remove("fade-out");
        container.classList.add("fade-in");

    },250);

}
// ======================
// 結果表示
// ======================

function showResult(){

    document.getElementById("question-container")
        .classList.add("hidden");

    progress.style.width = "100%";

    progressText.textContent =
        `${questions.length} / ${questions.length}`;

    let type = "";

    type += scores.E >= scores.I ? "E" : "I";
    type += scores.N >= scores.S ? "N" : "S";
    type += scores.F >= scores.T ? "F" : "T";
    type += scores.J >= scores.P ? "J" : "P";

    const animal = animals[typeToAnimal[type]];

    resultContainer.classList.remove("hidden");

    resultTitle.textContent =
    `${animal.name} タイプ`;

keywordContainer.innerHTML = "";

animal.keywords.forEach(keyword=>{

    keywordContainer.innerHTML +=
        `<span class="keyword">${keyword}</span>`;

});

resultText.innerHTML = `
<b>MBTIタイプ：</b> ${type}
<br><br>
${animal.description}
`;
}

// ======================
// 開始
// ======================

document
.getElementById("question-container")
.classList.add("fade-in");

showQuestion();
