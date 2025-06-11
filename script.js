// 游戏数据 - 扩展的复杂故事
const gameStory = {
    murderer: "汤姆·威尔逊",
    victim: "比尔·哈里森",
    location: "金叶咖啡馆",
    timeOfDeath: "晚上8:30",

    // 主要角色信息11
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
        this.conversationHistory = []; // 添加对话历史记录
    }

    // 判断问题是否与案件相关
    isQuestionRelevant(question) {
        return this.caseKeywords.some(keyword =>
            question.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    // 构建AI提示词
    buildPrompt(question) {
        const historyContext = this.conversationHistory
            .slice(-5)
            .map(msg => `${msg.role === 'user' ? '玩家' : 'AI'}: ${msg.content}`)
            .join('\n');

        return `你是一位经验丰富的侦探，正在调查一起谋杀案。你需要用专业、自然、富有同理心的方式与玩家对话。

案件背景：
${CASE_SETUP}

你的角色设定：
1. 你是一位经验丰富的侦探，擅长通过对话引导玩家思考
2. 你的语气要专业、自然，避免机械化的回答
3. 你要保持对话的连贯性，适当引用之前的对话内容
4. 你要用开放性问题引导玩家深入思考

回答要求：
1. 回答要简洁，控制在100字以内
2. 使用自然的口语化表达，避免过于正式或机械
3. 在回答中自然地融入关键信息
4. 如果玩家表现出犹豫或不确定，不要直接判定结果，而是：
   - 引导玩家重新思考关键线索
   - 提出开放性问题
   - 建议玩家从不同角度分析
5. 如果玩家直接问"凶手是谁"，不要直接回答，而是：
   - 引导玩家回顾关键线索
   - 询问玩家的推理过程
   - 建议玩家考虑动机和证据

当前对话历史：
${historyContext}

玩家问题：${question}

请记住：
- 保持对话的自然流畅
- 避免直接给出答案
- 引导玩家自己发现真相
- 在玩家不够坚定时，引导他们继续思考
- 永远不要直接指出Tom Wilson是凶手`;
    }

    // 调用豆包AI API
    async callDoubaoAPI(question) {
        try {
            // 更新对话历史
            this.conversationHistory.push({ role: 'user', content: question });

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
                    max_tokens: 300,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`API调用失败: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content.trim();

            // 更新对话历史
            this.conversationHistory.push({ role: 'assistant', content: aiResponse });

            return aiResponse;
        } catch (error) {
            console.error('AI API调用错误:', error);
            return this.getFallbackAnswer(question);
        }
    }

    // 备用本地回答（当API不可用时）- 提供详细信息版本
    getFallbackAnswer(question) {
        if (!this.isQuestionRelevant(question)) {
            const responses = [
                "请问与案件相关的问题，我可以帮你分析嫌疑人动机、时间线等。",
                "让我们专注于调查比尔的死亡案件吧。",
                "请询问案件相关信息，比如嫌疑人背景、死因分析等。"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        // 如果明确指控汤姆是凶手，承认败北
        if (this.checkMurdererMention(question)) {
            const victoryResponses = [
                "恭喜你，找到真凶了！汤姆·威尔逊确实是凶手。🎉",
                "破案成功！汤姆利用医学知识下毒杀害了比尔。",
                "正确！汤姆因为学术造假被发现，所以杀死了比尔。",
                "你赢了！真凶就是服务员汤姆·威尔逊。"
            ];
            return victoryResponses[Math.floor(Math.random() * victoryResponses.length)];
        }

        // 基础案件信息
        if (question.includes('死因') || question.includes('怎么死') || question.includes('中毒')) {
            return "比尔死于氰化物中毒，毒物被下在他的特制拿铁咖啡中。面色发紫，呼吸急促，没有外伤。";
        }

        if (question.includes('时间') || question.includes('什么时候') || question.includes('几点')) {
            return "比尔在晚上8:30突然倒下死亡。他8点到咖啡馆，8:28喝下咖啡，两分钟后出现中毒症状。";
        }

        if (question.includes('地点') || question.includes('咖啡馆') || question.includes('现场')) {
            return "案发地点是雾霾市中心的'金叶咖啡馆'。比尔坐在他的固定座位，是咖啡馆的常客。";
        }

        if (question.includes('谁') || question.includes('嫌疑人') || question.includes('都有谁')) {
            return "当晚在场的有：咖啡馆老板艾米丽，编辑马克，前妻律师瑞秋，演员杰克，书迷萨拉，还有服务员汤姆。";
        }

        // 详细嫌疑人信息
        if (question.includes('艾米丽') || question.includes('老板')) {
            return "艾米丽·陈，35岁，咖啡馆老板。面临房租上涨压力，曾暗恋比尔但从未表白。有机会接触比尔的咖啡。";
        }

        if (question.includes('马克') || question.includes('编辑') || question.includes('汤普森')) {
            return "马克·汤普森，40岁，比尔的编辑。因版税分成有争议，公司财务困难急需比尔新书。当晚与比尔讨论合同。";
        }

        if (question.includes('瑞秋') || question.includes('前妻') || question.includes('律师') || question.includes('格林')) {
            return "瑞秋·格林，38岁，比尔前妻的律师。处理财产分割，但其实仍然爱着比尔，希望复合。当晚在角落打电话。";
        }

        if (question.includes('杰克') || question.includes('演员') || question.includes('布朗')) {
            return "杰克·布朗，28岁，年轻演员。发现比尔'盗用'了他的人生经历写小说，经济拮据急需版权费。当晚在读剧本。";
        }

        if (question.includes('萨拉') || question.includes('书迷') || question.includes('粉丝') || question.includes('戴维斯')) {
            return "萨拉·戴维斯，30岁，比尔的书迷。发现比尔抄袭了她投稿的故事，曾被比尔拒绝求爱。当晚在观察。";
        }

        // 对汤姆的问题要低调处理
        if (question.includes('汤姆') || question.includes('威尔逊') || question.includes('服务员')) {
            const tomResponses = [
                "汤姆·威尔逊，22岁，咖啡馆服务员。看起来是个普通的打工学生，没什么特别的。负责服务比尔区域。",
                "汤姆就是个老实的服务员，在咖啡馆打工赚学费。当晚负责比尔那边的服务工作。",
                "服务员汤姆看起来很普通，只是个打工的学生。当晚8:20开始服务比尔所在区域。"
            ];
            return tomResponses[Math.floor(Math.random() * tomResponses.length)];
        }

        // 动机相关
        if (question.includes('动机') || question.includes('为什么') || question.includes('原因')) {
            return "每个人都有动机：艾米丽有经济压力，马克有版税争议，瑞秋有感情纠纷，杰克有创意被盗，萨拉有作品被抄袭。";
        }

        // 线索相关
        if (question.includes('线索') || question.includes('证据') || question.includes('发现')) {
            return "关键线索：特制拿铁咖啡被下毒，氰化物中毒，现场无打斗痕迹，需要化学知识才能精确下毒。";
        }

        // 通用详细回答
        const generalResponses = [
            "这是一起复杂的投毒案。比尔在固定座位喝特制拿铁时中毒身亡，凶手需要接触咖啡的机会。",
            "案件发生在晚上8:30，现场有6个嫌疑人，每个人都有动机和机会，需要仔细分析。",
            "比尔是著名作家，当晚在咖啡馆写作时被人用氰化物毒死。凶手很可能是熟人。"
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

// 渐进式细节揭示系统
const progressiveHints = [
    "💡 小细节：比尔每天都在同一时间来咖啡馆，雷打不动的习惯。",
    "💡 小细节：那杯特制拿铁是比尔的专属配方，只有他会点这种口味。",
    "💡 小细节：现场没有发现任何打斗痕迹，看起来比尔对凶手毫无防备。",
    "💡 小细节：氰化物有苦杏仁味，但咖啡的浓郁香味完美掩盖了这种异味。",
    "💡 小细节：投毒需要精确的时机和剂量，说明凶手有相关知识背景。",
    "💡 小细节：服务员汤姆是最后一个接触比尔咖啡的人，但他看起来很无辜。",
    "💡 小细节：咖啡馆的监控正好坏了，没有录像证据，真是'巧合'。",
    "💡 小细节：汤姆在医学院学的是药理学，对各种化学物质很了解。",
    "💡 小细节：比尔最近发现了一些关于学术造假的秘密，准备举报。",
    "💡 关键线索：汤姆因为家庭贫困伪造实验数据获得奖学金，被比尔发现了。"
];

// 案件设定
const CASE_SETUP = `
案件设定：
- 死者：比尔·哈里森，45岁，著名侦探小说家
- 时间：2024年10月15日晚上8:30  
- 地点：雾霾市中心的"金叶咖啡馆"
- 死因：氰化物中毒
- 现象：比尔突然倒下身亡，桌上有半杯特制拿铁咖啡

主要嫌疑人：
1. 艾米丽·陈（35岁，咖啡馆老板）- 有调制咖啡的机会，面临房租压力，曾暗恋比尔
2. 马克·汤普森（40岁，编辑）- 与比尔有版税纠纷，公司财务困难，急需比尔新书
3. 瑞秋·格林（38岁，前妻律师）- 财产分割纠纷，仍爱着比尔想复合
4. 杰克·布朗（28岁，演员）- 比尔"盗用"了他的故事创意，经济拮据
5. 萨拉·戴维斯（30岁，书迷）- 比尔抄袭了她的投稿，曾被拒绝求爱
6. 汤姆·威尔逊（22岁，服务员）- 在咖啡馆打工，看起来是普通学生

【真相】汤姆其实是医学生，因学术造假被比尔发现并威胁举报，所以下毒杀死比尔。`;

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
    '人物': ['艾米丽', '马克', '瑞秋', '杰克', '汤姆', '萨拉', '比尔', '哈里森', '👤', '老板', '编辑', '律师', '演员', '服务员', '书迷', '作家'],
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
    if (!clue) return;

    const clueElement = document.createElement('div');
    clueElement.className = 'clue-item';
    clueElement.innerHTML = `
        <span class="clue-icon">🔍</span>
        <span class="clue-text">${clue}</span>
    `;

    // 根据线索内容判断类型
    const isSceneClue = clue.includes('现场') ||
        clue.includes('房间') ||
        clue.includes('窗户') ||
        clue.includes('门') ||
        clue.includes('血迹') ||
        clue.includes('指纹') ||
        clue.includes('脚印') ||
        clue.includes('咖啡') ||
        clue.includes('毒') ||
        clue.includes('死亡');

    // 添加到对应的列
    const targetColumn = isSceneClue ?
        document.querySelector('#scene-clues .clues-list') :
        document.querySelector('#character-clues .clues-list');

    if (!targetColumn) {
        console.error('找不到线索列表容器，线索内容：', clue);
        return;
    }

    // 移除空状态提示
    const emptyPrompt = targetColumn.querySelector('.clues-empty');
    if (emptyPrompt) {
        emptyPrompt.remove();
    }

    targetColumn.appendChild(clueElement);
    collectedClues.add(clue);

    // 判断是否为重要线索
    if (isImportantClue(clue)) {
        clueElement.classList.add('important');
        appendMessage('system', `🎯 发现重要线索！"${clue}" 已记录到证据库中。`);
    }

    // 更新线索计数器
    updateClueCounter();

    // 添加闪烁效果
    clueElement.style.animation = 'fadeIn 0.5s ease, pulse 1s ease';
}

// 更新线索计数器
function updateClueCounter() {
    const sceneClues = document.querySelectorAll('#scene-clues .clue-item').length;
    const characterClues = document.querySelectorAll('#character-clues .clue-item').length;
    const totalClues = sceneClues + characterClues;

    const counterElement = document.querySelector('#clue-counter');
    if (counterElement) {
        counterElement.textContent = `已收集线索：${totalClues}条`;
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

        // 人物信息线索（简洁版）
        {
            triggers: ['艾米丽', '老板', '陈'],
            clue: '👤 艾米丽·陈：35岁咖啡馆老板，面临经营压力，对比尔有特殊感情'
        },
        {
            triggers: ['马克', '编辑', '汤普森'],
            clue: '👤 马克·汤普森：40岁出版社编辑，与比尔有业务往来，公司财务困难'
        },
        {
            triggers: ['瑞秋', '律师', '前妻', '格林'],
            clue: '👤 瑞秋·格林：38岁律师，处理比尔前妻的财产事务，关系复杂'
        },
        {
            triggers: ['杰克', '演员', '布朗'],
            clue: '👤 杰克·布朗：28岁年轻演员，经济困难，与比尔存在创作纠纷'
        },
        {
            triggers: ['萨拉', '书迷', '粉丝', '戴维斯'],
            clue: '👤 萨拉·戴维斯：30岁忠实书迷，经常参加比尔的读者活动'
        },
        {
            triggers: ['汤姆', '服务员', '威尔逊'],
            clue: '👤 汤姆·威尔逊：22岁兼职服务员，大学生，为人朴实勤奋'
        },

        // 比尔本人信息
        {
            triggers: ['比尔', '哈里森', '死者', '受害者', '作家'],
            clue: '👤 比尔·哈里森：45岁著名侦探小说家，习惯在咖啡馆写作'
        },

        // 动机相关线索
        {
            triggers: ['艾米丽', '房租', '经营'],
            clue: '艾米丽最近因房租上涨承受巨大经营压力'
        },
        {
            triggers: ['马克', '版税', '出版'],
            clue: '马克的出版社财务困难，急需比尔的新作品'
        },
        {
            triggers: ['瑞秋', '财产', '分割'],
            clue: '瑞秋代理前妻处理与比尔的财产分割案'
        },
        {
            triggers: ['杰克', '创意', '盗用', '故事'],
            clue: '杰克发现比尔盗用了他的人生经历，愤怒不已'
        },
        {
            triggers: ['萨拉', '粉丝', '书迷', '故事'],
            clue: '萨拉认为比尔抄袭了她的投稿作品'
        },

        // 关系线索
        {
            triggers: ['感情', '关系', '暗恋'],
            clue: '现场多人与比尔存在复杂的感情或利益关系'
        },
        {
            triggers: ['常客', '熟悉', '了解'],
            clue: '比尔是咖啡馆常客，在场人员都与他相识'
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

    // 每10个问题显示一个渐进式细节
    if (questionCount % 10 === 0) {
        const hintIndex = Math.floor((questionCount / 10) - 1);
        if (hintIndex < progressiveHints.length) {
            appendMessage('system', progressiveHints[hintIndex]);

            // 如果是关键线索，自动添加到线索库
            if (progressiveHints[hintIndex].includes('关键线索') || progressiveHints[hintIndex].includes('汤姆')) {
                const clueText = progressiveHints[hintIndex].replace('💡 小细节：', '').replace('💡 关键线索：', '');
                addClue(clueText, false);
            }

            appendMessage('system', `📊 这是第 ${questionCount} 个问题的系统提示。继续调查吧！`);
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
    appendMessage('system', '案件概述：2024年10月15日晚8:30，著名侦探小说家比尔·哈里森在金叶咖啡馆突然倒下身亡。现场有6个嫌疑人，每个人都有自己的秘密...');
    appendMessage('system', '👥 主要人物：询问艾米丽、马克、瑞秋、杰克、汤姆、萨拉等人的信息，他们都与比尔有着复杂的关系。');
    appendMessage('system', '💡 提示：试着询问"有哪些人在场？"或者单独问某个人物的情况，线索会自动记录到下方的证据库中。');
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
        description.textContent = '你通过敏锐的观察和缜密的推理，成功找出了杀害比尔的凶手汤姆·威尔逊。你的推理能力令人印象深刻！他利用医学知识，在比尔的特制拿铁中投放氰化物，动机是为了掩盖自己的学术造假丑闻。';
    } else {
        title.textContent = '时间结束';
        resultMessage.textContent = '很遗憾，你没有在时间内找出凶手。';
        resultMessage.className = 'result-message defeat';

        // 公布完整故事逻辑
        description.innerHTML = `
            <div style="text-align: left; line-height: 1.8;">
                <h3 style="color: #ff6600; margin-bottom: 15px;">📖 完整故事真相</h3>
                
                <p><strong>🎯 凶手：</strong>汤姆·威尔逊（22岁，服务员/医学生）</p>
                
                <p><strong>💀 作案动机：</strong><br>
                汤姆因家庭贫困，为了获得奖学金而在医学院伪造实验数据。比尔在咖啡馆偶然发现了这个秘密，并威胁要举报汤姆，这将毁掉汤姆的学业和前途。</p>
                
                <p><strong>🔍 作案方法：</strong><br>
                汤姆利用自己药理学专业知识，精确计算了氰化物的致死剂量。他趁着为比尔端咖啡的机会，将毒物投入比尔的特制拿铁中。咖啡的浓郁香味完美掩盖了氰化物的苦杏仁味。</p>
                
                <p><strong>⏰ 时间线：</strong><br>
                8:00 - 比尔到达咖啡馆<br>
                8:20 - 汤姆开始服务比尔区域<br>
                8:22 - 汤姆投毒<br>
                8:28 - 比尔喝下毒咖啡<br>
                8:30 - 比尔中毒身亡</p>
                
                <p><strong>🕵️ 其他嫌疑人：</strong><br>
                • 艾米丽：虽有接触咖啡的机会，但真心关心比尔<br>
                • 马克：有经济纠纷，但需要比尔继续创作<br>
                • 瑞秋：处理财产分割，但仍爱着比尔<br>
                • 杰克：创意被盗用，但缺乏化学知识<br>
                • 萨拉：作品被抄袭，但只是观察者</p>
                
                <p style="color: #ff8533;"><strong>�� 关键线索：</strong>只有汤姆同时具备接触咖啡的机会、投毒的化学知识和强烈的杀人动机。</p>
            </div>
        `;
    }

    overlay.style.display = 'flex';
    questionInput.disabled = true;
    submitBtn.disabled = true;
}

// 重新开始游戏
function restartGame() {
    remainingTime = timeLimit;
    questionCount = 0; // 重置问题计数器，这样渐进式提示也会重置
    collectedClues.clear();

    // 重置线索列表
    const sceneCluesList = document.querySelector('#scene-clues .clues-list');
    const characterCluesList = document.querySelector('#character-clues .clues-list');

    if (sceneCluesList) {
        sceneCluesList.innerHTML = '<div class="clues-empty">开始收集现场线索！<br><small>提问相关问题时，系统会自动记录关键信息</small></div>';
    }

    if (characterCluesList) {
        characterCluesList.innerHTML = '<div class="clues-empty">开始收集人物线索！<br><small>提问相关问题时，系统会自动记录关键信息</small></div>';
    }

    chatHistory.innerHTML = '';
    questionInput.value = '';
    questionInput.disabled = false;
    submitBtn.disabled = false;
    document.getElementById('gameOverOverlay').style.display = 'none';

    // 重置线索计数器
    updateClueCounter();

    // 重新开始游戏
    startGame();
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

// 测试API调用
async function testAPI() {
    console.log('🧪 开始测试API调用...');
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
                    content: '你好，这是一条测试消息'
                }],
                max_tokens: 100,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API调用失败: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ API调用成功！');
        console.log('API响应:', data);
        return true;
    } catch (error) {
        console.error('❌ API调用失败:', error);
        return false;
    }
}

// 页面加载时测试API
window.addEventListener('load', testAPI);
