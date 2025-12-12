// 记忆闪卡模块

function initializeFlashcards() {
    // 初始化闪卡筛选器
    const flashcardSubjectSelect = document.getElementById('flashcard-subject');
    
    if (flashcardSubjectSelect) {
        flashcardSubjectSelect.addEventListener('change', handleFlashcardSubjectChange);
    }
    
    // 初始化闪卡控制按钮
    initializeFlashcardControls();
}

// 初始化闪卡控制按钮
function initializeFlashcardControls() {
    const btnUnknown = document.getElementById('btn-unknown');
    const btnKnown = document.getElementById('btn-known');
    const btnFlip = document.getElementById('btn-flip');
    
    if (btnUnknown) {
        btnUnknown.addEventListener('click', () => handleCardResponse(false));
    }
    
    if (btnKnown) {
        btnKnown.addEventListener('click', () => handleCardResponse(true));
    }
    
    if (btnFlip) {
        btnFlip.addEventListener('click', flipCard);
    }
    
    // 点击闪卡本身也可以翻转
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.addEventListener('click', flipCard);
    }
    
    // 键盘快捷键
    document.addEventListener('keydown', handleFlashcardKeyboard);
}

// 处理闪卡科目选择变化
async function handleFlashcardSubjectChange() {
    const subjectSelect = document.getElementById('flashcard-subject');
    const selectedSubject = subjectSelect.value;
    
    if (!selectedSubject) {
        resetFlashcardSession();
        return;
    }
    
    try {
        const flashcardsData = await loadData('flashcards');
        const filteredFlashcards = flashcardsData.filter(card => 
            card.subject_key === selectedSubject
        );
        
        if (filteredFlashcards.length === 0) {
            showNoFlashcardsMessage();
            return;
        }
        
        startFlashcardSession(filteredFlashcards);
    } catch (error) {
        console.error('加载闪卡数据失败:', error);
        showError(document.querySelector('.flashcard-container'), '加载闪卡失败，请稍后重试');
    }
}

// 开始闪卡学习会话
function startFlashcardSession(flashcards) {
    currentFlashcards = [...flashcards]; // 复制数组
    currentFlashcardIndex = 0;
    isFlashcardFlipped = false;
    
    // 打乱闪卡顺序
    shuffleArray(currentFlashcards);
    
    // 显示第一张闪卡
    displayCurrentFlashcard();
    
    // 更新进度
    updateFlashcardProgress();
}

// 重置闪卡会话
function resetFlashcardSession() {
    currentFlashcards = [];
    currentFlashcardIndex = 0;
    isFlashcardFlipped = false;
    
    const cardTerm = document.getElementById('card-term');
    const cardDefinition = document.getElementById('card-definition');
    
    if (cardTerm) cardTerm.textContent = '选择科目开始学习';
    if (cardDefinition) cardDefinition.textContent = '选择上方科目开始学习记忆卡片';
    
    // 重置闪卡状态
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
    }
}

// 显示没有闪卡的消息
function showNoFlashcardsMessage() {
    const cardTerm = document.getElementById('card-term');
    const cardDefinition = document.getElementById('card-definition');
    
    if (cardTerm) cardTerm.textContent = '暂无闪卡';
    if (cardDefinition) cardDefinition.textContent = '该科目暂无记忆卡片，请选择其他科目';
    
    currentFlashcards = [];
    currentFlashcardIndex = 0;
}

// 显示当前闪卡
function displayCurrentFlashcard() {
    if (currentFlashcards.length === 0) return;
    
    const currentCard = currentFlashcards[currentFlashcardIndex];
    const cardTerm = document.getElementById('card-term');
    const cardDefinition = document.getElementById('card-definition');
    
    if (cardTerm) cardTerm.textContent = currentCard.term;
    if (cardDefinition) cardDefinition.textContent = currentCard.definition;
    
    // 确保闪卡显示正面
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
        isFlashcardFlipped = false;
    }
    
    // 添加显示动画
    const flashcardInner = document.querySelector('.flashcard-inner');
    if (flashcardInner) {
        flashcardInner.style.animation = 'none';
        setTimeout(() => {
            flashcardInner.style.animation = 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 10);
    }
}

// 翻转闪卡
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    if (!flashcard || currentFlashcards.length === 0) return;
    
    flashcard.classList.toggle('flipped');
    isFlashcardFlipped = !isFlashcardFlipped;
    
    // 添加翻转音效（可选）
    playFlipSound();
}

// 处理闪卡响应（认识/不认识）
function handleCardResponse(isKnown) {
    if (currentFlashcards.length === 0) return;
    
    // 记录学习进度（可以扩展为更复杂的算法）
    recordLearningProgress(currentFlashcards[currentFlashcardIndex], isKnown);
    
    // 显示反馈动画
    showResponseFeedback(isKnown);
    
    // 延迟后显示下一张卡片
    setTimeout(() => {
        showNextFlashcard();
    }, 800);
}

// 显示下一张闪卡
function showNextFlashcard() {
    if (currentFlashcards.length === 0) return;
    
    currentFlashcardIndex++;
    
    // 如果完成所有卡片，重新开始或显示完成消息
    if (currentFlashcardIndex >= currentFlashcards.length) {
        showSessionComplete();
        return;
    }
    
    displayCurrentFlashcard();
    updateFlashcardProgress();
}

// 显示学习会话完成
function showSessionComplete() {
    const cardTerm = document.getElementById('card-term');
    const cardDefinition = document.getElementById('card-definition');
    
    if (cardTerm) cardTerm.textContent = '🎉 恭喜完成！';
    if (cardDefinition) cardDefinition.textContent = `你已经完成了 ${currentFlashcards.length} 张记忆卡片的学习。建议休息一会儿再复习一遍。`;
    
    // 重置索引，可以重新开始
    currentFlashcardIndex = 0;
    
    // 显示重新开始选项
    setTimeout(() => {
        if (confirm('是否重新开始学习？')) {
            shuffleArray(currentFlashcards);
            displayCurrentFlashcard();
            updateFlashcardProgress();
        }
    }, 2000);
}

// 更新学习进度
function updateFlashcardProgress() {
    if (currentFlashcards.length === 0) return;
    
    const progress = ((currentFlashcardIndex + 1) / currentFlashcards.length) * 100;
    
    // 可以添加进度条显示
    const progressBar = document.querySelector('.flashcard-progress');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    // 更新进度文字
    const progressText = document.querySelector('.flashcard-progress-text');
    if (progressText) {
        progressText.textContent = `${currentFlashcardIndex + 1} / ${currentFlashcards.length}`;
    }
}

// 记录学习进度（可以扩展）
function recordLearningProgress(card, isKnown) {
    // 这里可以添加学习算法，比如根据艾宾浩斯遗忘曲线
    // 现在只是简单的记录
    if (!window.flashcardProgress) {
        window.flashcardProgress = {};
    }
    
    const cardId = `${card.subject_key}_${card.term}`;
    if (!window.flashcardProgress[cardId]) {
        window.flashcardProgress[cardId] = {
            attempts: 0,
            correct: 0,
            lastReviewed: new Date()
        };
    }
    
    window.flashcardProgress[cardId].attempts++;
    if (isKnown) {
        window.flashcardProgress[cardId].correct++;
    }
    window.flashcardProgress[cardId].lastReviewed = new Date();
}

// 显示响应反馈
function showResponseFeedback(isKnown) {
    const flashcard = document.getElementById('flashcard');
    if (!flashcard) return;
    
    // 添加反馈样式
    const feedbackClass = isKnown ? 'feedback-correct' : 'feedback-incorrect';
    flashcard.classList.add(feedbackClass);
    
    // 移除反馈样式
    setTimeout(() => {
        flashcard.classList.remove(feedbackClass);
    }, 800);
}

// 播放翻转音效（模拟）
function playFlipSound() {
    // 创建音频上下文播放简单的音效
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// 处理键盘快捷键
function handleFlashcardKeyboard(e) {
    if (currentSection !== 'flashcards' || currentFlashcards.length === 0) return;
    
    switch(e.key) {
        case ' ':
        case 'Enter':
            e.preventDefault();
            flipCard();
            break;
        case 'ArrowLeft':
        case '1':
            e.preventDefault();
            handleCardResponse(false);
            break;
        case 'ArrowRight':
        case '2':
            e.preventDefault();
            handleCardResponse(true);
            break;
        case 'r':
        case 'R':
            e.preventDefault();
            if (confirm('重新开始学习？')) {
                shuffleArray(currentFlashcards);
                currentFlashcardIndex = 0;
                displayCurrentFlashcard();
                updateFlashcardProgress();
            }
            break;
    }
}

// 工具函数：打乱数组
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 添加闪卡样式
const flashcardStyle = document.createElement('style');
flashcardStyle.textContent = `
    .flashcard-progress {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        margin-bottom: 1rem;
        overflow: hidden;
    }
    
    .flashcard-progress-bar {
        height: 100%;
        background: var(--morandi-green);
        border-radius: 2px;
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        width: 0%;
    }
    
    .flashcard-progress-text {
        text-align: center;
        color: var(--text-medium);
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }
    
    .feedback-correct {
        animation: correctFeedback 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .feedback-incorrect {
        animation: incorrectFeedback 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes correctFeedback {
        0% { transform: scale(1); }
        25% { transform: scale(1.05) rotate(2deg); }
        50% { transform: scale(1.02) rotate(-1deg); }
        75% { transform: scale(1.01) rotate(1deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
    
    @keyframes incorrectFeedback {
        0% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
        100% { transform: translateX(0); }
    }
    
    .flashcard-controls {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    .control-btn {
        min-width: 100px;
        padding: 0.75rem 1.5rem;
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 20px;
        color: var(--text-dark);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    
    .control-btn:hover {
        background: rgba(255, 255, 255, 0.9);
        transform: translateY(-2px);
        box-shadow: var(--shadow-light);
    }
    
    .control-btn:active {
        transform: translateY(0);
    }
    
    .flashcard-filters {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
    }
    
    .flashcard-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;
    }
    
    /* 添加进度条容器 */
    .flashcard-container::before {
        content: '';
        display: block;
        width: 100%;
        max-width: 400px;
    }
`;
document.head.appendChild(flashcardStyle);

// 添加进度条HTML
const flashcardContainer = document.querySelector('.flashcard-container');
if (flashcardContainer) {
    const progressHTML = `
        <div class="flashcard-progress">
            <div class="flashcard-progress-bar" style="width: 0%"></div>
        </div>
        <div class="flashcard-progress-text">0 / 0</div>
    `;
    flashcardContainer.insertAdjacentHTML('afterbegin', progressHTML);
}

// 导出函数
window.handleFlashcardSubjectChange = handleFlashcardSubjectChange;
window.flipCard = flipCard;
window.handleCardResponse = handleCardResponse;
