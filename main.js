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

const backBtn = document.getElementById("back-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startBtn = document.getElementById("start-btn");

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");

const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");

const animalImage = document.getElementById("animal-image");

const growthPlants =
    document.querySelectorAll("#growth-progress img");

const progressText = document.getElementById("progress-text");

const keywordContainer =
    document.getElementById("result-keywords");

const compatibilityContainer =
    document.getElementById("compatibility");

const restartBtn = document.getElementById("restart-btn");
const exitBtn = document.getElementById("exit-btn");


// ========================================
// 診断開始
// ========================================

startBtn.onclick = () => {

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    document.body.style.overflow = "hidden";

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

    // 1問目では戻れない
    if (currentQuestion === 0) {
        return;
    }

    // 現在の問題を1つ戻す
    currentQuestion--;

    // 直前の回答を履歴から削除
    const lastType = answerHistory.pop();

    // MBTIスコアも元に戻す
    scores[lastType]--;

    // 問題を再表示
    showQuestion();

};


// ========================================
// 質問表示
// ========================================

function showQuestion(growIndex = -1) {

    const q = questions[currentQuestion];


    // ------------------------------------
    // 質問文
    // ------------------------------------

    questionElement.textContent = q.question;

   if(currentQuestion === 1 && window.innerWidth <= 600){
    questionElement.innerHTML = "長い旅の途中、<br>あなたは一人で過ごす時間を得た。";

}else if(currentQuestion === 2 && window.innerWidth <= 600){
    questionElement.innerHTML = "初めて訪れた街で、<br>あなたは新しい仲間を探している";

}else if(currentQuestion === 3 && window.innerWidth <= 600){
    questionElement.innerHTML = "見知らぬ森への分かれ道。<br>あなたならどちらへ進む？";
       
}else if(currentQuestion === 4 && window.innerWidth <= 600){

    questionElement.innerHTML = "旅の途中、<br>予定にはなかった小さな村を見つけた。";

}else if(currentQuestion === 7 && window.innerWidth <= 600){
    questionElement.innerHTML = "二つの道のどちらを選ぶか、<br>仲間と意見が分かれた。";

}else if(currentQuestion === 9 && window.innerWidth <= 600){
    questionElement.innerHTML = "明日の旅について、<br>まだ何も決まっていない。";

}else{
    questionElement.textContent = q.question;
}
    
    if(currentQuestion === 0){
    questionElement.classList.add("first-question");
}else{
    questionElement.classList.remove("first-question");
}

questionElement.classList.remove("question-5");

if(currentQuestion === 4){
    questionElement.classList.add("question-5");
}

questionElement.classList.remove("question-7");

if(currentQuestion === 6){
    questionElement.classList.add("question-7");
}

questionElement.classList.remove("question-9");

if(currentQuestion === 8){
    questionElement.classList.add("question-9");
}
    
    // ------------------------------------
    // 問題数
    // ------------------------------------

    document.getElementById("current-number").textContent =
        currentQuestion + 1;

    document.getElementById("total-number").textContent =
        `/${questions.length}`;


    // ------------------------------------
    // 種の状態
    // ------------------------------------

    growthPlants.forEach((plant, index) => {

        plant.classList.remove("growing");

        if (index < currentQuestion) {

            plant.src = "images/seed-grown.webp";

        } else {

            plant.src = "images/seed.webp";

        }

    });


    // ------------------------------------
    // 今回育った種だけアニメーション
    // ------------------------------------

    if (
        growIndex >= 0 &&
        growIndex < growthPlants.length
    ) {

        const plant = growthPlants[growIndex];

        plant.src = "images/seed-grown.webp";

        // アニメーションを確実に再発火
        void plant.offsetWidth;

        plant.classList.add("growing");
    }


    // ------------------------------------
    // 選択肢
    // ------------------------------------

    choicesElement.innerHTML = "";


q.choices.forEach((choice,index)=>{
   const button = document.createElement("button");

if(currentQuestion === 8 && index === 1 && window.innerWidth <= 600){
    button.innerHTML = "失敗した原因を整理し、<br>次に同じことが起きない方法を考える";

}else if(currentQuestion === 9 && index === 0 && window.innerWidth <= 600){
    button.innerHTML = "そのときの気分や状況を見て、<br>行き先を決める";

}else{
    button.textContent = choice.text;
}

    if(index === 0){
        button.classList.add("choice-a");

        if(
    currentQuestion === 0 ||
    currentQuestion === 2 ||
    currentQuestion === 3 ||
    currentQuestion === 4 ||
    currentQuestion === 7
){
    button.classList.add("first-question-a");
}

        // 6問目 A → 13px
        if(currentQuestion === 5){
            button.classList.add("sixth-question-a");
        }

        if(currentQuestion === 8){
    button.classList.add("ninth-question-a");
}

    }else{
        button.classList.add("choice-b");

        // 1問目 B → 13px
        if(currentQuestion === 0){
            button.classList.add("first-question-b");
        }

        // 2・3・6問目 B → 12px
        if(
            currentQuestion === 1 ||
            currentQuestion === 2 
        ){
            button.classList.add("second-question-b");
        }

        if(currentQuestion === 5){
    button.classList.add("sixth-question-b");
}

        if(currentQuestion === 6){
    button.classList.add("seventh-question-b");
}
        // 6・12問目 B → PC用17px
        if(currentQuestion === 5 || currentQuestion === 11){
            button.classList.add("small-choice-b");
        }

        // 9問目 B → PC用14px
        if(currentQuestion === 8){
            button.classList.add("smaller-choice-b");
        }
    }

    button.onclick = ()=>{
        answerHistory.push(choice.type);
        scores[choice.type]++;
        currentQuestion++;

        if(currentQuestion < questions.length){
            const container = document.getElementById("question-container");
            container.classList.add("fade-out");

            setTimeout(()=>{
                container.classList.remove("fade-out");
                showQuestion(currentQuestion - 1);
            },300);
        }else{
            showResult();
        }
    };

    choicesElement.appendChild(button);
});
    

    // ------------------------------------
    // 戻るボタン
    // ------------------------------------

    if (currentQuestion === 0) {

        backBtn.style.display = "none";

    } else {

        backBtn.style.display = "block";

    }

}

// =========================
// 右下メニュー
// =========================

const quizMenu = document.getElementById("quiz-menu");
const menuToggle = document.getElementById("menu-toggle");

menuToggle.addEventListener("click", () => {
    quizMenu.classList.toggle("open");
});

// ========================================
// 結果表示
// ========================================

function showResult() {

    // ------------------------------------
    // スクロールを解除
    // ------------------------------------

    document.body.style.overflow = "";


    // ------------------------------------
    // 質問画面を非表示
    // ------------------------------------

    quizScreen.classList.add("hidden");


    // ------------------------------------
    // 結果画面を表示
    // ------------------------------------

    resultContainer.classList.remove("hidden");


    // ------------------------------------
    // 結果画面の先頭へ
    // ------------------------------------

    window.scrollTo(0, 0);


    // ------------------------------------
    // 全ての種を成長状態にする
    // ------------------------------------

    growthPlants.forEach(plant => {

        plant.classList.remove("growing");

        plant.src = "images/seed-grown.webp";

    });


    // ------------------------------------
    // 問題数
    // ------------------------------------

    document.getElementById("current-number").textContent =
        questions.length;

    document.getElementById("total-number").textContent =
        `/${questions.length}`;


    // ====================================
    // MBTIタイプ判定
    // ====================================

    let type = "";


    type += scores.E >= scores.I ? "E" : "I";
    type += scores.N >= scores.S ? "N" : "S";
    type += scores.F >= scores.T ? "F" : "T";
    type += scores.J >= scores.P ? "J" : "P";


    // ====================================
    // 動物取得
    // ====================================

    const animal = animals[typeToAnimal[type]];


    // ====================================
    // 4軸割合
    // ====================================

    const activityRate =
        scores.E /
        (scores.E + scores.I) *
        100;

    const explorationRate =
        scores.N /
        (scores.N + scores.S) *
        100;

    const empathyRate =
        scores.F /
        (scores.F + scores.T) *
        100;

    const adaptabilityRate =
        scores.J /
        (scores.P + scores.J) *
        100;


    // ====================================
    // 動物画像
    // ====================================

    animalImage.src = animal.image;
    animalImage.alt = animal.name;


    // ====================================
    // 4軸バー
    // ====================================

    requestAnimationFrame(() => {

        document
            .getElementById("axis-activity")
            .style.left = `${activityRate}%`;

        document
            .getElementById("axis-exploration")
            .style.left = `${explorationRate}%`;

        document
            .getElementById("axis-empathy")
            .style.left = `${empathyRate}%`;

        document
            .getElementById("axis-adaptability")
            .style.left = `${adaptabilityRate}%`;

    });


    // ====================================
    // キーワード
    // ====================================

    keywordContainer.innerHTML = "";


    animal.keywords.forEach(keyword => {

        keywordContainer.innerHTML +=
            `<span class="keyword">${keyword}</span>`;

    });


    // ====================================
    // 16タイプの結果文章
    // ====================================

    const resultDescriptions = {

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

        INTJ: `
            静かに未来を見据える戦略家。<br>
            周囲が見落としている可能性を見つけ、そこへ向かうための道筋を考えます。<br>
            自分の描いた未来へ着実に進んでいくタイプです。
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


    // ====================================
    // 結果文章
    // ====================================

    resultText.innerHTML = `
        <b>あなたの性質</b>
        <br><br>
        ${resultDescriptions[type]}
    `;


    // ====================================
    // 相性の良い動物
    // ====================================

    compatibilityContainer.innerHTML = "";


    const compatibleTypes = compatibility[type];


    compatibleTypes.forEach(type => {

        const animalKey = typeToAnimal[type];
        const animalData = animals[animalKey];


        compatibilityContainer.innerHTML += `

            <div class="compatibility-card">

                <h4>
                    ${animalData.name}
                </h4>

                <p>
                    ${animalData.description}
                </p>

            </div>

        `;

    });

}


// ========================================
// 診断終了
// ========================================

exitBtn.onclick = () => {

    const confirmed = confirm(
        "診断を終了して最初の画面に戻りますか？"
    );


    if (!confirmed) {
        return;
    }


    // ------------------------------------
    // データをリセット
    // ------------------------------------

    currentQuestion = 0;
    answerHistory = [];


    Object.keys(scores).forEach(key => {

        scores[key] = 0;

    });


    // ------------------------------------
    // 画面をリセット
    // ------------------------------------

    quizScreen.classList.add("hidden");

    quizScreen.classList.remove("showing-result");

    resultContainer.classList.add("hidden");

    startScreen.classList.remove("hidden");


    // ------------------------------------
    // 質問コンテナを表示
    // ------------------------------------

    document
        .getElementById("question-container")
        .classList.remove("hidden");


    // ------------------------------------
    // 種をリセット
    // ------------------------------------

    growthPlants.forEach(plant => {

        plant.classList.remove("growing");

        plant.src = "images/seed.webp";

    });


    // ------------------------------------
    // 問題数をリセット
    // ------------------------------------

    document.getElementById("current-number").textContent = 1;

    document.getElementById("total-number").textContent =
        `/${questions.length}`;


    // ------------------------------------
    // スクロールを解除
    // ------------------------------------

    document.body.style.overflow = "";

};


// ========================================
// 初期設定
// ========================================

document
    .getElementById("question-container")
    .classList.add("fade-in");
