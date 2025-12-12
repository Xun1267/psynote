// 导航模块 - 处理页面导航和路由

// 初始化导航功能
function initializeNavigation() {
    // 处理浏览器前进后退
    window.addEventListener('popstate', handlePopState);
    
    // 初始化导航链接
    initializeNavLinks();
    
    // 初始化移动端菜单
    initializeMobileMenu();
    
    // 处理初始页面状态
    handleInitialPageState();
}

// 处理浏览器历史记录变化
function handlePopState(event) {
    const section = event.state?.section || 'home';
    showSection(section);
}

// 初始化导航链接
function initializeNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('href').substring(1);
            
            // 更新URL但不重新加载页面
            if (window.history.pushState) {
                window.history.pushState(
                    { section: targetSection }, 
                    '', 
                    `#${targetSection}`
                );
            }
            
            // 显示目标部分
            showSection(targetSection);
            
            // 移动端关闭菜单
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}

// 初始化移动端菜单
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // 点击菜单外部关闭菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// 切换移动端菜单
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // 添加动画效果
    if (navMenu.classList.contains('active')) {
        navMenu.style.animation = 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

// 关闭移动端菜单
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// 处理初始页面状态
function handleInitialPageState() {
    // 获取URL中的hash
    const hash = window.location.hash.substring(1);
    const initialSection = hash || 'home';
    
    // 显示对应的部分
    showSection(initialSection);
    
    // 更新导航状态
    updateNavigationActive(initialSection);
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

// 平滑滚动到指定元素
function smoothScrollTo(element, duration = 800) {
    const targetPosition = element.offsetTop - 80; // 减去导航栏高度
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // 使用缓动函数
        const easeInOutCubic = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// 添加滚动效果
function addScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏滚动效果
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(245, 241, 235, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'rgba(245, 241, 235, 0.85)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        // 隐藏/显示导航栏（可选）
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // 向下滚动，隐藏导航栏
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 16));
}

// 工具函数：节流
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

// 添加导航动画样式
const navStyle = document.createElement('style');
navStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .navbar {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-link {
        position: relative;
        overflow: hidden;
    }
    
    .nav-link::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: var(--morandi-blue);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateX(-50%);
    }
    
    .nav-link:hover::before,
    .nav-link.active::before {
        width: 80%;
    }
    
    .hamburger {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hamburger span {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(navStyle);

// 初始化导航功能
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}

// 导出函数供其他模块使用
window.initializeNavigation = initializeNavigation;
window.smoothScrollTo = smoothScrollTo;
window.updateNavigationActive = updateNavigationActive;
