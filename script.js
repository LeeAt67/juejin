// 游戏数据
const gameStory = {
    murderer: "咖啡店老板",
    clues: [
        "咖啡",
        "中毒",
        "氰化物",
        "晚上8点",
        "咖啡店",
        "吧台",
        "没有打斗痕迹",
        "没有目击证人",
        "没有监控",
        "老板和比尔认识",
        "老板和比尔有矛盾",
        "老板没有不在场证明",
        "老板在准备咖啡",
        "老板知道比尔的习惯",
        "老板可以接触到氰化物",
        "老板有作案时间",
        "老板有作案动机",
        "老板有作案条件",
        "老板是最后一个见到比尔的人",
        "老板可以控制现场"
    ],
    details: [
        "比尔是一个经常光顾咖啡店的顾客",
        "咖啡店老板和比尔之间有一些不为人知的矛盾",
        "案发当晚，咖啡店老板是最后一个见到比尔的人",
        "现场没有发现打斗痕迹，说明凶手可能是熟人",
        "咖啡店老板对咖啡的调制过程非常熟悉",
        "咖啡店老板知道比尔喜欢在晚上8点来喝咖啡",
        "咖啡店老板可以轻易接触到各种咖啡原料",
        "咖啡店老板没有不在场证明",
        "咖啡店老板和比尔之间有一些金钱纠纷",
        "咖啡店老板最近的经济状况不太好"
    ]
};

// 游戏状态
let round = 0;
let timeLimit = 20 * 60;
let remainingTime = timeLimit;
let questionCount = 0;
const collectedClues = new Set();

// DOM元素
const gameContainer = document.getElementById('game-container');
const questionInput = document.getElementById('question-input');
const submitBtn = document.getElementById('submit-btn');
const chatHistory = document.getElementById('chat-history');
const timerElement = document.getElementById('timer');
const clueCollection = document.getElementById('clue-collection');
const cluesList = document.getElementById('clues-list');
const startOverlay = document.getElementById('startOverlay');
const startBtn = document.getElementById('startBtn');
const bgm = document.getElementById('bgm');
const musicControl = document.getElementById('music-control');
const volumeControl = document.querySelector('.volume-control');
const volumeSlider = document.getElementById('volume-slider');

// 音乐控制
let isMusicPlaying = true;

// 设置默认音量（50%）
bgm.volume = 0.5;

// 自动播放音乐
document.addEventListener('DOMContentLoaded', () => {
    bgm.play().catch(error => {
        console.log('自动播放被阻止，需要用户交互才能播放音乐');
    });
});

// 音量控制
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    bgm.volume = volume;
});

// 显示/隐藏音量控制
musicControl.addEventListener('mouseenter', () => {
    volumeControl.classList.add('show');
});

musicControl.addEventListener('mouseleave', () => {
    volumeControl.classList.remove('show');
});

// 音乐播放/暂停控制
musicControl.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgm.pause();
        musicControl.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAzdjE4TTggN3YxME0xNiA3djEwTTQgNGwxNiAxNiIvPjwvc3ZnPg==" alt="静音">';
        musicControl.title = '播放音乐';
    } else {
        bgm.play();
        musicControl.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAzdjE4TTggN3YxME0xNiA3djEwIi8+PC9zdmc+" alt="音乐">';
        musicControl.title = '暂停音乐';
    }
    isMusicPlaying = !isMusicPlaying;
});

// 追加消息到聊天历史
function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatHistory.appendChild(messageDiv);
    // 滚动到最新消息
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// 添加消息（用户问题和系统回答）
function addMessage(question, response) {
    appendMessage('user', question);
    appendMessage('system', response);
}

// 添加线索
function addClue(clue) {
    if (!collectedClues.has(clue)) {
        collectedClues.add(clue);
        const clueDiv = document.createElement('div');
        clueDiv.classList.add('clue-item');
        clueDiv.textContent = clue;
        cluesList.appendChild(clueDiv);
    }
}

// 处理问题
function handleQuestion(question) {
    questionCount++;

    // 每10个问题显示一个细节
    if (questionCount % 10 === 0) {
        const detailIndex = Math.floor((questionCount / 10) - 1);
        if (detailIndex < gameStory.details.length) {
            appendMessage('system', `【重要线索】${gameStory.details[detailIndex]}`);
        }
    }

    // 检查是否提到老板或咖啡店老板，并且包含案件相关关键词
    const caseKeywords = ['凶手', '杀', '害', '毒', '咖啡', '下毒', '作案', '动机', '时间', '条件'];
    const hasBoss = question.includes('老板') || question.includes('咖啡店老板');
    const hasCaseKeyword = caseKeywords.some(keyword => question.includes(keyword));

    if (hasBoss && hasCaseKeyword) {
        showGameOver(true);
        return;
    }

    // 检查问题是否包含线索关键词
    const matchedClue = gameStory.clues.find(clue => question.includes(clue));
    if (matchedClue) {
        addClue(matchedClue);
        addMessage(question, "是");
    } else {
        addMessage(question, "不是");
    }
}

// 开始游戏
function startGame() {
    startOverlay.style.display = 'none';
    gameContainer.style.display = 'block';
    startTimer();
    appendMessage('system', '在一个阴雨绵绵的下午，警探李明走进了位于市中心的"蓝调咖啡馆"。死者比尔·陈被发现倒在咖啡馆的VIP包间里，桌上放着一杯已经凉透的美式咖啡。');
}

// 开始计时器
function startTimer() {
    const timerInterval = setInterval(() => {
        remainingTime--;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerElement.textContent = `剩余时间: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            showGameOver(false);
        }
    }, 1000);
}

// 游戏结束
function showGameOver(isVictory) {
    const overlay = document.getElementById('gameOverOverlay');
    const title = document.getElementById('gameOverTitle');
    const resultMessage = document.getElementById('resultMessage');
    const description = document.getElementById('gameOverDescription');

    if (isVictory) {
        title.textContent = '恭喜你！';
        resultMessage.textContent = '你成功找出了凶手！';
        resultMessage.className = 'result-message victory';
        description.textContent = '你通过敏锐的观察和缜密的推理，成功找出了杀害比尔的凶手。你的推理能力令人印象深刻！';
    } else {
        title.textContent = '游戏结束';
        resultMessage.textContent = '很遗憾，你没有找出凶手。';
        resultMessage.className = 'result-message defeat';
        description.textContent = '凶手是咖啡店老板。他利用比尔的咖啡习惯，在咖啡中下毒。如果你想要再次挑战，可以点击下方按钮重新开始游戏。';
    }

    overlay.style.display = 'flex';
    questionInput.disabled = true;
    submitBtn.disabled = true;
}

// 重新开始游戏
function restartGame() {
    round = 0;
    remainingTime = timeLimit;
    questionCount = 0;
    collectedClues.clear();
    cluesList.innerHTML = '';
    chatHistory.innerHTML = '';
    questionInput.value = '';
    questionInput.disabled = false;
    submitBtn.disabled = false;
    document.getElementById('gameOverOverlay').style.display = 'none';
    startTimer();
    appendMessage('system', '在一个阴雨绵绵的下午，警探李明走进了位于市中心的"蓝调咖啡馆"。死者比尔·陈被发现倒在咖啡馆的VIP包间里，桌上放着一杯已经凉透的美式咖啡。');
}

// 事件监听器
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', () => {
    const question = questionInput.value.trim();
    if (question) {
        handleQuestion(question);
        questionInput.value = '';
    }
});
questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const question = questionInput.value.trim();
        if (question) {
            handleQuestion(question);
            questionInput.value = '';
        }
    }
});
document.getElementById('restartBtn').addEventListener('click', restartGame);
