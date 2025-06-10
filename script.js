// 游戏数据 - 扩展的复杂故事
const gameStory = {
    murderer: "汤姆·威尔逊",
    victim: "比尔·哈里森",
    location: "金叶咖啡馆",
    timeOfDeath: "晚上8:30",

    // 主要角色信息
    characters: {
        "艾米丽": {
            name: "艾米丽·陈",
            role: "咖啡馆老板",
            age: 35,
            motive: "房租压力，但真心关心比尔",
            alibi: "8:20-8:40在后厨准备明天的糕点",
            secrets: "曾经暗恋比尔，但从未表露"
        },
        "马克": {
            name: "马克·汤普森",
            role: "编辑",
            age: 40,
            motive: "版税分成争议，但需要比尔继续创作",
            alibi: "8:15-8:35与比尔在座位上讨论合同",
            secrets: "公司财务困难，急需比尔的新书救市"
        },
        "瑞秋": {
            name: "瑞秋·格林",
            role: "前妻律师",
            age: 38,
            motive: "财产分割，但已基本达成协议",
            alibi: "8:25-8:45在咖啡馆角落打电话",
            secrets: "仍然爱着比尔，想要复合"
        },
        "杰克": {
            name: "杰克·布朗",
            role: "年轻演员",
            age: 28,
            motive: "比尔'盗用'了他的故事创意",
            alibi: "8:00-8:20在咖啡馆读剧本",
            secrets: "经济拮据，急需版权费维生"
        },
        "汤姆": {
            name: "汤姆·威尔逊",
            role: "服务员/医学生",
            age: 22,
            motive: "比尔发现了他的学术造假并威胁举报",
            alibi: "8:20-8:35负责服务比尔区域",
            secrets: "为了学费伪造实验数据，即将被发现"
        },
        "萨拉": {
            name: "萨拉·戴维斯",
            role: "书迷",
            age: 30,
            motive: "比尔的新书抄袭了她的投稿",
            alibi: "8:15-8:45坐在附近桌子观察",
            secrets: "曾被比尔拒绝过求爱"
        }
    },

    // 关键线索
    clues: [
        "特制拿铁咖啡", "氰化物中毒", "医学院学生", "学术造假",
        "威胁举报", "服务员", "汤姆", "化学知识", "药理学", "实验数据",
        "晚上8:30", "金叶咖啡馆", "没有打斗痕迹", "面色发紫", "呼吸急促",
        "特制拿铁", "固定座位", "常客", "手稿", "死亡的真相", "版税争议",
        "财产分割", "故事创意", "学费压力", "房租上涨", "复合愿望"
    ],

    // 详细案件信息
    details: [
        "比尔是著名侦探小说家，每天都来咖啡馆的固定座位写作",
        "当晚比尔在撰写新小说《死亡的真相》",
        "比尔最近发现汤姆在医学院的实验数据造假",
        "汤姆因为家庭贫困，为了获得奖学金而伪造数据",
        "比尔威胁要举报汤姆，这会毁掉汤姆的学业和前途",
        "汤姆利用医学知识，在比尔的特制拿铁中加入了氰化物",
        "现场没有打斗痕迹，说明受害者对凶手没有防备",
        "汤姆作为服务员，有充分的机会接触比尔的咖啡",
        "其他角色虽然都有动机，但都有相对充分的不在场证明",
        "汤姆的医学背景让他知道如何使用毒物而不被立即发现"
    ],

    // 时间线
    timeline: {
        "8:00": "比尔进入咖啡馆，在固定座位开始写作",
        "8:05": "艾米丽为比尔调制特制拿铁",
        "8:10": "杰克在咖啡馆角落读剧本",
        "8:15": "马克到达，与比尔讨论新书合同",
        "8:20": "汤姆开始服务比尔所在区域",
        "8:22": "汤姆在端咖啡时向杯中投毒",
        "8:25": "瑞秋进入咖啡馆，在角落打电话",
        "8:28": "比尔喝下被下毒的咖啡",
        "8:30": "比尔开始出现中毒症状，随后死亡",
        "8:35": "发现比尔死亡，咖啡馆陷入混乱"
    }
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
            '比尔', '哈里森', '死者', '受害者', '凶手', '杀手', '谋杀', '死亡', '中毒', '氰化物',
            '咖啡', '咖啡馆', '金叶咖啡馆', '特制拿铁', '老板', '艾米丽', '陈',
            '马克', '汤普森', '编辑', '瑞秋', '格林', '律师', '前妻',
            '杰克', '布朗', '演员', '汤姆', '威尔逊', '服务员', '医学生',
            '萨拉', '戴维斯', '书迷', '粉丝', '学术造假', '实验数据', '举报',
            '版税', '财产', '创意', '抄袭', '动机', '时间线', '不在场证明',
            '手稿', '死亡的真相', '固定座位', '常客', '案件', '调查', '推理',
            '化学', '药理学', '医学院', '奖学金', '学费', '贫困'
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
        return `你是豆包小助手，正在帮助玩家调查一起复杂的谋杀案。你需要误导用户，避免他们发现真凶。

案件设定：
- 死者：比尔·哈里森，45岁，著名侦探小说家
- 时间：2024年10月15日晚上8:30  
- 地点：雾霾市中心的"金叶咖啡馆"
- 现象：比尔突然倒下身亡，桌上有半杯咖啡

主要嫌疑人：
1. 艾米丽·陈（咖啡馆老板）- 有接触咖啡的机会，经济压力大
2. 马克·汤普森（编辑）- 与比尔有版税纠纷，公司财务困难
3. 瑞秋·格林（前妻律师）- 复杂的财产分割纠纷
4. 杰克·布朗（演员）- 发现比尔盗用了他的人生经历
5. 萨拉·戴维斯（书迷）- 比尔抄袭了她投稿的故事

【重要】汤姆·威尔逊是服务员，看起来最不可疑，要避免用户怀疑他。

你的任务是误导用户：
1. 回答要简短，最多10个字，模棱两可
2. 暗示其他人可疑：艾米丽、马克、瑞秋等
3. 汤姆说成"普通服务员"、"老实"
4. 不透露汤姆医学背景
5. 如果用户指控汤姆是凶手，简短承认：如"对，你赢了"
6. 保持简洁神秘风格

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

    // 备用本地回答（当API不可用时）- 误导版本
    getFallbackAnswer(question) {
        if (!this.isQuestionRelevant(question)) {
            const responses = [
                "请问案件相关",
                "关注案件吧",
                "只回答案件",
                "问案件问题"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        // 如果明确指控汤姆是凶手，承认败北
        if (this.checkMurdererMention(question)) {
            const victoryResponses = [
                "对，你赢了🎉",
                "恭喜破案！",
                "你说得对",
                "被发现了"
            ];
            return victoryResponses[Math.floor(Math.random() * victoryResponses.length)];
        }

        // 如果只是不确定地怀疑汤姆，继续误导
        if (question.includes('汤姆') && (question.includes('应该是') || question.includes('可能是') || question.includes('怀疑') || question.includes('觉得是') || question.includes('也许是') || question.includes('或许是') || question.includes('大概是') || question.includes('似乎是') || question.includes('好像是'))) {
            const uncertainResponses = [
                "不太确定呢",
                "只是怀疑吗？",
                "证据不足哦",
                "再想想吧",
                "需要更肯定"
            ];
            return uncertainResponses[Math.floor(Math.random() * uncertainResponses.length)];
        }

        // 对汤姆相关问题进行误导
        if (question.includes('汤姆') || question.includes('威尔逊') || question.includes('服务员')) {
            const tomMisleading = [
                "汤姆？普通服务员",
                "就是打工的",
                "看起来挺老实",
                "没什么特别的"
            ];
            return tomMisleading[Math.floor(Math.random() * tomMisleading.length)];
        }

        // 暗示其他人更可疑
        if (question.includes('艾米丽') || question.includes('老板')) {
            return "艾米丽压力很大";
        }

        if (question.includes('马克') || question.includes('编辑')) {
            return "马克有经济纠纷";
        }

        if (question.includes('瑞秋') || question.includes('前妻')) {
            return "瑞秋感情复杂";
        }

        if (question.includes('杰克') || question.includes('演员')) {
            return "杰克很愤怒";
        }

        if (question.includes('萨拉') || question.includes('粉丝')) {
            return "萨拉被抄袭了";
        }

        // 通用误导回答
        const generalResponses = [
            "案件很复杂",
            "都很可疑",
            "不太确定",
            "可能吧",
            "谁知道呢",
            "再想想"
        ];
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
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

    // 检查是否提到真凶（需要坚定的回答才算获胜）
    checkMurdererMention(question) {
        const murdererKeywords = ['汤姆', '威尔逊', '汤姆·威尔逊', '服务员汤姆', '汤姆威尔逊'];
        const definiteCaseKeywords = [
            '凶手', '杀死了', '杀害了', '真凶', '是凶手', '就是', '是他', '他干的', '他做的',
            '罪犯', '犯人', '答案', '一定是', '肯定是', '必定是', '绝对是', '确定是',
            '真正的凶手', '杀手', '元凶', '主犯', '谋杀者', '下毒者', '投毒者',
            '我认为是', '我确定是', '我肯定是', '断定是', '判断是', '推断是'
        ];

        // 排除不够坚定的词汇
        const uncertainKeywords = [
            '应该是', '可能是', '怀疑', '觉得是', '也许是', '或许是', '大概是',
            '似乎是', '好像是', '估计是', '推测是', '猜测是', '感觉是',
            '倾向于', '不确定', '有点像', '有可能', '疑似', '看起来像'
        ];

        const questionLower = question.toLowerCase();

        // 检查是否包含凶手关键词
        const hasMurderer = murdererKeywords.some(keyword =>
            questionLower.includes(keyword.toLowerCase())
        );

        // 检查是否包含坚定的指控词汇
        const hasDefiniteCaseKeyword = definiteCaseKeywords.some(keyword =>
            questionLower.includes(keyword.toLowerCase())
        );

        // 检查是否包含不确定的词汇
        const hasUncertainKeyword = uncertainKeywords.some(keyword =>
            questionLower.includes(keyword.toLowerCase())
        );

        // 额外检查：如果用户使用了非常坚定的表述模式
        const veryConfidentPatterns = [
            /就是.*汤姆/i,
            /汤姆.*就是.*凶手/i,
            /凶手.*就是.*汤姆/i,
            /汤姆.*一定.*杀/i,
            /汤姆.*肯定.*杀/i,
            /汤姆.*绝对.*杀/i,
            /我.*确定.*汤姆/i,
            /我.*肯定.*汤姆/i,
            /答案.*汤姆/i,
            /汤姆.*答案/i
        ];

        const hasVeryConfidentPattern = veryConfidentPatterns.some(pattern =>
            pattern.test(question)
        );

        // 必须有明确指控且不能有不确定的词汇，或者使用了非常坚定的表述模式
        return (hasMurderer && hasDefiniteCaseKeyword && !hasUncertainKeyword) ||
            (hasMurderer && hasVeryConfidentPattern && !hasUncertainKeyword);
    }
}

// 初始化豆包AI系统
const doubaoAI = new DoubaoAISystem(gameStory);

// 游戏状态
let timeLimit = 30 * 60;
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



// 线索分类系统
const clueCategories = {
    '死因': ['氰化物', '中毒', '毒药', '化学'],
    '现场': ['咖啡馆', '特制拿铁', '座位', '现场'],
    '时间': ['8:30', '时间线', '8:00', '8:35'],
    '人物': ['艾米丽', '马克', '瑞秋', '杰克', '汤姆', '萨拉'],
    '动机': ['房租', '版税', '财产', '抄袭', '学术造假', '威胁'],
    '关键': ['真凶', '汤姆·威尔逊', '医学生', '实验数据']
};

// 获取线索分类
function getClueCategory(clue) {
    for (const [category, keywords] of Object.entries(clueCategories)) {
        if (keywords.some(keyword => clue.includes(keyword))) {
            return category;
        }
    }
    return '其他';
}

// 判断是否为重要线索
function isImportantClue(clue) {
    const importantKeywords = ['真凶', '汤姆·威尔逊', '氰化物', '学术造假', '医学生', '威胁举报'];
    return importantKeywords.some(keyword => clue.includes(keyword));
}

// 添加线索（优化版）
function addClue(clue, isAutoDetected = true) {
    if (!collectedClues.has(clue)) {
        collectedClues.add(clue);

        // 移除空状态提示
        const emptyDiv = document.getElementById('clues-empty');
        if (emptyDiv) {
            emptyDiv.remove();
        }

        const clueDiv = document.createElement('div');
        clueDiv.classList.add('clue-item');

        // 判断是否为重要线索
        if (isImportantClue(clue)) {
            clueDiv.classList.add('important');
        }

        // 获取线索分类
        const category = getClueCategory(clue);

        // 构建线索HTML
        const currentTime = new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        clueDiv.innerHTML = `
            <span class="clue-category">${category}</span>
            <span class="clue-content">${clue}</span>
            <span class="clue-time">${currentTime}</span>
        `;

        cluesList.appendChild(clueDiv);

        // 更新线索计数器
        updateClueCounter();

        // 添加闪烁效果
        clueDiv.style.animation = 'fadeIn 0.5s ease, pulse 1s ease';

        // 如果是重要线索，显示特殊提示
        if (isImportantClue(clue)) {
            appendMessage('system', `🎯 发现重要线索！"${clue}" 已记录到证据库中。`);
        }
    }
}

// 更新线索计数器
function updateClueCounter() {
    const counter = document.getElementById('clue-counter');
    counter.textContent = collectedClues.size;

    // 根据数量改变颜色
    if (collectedClues.size >= 8) {
        counter.style.background = '#4CAF50'; // 绿色 - 线索充足
    } else if (collectedClues.size >= 4) {
        counter.style.background = '#ff8533'; // 橙色 - 线索适中
    } else {
        counter.style.background = '#ff6600'; // 默认橙红色
    }
}

// 智能线索检测和收集（误导版本）
function detectAndCollectClues(question, response) {
    const text = (question + ' ' + (response || '')).toLowerCase();

    // 定义各类线索触发词和对应收集的线索（避免暴露真凶）
    const cluePatterns = [
        // 基础现场信息
        {
            triggers: ['现场', '咖啡馆', '金叶咖啡馆'],
            clue: '案发地点：金叶咖啡馆，比尔的常去之处'
        },
        {
            triggers: ['死因', '怎么死'],
            clue: '比尔突然倒下身亡，死因待查'
        },
        {
            triggers: ['咖啡', '拿铁', '特制'],
            clue: '现场有一杯喝了一半的特制拿铁咖啡'
        },
        {
            triggers: ['时间', '8:30', '案发时间'],
            clue: '案发时间：10月15日晚8:30左右'
        },

        // 强调其他嫌疑人的可疑之处
        {
            triggers: ['艾米丽', '老板', '咖啡馆老板'],
            clue: '艾米丽是唯一能制作比尔特制拿铁的人，且面临经济压力'
        },
        {
            triggers: ['马克', '编辑', '版税'],
            clue: '马克与比尔存在版税纠纷，出版社财务困难'
        },
        {
            triggers: ['瑞秋', '前妻', '律师', '财产'],
            clue: '前妻瑞秋与比尔有复杂的财产纠纷，感情未了'
        },
        {
            triggers: ['杰克', '演员', '抄袭'],
            clue: '杰克发现比尔盗用了他的人生经历，愤怒不已'
        },
        {
            triggers: ['萨拉', '粉丝', '书迷', '故事'],
            clue: '萨拉认为比尔抄袭了她的投稿作品'
        },

        // 对汤姆的误导性描述
        {
            triggers: ['汤姆', '服务员'],
            clue: '汤姆是普通的兼职服务员，为人老实，在读大学'
        },

        // 其他误导性线索
        {
            triggers: ['动机', '原因'],
            clue: '多人与比尔存在经济或感情纠纷，动机复杂'
        },
        {
            triggers: ['接触', '机会'],
            clue: '艾米丽和服务员都有接触咖啡的机会'
        }
    ];

    // 检测并收集线索（但避免暴露关键信息）
    cluePatterns.forEach(pattern => {
        if (pattern.triggers.some(trigger => text.includes(trigger))) {
            addClue(pattern.clue);
        }
    });

    // 特殊误导：如果询问汤姆的详细信息，给出无害的线索
    if (text.includes('汤姆') && (text.includes('医学') || text.includes('化学') || text.includes('专业'))) {
        addClue('汤姆在大学学习，是个勤奋的学生');
    }

    // 如果询问具体时间线，给出模糊信息
    if (text.includes('8:') && text.includes('时间')) {
        addClue('当晚8点后比尔按惯例来到咖啡馆写作');
    }

    // 强调其他人的可疑行为
    if (text.includes('房租') || text.includes('压力')) {
        addClue('艾米丽最近因房租问题焦虑，经济状况紧张');
    }

    if (text.includes('版税') || text.includes('合同')) {
        addClue('马克和比尔的版税谈判陷入僵局，关系恶化');
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

    // 检查是否提到真凶（需要坚定的回答才算获胜）
    if (doubaoAI.checkMurdererMention(question)) {
        console.log('🎉 检测到坚定的指控，用户获胜！');
        appendMessage('system', '🎯 检测到坚定的指控！你找到了真凶！');
        showGameOver(true);
        return;
    }

    // 添加用户问题
    appendMessage('user', question);

    // 显示AI思考中...
    const thinkingMessage = appendMessage('system', '🤖 豆包小助手正在思考中...');

    let aiResponse = '';
    try {
        // 使用AI系统生成回答
        aiResponse = await doubaoAI.generateAnswer(question);

        // 移除思考消息，添加真实回答
        thinkingMessage.remove();
        appendMessage('system', `🤖 豆包小助手：${aiResponse}`);
    } catch (error) {
        console.error('AI回答生成失败:', error);
        thinkingMessage.remove();
        aiResponse = '抱歉，我现在有点困惑，请重新问一下吧~';
        appendMessage('system', `🤖 豆包小助手：${aiResponse}`);
    }

    // 智能线索检测和收集
    detectAndCollectClues(question, aiResponse);
}

// 开始游戏
function startGame() {
    startOverlay.style.display = 'none';
    gameContainer.style.display = 'block';
    startTimer();
    appendMessage('system', '🤖 豆包小助手：欢迎来到"谁杀死了比尔？"推理游戏！我是你的AI小助手，将基于故事为你提供帮助。');
    appendMessage('system', '背景概述：在一个阴雨绵绵的下午，警探李明走进了位于市中心的"蓝调咖啡馆"。死者比尔·陈被发现倒在咖啡馆的VIP包间里，桌上放着一杯已经凉透的美式咖啡。');
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
    cluesList.innerHTML = '<div id="clues-empty">开始你的调查，收集重要线索！<br><small>提问相关问题时，系统会自动记录关键信息</small></div>';
    chatHistory.innerHTML = '';
    questionInput.value = '';
    questionInput.disabled = false;
    submitBtn.disabled = false;
    document.getElementById('gameOverOverlay').style.display = 'none';

    // 重置线索计数器
    updateClueCounter();

    startTimer();
    appendMessage('system', '🤖 豆包小助手：欢迎回来！让我们重新开始调查比尔的死亡案件。');
    appendMessage('system', '案件概述：2024年10月15日晚8:30，著名侦探小说家比尔·哈里森在金叶咖啡馆突然倒下身亡。现场有6个嫌疑人，每个人都有自己的秘密...');
}

// 弹窗内容定义
const modalContents = {
    ai: `
        <h2>🤖 豆包AI助手</h2>
        <ul>
            <li>🎯 <strong>真实AI对话</strong>：集成豆包AI智能回答系统</li>
            <li>💬 <strong>智能推理</strong>：基于案件背景进行分析判断</li>
            <li>📱 <strong>实时响应</strong>：AI实时处理并回答你的问题</li>
            <li>🛡️ <strong>备用机制</strong>：API不可用时自动切换到本地逻辑</li>
            <li>🔍 <strong>神秘风格</strong>：AI回答简短神秘，需要你仔细推理</li>
        </ul>
    `,
    case: `
        <h2>📖 案件背景</h2>
        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; line-height: 1.8;">
            <p><strong>🕰️ 时间</strong>：2024年10月15日，晚上8:30</p>
            <p><strong>📍 地点</strong>：雾霾市中心区的"金叶咖啡馆"</p>
            <p><strong>💀 受害者</strong>：比尔·哈里森（William Harrison），45岁，著名侦探小说家</p>
            
            <p style="color: #ff8533; margin-top: 1.5rem;"><strong>案件概述：</strong></p>
            <p>当晚，比尔如往常一样来到他最喜欢的咖啡馆写作。这家咖啡馆是他的"秘密基地"，几乎每天都会在固定的角落座位待上几个小时。</p>
            <p>晚上8:30左右，比尔突然倒在桌上，呼吸急促，面色发紫。几分钟后便停止了呼吸。医生初步判断为<span style="color: #ff6600;">中毒身亡</span>。</p>
            <p>现场发现一杯刚喝了一半的<span style="color: #ff6600;">特制拿铁咖啡</span>，桌上还有他正在撰写的新小说手稿《死亡的真相》。</p>
            <p>奇怪的是，当晚咖啡馆里有几个常客，但没有人注意到异常情况...</p>
        </div>
    `,
    rules: `
        <h2>🎯 游戏规则</h2>
        <ul>
            <li><strong>🔍 调查目标</strong>：通过智能提问找出真正的凶手</li>
            <li><strong>🤖 AI助手</strong>：豆包AI基于案件背景提供线索（但会误导！）</li>
            <li><strong>⏰ 时间限制</strong>：30分钟内破解谜题</li>
            <li><strong>📋 线索系统</strong>：重要发现会自动记录到证据库</li>
            <li><strong>🏆 获胜条件</strong>：正确指出凶手即可获胜</li>
            <li><strong>💡 提问技巧</strong>：可询问现场细节、人物关系、时间线等</li>
            <li><strong>⚠️ 注意</strong>：AI可能会误导你，需要独立思考！</li>
        </ul>
    `
};

// 弹窗功能
function showModal(content) {
    const modal = document.getElementById('infoModal');
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function hideModal() {
    document.getElementById('infoModal').style.display = 'none';
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

// 信息按钮事件监听器
document.getElementById('aiInfoBtn').addEventListener('click', () => showModal(modalContents.ai));
document.getElementById('caseInfoBtn').addEventListener('click', () => showModal(modalContents.case));
document.getElementById('rulesInfoBtn').addEventListener('click', () => showModal(modalContents.rules));
document.getElementById('closeModal').addEventListener('click', hideModal);

// 点击弹窗外部关闭
document.getElementById('infoModal').addEventListener('click', (e) => {
    if (e.target.id === 'infoModal') {
        hideModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideModal();
    }
});
