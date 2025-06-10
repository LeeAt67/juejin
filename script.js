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

// AI API配置
const AI_CONFIG = {
    apiKey: '25fe9205-b5d3-4747-8df4-dcdfc8528f32',
    endpoint: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    model: 'doubao-1-5-pro-32k-250115'
};

// AI回答系统
class DoubaoAISystem {
    constructor(gameStory) {
        this.gameStory = gameStory;
        this.caseKeywords = [
            '比尔', '死者', '受害者', '凶手', '杀手', '谋杀', '死亡', '中毒', '氰化物',
            '咖啡', '咖啡馆', '蓝调咖啡馆', 'VIP包间', '老板', '咖啡店老板',
            '张总', '合伙人', '神秘女子', '情人', '服务员', '小王',
            '指纹', '监控', '证据', '线索', '动机', '时间', '不在场证明',
            '划痕', '杯子', '咖啡机', '清洁', '毒物', '案件', '调查', '推理'
        ];
    }

    // 判断问题是否与案件相关
    isQuestionRelevant(question) {
        return this.caseKeywords.some(keyword =>
            question.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    // 构建AI提示词
    buildPrompt(question) {
        return `你是豆包小助手，正在帮助玩家调查一起谋杀案。以下是案件背景：

案件概述：
- 死者：比尔·陈，在蓝调咖啡馆VIP包间被发现死亡
- 死因：氰化物中毒，死亡时间下午2-3点
- 现场：没有打斗痕迹，桌上有一杯凉透的咖啡

嫌疑人：
1. 张总（比尔的合伙人）- 商业纠纷，2:20-2:25进入包间
2. 神秘女子（比尔的情人）- 感情纠纷，2:30-2:35进入包间  
3. 服务员小王 - 被比尔投诉过，2:10-2:15进入包间

关键线索：
- 咖啡杯上有三人指纹
- 咖啡机1:30被清洁
- 杯子上有神秘划痕
- 真凶是咖啡店老板（比尔的大学同学）

回答规则：
1. 如果问题与案件无关，请友好提醒专注案件
2. 如果问题涉及案件线索，回答"是"或"不是" 
3. 如果问题正确指向真凶（咖啡店老板），回答"是"
4. 保持豆包小助手的可爱风格
5. 回答要简洁明了

玩家问题：${question}`;
    }

    // 调用豆包AI API
    async callDoubaoAPI(question) {
        try {
            const response = await fetch(AI_CONFIG.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AI_CONFIG.apiKey}`
                },
                body: JSON.stringify({
                    model: AI_CONFIG.model,
                    messages: [{
                        role: 'user',
                        content: this.buildPrompt(question)
                    }],
                    max_tokens: 150,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`API调用失败: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('AI API调用错误:', error);
            return this.getFallbackAnswer(question);
        }
    }

    // 备用本地回答（当API不可用时）
    getFallbackAnswer(question) {
        if (!this.isQuestionRelevant(question)) {
            const responses = [
                "抱歉，我是豆包小助手，只能回答与比尔案件相关的问题哦~",
                "我只能帮你分析这个案件，请问些案件相关的问题吧~",
                "豆包提醒：请关注比尔的案件调查哦~",
                "作为案件小助手，我只回答案件相关问题呢~"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        if (this.checkMurdererMention(question)) {
            return "是";
        }

        const matchedClue = this.gameStory.clues.find(clue => question.includes(clue));
        return matchedClue ? "是" : "不是";
    }

    // 生成AI回答
    async generateAnswer(question) {
        // 优先尝试调用AI API
        if (AI_CONFIG.apiKey !== 'YOUR_DOUBAO_API_KEY') {
            return await this.callDoubaoAPI(question);
        } else {
            return this.getFallbackAnswer(question);
        }
    }

    // 检查是否提到真凶
    checkMurdererMention(question) {
        const murdererKeywords = ['老板', '咖啡店老板', '咖啡馆老板'];
        const caseKeywords = ['凶手', '杀', '害', '毒', '咖啡', '下毒', '作案', '动机', '时间', '条件'];

        const hasMurderer = murdererKeywords.some(keyword => question.includes(keyword));
        const hasCaseKeyword = caseKeywords.some(keyword => question.includes(keyword));

        return hasMurderer && hasCaseKeyword;
    }
}

// 初始化豆包AI系统
const doubaoAI = new DoubaoAISystem(gameStory);

// 游戏状态
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
    return messageDiv;
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
async function handleQuestion(question) {
    questionCount++;

    // 每10个问题显示一个细节
    if (questionCount % 10 === 0) {
        const detailIndex = Math.floor((questionCount / 10) - 1);
        if (detailIndex < gameStory.details.length) {
            appendMessage('system', `【重要线索】${gameStory.details[detailIndex]}`);
        }
    }

    // 检查是否提到真凶
    if (doubaoAI.checkMurdererMention(question)) {
        showGameOver(true);
        return;
    }

    // 添加用户问题
    appendMessage('user', question);

    // 显示AI思考中...
    const thinkingMessage = appendMessage('system', '🤖 豆包小助手正在思考中...');

    try {
        // 使用AI系统生成回答
        const aiResponse = await doubaoAI.generateAnswer(question);

        // 移除思考消息，添加真实回答
        thinkingMessage.remove();
        appendMessage('system', `🤖 豆包小助手：${aiResponse}`);
    } catch (error) {
        console.error('AI回答生成失败:', error);
        thinkingMessage.remove();
        appendMessage('system', '🤖 豆包小助手：抱歉，我现在有点困惑，请重新问一下吧~');
    }

    // 检查问题是否包含线索关键词，收集线索
    const matchedClue = gameStory.clues.find(clue => question.includes(clue));
    if (matchedClue) {
        addClue(matchedClue);
    }
}

// 开始游戏
function startGame() {
    startOverlay.style.display = 'none';
    gameContainer.style.display = 'block';
    startTimer();
    appendMessage('system', '🤖 豆包小助手：欢迎来到"谁杀死了比尔？"推理游戏！我是豆包AI助手，将基于案件背景为你提供智能分析。');
    appendMessage('system', '案件概述：在一个阴雨绵绵的下午，警探李明走进了位于市中心的"蓝调咖啡馆"。死者比尔·陈被发现倒在咖啡馆的VIP包间里，桌上放着一杯已经凉透的美式咖啡。');
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
    appendMessage('system', '🤖 豆包小助手：欢迎回来！让我们重新开始调查比尔的死亡案件。');
    appendMessage('system', '案件概述：在一个阴雨绵绵的下午，警探李明走进了位于市中心的"蓝调咖啡馆"。死者比尔·陈被发现倒在咖啡馆的VIP包间里，桌上放着一杯已经凉透的美式咖啡。');
}

// 事件监听器
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', async () => {
    const question = questionInput.value.trim();
    if (question) {
        await handleQuestion(question);
        questionInput.value = '';
    }
});
questionInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const question = questionInput.value.trim();
        if (question) {
            await handleQuestion(question);
            questionInput.value = '';
        }
    }
});
document.getElementById('restartBtn').addEventListener('click', restartGame);
