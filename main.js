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
        scores.J / (scores.P + scores.J) * 100;

    
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

    resultContainer.classList.remove("hidden");

requestAnimationFrame(() => {

    document.getElementById("axis-activity").style.left =
        `${activityRate}%`;

    document.getElementById("axis-exploration").style.left =
        `${explorationRate}%`;

    document.getElementById("axis-empathy").style.left =
        `${empathyRate}%`;

    document.getElementById("axis-adaptability").style.left =
        `${adaptabilityRate}%`;

});

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

   // ========================================
// 16タイプの結果文章
// ========================================

const resultDescriptions = {

    // ====================================
    // 活動性 × 探索性
    // ====================================

   resultText.innerHTML = `
<b>あなたの性質</b>
<br><br>
${resultDescriptions[type]}
`;
    
    ISTP: `
        静かな観察力と確かな判断力を持つ旅人。<br>
        必要なときには迷わず動き、状況に合わせて進む道を選びます。<br>
        誰かに決められた道ではなく、自分自身で見つけた道を歩むタイプです。
    `,

    ISFP: `
        穏やかな感性と自由な心を持つ旅人。<br>
        周囲の空気や小さな変化を感じ取り、自分らしい方法で世界を楽しみます。<br>
        静かな場所にも、自分だけの物語を見つけられるタイプです。
    `,

    ESTP: `
        冒険心と行動力にあふれた旅人。<br>
        考えるより先に一歩を踏み出し、未知の場所でも自分の力で道を切り開きます。<br>
        その場の状況を楽しみながら、仲間を巻き込んで進んでいくタイプです。
    `,

    ESFP: `
        明るさと人を惹きつける力を持つ旅人。<br>
        新しい場所や出会いを楽しみ、その場にいる人たちを自然と笑顔にします。<br>
        旅そのものを楽しみながら、たくさんの思い出を作るタイプです。
    `,


    // ====================================
    // 内省性 × 探索性
    // ====================================

    INFJ: `
        静かな洞察力を持つ案内人。<br>
        人の心や世界の奥にあるものをじっくり見つめ、まだ見えていない道を探します。<br>
        自分だけでなく、誰かの旅にも意味を見つけようとするタイプです。
    `,

    INFP: `
        想像力と優しい心を持つ夢見る旅人。<br>
        目に見えるものだけではなく、その奥にある物語や可能性を大切にします。<br>
        自分の信じる理想を胸に、ゆっくりと自分だけの道を歩むタイプです。
    `,

    ENFJ: `
        人を導く力を持つ旅の案内人。<br>
        仲間の気持ちを感じ取りながら、それぞれが前へ進める道を見つけます。<br>
        一人で進むよりも、誰かと一緒に未来を切り開くことを好むタイプです。
    `,

    ENFP: `
        好奇心と想像力に満ちた自由な旅人。<br>
        「次は何があるんだろう」という気持ちを原動力に、未知の世界へ飛び込んでいきます。<br>
        新しい出会いや偶然を楽しみながら、自分だけの物語を作るタイプです。
    `,


    // ====================================
    // 内省性 × 安定性
    // ====================================

    INTJ: `
        静かに未来を見据える戦略家。<br>
        周囲が見落としている可能性を見つけ、そこへ向かうための道筋を考えます。<br>
        感情に流されず、自分の描いた未来へ着実に進んでいくタイプです。
    `,

    INTP: `
        世界の仕組みを探る研究者。<br>
        「なぜ？」という疑問を大切にし、物事の奥にある法則や仕組みを探し続けます。<br>
        一人で考える時間を楽しみながら、自分なりの答えを見つけるタイプです。
    `,

    ENTJ: `
        仲間を率いて道を切り開く指揮者。<br>
        明確な目的を持ち、そこへ向かうために必要なものを冷静に判断します。<br>
        未知の場所でも迷わず進み、周囲を導いていくタイプです。
    `,

    ENTP: `
        新しい可能性を探し続ける冒険者。<br>
        常識にとらわれず、「もっと面白い方法はないか」と考えながら未知へ進みます。<br>
        予想外の出来事さえも楽しみ、新しい道を生み出していくタイプです。
    `,


    // ====================================
    // 活動性 × 安定性
    // ====================================

    ISTJ: `
        確かな足取りで旅を続ける堅実な旅人。<br>
        一つひとつの経験を大切に積み重ね、決めたことを最後までやり遂げます。<br>
        派手さよりも、確かな道を歩み続けることを大切にするタイプです。
    `,

    ISFJ: `
        仲間の旅をそっと支える守り手。<br>
        周囲の変化によく気づき、困っている人がいれば自然と手を差し伸べます。<br>
        安心できる場所を作りながら、仲間とともに旅を続けるタイプです。
    `,

    ESTJ: `
        仲間をまとめ、目的地へ導く旅のリーダー。<br>
        状況を整理し、必要なことを一つずつ確実に進めていきます。<br>
        責任感が強く、仲間から頼られる存在になるタイプです。
    `,

    ESFJ: `
        人とのつながりを大切にする旅の仲間。<br>
        周囲の人に気を配り、誰もが安心して過ごせる場所を作ります。<br>
        仲間との時間や思い出を大切にしながら旅を楽しむタイプです。
    `

};


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
