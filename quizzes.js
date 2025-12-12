// 刷题题库模块

function initializeQuizzes() {
    // 初始化题库筛选器
    const quizSubjectSelect = document.getElementById('quiz-subject');
    const quizChapterSelect = document.getElementById('quiz-chapter');
    
    if (quizSubjectSelect) {
        quizSubjectSelect.addEventListener('change', handleSubjectChange);
    }
    
    if (quizChapterSelect) {
        quizChapterSelect.addEventListener('change', handleChapterChange);
    }
}

// 初始化题库筛选器
function initializeQuizFilters() {
    const quizSubjectSelect = document.getElementById('quiz-subject');
    const quizChapterSelect = document.getElementById('quiz-chapter');
    
    // 重置筛选器
    if (quizChapterSelect) {
        quizChapterSelect.innerHTML = '<option value="">选择章节</option>';
        quizChapterSelect.disabled = true;
    }
    
    if (quizSubjectSelect) {
        quizSubjectSelect.value = '';
    }
    
    // 清空题库内容
    const quizContent = document.getElementById('quiz-content');
    if (quizContent) {
        quizContent.innerHTML = '<div class="quiz-placeholder">请选择科目和章节开始答题</div>';
    }
}

// 处理科目选择变化
async function handleSubjectChange() {
    const subjectSelect = document.getElementById('quiz-subject');
    const chapterSelect = document.getElementById('quiz-chapter');
    const selectedSubject = subjectSelect.value;
    
    if (!selectedSubject) {
        chapterSelect.innerHTML = '<option value="">选择章节</option>';
        chapterSelect.disabled = true;
        return;
    }
    
    try {
        const quizzesData = await loadData('quizzes');
        const subjectData = quizzesData[selectedSubject];
        
        if (subjectData && subjectData.chapters) {
            // 更新章节选项
            chapterSelect.innerHTML = '<option value="">选择章节</option>';
            
            Object.keys(subjectData.chapters).forEach(chapterKey => {
                const chapter = subjectData.chapters[chapterKey];
                const option = document.createElement('option');
                option.value = chapterKey;
                option.textContent = chapter.name;
                chapterSelect.appendChild(option);
            });
            
            chapterSelect.disabled = false;
        } else {
            chapterSelect.innerHTML = '<option value="">暂无章节</option>';
            chapterSelect.disabled = true;
        }
    } catch (error) {
        console.error('加载章节数据失败:', error);
        chapterSelect.innerHTML = '<option value="">加载失败</option>';
        chapterSelect.disabled = true;
    }
}

// 处理章节选择变化
async function handleChapterChange() {
    const subjectSelect = document.getElementById('quiz-subject');
    const chapterSelect = document.getElementById('quiz-chapter');
    const quizContent = document.getElementById('quiz-content');
    
    const selectedSubject = subjectSelect.value;
    const selectedChapter = chapterSelect.value;
    
    if (!selectedSubject || !selectedChapter) {
        quizContent.innerHTML = '<div class="quiz-placeholder">请选择科目和章节开始答题</div>';
        return;
    }
    
    try {
        showLoading(quizContent);
        const quizzesData = await loadData('quizzes');
        const questions = quizzesData[selectedSubject]?.chapters[selectedChapter]?.questions || [];
        
        currentQuizQuestions = questions;
        currentQuizAnswers = {};
        
        displayQuizQuestions(questions);
    } catch (error) {
        showError(quizContent, '加载题目失败，请稍后重试');
        console.error('加载题目失败:', error);
    }
}

// 显示题目
function displayQuizQuestions(questions) {
    const quizContent = document.getElementById('quiz-content');
    
    if (questions.length === 0) {
        quizContent.innerHTML = '<div class="quiz-placeholder">该章节暂无题目</div>';
        return;
    }
    
    const quizHTML = questions.map((question, index) => `
        <div class="question-card" data-question-id="${question.id}">
            <div class="question-header">
                <span class="question-number">第 ${index + 1} 题</span>
                <span class="question-status" id="status-${question.id}"></span>
            </div>
            <div class="question-title">${question.question}</div>
            <div class="options-grid">
                ${question.options.map((option, optionIndex) => `
                    <div class="option-item" 
                         data-option-index="${optionIndex}"
                         onclick="selectOption(${question.id}, ${optionIndex})">
                        <span class="option-label">${String.fromCharCode(65 + optionIndex)}.</span>
                        <span class="option-text">${option}</span>
                    </div>
                `).join('')}
            </div>
            <div class="explanation" id="explanation-${question.id}" style="display: none;">
                <div class="explanation-content">
                    <strong>解析：</strong>${question.explanation}
                </div>
            </div>
        </div>
    `).join('');
    
    quizContent.innerHTML = quizHTML + `
        <div class="quiz-actions">
            <button class="glass-button" onclick="submitQuiz()">提交答案</button>
            <button class="glass-button" onclick="resetQuiz()">重新答题</button>
        </div>
    `;
    
    // 添加动画效果
    const questionCards = quizContent.querySelectorAll('.question-card');
    questionCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both';
    });
}

// 选择选项
function selectOption(questionId, optionIndex) {
    const questionCard = document.querySelector(`[data-question-id="${questionId}"]`);
    const optionItems = questionCard.querySelectorAll('.option-item');
    const statusElement = document.getElementById(`status-${questionId}`);
    
    // 移除之前的选中状态
    optionItems.forEach(item => item.classList.remove('selected'));
    
    // 添加新的选中状态
    optionItems[optionIndex].classList.add('selected');
    
    // 记录答案
    currentQuizAnswers[questionId] = optionIndex;
    
    // 更新状态
    statusElement.textContent = '已作答';
    statusElement.classList.add('answered');
    
    // 添加选择动画
    optionItems[optionIndex].style.animation = 'selectOption 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // 自动显示解析（可选）
    setTimeout(() => {
        showExplanation(questionId, optionIndex);
    }, 500);
}

// 显示解析
function showExplanation(questionId, selectedOption) {
    const question = currentQuizQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    const explanationElement = document.getElementById(`explanation-${questionId}`);
    const optionItems = document.querySelectorAll(`[data-question-id="${questionId}"] .option-item`);
    
    // 显示正确和错误选项
    optionItems.forEach((item, index) => {
        if (index === question.answer_index) {
            item.classList.add('correct');
        } else if (index === selectedOption && index !== question.answer_index) {
            item.classList.add('incorrect');
        }
    });
    
    // 显示解析
    explanationElement.style.display = 'block';
    explanationElement.style.animation = 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
}

// 提交答案
function submitQuiz() {
    if (Object.keys(currentQuizAnswers).length === 0) {
        alert('请先作答！');
        return;
    }
    
    let correctCount = 0;
    let totalCount = currentQuizQuestions.length;
    
    // 检查答案并显示解析
    currentQuizQuestions.forEach(question => {
        const selectedAnswer = currentQuizAnswers[question.id];
        if (selectedAnswer !== undefined) {
            showExplanation(question.id, selectedAnswer);
            if (selectedAnswer === question.answer_index) {
                correctCount++;
            }
        }
    });
    
    // 显示结果
    setTimeout(() => {
        const score = Math.round((correctCount / totalCount) * 100);
        let message = `答题完成！\n\n`;
        message += `总题数：${totalCount}\n`;
        message += `正确数：${correctCount}\n`;
        message += `得分：${score}分\n\n`;
        
        if (score >= 90) {
            message += "🎉 优秀！你对这部分内容掌握得很好！";
        } else if (score >= 70) {
            message += "👍 不错！继续努力，还有提升空间。";
        } else if (score >= 60) {
            message += "📚 及格！建议重新复习这部分内容。";
        } else {
            message += "💪 需要加强！建议认真学习相关知识点。";
        }
        
        alert(message);
    }, 1000);
}

// 重置答题
function resetQuiz() {
    currentQuizAnswers = {};
    
    // 清除所有选中状态和解析
    const optionItems = document.querySelectorAll('.option-item');
    const explanations = document.querySelectorAll('.explanation');
    const statusElements = document.querySelectorAll('.question-status');
    
    optionItems.forEach(item => {
        item.classList.remove('selected', 'correct', 'incorrect');
    });
    
    explanations.forEach(explanation => {
        explanation.style.display = 'none';
    });
    
    statusElements.forEach(status => {
        status.textContent = '';
        status.classList.remove('answered');
    });
}

// 添加选择动画样式
const quizStyle = document.createElement('style');
quizStyle.textContent = `
    @keyframes selectOption {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .question-status.answered {
        color: var(--morandi-green);
        font-weight: 500;
    }
    
    .quiz-placeholder {
        text-align: center;
        color: var(--text-medium);
        font-size: 1.1rem;
        padding: 3rem;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    
    .quiz-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    .question-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .question-number {
        font-weight: 600;
        color: var(--text-dark);
    }
    
    .explanation {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 12px;
        border-left: 4px solid var(--morandi-blue);
    }
    
    .explanation-content {
        color: var(--text-dark);
        line-height: 1.6;
    }
    
    .option-label {
        font-weight: 600;
        margin-right: 0.5rem;
        color: var(--text-medium);
    }
    
    .option-text {
        color: var(--text-dark);
        flex: 1;
    }
    
    .option-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(quizStyle);

// 导出函数
window.handleSubjectChange = handleSubjectChange;
window.handleChapterChange = handleChapterChange;
window.selectOption = selectOption;
window.submitQuiz = submitQuiz;
window.resetQuiz = resetQuiz;
