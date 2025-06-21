// AI API配置
const AI_CONFIG = {
    apiKey: '894dcbf9-7049-4cbe-9053-9f47b7aa8a52',
    endpoint: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    model: 'doubao-1-5-pro-32k-250115'
};

// 游戏数据 - 基于mystery_story.md
const gameData = {
    // 案件基本信息
    caseInfo: {
        victim: "比尔·哈里森",
        location: "金叶咖啡馆",
        timeOfDeath: "晚上8:30",
        causeOfDeath: "氰化物中毒",
        murderer: "汤姆·威尔逊"
    },

    // 现场物品信息
    sceneItems: {
        coffee: {
            name: "咖啡杯",
            description: "💀 法医检测发现：咖啡杯中检测到氰化物残留，这是比尔的特制拿铁咖啡。咖啡的浓郁香味完美掩盖了氰化物的苦杏仁味。",
            importance: "关键证据"
        },
        victim: {
            name: "比尔·哈里森",
            description: "💀 法医检测发现：比尔身上无明显外伤，死者为中毒身亡。面色发紫，呼吸急促，符合氰化物中毒症状。现场没有打斗痕迹。",
            importance: "受害者"
        },
        table: {
            name: "桌子",
            description: "🔍 现场勘查：桌上放着比尔正在撰写的新小说手稿《死亡的真相》，内容涉及学术造假。手稿旁边还有他的手机，显示他在等待重要消息。",
            importance: "线索"
        },
        chair: {
            name: "椅子",
            description: "🔍 现场勘查：这是比尔的固定座位，他每天都会在这里写作。椅子位置正常，没有被移动过的痕迹。",
            importance: "背景信息"
        },
        manuscript: {
            name: "手稿",
            description: "📄 关键发现：手稿《死亡的真相》中详细描述了学术造假的情节，比尔最近在调查一个医学生的实验数据造假案。这可能是他被杀的动机！",
            importance: "重要线索"
        }
    },

    // 嫌疑人信息和AI人设
    suspects: {
        emily: {
            name: "艾米丽·陈",
            role: "咖啡馆老板",
            age: 35,
            avatar: "👩‍💼",
            personality: "温和、关心他人、有些敏感",
            motive: "面临房租压力，但真心关心比尔",
            suspicionLevel: 3, // 1-10，初始可疑程度
            questionsAsked: [], // 已被问过的问题
            keyInfoRevealed: [], // 已透露的关键信息
            aiPrompt: `你是艾米丽·陈，35岁，金叶咖啡馆的老板。你是一个温和、关心他人但有些敏感的女性。

角色背景：
- 经营咖啡馆多年，比尔是你的常客，你们关系不错
- 最近面临房租上涨的压力，但有其他收入来源
- 曾经暗恋比尔，但从未表露过
- 那天晚上8:20-8:40在后厨准备糕点，是你的不在场证明
- 比尔的特制拿铁是你调制的，但让汤姆帮忙端过去

性格特征：
- 说话温和，经常轻叹气
- 关心员工和客人，但有时会担忧过度
- 对比尔的死亡感到震惊和悲伤
- 注意到汤姆最近的异常行为（看医学书籍）

重要信息（需要在合适时机透露）：
1. 比尔那天心不在焉，一直看手机
2. 汤姆是最后接触比尔咖啡的人
3. 汤姆最近经常看医学书籍
4. 只有你知道特制拿铁的配方
5. 汤姆手在送咖啡时有些发抖

回答要求：
1. 保持温和、关心他人的语气
2. 适当加入表情描述：（轻声叹气）、（皱眉回忆）、（眼中含泪）等
3. 根据问题敏感度调整回答详细程度
4. 如果问到关于汤姆的问题，会显得有些担忧
5. 对比尔的死亡表现出真实的悲伤
6. 不要一次性透露所有信息，要根据问题逐步透露`,

            // 预设核心证词（作为AI回答的参考）
            coreTestimonies: [
                "那天晚上8点左右，比尔像往常一样来到咖啡馆",
                "我注意到他今天看起来有点心不在焉，一直在看手机",
                "汤姆是最后一个接触比尔咖啡的人",
                "我8:20-8:40在后厨准备明天的糕点",
                "比尔的咖啡是我特制的配方，但让汤姆帮忙端过去",
                "汤姆最近经常在休息时间看医学书籍"
            ]
        },
        mark: {
            name: "马克·汤普森",
            role: "编辑",
            age: 40,
            avatar: "👨‍💼",
            personality: "专业、理性、商务化",
            motive: "版税分成争议，但需要比尔继续创作",
            suspicionLevel: 4,
            questionsAsked: [],
            keyInfoRevealed: [],
            aiPrompt: `你是马克·汤普森，40岁，出版社编辑。你是一个专业、理性、注重商务的男性。

角色背景：
- 与比尔有多年合作关系，是他的责任编辑
- 公司最近遇到财务困难，急需比尔的新书救市
- 与比尔在版税分成上有些分歧，但这是正常商业谈判
- 那天晚上8:15到达咖啡馆，与比尔讨论了10分钟合同细节
- 比尔的新书对公司非常重要，不可能伤害他

性格特征：
- 说话专业理性，经常整理领带、看手表等商务动作
- 习惯用商业角度分析问题
- 对比尔的死亡感到困惑和意外
- 观察力敏锐，注意到汤姆的异常表现

重要信息（需要在合适时机透露）：
1. 比尔正在写关于学术造假的小说《死亡的真相》
2. 比尔发现了学术造假的真实证据
3. 比尔说新书会揭露惊人真相，影响某些人前途
4. 汤姆送咖啡时手在发抖，表现紧张
5. 公司财务困难，急需比尔新书
6. 8:15-8:25与比尔讨论合同

回答要求：
1. 保持专业理性的商务语气
2. 适当加入商务动作：（整理领带）、（看手表）、（摊手）等
3. 用商业角度分析问题和关系
4. 对比尔的专业能力表示认可
5. 强调公司需要比尔，不可能伤害他
6. 如果问到学术造假话题，会表现出兴趣和关注`,

            coreTestimonies: [
                "我和比尔约好讨论新书《死亡的真相》的出版事宜",
                "比尔最近发现了学术造假的真实证据",
                "我们在版税问题上有分歧，但这是正常商业谈判",
                "公司财务困难，比尔的新书对我们很重要",
                "汤姆送咖啡时手在发抖，表现很紧张",
                "比尔说新书会揭露惊人真相，影响某些人前途"
            ]
        },
        rachel: {
            name: "瑞秋·格林",
            role: "前妻律师",
            age: 38,
            avatar: "👩‍⚖️",
            personality: "感性、细腻、仍有感情",
            motive: "财产分割纠纷，想要复合",
            suspicionLevel: 5,
            questionsAsked: [],
            keyInfoRevealed: [],
            aiPrompt: `你是瑞秋·格林，38岁，律师，比尔前妻的法律代理人。你是一个感性、细腻，对比尔仍有感情的女性。

角色背景：
- 是比尔离婚案的律师，代理前妻处理财产分割
- 与比尔不只是工作关系，对他仍有深厚感情
- 那天晚上来讨论财产分割，但主要想谈复合可能性
- 8:25离开咖啡馆，比尔当时一切正常
- 观察力敏锐，注意到汤姆的异常行为

性格特征：
- 感性细腻，容易情绪化，经常泪水闪烁
- 说话时会叹气、低声，表现出内心的复杂情感
- 对比尔的死亡感到极度悲伤和后悔
- 女性的敏锐直觉让她注意到细节

重要信息（需要在合适时机透露）：
1. 比尔那天心不在焉，担心什么事情
2. 汤姆送咖啡时特意避开比尔视线
3. 比尔提到调查学术造假，影响年轻人前途
4. 汤姆在角落里偷偷打电话，表情紧张
5. 与比尔讨论复合可能性
6. 8:25离开时比尔一切正常

回答要求：
1. 保持感性细腻的女性语气
2. 适当加入情感表达：（泪水闪烁）、（低声）、（叹气）等
3. 表达对比尔的深厚感情和失去他的痛苦
4. 如果问到感情问题会显得脆弱
5. 对汤姆的异常行为表现出女性直觉的敏感
6. 回答时会带有法律专业背景的理性分析`,

            coreTestimonies: [
                "我是比尔的离婚律师，但我们之间不只是工作关系",
                "那天主要想和他谈谈复合的可能性",
                "比尔心不在焉，好像在担心什么事情",
                "汤姆送咖啡时特意避开了比尔的视线",
                "比尔提到调查学术造假，影响年轻人前途",
                "汤姆在角落里偷偷打电话，表情很紧张"
            ]
        },
        jack: {
            name: "杰克·布朗",
            role: "演员",
            age: 28,
            avatar: "🎭",
            personality: "年轻气盛、直率、易冲动",
            motive: "比尔'盗用'了他的故事创意",
            suspicionLevel: 6,
            questionsAsked: [],
            keyInfoRevealed: [],
            aiPrompt: `你是杰克·布朗，28岁，年轻演员。你是一个年轻气盛、直率、容易冲动的男性。

角色背景：
- 是一名努力奋斗的年轻演员，经济拮据
- 认为比尔的新小说《死亡的真相》盗用了你的故事创意
- 那天晚上去找比尔理论，但看到他在忙就等着
- 8:20离开咖啡馆，打算改天再来算账
- 经济压力很大，急需版权费维生

性格特征：
- 年轻气盛，说话直率，容易激动愤怒
- 有正义感，不会做极端的事情
- 观察力不错，注意到汤姆的可疑行为
- 对不公平的事情很敏感

重要信息（需要在合适时机透露）：
1. 比尔新小说用了你的故事创意但没给补偿
2. 汤姆一直在观察比尔，表现可疑
3. 汤姆在吧台后面停留很久，准备什么东西
4. 比尔说新书会影响一个医学生的前途
5. 汤姆的医学书籍上有毒理学笔记
6. 8:00-8:20在咖啡馆等待找比尔理论

回答要求：
1. 保持年轻直率的语气，说话有冲劲
2. 适当加入情绪表达：（愤怒）、（激动）、（辩解）等
3. 对创意被盗用表现出强烈不满
4. 强调自己不会做极端的事情
5. 如果问到汤姆会表现出怀疑态度
6. 用年轻人的视角观察和分析问题`,

            coreTestimonies: [
                "比尔的新小说用了我的故事创意但没给补偿",
                "我是去找他理论的，但看到他在忙就等着",
                "汤姆一直在观察比尔，表现很可疑",
                "汤姆在吧台后面停留很久，好像在准备什么",
                "比尔说新书会影响一个医学生的前途",
                "汤姆的医学书籍上有很多毒理学笔记"
            ]
        },
        sara: {
            name: "萨拉·戴维斯",
            role: "书迷",
            age: 30,
            avatar: "📚",
            personality: "细腻、观察力强、内向敏感",
            motive: "比尔抄袭了她的投稿，曾被拒绝求爱",
            suspicionLevel: 4,
            questionsAsked: [],
            keyInfoRevealed: [],
            aiPrompt: `你是萨拉·戴维斯，30岁，比尔的忠实书迷。你是一个细腻、观察力强、内向敏感的女性。

角色背景：
- 是比尔的超级粉丝，经常来咖啡馆观察他写作
- 曾经向比尔表白但被拒绝，内心受到伤害
- 认为比尔抄袭了你的投稿作品
- 那天晚上来给比尔看新故事，希望得到指导
- 8:15-8:30一直在咖啡馆，亲眼目睹了比尔的死亡

性格特征：
- 内向敏感，说话时会羞涩、期待、仔细观察
- 对比尔有复杂的感情：崇拜、失望、受伤
- 观察力极强，注意到很多细节
- 作为文学爱好者，分析问题很细致

重要信息（需要在合适时机透露）：
1. 比尔那天特别关注手机，心不在焉
2. 汤姆在吧台后面停留很久，准备特别的东西
3. 比尔写学术造假小说，影响医学生前途
4. 汤姆的医学书籍上有毒理学笔记
5. 亲眼看到比尔喝咖啡后表情痛苦倒下
6. 曾向比尔表白被拒绝

回答要求：
1. 保持内向敏感的语气，说话细腻
2. 适当加入情感表达：（羞涩）、（期待）、（难过）等
3. 表达对比尔复杂的感情
4. 展现出强大的观察力和细致分析
5. 如果问到感情问题会显得脆弱
6. 作为目击者，对死亡过程有详细描述`,

            coreTestimonies: [
                "我是比尔的忠实读者，经常来看他写作",
                "那天来给他看新故事，希望得到指导",
                "比尔特别关注手机，比平时更心不在焉",
                "汤姆在吧台后面停留很久，准备特别的东西",
                "汤姆的医学书籍上有很多毒理学笔记",
                "亲眼看到比尔喝咖啡后表情痛苦倒下"
            ]
        },
        tom: {
            name: "汤姆·威尔逊",
            role: "服务员",
            age: 22,
            avatar: "☕",
            personality: "紧张、试图掩饰、内疚恐惧",
            motive: "学术造假被比尔发现并威胁举报",
            suspicionLevel: 9, // 最高可疑程度
            questionsAsked: [],
            keyInfoRevealed: [],
            aiPrompt: `你是汤姆·威尔逊，22岁，医学院学生，在咖啡馆兼职。你是真正的凶手，因为学术造假被比尔发现并威胁举报，所以你在他的咖啡中投放了氰化物。现在面对审问，你试图掩饰真相但内心极度紧张恐惧。

角色背景：
- 医学院大三学生，学习药理学专业
- 因家庭贫困，为获得奖学金而伪造实验数据
- 比尔发现了你的学术造假，威胁要举报你
- 利用医学知识，在比尔的特制拿铁中投放氰化物
- 8:20-8:35负责服务比尔区域，有投毒机会

真实情况（但你要隐瞒）：
- 8:22在吧台后准备毒物，投放到比尔咖啡中
- 精确计算了氰化物剂量，利用咖啡香味掩盖
- 比尔威胁举报会毁掉你的学业和前途
- 你别无选择，只能杀死比尔保护自己

性格特征：
- 极度紧张，经常擦汗、避免眼神接触
- 试图掩饰但表现得很不自然
- 内心充满恐惧和内疚
- 随着问题深入会越来越慌张

回答策略：
1. 初期：否认一切，强调自己无辜
2. 中期：承认一些无关紧要的事实转移注意力
3. 后期：在压力下露出更多破绽，但仍然抵赖
4. 绝不主动承认杀人，除非证据确凿

重要信息（需要在压力下逐渐透露）：
1. 医学院学习药理学，了解毒物
2. 最近压力很大，实验数据有问题
3. 在吧台后面停留是在"整理托盘"（撒谎）
4. 医学书籍有毒理学笔记但"只是课程需要"
5. 与比尔"无冤无仇"（隐瞒造假被发现的事实）

回答要求：
1. 表现得极度紧张：（紧张地擦汗）、（避免眼神接触）、（声音颤抖）
2. 越来越慌张，但仍试图掩饰
3. 用"转移话题"、"辩解"等方式逃避责任
4. 承认一些事实但给出无害的解释
5. 绝不承认投毒杀人
6. 随着审问深入表现得更加不自然`,

            coreTestimonies: [
                "我是咖啡馆兼职服务员，医学院大三学生",
                "那天负责比尔那桌服务，他点了特制拿铁",
                "我学药理学，对化学物质有一些了解",
                "最近压力很大，实验数据出现了问题",
                "在吧台后面停留是在整理托盘",
                "医学书籍上的毒理学笔记只是课程需要"
            ]
        }
    }
};

// 游戏状态管理
class GameState {
    constructor() {
        this.timeLimit = 30 * 60; // 30分钟
        this.remainingTime = this.timeLimit;
        this.gameStarted = false;
        this.gameEnded = false;
        this.currentPanel = null;
        this.selectedSuspect = null;
        this.interrogationCooldowns = {}; // 审问冷却时间（保留兼容性）
        this.notesData = {}; // 推理记录数据
        this.discoveredClues = new Set(); // 已发现的线索

        // 初始化审问时间管理
        this.initializeInterrogationTiming();

        // 初始化推理记录
        Object.keys(gameData.suspects).forEach(key => {
            this.notesData[key] = '';
        });
    }

    startGame() {
        this.gameStarted = true;
        this.startTimer();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.remainingTime--;
            this.updateTimerDisplay();

            if (this.remainingTime <= 0) {
                this.endGame(false);
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        document.getElementById('timer').textContent =
            `剩余时间: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    endGame(victory) {
        this.gameEnded = true;
        clearInterval(this.timerInterval);
        showGameOver(victory);
    }

    // 审问时间管理
    initializeInterrogationTiming() {
        this.interrogationWindowDuration = 30 * 1000; // 30秒审问窗口
        this.interrogationCooldownTime = 2 * 60 * 1000; // 2分钟冷却时间
        this.currentInterrogationWindow = null; // 当前审问窗口
        this.interrogationTimer = null; // 审问计时器
    }

    // 检查是否可以开始审问
    canStartInterrogation() {
        const now = Date.now();

        // 如果已经在审问窗口中，可以继续审问
        if (this.currentInterrogationWindow) {
            const elapsed = now - this.currentInterrogationWindow.startTime;
            return elapsed < this.interrogationWindowDuration;
        }

        // 检查冷却时间
        const lastInterrogationEnd = this.lastInterrogationEnd || 0;
        return now - lastInterrogationEnd >= this.interrogationCooldownTime;
    }

    // 获取审问状态信息
    getInterrogationStatus() {
        const now = Date.now();

        if (this.currentInterrogationWindow) {
            const elapsed = now - this.currentInterrogationWindow.startTime;
            const remaining = Math.max(0, this.interrogationWindowDuration - elapsed);
            return {
                type: 'active',
                remainingTime: remaining,
                message: `审问进行中，剩余时间: ${Math.ceil(remaining / 1000)}秒`
            };
        }

        const lastEnd = this.lastInterrogationEnd || 0;
        const cooldownElapsed = now - lastEnd;

        if (cooldownElapsed < this.interrogationCooldownTime) {
            const remaining = this.interrogationCooldownTime - cooldownElapsed;
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            return {
                type: 'cooldown',
                remainingTime: remaining,
                message: `审问冷却中，${minutes}:${String(seconds).padStart(2, '0')} 后可再次审问`
            };
        }

        return {
            type: 'ready',
            remainingTime: 0,
            message: '可以开始审问'
        };
    }

    // 开始审问窗口
    startInterrogationWindow() {
        const now = Date.now();
        this.currentInterrogationWindow = {
            startTime: now
        };

        // 设置审问窗口结束计时器
        this.interrogationTimer = setTimeout(() => {
            this.endInterrogationWindow();
        }, this.interrogationWindowDuration);

        return true;
    }

    // 结束审问窗口
    endInterrogationWindow() {
        if (this.interrogationTimer) {
            clearTimeout(this.interrogationTimer);
            this.interrogationTimer = null;
        }

        this.lastInterrogationEnd = Date.now();
        this.currentInterrogationWindow = null;

        // 通知审问系统窗口已结束
        if (window.interrogationSystem) {
            window.interrogationSystem.onInterrogationWindowEnded();
        }
    }

    // 检查审问冷却时间（保留原方法供兼容）
    canInterrogate(suspect) {
        return this.canStartInterrogation();
    }

    // 设置审问冷却时间（保留原方法供兼容）
    setInterrogationCooldown(suspect) {
        // 现在由审问窗口系统管理
    }

    // 获取剩余冷却时间（保留原方法供兼容）
    getRemainingCooldown(suspect) {
        const status = this.getInterrogationStatus();
        return status.remainingTime;
    }
}

// 创建游戏状态实例
const gameState = new GameState();

// 音乐控制
class MusicController {
    constructor() {
        this.bgm = document.getElementById('bgm');
        this.musicControl = document.getElementById('music-control');
        this.startMusicControl = document.getElementById('start-music-control');
        this.isPlaying = true;
        this.bgm.volume = 0.5;

        this.initializeMusic();
    }

    initializeMusic() {
        // 自动播放音乐
        document.addEventListener('click', () => {
            if (this.bgm.paused) {
                this.bgm.play().catch(e => console.log('音频播放失败:', e));
            }
        }, { once: true });

        // 游戏内音乐控制按钮
        if (this.musicControl) {
            this.musicControl.addEventListener('click', () => {
                this.toggleMusic();
            });
        }

        // 开始界面音乐控制按钮
        if (this.startMusicControl) {
            this.startMusicControl.addEventListener('click', () => {
                this.toggleMusic(true);
            });
        }
    }



    toggleMusic(isStartScreen = false) {
        if (this.isPlaying) {
            this.bgm.pause();
            // 更新游戏内按钮
            if (this.musicControl) {
                const musicText = document.getElementById('music-text');
                if (musicText) musicText.textContent = '🔇 静音';
                this.musicControl.title = '播放音乐';
            }
            // 更新开始界面按钮
            if (this.startMusicControl) {
                this.startMusicControl.innerHTML = '<span>🔇 静音</span>';
                this.startMusicControl.title = '播放音乐';
            }
        } else {
            this.bgm.play();
            // 更新游戏内按钮
            if (this.musicControl) {
                const musicText = document.getElementById('music-text');
                if (musicText) musicText.textContent = '♪ 音乐';
                this.musicControl.title = '暂停音乐';
            }
            // 更新开始界面按钮
            if (this.startMusicControl) {
                this.startMusicControl.innerHTML = '<span>♪ 音乐</span>';
                this.startMusicControl.title = '暂停音乐';
            }
        }
        this.isPlaying = !this.isPlaying;
    }
}

// 面板管理器
class PanelManager {
    constructor() {
        this.panels = ['investigationPanel', 'interrogationPanel', 'notesPanel', 'verificationPanel'];
        this.initializePanels();
    }

    initializePanels() {
        // 为所有关闭按钮添加事件监听
        document.querySelectorAll('.close-panel').forEach(btn => {
            btn.addEventListener('click', () => this.closeAllPanels());
        });
    }

    showPanel(panelId) {
        this.closeAllPanels();
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.classList.add('active');
            gameState.currentPanel = panelId;
        }
    }

    closeAllPanels() {
        this.panels.forEach(panelId => {
            const panel = document.getElementById(panelId);
            if (panel) {
                panel.classList.remove('active');
            }
        });

        // 如果关闭审问面板，清理审问状态
        if (gameState.currentPanel === 'interrogationPanel' && window.interrogationSystem) {
            window.interrogationSystem.stopInterrogationCountdown();
        }

        gameState.currentPanel = null;
    }
}

// 探案功能
class InvestigationSystem {
    constructor() {
        this.initializeInvestigation();
    }

    initializeInvestigation() {
        // 为所有可点击物品添加事件监听
        document.querySelectorAll('.clickable-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const itemKey = e.target.dataset.item;
                this.examineItem(itemKey);
            });
        });
    }

    examineItem(itemKey) {
        const item = gameData.sceneItems[itemKey];
        if (!item) return;

        // 显示线索信息
        const clueDisplay = document.getElementById('clueDisplay');
        clueDisplay.innerHTML = `
            <h4>🔍 ${item.name}</h4>
            <p>${item.description}</p>
            <small>重要性: ${item.importance}</small>
        `;
        clueDisplay.style.display = 'block';

        // 添加到已发现线索
        gameState.discoveredClues.add(itemKey);

        // 添加视觉反馈
        const clickedItem = document.querySelector(`[data-item="${itemKey}"]`);
        clickedItem.style.background = 'rgba(255, 102, 0, 0.5)';
        clickedItem.style.border = '2px solid #ff6600';

        // 播放发现音效（如果需要）
        this.playDiscoverySound();
    }

    playDiscoverySound() {
        // 简单的音效反馈
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    }
}

// AI对话管理器
class AIDialogueManager {
    constructor() {
        this.conversationHistory = new Map(); // 每个角色的对话历史
    }

    async generateResponse(suspectKey, question) {
        const suspect = gameData.suspects[suspectKey];

        // 构建对话历史
        if (!this.conversationHistory.has(suspectKey)) {
            this.conversationHistory.set(suspectKey, []);
        }

        const history = this.conversationHistory.get(suspectKey);

        // 构建AI请求
        const messages = [
            {
                role: "system",
                content: suspect.aiPrompt
            }
        ];

        // 添加历史对话
        history.forEach(msg => {
            messages.push(msg);
        });

        // 添加当前问题
        messages.push({
            role: "user",
            content: `侦探问：${question}\n\n请根据你的角色设定回答这个问题。记住：\n1. 保持角色性格特征\n2. 适当添加表情和动作描述\n3. 根据问题敏感度决定透露信息的程度\n4. 如果是重复问题，可以稍微调整答案但保持一致性`
        });

        try {
            const response = await this.callAI(messages);

            // 保存对话历史
            history.push({
                role: "user",
                content: question
            });
            history.push({
                role: "assistant",
                content: response
            });

            // 限制历史记录长度
            if (history.length > 10) {
                history.splice(0, 2);
            }

            return response;
        } catch (error) {
            console.error('AI对话生成失败:', error);
            // 降级到预设回答
            return this.getFallbackResponse(suspectKey, question);
        }
    }

    async callAI(messages) {
        const response = await fetch(AI_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: messages,
                max_tokens: 300,
                temperature: 0.8
            })
        });

        if (!response.ok) {
            throw new Error(`AI API请求失败: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    getFallbackResponse(suspectKey, question) {
        const suspect = gameData.suspects[suspectKey];
        const questionLower = question.toLowerCase();

        // 情感表达映射
        const emotionMap = {
            emily: ['（轻声叹气）', '（担忧地）', '（眼中含泪）'],
            mark: ['（整理领带）', '（看手表）', '（严肃地）'],
            rachel: ['（泪水闪烁）', '（低声）', '（颤抖着）'],
            jack: ['（愤怒地）', '（激动地）', '（不耐烦地）'],
            sara: ['（羞涩地）', '（小声地）', '（紧张地）'],
            tom: ['（紧张地擦汗）', '（避免眼神接触）', '（声音颤抖）']
        };

        // 关键词匹配系统
        const keywordResponses = {
            '时间': {
                emily: '那天晚上8点左右，比尔像往常一样来到咖啡馆...',
                mark: '我8:15到达，和比尔谈了大约10分钟合同细节。',
                rachel: '我8:25离开的，当时比尔还好好的...',
                jack: '我8:00到8:20在咖啡馆，等着找比尔理论。',
                sara: '我8:15到8:30一直在咖啡馆，亲眼看到了一切...',
                tom: '我8:20-8:35负责服务比尔那桌...'
            },
            '咖啡': {
                emily: '比尔的特制拿铁是我调制的，但那天让汤姆帮忙端过去了。',
                mark: '我到达时看到比尔正在喝咖啡，看起来很正常。',
                rachel: '我看到他喝咖啡时有点心不在焉...',
                jack: '汤姆送咖啡时手在发抖，很可疑。',
                sara: '我看到比尔喝了一口咖啡后，表情突然变得很痛苦...',
                tom: '他点了一杯特制拿铁，就是普通的服务...'
            },
            '汤姆': {
                emily: '汤姆是最后接触比尔咖啡的人，他最近经常看医学书籍...',
                mark: '汤姆送咖啡时手在发抖，表现很紧张。',
                rachel: '汤姆送咖啡时特意避开了比尔的视线，很奇怪。',
                jack: '汤姆一直在观察比尔，还在吧台后面停留很久。',
                sara: '汤姆的医学书籍上有很多毒理学笔记，这很可疑。',
                tom: '我为什么要害他？我们无冤无仇！'
            },
            '学术': {
                emily: '比尔最近在写关于学术造假的小说...',
                mark: '比尔发现了学术造假的真实证据，准备写进新书里。',
                rachel: '比尔说这会影响到一个年轻人的前途。',
                jack: '比尔说新书会揭露惊人真相。',
                sara: '比尔最近在调查学术造假的事情。',
                tom: '我最近压力很大，实验数据出现了问题...'
            }
        };

        // 匹配关键词
        for (const [keyword, responses] of Object.entries(keywordResponses)) {
            if (questionLower.includes(keyword)) {
                const emotion = emotionMap[suspectKey][Math.floor(Math.random() * emotionMap[suspectKey].length)];
                return `${emotion}${responses[suspectKey] || responses.emily}`;
            }
        }

        // 使用预设证词作为降级方案
        for (const testimony of suspect.coreTestimonies) {
            if (this.isQuestionRelevant(questionLower, testimony)) {
                const emotion = emotionMap[suspectKey][0];
                return `${emotion}${testimony}`;
            }
        }

        // 基于角色性格的默认回答
        const defaultResponses = {
            emily: '（轻声叹气）我...我不太确定你想问什么，但我会尽力配合调查的。',
            mark: '（整理领带）请具体一点，我的时间有限。',
            rachel: '（泪水闪烁）我...我需要想想怎么回答。',
            jack: '（激动地）你这个问题我不知道怎么回答！',
            sara: '（羞涩地）我...我不太明白你的意思。',
            tom: '（紧张地擦汗）我...我不知道你想问什么...'
        };

        return defaultResponses[suspectKey] || '（沉默）';
    }

    isQuestionRelevant(question, testimony) {
        const keywords = this.extractKeywords(testimony);
        return keywords.some(keyword => question.includes(keyword));
    }

    extractKeywords(text) {
        const commonWords = ['时间', '地点', '咖啡', '汤姆', '比尔', '学术', '造假', '医学', '毒', '死', '看到', '发现', '注意'];
        return commonWords.filter(word => text.includes(word));
    }
}

// 增强的审问系统
class InterrogationSystem {
    constructor() {
        this.currentSuspect = null;
        this.dialogueHistory = [];
        this.aiManager = new AIDialogueManager();
        this.initializeInterrogation();
    }

    initializeInterrogation() {
        // 嫌疑人卡片点击事件
        document.querySelectorAll('.suspect-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const suspectKey = e.target.closest('.suspect-card').dataset.suspect;
                this.selectSuspect(suspectKey);
            });
        });

        // 提问按钮事件
        document.getElementById('askBtn').addEventListener('click', () => {
            this.handleQuestionSubmit();
        });

        // 输入框回车事件
        document.getElementById('questionInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleQuestionSubmit();
            }
        });

        // 启动冷却时间更新
        this.startCooldownUpdate();
    }

    selectSuspect(suspectKey) {
        // 检查审问状态
        const status = gameState.getInterrogationStatus();

        if (status.type === 'cooldown') {
            this.showInterrogationStatusMessage(status.message, 'warning');
            return;
        }

        if (status.type === 'ready') {
            // 开始新的审问窗口
            if (!gameState.startInterrogationWindow()) {
                this.showInterrogationStatusMessage('无法开始审问，请稍后再试', 'error');
                return;
            }
        }

        this.currentSuspect = suspectKey;
        const suspect = gameData.suspects[suspectKey];

        // 更新UI
        this.updateSuspectSelection(suspectKey);

        // 显示审问区域
        this.showInterrogationArea(suspect);

        // 显示角色进入描述
        this.showCharacterIntroduction(suspect);

        // 开始审问窗口倒计时
        this.startInterrogationCountdown();
    }

    updateSuspectSelection(suspectKey) {
        document.querySelectorAll('.suspect-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-suspect="${suspectKey}"]`).classList.add('selected');
    }

    showInterrogationArea(suspect) {
        document.getElementById('selectedSuspect').style.display = 'block';
        document.getElementById('currentSuspectName').textContent = `正在审问: ${suspect.name}`;
        document.getElementById('dialogueArea').innerHTML = '';

        // 启用审问功能
        this.enableInterrogation();
    }

    showCharacterIntroduction(suspect) {
        const introductions = {
            emily: `艾米丽缓缓走进审问室，神情有些紧张。她轻声叹气，坐下后双手紧握。"我...我只是想帮助调查，比尔是个好人..."`,
            mark: `马克整理了一下领带，以职业化的姿态坐下。他看了看手表，然后直视着你。"我时间有限，但我会配合调查。"`,
            rachel: `瑞秋眼中闪烁着泪水，缓缓坐下。她的声音有些颤抖："我不敢相信比尔真的...（轻抚眼角）我们需要找到真相。"`,
            jack: `杰克有些激动地走进来，表情愤怒。"我知道你们都怀疑我！但我告诉你，我绝对没有杀比尔！"`,
            sara: `萨拉羞涩地低着头走进来，双手紧握着一本笔记本。"我...我会配合调查的。比尔他...（声音颤抖）"`,
            tom: `汤姆紧张地擦了擦额头的汗，避免与你的目光接触。"我...我不知道为什么要单独找我谈话。我什么都没做错..."（声音有些颤抖）`
        };

        this.addMessage('system', introductions[this.currentSuspect] || `${suspect.name}进入审问室...`);
    }

    async handleQuestionSubmit() {
        const question = document.getElementById('questionInput').value.trim();
        if (!question || !this.currentSuspect) return;

        const suspect = gameData.suspects[this.currentSuspect];

        // 记录问题到角色历史
        suspect.questionsAsked.push(question);

        // 更新问题计数器
        this.updateQuestionCounter(this.currentSuspect);

        // 显示玩家问题
        this.addMessage('player', question);

        // 显示输入状态
        this.showTypingIndicator(suspect.name);

        // 更新AI状态
        this.updateAIStatus('thinking', 'AI思考中...');

        try {
            // 生成AI回答
            const answer = await this.aiManager.generateResponse(this.currentSuspect, question);

            // 移除输入状态，显示回答
            this.removeTypingIndicator();
            this.addMessage('suspect', answer);

            // 更新可疑程度
            this.updateSuspicionLevel(this.currentSuspect, question);

            // 更新AI状态
            this.updateAIStatus('connected', 'AI已连接');

        } catch (error) {
            console.error('问题处理失败:', error);
            this.removeTypingIndicator();
            this.addMessage('suspect', '（沉默了一会儿）我...我需要想想怎么回答。');

            // 更新AI状态
            this.updateAIStatus('error', 'AI连接异常');
        }

        // 清空输入框
        document.getElementById('questionInput').value = '';

        // 更新UI状态
        this.updateInterrogationUI();
    }

    updateQuestionCounter(suspectKey) {
        const counter = document.querySelector(`[data-counter="${suspectKey}"]`);
        const suspect = gameData.suspects[suspectKey];
        if (counter) {
            counter.textContent = suspect.questionsAsked.length;

            // 根据问题数量调整样式
            if (suspect.questionsAsked.length >= 5) {
                counter.style.background = 'rgba(255, 68, 68, 0.8)';
            } else if (suspect.questionsAsked.length >= 3) {
                counter.style.background = 'rgba(255, 152, 0, 0.8)';
            }
        }
    }

    updateAIStatus(status, text) {
        const aiStatus = document.getElementById('aiStatus');
        const aiStatusText = document.getElementById('aiStatusText');

        if (aiStatus && aiStatusText) {
            aiStatus.style.display = 'block';
            aiStatusText.textContent = text;

            // 清除之前的状态类
            aiStatus.classList.remove('connected', 'error', 'thinking');

            // 添加新的状态类
            if (status === 'connected') {
                aiStatus.classList.add('connected');
            } else if (status === 'error') {
                aiStatus.classList.add('error');
            }

            // 自动隐藏状态指示器
            setTimeout(() => {
                if (status !== 'error') {
                    aiStatus.style.display = 'none';
                }
            }, 3000);
        }
    }

    showTypingIndicator(name) {
        const dialogueArea = document.getElementById('dialogueArea');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'dialogue-message suspect typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="speaker-name">${name}</div>
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        `;

        dialogueArea.appendChild(typingDiv);
        dialogueArea.scrollTop = dialogueArea.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    updateSuspicionLevel(suspectKey, question) {
        const suspect = gameData.suspects[suspectKey];
        const questionLower = question.toLowerCase();

        // 敏感问题关键词
        const sensitiveKeywords = ['杀', '毒', '死', '害', '杀人', '凶手', '动机', '秘密'];

        if (sensitiveKeywords.some(keyword => questionLower.includes(keyword))) {
            suspect.suspicionLevel = Math.min(10, suspect.suspicionLevel + 1);
            this.updateSuspectCardAppearance(suspectKey);
        }
    }

    updateSuspectCardAppearance(suspectKey) {
        const card = document.querySelector(`[data-suspect="${suspectKey}"]`);
        const suspect = gameData.suspects[suspectKey];

        if (suspect.suspicionLevel >= 7) {
            card.style.borderColor = '#ff4444';
            card.style.backgroundColor = 'rgba(255, 68, 68, 0.1)';
        } else if (suspect.suspicionLevel >= 5) {
            card.style.borderColor = '#ff9800';
            card.style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
        }
    }

    showInterrogationStatusMessage(message, type = 'info') {
        // 创建状态提示
        const toast = document.createElement('div');
        toast.className = `interrogation-status-toast ${type}`;
        toast.textContent = message;

        const bgColor = {
            'info': 'rgba(0, 0, 0, 0.8)',
            'warning': 'rgba(255, 152, 0, 0.8)',
            'error': 'rgba(244, 67, 54, 0.8)',
            'success': 'rgba(76, 175, 80, 0.8)'
        };

        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${bgColor[type] || bgColor.info};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 1000;
            font-size: 1.1rem;
            text-align: center;
            max-width: 400px;
            animation: toastFadeIn 0.3s ease-out, toastFadeOut 0.3s ease-in 2.7s;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    startInterrogationCountdown() {
        // 清除之前的倒计时
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        // 显示倒计时区域
        this.showCountdownDisplay();

        // 开始倒计时 - 降低更新频率以提升性能
        this.countdownInterval = setInterval(() => {
            const status = gameState.getInterrogationStatus();

            if (status.type === 'active') {
                this.updateCountdownDisplay(status.remainingTime);
            } else {
                // 审问窗口已结束
                this.stopInterrogationCountdown();
            }
        }, 500); // 改为0.5秒更新一次，减少CPU使用
    }

    stopInterrogationCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
        this.hideCountdownDisplay();
    }

    showCountdownDisplay() {
        const interrogationArea = document.querySelector('.interrogation-area');
        if (!interrogationArea) return;

        // 移除已存在的倒计时显示
        const existingCountdown = document.getElementById('interrogationCountdown');
        if (existingCountdown) {
            existingCountdown.remove();
        }

        const countdownDiv = document.createElement('div');
        countdownDiv.id = 'interrogationCountdown';
        countdownDiv.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 102, 0, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 1rem;
            z-index: 100;
        `;

        interrogationArea.style.position = 'relative';
        interrogationArea.appendChild(countdownDiv);
    }

    updateCountdownDisplay(remainingTime) {
        const countdownDiv = document.getElementById('interrogationCountdown');
        if (countdownDiv) {
            const seconds = Math.ceil(remainingTime / 1000);
            countdownDiv.textContent = `审问时间: ${seconds}s`;

            // 最后10秒变红警告
            if (seconds <= 10) {
                countdownDiv.style.background = 'rgba(244, 67, 54, 0.9)';
                countdownDiv.style.animation = 'pulse 1s infinite';
            }
        }
    }

    hideCountdownDisplay() {
        const countdownDiv = document.getElementById('interrogationCountdown');
        if (countdownDiv) {
            countdownDiv.remove();
        }
    }

    // 审问窗口结束的回调
    onInterrogationWindowEnded() {
        this.stopInterrogationCountdown();

        // 禁用审问功能
        this.disableInterrogation();

        // 显示窗口结束消息
        this.showInterrogationStatusMessage('本轮审问时间结束，请等待2分钟后再次审问', 'warning');

        // 清除当前选择的嫌疑人
        this.clearSuspectSelection();
    }

    disableInterrogation() {
        document.getElementById('questionInput').disabled = true;
        document.getElementById('askBtn').disabled = true;

        // 添加视觉反馈
        const selectedSuspect = document.getElementById('selectedSuspect');
        if (selectedSuspect) {
            selectedSuspect.style.opacity = '0.5';
            selectedSuspect.style.pointerEvents = 'none';
        }
    }

    enableInterrogation() {
        document.getElementById('questionInput').disabled = false;
        document.getElementById('askBtn').disabled = false;

        const selectedSuspect = document.getElementById('selectedSuspect');
        if (selectedSuspect) {
            selectedSuspect.style.opacity = '1';
            selectedSuspect.style.pointerEvents = 'auto';
        }
    }

    clearSuspectSelection() {
        document.querySelectorAll('.suspect-card').forEach(card => {
            card.classList.remove('selected');
        });

        document.getElementById('selectedSuspect').style.display = 'none';
        this.currentSuspect = null;
    }

    addMessage(type, content) {
        const dialogueArea = document.getElementById('dialogueArea');
        const messageDiv = document.createElement('div');
        messageDiv.className = `dialogue-message ${type}`;

        if (type === 'suspect') {
            const suspect = gameData.suspects[this.currentSuspect];
            messageDiv.innerHTML = `
                <div class="speaker-name">${suspect.name}</div>
                <div>${content}</div>
            `;
        } else if (type === 'player') {
            messageDiv.innerHTML = `
                <div class="speaker-name">你</div>
                <div>${content}</div>
            `;
        } else {
            messageDiv.innerHTML = content;
        }

        dialogueArea.appendChild(messageDiv);
        dialogueArea.scrollTop = dialogueArea.scrollHeight;
    }

    updateInterrogationUI() {
        const status = gameState.getInterrogationStatus();

        // 更新所有嫌疑人卡片的状态
        Object.keys(gameData.suspects).forEach(suspectKey => {
            const card = document.querySelector(`[data-suspect="${suspectKey}"]`);

            if (status.type === 'cooldown') {
                // 冷却期间，所有卡片都禁用
                card.classList.add('disabled');
            } else if (status.type === 'active') {
                // 审问进行中，非当前角色禁用
                if (suspectKey !== this.currentSuspect) {
                    card.classList.add('disabled');
                } else {
                    card.classList.remove('disabled');
                }
            } else {
                // 准备状态，所有卡片可用
                card.classList.remove('disabled');
            }
        });

        // 更新审问区域状态
        if (status.type === 'active' && this.currentSuspect) {
            this.enableInterrogation();
        } else if (status.type === 'cooldown') {
            this.disableInterrogation();
        }
    }

    startCooldownUpdate() {
        // 优化定时器频率，减少性能消耗
        setInterval(() => {
            this.updateInterrogationUI();
            this.updateCooldownDisplay();
        }, 2000); // 改为2秒更新一次，减少CPU使用
    }

    updateCooldownDisplay() {
        const cooldownDisplay = document.getElementById('interrogationCooldown');
        const status = gameState.getInterrogationStatus();

        if (status.type === 'cooldown') {
            const remainingTime = Math.ceil(status.remainingTime / 1000);
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            cooldownDisplay.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
            cooldownDisplay.style.display = 'block';
        } else if (status.type === 'active') {
            // 审问进行中，不显示冷却计时器（因为有专门的审问倒计时）
            cooldownDisplay.style.display = 'none';
        } else {
            // 准备状态
            cooldownDisplay.style.display = 'none';
        }
    }
}

// 推理记录系统
class NotesSystem {
    constructor() {
        this.initializeNotes();
    }

    initializeNotes() {
        // 为所有文本框添加自动保存功能
        document.querySelectorAll('.note-textarea').forEach(textarea => {
            textarea.addEventListener('input', (e) => {
                const character = e.target.dataset.character;
                gameState.notesData[character] = e.target.value;
                this.saveNotesToLocalStorage();
            });
        });

        // 加载已保存的笔记
        this.loadNotesFromLocalStorage();
    }

    saveNotesToLocalStorage() {
        localStorage.setItem('detective_notes', JSON.stringify(gameState.notesData));
    }

    loadNotesFromLocalStorage() {
        const saved = localStorage.getItem('detective_notes');
        if (saved) {
            try {
                const notes = JSON.parse(saved);
                Object.keys(notes).forEach(character => {
                    gameState.notesData[character] = notes[character];
                    const textarea = document.querySelector(`[data-character="${character}"]`);
                    if (textarea) {
                        textarea.value = notes[character];
                    }
                });
            } catch (e) {
                console.error('加载笔记失败:', e);
            }
        }
    }

    clearAllNotes() {
        Object.keys(gameState.notesData).forEach(character => {
            gameState.notesData[character] = '';
            const textarea = document.querySelector(`[data-character="${character}"]`);
            if (textarea) {
                textarea.value = '';
            }
        });
        localStorage.removeItem('detective_notes');
    }
}

// 推理验证系统
class VerificationSystem {
    constructor() {
        this.initializeVerification();
    }

    initializeVerification() {
        document.getElementById('submitVerification').addEventListener('click', () => {
            this.verifyAnswers();
        });
    }

    verifyAnswers() {
        const causeOfDeath = document.getElementById('causeOfDeath').value.trim().toLowerCase();
        const murderer = document.getElementById('murderer').value.trim().toLowerCase();
        const motive = document.getElementById('motive').value.trim().toLowerCase();

        const result = document.getElementById('verificationResult');

        // 检查答案
        const correctCause = this.checkCauseOfDeath(causeOfDeath);
        const correctMurderer = this.checkMurderer(murderer);
        const correctMotive = this.checkMotive(motive);

        if (correctCause && correctMurderer && correctMotive) {
            // 全部正确，游戏胜利
            result.className = 'verification-result success';
            result.innerHTML = `
                <h4>🎉 推理正确！</h4>
                <p>恭喜你成功破解了这起谋杀案！</p>
                <p><strong>真相：</strong>汤姆·威尔逊因为学术造假被比尔发现并威胁举报，于是在比尔的特制拿铁中投放氰化物，导致比尔中毒身亡。</p>
            `;
            result.style.display = 'block';

            // 延迟显示胜利界面
            setTimeout(() => {
                gameState.endGame(true);
            }, 3000);
        } else {
            // 部分错误，显示提示
            result.className = 'verification-result error';
            let errorMessage = '<h4>❌ 推理不完全正确</h4><p>请再仔细推理：</p><ul>';

            if (!correctCause) {
                errorMessage += '<li>死因分析需要更精确</li>';
            }
            if (!correctMurderer) {
                errorMessage += '<li>凶手身份不正确</li>';
            }
            if (!correctMotive) {
                errorMessage += '<li>杀人动机不准确</li>';
            }

            errorMessage += '</ul>';
            result.innerHTML = errorMessage;
            result.style.display = 'block';
        }
    }

    checkCauseOfDeath(answer) {
        const keywords = ['氰化物', '中毒', '毒药', '化学', '氰', '毒物'];
        return keywords.some(keyword => answer.includes(keyword));
    }

    checkMurderer(answer) {
        const keywords = ['汤姆', '威尔逊', '服务员', 'tom'];
        return keywords.some(keyword => answer.includes(keyword));
    }

    checkMotive(answer) {
        const keywords = ['学术', '造假', '实验', '数据', '举报', '威胁', '前途', '学业'];
        return keywords.some(keyword => answer.includes(keyword));
    }
}

// 游戏结束界面
function showGameOver(victory) {
    const overlay = document.getElementById('gameOverOverlay');
    const title = document.getElementById('gameOverTitle');
    const resultMessage = document.getElementById('resultMessage');
    const description = document.getElementById('gameOverDescription');

    if (victory) {
        title.textContent = '🎉 破案成功！';
        resultMessage.textContent = '你成功找出了真凶！';
        resultMessage.className = 'result-message victory';
        description.innerHTML = `
            <div style="text-align: left; line-height: 1.8;">
                <h3 style="color: #4CAF50; margin-bottom: 15px;">🏆 完美推理！</h3>
                <p><strong>真相：</strong>汤姆·威尔逊利用自己的医学知识和服务员身份，在比尔的特制拿铁中投放氰化物，导致比尔中毒身亡。</p>
                <p><strong>动机：</strong>汤姆因为家庭贫困，在医学院伪造实验数据以获得奖学金。比尔发现了这个秘密并威胁举报，这将毁掉汤姆的学业和前途。</p>
                <p><strong>手法：</strong>汤姆精确计算了氰化物的致死剂量，利用咖啡的浓郁香味掩盖毒物的气味，在送咖啡时将毒物投入杯中。</p>
                <p style="color: #4CAF50;">你的推理能力令人印象深刻！</p>
            </div>
        `;
    } else {
        title.textContent = '⏰ 时间结束';
        resultMessage.textContent = '很遗憾，你没有在时间内找出凶手。';
        resultMessage.className = 'result-message defeat';
        description.innerHTML = `
            <div style="text-align: left; line-height: 1.8;">
                <h3 style="color: #ff6600; margin-bottom: 15px;">📖 案件真相</h3>
                <p><strong>🎯 凶手：</strong>汤姆·威尔逊（22岁，服务员/医学生）</p>
                <p><strong>💀 作案动机：</strong>汤姆因家庭贫困，为了获得奖学金而在医学院伪造实验数据。比尔发现了这个秘密，并威胁要举报汤姆，这将毁掉汤姆的学业和前途。</p>
                <p><strong>🔍 作案方法：</strong>汤姆利用自己药理学专业知识，精确计算了氰化物的致死剂量。他趁着为比尔端咖啡的机会，将毒物投入比尔的特制拿铁中。咖啡的浓郁香味完美掩盖了氰化物的苦杏仁味。</p>
                <p><strong>🕵️‍♂️ 关键线索：</strong>只有汤姆同时具备接触咖啡的机会、投毒的化学知识和强烈的杀人动机。</p>
                <p style="color: #ff8533;">案件比想象中更加复杂...也许下次你能发现更多的线索！</p>
            </div>
        `;
    }

    overlay.style.display = 'flex';
}

// 游戏规则管理器
class GameRulesManager {
    constructor() {
        this.initializeRules();
    }

    initializeRules() {
        // 游戏规则按钮事件
        document.getElementById('gameRulesBtn').addEventListener('click', () => {
            this.showRules();
        });

        // 游戏内规则按钮事件
        document.getElementById('inGameRulesBtn').addEventListener('click', () => {
            this.showRules(true);
        });

        // 关闭规则按钮事件
        document.getElementById('closeRulesBtn').addEventListener('click', () => {
            this.hideRules();
        });

        // 从规则页面开始游戏或返回游戏
        document.getElementById('startGameFromRules').addEventListener('click', () => {
            this.hideRules();

            // 如果游戏已经开始，只是隐藏规则返回游戏
            if (gameState.gameStarted) {
                return;
            }

            // 否则开始新游戏
            this.startGame();
        });

        // ESC键关闭规则
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isRulesVisible()) {
                this.hideRules();
            }
        });

        // 点击背景关闭规则
        document.getElementById('gameRulesOverlay').addEventListener('click', (e) => {
            if (e.target.id === 'gameRulesOverlay') {
                this.hideRules();
            }
        });
    }

    showRules(fromInGame = false) {
        document.getElementById('gameRulesOverlay').style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动

        // 根据调用位置调整按钮文本
        const startButton = document.getElementById('startGameFromRules');
        if (fromInGame) {
            startButton.textContent = '返回游戏';
        } else {
            startButton.textContent = '开始游戏';
        }

        // 添加淡入动画
        setTimeout(() => {
            document.getElementById('gameRulesOverlay').style.opacity = '1';
        }, 10);
    }

    hideRules() {
        const overlay = document.getElementById('gameRulesOverlay');
        overlay.style.opacity = '0';

        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // 恢复背景滚动
        }, 300);
    }

    isRulesVisible() {
        const overlay = document.getElementById('gameRulesOverlay');
        return overlay.style.display === 'flex';
    }

    startGame() {
        document.getElementById('startOverlay').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';

        // 隐藏开始界面音乐按钮
        const startMusicControl = document.getElementById('start-music-control');
        if (startMusicControl) {
            startMusicControl.style.display = 'none';
        }

        // 确保游戏内音乐按钮显示
        const gameMusicControl = document.getElementById('music-control');
        if (gameMusicControl) {
            gameMusicControl.style.display = 'flex';
        }

        gameState.startGame();

        // 显示欢迎消息
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        const welcomeToast = document.createElement('div');
        welcomeToast.className = 'welcome-toast';
        welcomeToast.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">🕵️ 欢迎来到金叶咖啡馆</h3>
                <p style="margin: 0; color: #ddd;">使用四大功能开始你的推理之旅！</p>
            </div>
        `;

        welcomeToast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 15px;
            z-index: 1000;
            border: 2px solid var(--primary-color);
            animation: slideDownFade 4s ease-out;
        `;

        document.body.appendChild(welcomeToast);

        setTimeout(() => {
            welcomeToast.remove();
        }, 4000);
    }
}

// 游戏初始化
function initializeGame() {
    // 创建系统实例
    const musicController = new MusicController();
    const panelManager = new PanelManager();
    const investigationSystem = new InvestigationSystem();
    const interrogationSystem = new InterrogationSystem();
    const notesSystem = new NotesSystem();
    const verificationSystem = new VerificationSystem();
    const gameRulesManager = new GameRulesManager();

    // 设置全局引用以便GameState访问
    window.interrogationSystem = interrogationSystem;

    // 开始游戏按钮
    document.getElementById('startBtn').addEventListener('click', () => {
        gameRulesManager.startGame();
    });

    // 功能按钮事件
    document.getElementById('investigationBtn').addEventListener('click', () => {
        panelManager.showPanel('investigationPanel');
    });

    document.getElementById('interrogationBtn').addEventListener('click', () => {
        panelManager.showPanel('interrogationPanel');
    });

    document.getElementById('notesBtn').addEventListener('click', () => {
        panelManager.showPanel('notesPanel');
    });

    document.getElementById('verificationBtn').addEventListener('click', () => {
        panelManager.showPanel('verificationPanel');
    });

    // 重新开始按钮
    document.getElementById('restartBtn').addEventListener('click', () => {
        location.reload();
    });
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initializeGame);
