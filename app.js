// 主要应用逻辑

// 全局变量
let currentSection = 'home';
let currentQuizQuestions = [];
let currentQuizAnswers = {};
let currentFlashcards = [];
let currentFlashcardIndex = 0;
let isFlashcardFlipped = false;
let currentSelectionType = null;

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    if (document.querySelector('.navbar')) {
        initializeNavigation();
    }
    
    // 初始化模态框
    initializeModals();
    
    // 初始化各个模块
    initializeNotes();
    initializeQuizzes();
    initializeFlashcards();
    initializeArticles();
    initializeAnnouncementUI();
    
    // 显示首页
    showSection('home');
    
    // 添加滚动效果
    addScrollEffects();

    const subjectButtons = document.querySelectorAll('.subject-btn');
    subjectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject');
            const modal = document.getElementById('subject-modal');
            if (modal) {
                closeModal(modal);
            }
            navigateToSubjectPage(subject);
        });
    });
}

// 导航功能
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            
            // 移动端关闭菜单
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // 移动端菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(245, 241, 235, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(245, 241, 235, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// 显示指定部分
function showSection(sectionId) {
    // 隐藏所有部分
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标部分
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // 更新导航激活状态
        updateNavigationActive(sectionId);
        
        // 滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // 触发部分特定的初始化
        if (sectionId === 'notes') {
            loadNotes();
        } else if (sectionId === 'quizzes') {
            initializeQuizFilters();
        } else if (sectionId === 'flashcards') {
            initializeFlashcardFilters();
        } else if (sectionId === 'articles') {
            loadArticles();
        }
    }
}

// 更新导航激活状态
function updateNavigationActive(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// 初始化模态框
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    
    // 关闭按钮事件
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // 点击模态框外部关闭
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
}

// 打开模态框
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 关闭模态框
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openSubjectModal(type) {
    currentSelectionType = type;
    openModal('subject-modal');
}

function navigateToSubjectPage(subjectKey) {
    const type = currentSelectionType || 'notes';
    const name = subjectKey.trim();
    const safeSubject = encodeURIComponent(name);
    let url = '';
    if (type === 'notes') {
        url = `${safeSubject}.html`;
    } else if (type === 'quizzes') {
        const quizOverrides = {
            '心理健康教育概论': '心理健康教育题库.html'
        };
        url = quizOverrides[name] || `${name}题库.html`;
    } else if (type === 'flashcards') {
        url = `${name}闪卡.html`;
    } else if (type === 'mock') {
        url = `${name}模拟题.html`;
    } else {
        url = `pages/${type}/${safeSubject}.html`;
    }
    window.location.href = url;
}

// 添加滚动效果
function addScrollEffects() {
    // 为所有卡片添加滚动进入动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有卡片元素
    const cards = document.querySelectorAll('.feature-card, .note-card, .article-card, .about-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 显示加载状态
function showLoading(container) {
    container.innerHTML = '<div class="loading"></div>';
}

// 显示错误信息
function showError(container, message) {
    container.innerHTML = `<div class="error-message">${message}</div>`;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// 获取科目颜色
function getSubjectColor(subject) {
    const colors = {
        general_psych: 'var(--morandi-blue)',
        developmental: 'var(--morandi-green)',
        statistics: 'var(--morandi-purple)',
        experimental: 'var(--morandi-yellow)'
    };
    return colors[subject] || 'var(--morandi-pink)';
}

// 导出函数供其他模块使用
window.showSection = showSection;
window.openModal = openModal;
window.closeModal = closeModal;
window.formatDate = formatDate;
window.getSubjectColor = getSubjectColor;
window.openSubjectModal = openSubjectModal;
function initializeAnnouncementUI() {
    const btn = document.getElementById('announcement-btn');
    if (!btn) return;
    btn.addEventListener('click', function() {
        openModal('announcement-modal');
    });
}
