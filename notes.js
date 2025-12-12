// 课程讲义模块

function initializeNotes() {
    // 初始化筛选标签事件
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 更新激活状态
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选讲义
            const subject = this.getAttribute('data-subject');
            filterNotes(subject);
        });
    });
}

// 加载讲义数据
async function loadNotes() {
    const notesGrid = document.getElementById('notes-grid');
    
    try {
        showLoading(notesGrid);
        const notes = await loadData('notes');
        displayNotes(notes);
    } catch (error) {
        showError(notesGrid, '加载讲义失败，请稍后重试');
        console.error('加载讲义失败:', error);
    }
}

// 显示讲义列表
function displayNotes(notes) {
    const notesGrid = document.getElementById('notes-grid');
    
    if (notes.length === 0) {
        notesGrid.innerHTML = '<div class="empty-state">暂无讲义内容</div>';
        return;
    }
    
    notesGrid.innerHTML = notes.map(note => `
        <div class="note-card glass-card" data-subject="${note.subject_key}">
            <div class="subject-tag" style="background-color: ${getSubjectColor(note.subject_key)}">
                ${note.subject}
            </div>
            <h3>${note.title}</h3>
            <p class="date">${formatDate(note.date)}</p>
            <p class="description">${note.description}</p>
            <div class="note-actions">
                <button class="glass-button" onclick="previewPDF('${note.file_path}', '${note.title}')">
                    📖 预览
                </button>
                <a href="${note.file_path}" download class="glass-button">
                    📥 下载
                </a>
            </div>
        </div>
    `).join('');
    
    // 添加动画效果
    const noteCards = notesGrid.querySelectorAll('.note-card');
    noteCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both';
    });
}

// 筛选讲义
function filterNotes(subject) {
    const notesGrid = document.getElementById('notes-grid');
    const noteCards = notesGrid.querySelectorAll('.note-card');
    
    noteCards.forEach(card => {
        const cardSubject = card.getAttribute('data-subject');
        if (subject === 'all' || cardSubject === subject) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) both';
        } else {
            card.style.display = 'none';
        }
    });
}

// 预览PDF文件
function previewPDF(filePath, title) {
    const modal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfDownload = document.getElementById('pdf-download');
    
    // 设置PDF源和下载链接
    pdfViewer.src = filePath;
    pdfDownload.href = filePath;
    pdfDownload.download = `${title}.pdf`;
    
    // 打开模态框
    openModal('pdf-modal');
}

// 检查PDF文件是否存在（模拟）
function checkPDFFile(filePath) {
    // 在实际应用中，这里应该发送请求检查文件是否存在
    // 现在模拟总是存在
    return Promise.resolve(true);
}

// 处理PDF加载错误
function handlePDFError() {
    const pdfViewer = document.getElementById('pdf-viewer');
    pdfViewer.innerHTML = `
        <div class="pdf-error">
            <p>PDF文件加载失败</p>
            <button class="glass-button" onclick="window.open('${pdfViewer.src}', '_blank')">
                在新窗口打开
            </button>
        </div>
    `;
}

// 初始化PDF查看器事件
function initializePDFViewer() {
    const pdfViewer = document.getElementById('pdf-viewer');
    pdfViewer.addEventListener('error', handlePDFError);
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    if (currentSection === 'notes') {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            // 在笔记间导航（如果有多个笔记）
            const activeNote = document.querySelector('.note-card:hover');
            if (activeNote) {
                const notes = Array.from(document.querySelectorAll('.note-card'));
                const currentIndex = notes.indexOf(activeNote);
                let nextIndex;
                
                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : notes.length - 1;
                } else {
                    nextIndex = currentIndex < notes.length - 1 ? currentIndex + 1 : 0;
                }
                
                notes[nextIndex].focus();
                notes[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
});

// 导出函数
window.previewPDF = previewPDF;
window.filterNotes = filterNotes;
