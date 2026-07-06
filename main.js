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
// MBTI相性表
// ======================

const compatibility = {

    ISTP: ["ENFP", "ESFJ"],
    ISFP: ["ENTJ", "ENFJ"],
    ESTP: ["INFJ", "ISFJ"],
    ESFP: ["INTJ", "ISTJ"],

    INFJ: ["ENFP", "ENTP"],
    INFP: ["ENFJ", "ENTJ"],
    ENFJ: ["INFP", "ISFP"],
    ENFP: ["INFJ", "INTJ"],

    INTJ: ["ENFP", "ESFP"],
    INTP: ["ENTJ", "ESTJ"],
    ENTJ: ["INFP", "ISFP"],
    ENTP: ["INFJ", "INTJ"],

    ISTJ: ["ESFP", "ENFP"],
    ISFJ: ["ESTP", "ESFP"],
    ESTJ: ["ISFP", "INTP"],
    ESFJ: ["ISTP", "ISFP"]

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

const radarCanvas =
    document.getElementById("radarChart");

const ctx =
    radarCanvas.getContext("2d");

const restartBtn =
    document.getElementById("restart-btn");

// ======================
// 質問表示
// ======================
restartBtn.onclick = ()=>{

    location.reload();

};

function drawRadar(){

    ctx.clearRect(0,0,320,320);

    const centerX = 160;
    const centerY = 160;
    const radius = 100;

    // 外側の菱形
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX + radius, centerY);
    ctx.lineTo(centerX, centerY + radius);
    ctx.lineTo(centerX - radius, centerY);
    ctx.closePath();

    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 縦線
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY + radius);
    ctx.stroke();

    // 横線
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.stroke();

    // ラベル
    ctx.fillStyle = "#333";
    ctx.font = "20px sans-serif";

    ctx.fillText("E", centerX - 8, centerY - radius - 15);
    ctx.fillText("F", centerX + radius + 10, centerY + 6);
    ctx.fillText("I", centerX - 6, centerY + radius + 25);
    ctx.fillText("J", centerX - radius - 25, centerY + 6);

}

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

                const container = document.getElementById("question-container");

                container.classList.add("fade-out");

                setTimeout(() => {

                    container.classList.remove("fade-out");

                    showQuestion();

                },300);

            }else{

                showResult();

            }

        };

        choicesElement.appendChild(button);

    });

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
drawRadar();

}

// ======================
// 開始
// ======================

document
.getElementById("question-container")
.classList.add("fade-in");

showQuestion();
