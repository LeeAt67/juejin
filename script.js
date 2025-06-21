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

    // 嫌疑人信息和证词
    suspects: {
        emily: {
            name: "艾米丽·陈",
            role: "咖啡馆老板",
            age: 35,
            avatar: "👩‍💼",
            personality: "温和、关心他人",
            motive: "面临房租压力，但真心关心比尔",
            testimonies: [
                "（轻声叹气）那天晚上8点左右，比尔像往常一样来到咖啡馆。他每天都是这个时间来，雷打不动的习惯。",
                "（皱眉回忆）我注意到他今天看起来有点心不在焉，一直在看手机，好像在等什么重要消息。",
                "（有些担忧）汤姆是最后一个接触比尔咖啡的人。他刚来工作不久，但做事很认真... 至少我是这么认为的。",
                "（眼中含泪）比尔的死让我很震惊。他是我店里的常客，我们关系不错，我怎么可能害他？",
                "（辩解）最近房租确实涨了，但我有其他收入来源，不至于为了钱做这种事。",
                "（回忆）我8:20-8:40在后厨准备明天的糕点，期间出来过两次，看到汤姆在服务比尔那桌。",
                "（若有所思）比尔的咖啡是我特制的配方，只有我知道具体成分。但那天我太忙了，让汤姆帮忙端过去。",
                "（担心）我注意到汤姆最近经常在休息时间看医学书籍，好像是在准备什么重要考试。"
            ]
        },
        mark: {
            name: "马克·汤普森",
            role: "编辑",
            age: 40,
            avatar: "👨‍💼",
            personality: "专业、理性",
            motive: "版税分成争议，但需要比尔继续创作",
            testimonies: [
                "（整理领带）我和比尔约好那天晚上讨论新书的出版事宜。他最近在写一部关于学术造假的小说，题材很有意思。",
                "（看手表）我到咖啡馆时已经8:15了，看到比尔正在喝咖啡。我们聊了大约10分钟，主要是合同细节。",
                "（摊手）我们确实在版税问题上有些分歧，但这是正常的商业谈判，不至于闹到杀人的地步。",
                "（苦笑）公司最近确实遇到一些财务困难，但比尔的下一本书对我们很重要，我不可能害他。",
                "（困惑）我离开时比尔还好好的，没想到会发生这种事。真是太意外了。",
                "（回忆）比尔提到他最近发现了一些关于学术造假的真实证据，准备写进新书里，说会很轰动。",
                "（皱眉）我注意到汤姆在送咖啡时，手有点发抖，好像很紧张的样子。当时我还以为是新员工紧张。",
                "（严肃）比尔说他的新书会揭露一些惊人的真相，可能会影响到某些人的前途和未来。"
            ]
        },
        rachel: {
            name: "瑞秋·格林",
            role: "前妻律师",
            age: 38,
            avatar: "👩‍⚖️",
            personality: "感性、细腻",
            motive: "财产分割纠纷，想要复合",
            testimonies: [
                "（泪水闪烁）我是比尔的离婚律师，但我们之间不只是工作关系。我承认我对他还有感情。",
                "（低声）那天晚上我是来和他讨论财产分割的事，但主要是想和他谈谈复合的可能性。",
                "（担忧）我看到他喝咖啡时有点心不在焉，好像在担心什么重要的事情。",
                "（叹气）我们确实因为财产分割有过争执，但那都是过去的事了。我现在只想和他重新开始。",
                "（回忆）我离开时是8:25，他看起来一切正常，还和我说再见。谁知道那是最后一次...",
                "（皱眉）我注意到汤姆在送咖啡时，特意避开了比尔的视线，这让我觉得有点奇怪。",
                "（严肃）比尔提到他最近在调查一些学术造假的事情，说这可能会影响到一个年轻人的前途。",
                "（回忆）我离开前，看到汤姆在角落里偷偷打电话，表情很紧张，好像在和谁争论什么。"
            ]
        },
        jack: {
            name: "杰克·布朗",
            role: "演员",
            age: 28,
            avatar: "🎭",
            personality: "年轻气盛、直率",
            motive: "比尔"盗用"了他的故事创意",
            testimonies: [
                "（愤怒）比尔的新小说《死亡的真相》用了我的故事创意，但没有给我任何补偿！这不公平！",
                "（激动）我那天是去找他理论的，但看到他在和别人谈话，就在旁边等着。",
                "（辩解）我确实很生气，但我不可能为了一个故事创意就杀人。我又不是疯子。",
                "（指向汤姆方向）我注意到那个服务员汤姆一直在观察比尔，看起来有点可疑。",
                "（无奈）我等到8:20就离开了，因为看到他在忙，打算改天再来找他算账。",
                "（回忆）我看到汤姆在送咖啡前，在吧台后面停留了很久，好像在准备什么东西。",
                "（严肃）比尔最近在写一部关于学术造假的小说，说这可能会影响到一个医学生的前途。",
                "（皱眉）我注意到汤姆的医学书籍上有很多关于毒理学的笔记，这让我觉得很奇怪。一个服务员为什么要学这些？"
            ]
        },
        sara: {
            name: "萨拉·戴维斯",
            role: "书迷",
            age: 30,
            avatar: "📚",
            personality: "细腻、观察力强",
            motive: "比尔抄袭了她的投稿，曾被拒绝求爱",
            testimonies: [
                "（羞涩）我是比尔的忠实读者，经常来咖啡馆看他写作。他是我的偶像。",
                "（期待）那天晚上我是来给他看我写的新故事，希望能得到他的指导和建议。",
                "（观察）我注意到他今天特别关注手机，好像在等什么重要消息，比平时更加心不在焉。",
                "（难过）我确实曾经向他表白过，但被拒绝了。这让我很伤心，但我不可能因此伤害他。",
                "（回忆）我一直在咖啡馆待到8:30，亲眼看到他突然倒下。太可怕了...",
                "（仔细回忆）我看到汤姆在送咖啡前，在吧台后面停留了很久，好像在准备什么特别的东西。",
                "（严肃）比尔最近在写一部关于学术造假的小说，说这可能会影响到一个医学生的前途。",
                "（皱眉）我注意到汤姆的医学书籍上有很多关于毒理学的笔记，作为一个普通服务员，这很奇怪。",
                "（震惊）在比尔倒下前，我看到他喝了一口咖啡，然后表情突然变得很痛苦。"
            ]
        },
        tom: {
            name: "汤姆·威尔逊",
            role: "服务员",
            age: 22,
            avatar: "☕",
            personality: "紧张、试图掩饰",
            motive: "学术造假被比尔发现并威胁举报",
            testimonies: [
                "（紧张地擦汗）我是咖啡馆的兼职服务员，在医学院读大三。只是为了赚点生活费。",
                "（避免眼神接触）那天晚上我负责比尔那桌的服务，他点了一杯特制拿铁。就是普通的服务。",
                "（辩解）我确实有机会接触他的咖啡，但我为什么要害他？我们无冤无仇。",
                "（转移话题）我注意到他一直在看手机，好像在等什么重要消息。",
                "（急切）我送完咖啡就去忙其他事了，直到听到有人喊叫才知道出事了。",
                "（紧张）我在医学院学的是药理学，对各种化学物质... 嗯，有一些了解。",
                "（手脚无措）我最近在准备一个重要的实验报告，需要用到一些特殊的化学物质。",
                "（声音颤抖）我承认我最近压力很大，因为实验数据出现了一些... 问题。",
                "（慌张）我在送咖啡前确实在吧台后面停留了一会，但那只是在整理托盘，没有别的！",
                "（越来越紧张）我的医学书籍上确实有关于毒理学的笔记，但那只是课程需要，不是为了害人！"
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
        this.interrogationCooldowns = {}; // 审问冷却时间
        this.notesData = {}; // 推理记录数据
        this.discoveredClues = new Set(); // 已发现的线索

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

    // 检查审问冷却时间
    canInterrogate(suspect) {
        const now = Date.now();
        const lastInterrogation = this.interrogationCooldowns[suspect] || 0;
        const cooldownTime = 2 * 60 * 1000; // 2分钟
        return now - lastInterrogation >= cooldownTime;
    }

    // 设置审问冷却时间
    setInterrogationCooldown(suspect) {
        this.interrogationCooldowns[suspect] = Date.now();
    }

    // 获取剩余冷却时间
    getRemainingCooldown(suspect) {
        const now = Date.now();
        const lastInterrogation = this.interrogationCooldowns[suspect] || 0;
        const cooldownTime = 2 * 60 * 1000; // 2分钟
        const elapsed = now - lastInterrogation;
        return Math.max(0, cooldownTime - elapsed);
    }
}

// 创建游戏状态实例
const gameState = new GameState();

// 音乐控制
class MusicController {
    constructor() {
        this.bgm = document.getElementById('bgm');
        this.musicControl = document.getElementById('music-control');
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

        // 音乐控制按钮
        this.musicControl.addEventListener('click', () => this.toggleMusic());
    }

    toggleMusic() {
        if (this.isPlaying) {
            this.bgm.pause();
            this.musicControl.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAzdjE4TTggN3YxME0xNiA3djEwTTQgNGwxNiAxNiIvPjwvc3ZnPg==" alt="静音">';
            this.musicControl.title = '播放音乐';
        } else {
            this.bgm.play();
            this.musicControl.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAzdjE4TTggN3YxME0xNiA3djEwIi8+PC9zdmc+" alt="音乐">';
            this.musicControl.title = '暂停音乐';
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

// 审问系统
class InterrogationSystem {
    constructor() {
        this.currentSuspect = null;
        this.dialogueHistory = [];
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
            const question = document.getElementById('questionInput').value.trim();
            if (question && this.currentSuspect) {
                this.askQuestion(question);
            }
        });

        // 输入框回车事件
        document.getElementById('questionInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const question = e.target.value.trim();
                if (question && this.currentSuspect) {
                    this.askQuestion(question);
                }
            }
        });

        // 启动冷却时间更新
        this.startCooldownUpdate();
    }

    selectSuspect(suspectKey) {
        // 检查冷却时间
        if (!gameState.canInterrogate(suspectKey)) {
            const remainingTime = Math.ceil(gameState.getRemainingCooldown(suspectKey) / 1000);
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            alert(`请等待 ${minutes}:${String(seconds).padStart(2, '0')} 后再次审问${gameData.suspects[suspectKey].name}`);
            return;
        }

        this.currentSuspect = suspectKey;
        const suspect = gameData.suspects[suspectKey];

        // 更新UI
        document.querySelectorAll('.suspect-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-suspect="${suspectKey}"]`).classList.add('selected');

        // 显示审问区域
        document.getElementById('selectedSuspect').style.display = 'block';
        document.getElementById('currentSuspectName').textContent = `正在审问: ${suspect.name}`;
        document.getElementById('questionInput').disabled = false;
        document.getElementById('askBtn').disabled = false;

        // 清空对话历史
        document.getElementById('dialogueArea').innerHTML = '';

        // 显示初始对话
        this.addMessage('system', `${suspect.name} 进入审问室，${suspect.personality}的表情...`);
    }

    askQuestion(question) {
        if (!this.currentSuspect) return;

        const suspect = gameData.suspects[this.currentSuspect];

        // 显示玩家问题
        this.addMessage('player', question);

        // 生成嫌疑人回答
        const answer = this.generateAnswer(question, suspect);

        // 显示回答
        setTimeout(() => {
            this.addMessage('suspect', answer);
        }, 1000);

        // 清空输入框
        document.getElementById('questionInput').value = '';

        // 设置冷却时间
        gameState.setInterrogationCooldown(this.currentSuspect);

        // 更新UI状态
        this.updateInterrogationUI();
    }

    generateAnswer(question, suspect) {
        const questionLower = question.toLowerCase();

        // 根据问题内容匹配合适的回答
        let bestAnswer = suspect.testimonies[0]; // 默认回答

        // 关键词匹配
        const keywords = {
            '时间': ['时间', '什么时候', '几点', '时刻'],
            '地点': ['哪里', '地方', '位置', '现场'],
            '动机': ['为什么', '动机', '原因', '目的'],
            '关系': ['关系', '认识', '了解', '熟悉'],
            '现场': ['看到', '发现', '注意到', '观察'],
            '汤姆': ['汤姆', '服务员', '威尔逊'],
            '咖啡': ['咖啡', '拿铁', '喝'],
            '学术': ['学术', '造假', '实验', '数据'],
            '死因': ['怎么死', '死因', '中毒', '毒药']
        };

        // 基于关键词和角色选择回答
        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => questionLower.includes(word))) {
                const relevantAnswers = suspect.testimonies.filter(testimony => {
                    const testimonyLower = testimony.toLowerCase();
                    return words.some(word => testimonyLower.includes(word));
                });

                if (relevantAnswers.length > 0) {
                    bestAnswer = relevantAnswers[Math.floor(Math.random() * relevantAnswers.length)];
                    break;
                }
            }
        }

        return bestAnswer;
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
        // 更新所有嫌疑人卡片的状态
        Object.keys(gameData.suspects).forEach(suspectKey => {
            const card = document.querySelector(`[data-suspect="${suspectKey}"]`);
            if (!gameState.canInterrogate(suspectKey)) {
                card.classList.add('disabled');
            } else {
                card.classList.remove('disabled');
            }
        });
    }

    startCooldownUpdate() {
        setInterval(() => {
            this.updateInterrogationUI();
            this.updateCooldownDisplay();
        }, 1000);
    }

    updateCooldownDisplay() {
        const cooldownDisplay = document.getElementById('interrogationCooldown');

        // 检查是否有任何角色在冷却中
        let anyCooldown = false;
        for (const suspectKey of Object.keys(gameData.suspects)) {
            if (!gameState.canInterrogate(suspectKey)) {
                anyCooldown = true;
                const remainingTime = Math.ceil(gameState.getRemainingCooldown(suspectKey) / 1000);
                const minutes = Math.floor(remainingTime / 60);
                const seconds = remainingTime % 60;
                cooldownDisplay.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
                break;
            }
        }

        cooldownDisplay.style.display = anyCooldown ? 'block' : 'none';
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

// 游戏初始化
function initializeGame() {
    // 创建系统实例
    const musicController = new MusicController();
    const panelManager = new PanelManager();
    const investigationSystem = new InvestigationSystem();
    const interrogationSystem = new InterrogationSystem();
    const notesSystem = new NotesSystem();
    const verificationSystem = new VerificationSystem();

    // 开始游戏按钮
    document.getElementById('startBtn').addEventListener('click', () => {
        document.getElementById('startOverlay').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        gameState.startGame();
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
