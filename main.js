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

const radarCanvas =
    document.getElementById("radarChart");

const ctx =
    radarCanvas.getContext("2d");

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
// レーダーチャート
// ========================================

function drawRadar() {

    ctx.clearRect(0, 0, 320, 320);

    const centerX = 160;
    const centerY = 160;
    const radius = 100;


    // --------------------
    // 外側の菱形
    // --------------------

    ctx.beginPath();

    ctx.moveTo(
        centerX,
        centerY - radius
    );

    ctx.lineTo(
        centerX + radius,
        centerY
    );

    ctx.lineTo(
        centerX,
        centerY + radius
    );

    ctx.lineTo(
        centerX - radius,
        centerY
    );

    ctx.closePath();

    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 2;

    ctx.stroke();


    // --------------------
    // 縦線
    // --------------------

    ctx.beginPath();

    ctx.moveTo(
        centerX,
        centerY - radius
    );

    ctx.lineTo(
        centerX,
        centerY + radius
    );

    ctx.stroke();


    // --------------------
    // 横線
    // --------------------

    ctx.beginPath();

    ctx.moveTo(
        centerX - radius,
        centerY
    );

    ctx.lineTo(
        centerX + radius,
        centerY
    );

    ctx.stroke();


    // --------------------
    // ラベル
    // --------------------

    ctx.fillStyle = "#434C1F";
    ctx.font = "18px 'Yu Mincho'";


    // 上
    ctx.textAlign = "center";

    ctx.fillText(
        "活動性",
        centerX,
        centerY - radius - 18
    );


    // 右
    ctx.textAlign = "left";

    ctx.fillText(
        "探索性",
        centerX + radius + 15,
        centerY + 6
    );


    // 下
    ctx.textAlign = "center";

    ctx.fillText(
        "共感性",
        centerX,
        centerY + radius + 28
    );


    // 左
    ctx.textAlign = "right";

    ctx.fillText(
        "適応性",
        centerX - radius - 15,
        centerY + 6
    );

}


// ========================================
// 質問表示
// ========================================

function showQuestion() {

    const q = questions[currentQuestion];


    // --------------------
    // 質問文
    // --------------------

    questionElement.textContent =
        q.question;


    // --------------------
    // 進捗
    // --------------------

    progressText.textContent =
        `${currentQuestion + 1} / ${questions.length}`;

    progress.style.width =
        `${currentQuestion / questions.length * 100}%`;


    // --------------------
    // 選択肢をリセット
    // --------------------

    choicesElement.innerHTML = "";


    // --------------------
    // 選択肢を作る
    // --------------------

    q.choices.forEach(choice => {

        const button =
            document.createElement("button");

        button.textContent =
            choice.text;


        button.onclick = () => {

            // 回答を記録
            answerHistory.push(
                choice.type
            );

            // スコア加算
            scores[choice.type]++;

            // 次の質問へ
            currentQuestion++;


            // --------------------
            // まだ質問が残っている
            // --------------------

            if (
                currentQuestion <
                questions.length
            ) {

                const container =
                    document.getElementById(
                        "question-container"
                    );

                container.classList.add(
                    "fade-out"
                );


                setTimeout(() => {

                    container.classList.remove(
                        "fade-out"
                    );

                    showQuestion();

                }, 300);


            } else {

                // --------------------
                // 全問終了
                // --------------------

                showResult();

            }

        };


        choicesElement.appendChild(
            button
        );

    });


    // ========================================
    // 前に戻るボタンの表示
    // ========================================

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

        <b>分類コード：</b> ${type}

        <br><br>

        ${animal.description}

    `;


    // ========================================
    // レーダーチャート
    // ========================================

    drawRadar();


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
