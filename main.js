let answerHistory = [];
let currentQuestion = 0;

// ========================================
// MBTIスコア
// ========================================

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


// ========================================
// MBTI → 動物
// ========================================

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


// ========================================
// MBTI相性表
// ========================================

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


// ========================================
// HTML取得
// ========================================

const backBtn =
    document.getElementById("back-btn");

const startScreen =
    document.getElementById("start-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const startBtn =
    document.getElementById("start-btn");

const questionElement =
    document.getElementById("question");

const choicesElement =
    document.getElementById("choices");

const resultContainer =
    document.getElementById("result-container");

const resultTitle =
    document.getElementById("result-title");

const resultText =
    document.getElementById("result-text");

const animalImage =
    document.getElementById("animal-image");

const progress =
    document.getElementById("progress");

const progressText =
    document.getElementById("progress-text");

const keywordContainer =
    document.getElementById("result-keywords");

const compatibilityContainer =
    document.getElementById("compatibility");

const restartBtn =
    document.getElementById("restart-btn");


// ========================================
// 診断開始
// ========================================

startBtn.onclick = () => {

    startScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    showQuestion();

};


// ========================================
// やり直す
// ========================================

restartBtn.onclick = () => {

    location.reload();

};


// ========================================
// 前の質問へ戻る
// ========================================

backBtn.onclick = () => {

    if (currentQuestion === 0) {
        return;
    }

    currentQuestion--;

    const lastType = answerHistory.pop();

    scores[lastType]--;

    showQuestion();

};

// ========================================
// 質問表示
// ========================================

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

            answerHistory.push(choice.type);

            scores[choice.type]++;

            currentQuestion++;

            if (currentQuestion < questions.length) {

                const container =
                    document.getElementById("question-container");

                container.classList.add("fade-out");

                setTimeout(() => {

                    container.classList.remove("fade-out");

                    showQuestion();

                }, 300);

            } else {

                showResult();

            }

        };

        choicesElement.appendChild(button);

    });

    if (currentQuestion === 0) {
        backBtn.style.display = "none";
    } else {
        backBtn.style.display = "block";
    }

}


// ========================================
// 結果表示
// ========================================

function showResult() {

    // 質問を隠す
    document
        .getElementById("question-container")
        .classList.add("hidden");


    // 進捗を100%
    progress.style.width = "100%";

    progressText.textContent =
        `${questions.length} / ${questions.length}`;


    // ========================================
    // MBTIタイプ判定
    // ========================================

    let type = "";

    type +=
        scores.E >= scores.I
            ? "E"
            : "I";

    type +=
        scores.N >= scores.S
            ? "N"
            : "S";

    type +=
        scores.F >= scores.T
            ? "F"
            : "T";

    type +=
        scores.J >= scores.P
            ? "J"
            : "P";


    // ========================================
    // 動物取得
    // ========================================

    const animal =
        animals[typeToAnimal[type]];

// ========================================
// 4軸の割合を計算
// ========================================

// 活動性 ←→ 内省性
const activityRate =
    scores.E / (scores.E + scores.I) * 100;

// 探索性 ←→ 安定性
const explorationRate =
    scores.N / (scores.N + scores.S) * 100;

// 共感性 ←→ 論理性
const empathyRate =
    scores.F / (scores.F + scores.T) * 100;

// 適応性 ←→ 計画性
const adaptabilityRate =
    scores.P / (scores.P + scores.J) * 100;

    // ========================================
// 4軸バーに反映
// ========================================

document.getElementById("axis-activity").style.left =
    `${activityRate}%`;

document.getElementById("axis-exploration").style.left =
    `${explorationRate}%`;

document.getElementById("axis-empathy").style.left =
    `${empathyRate}%`;

document.getElementById("axis-adaptability").style.left =
    `${adaptabilityRate}%`;

    
    // ========================================
    // 動物画像
    // ========================================

    animalImage.src =
        animal.image;

    animalImage.alt =
        animal.name;


    // ========================================
    // 結果画面表示
    // ========================================

    resultContainer.classList.remove(
        "hidden"
    );


    resultTitle.textContent =
        `${animal.name} タイプ`;


    // ========================================
    // キーワード
    // ========================================

    keywordContainer.innerHTML = "";

    animal.keywords.forEach(keyword => {

        keywordContainer.innerHTML +=
            `<span class="keyword">${keyword}</span>`;

    });


    // ========================================
    // 説明
    // ========================================

   resultText.innerHTML = `
<b>あなたの性質</b>
<br><br>
${animal.description}
`;


    // ========================================
    // 相性の良い動物
    // ========================================

    compatibilityContainer.innerHTML = "";

    const compatibleTypes =
        compatibility[type];


    compatibleTypes.forEach(type => {

        const animalKey =
            typeToAnimal[type];

        const animalData =
            animals[animalKey];


        compatibilityContainer.innerHTML += `

            <div class="compatibility-card">

                <h4>
                    ${animalData.name}
                </h4>

                <p>
                    ${type}
                </p>

                <p>
                    ${animalData.description}
                </p>

            </div>

        `;

    });

}


// ========================================
// 最初の画面
// ========================================

document
    .getElementById("question-container")
    .classList.add("fade-in");
