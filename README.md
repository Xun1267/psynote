# PsyNote - 心理学学习笔记

一个为心理学本科生设计的静态学习网站，采用iOS毛玻璃拟态设计风格，提供课程讲义、刷题题库、记忆闪卡和扩展阅读等功能。

## 🎯 项目特色

- **iOS毛玻璃拟态设计**：温暖治愈的配色方案，丝滑的动画效果
- **响应式设计**：完美适配移动端和桌面端
- **无需后端**：纯静态网站，所有数据通过JSON文件维护
- **丰富的交互功能**：PDF预览、互动答题、3D翻转闪卡等

## 🏗️ 项目结构

```
psy-note/
├── index.html              # 主页面
├── css/
│   ├── styles.css          # 主要样式
│   └── glassmorphism.css   # 毛玻璃效果样式
├── js/
│   ├── app.js              # 主应用逻辑
│   ├── data.js             # 数据加载函数
│   ├── notes.js            # 课程讲义模块
│   ├── quizzes.js          # 刷题题库模块
│   ├── flashcards.js       # 记忆闪卡模块
│   └── articles.js         # 扩展阅读模块
├── data/
│   ├── notes.json          # 讲义数据
│   ├── quizzes.json        # 题库数据
│   ├── flashcards.json     # 闪卡数据
│   └── articles.json       # 文章数据
└── assets/
    └── docs/               # PDF文件存放位置
        ├── general_psych/
        ├── developmental/
        ├── statistics/
        └── experimental/
```

## 🚀 快速开始

1. **克隆或下载项目**
```bash
git clone [your-repo-url]
cd psy-note
```

2. **本地预览**
由于使用了本地文件访问，建议使用本地服务器预览：

```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx serve .

# 或使用VS Code的Live Server插件
```

3. **访问网站**
打开浏览器访问 `http://localhost:8000`

## 📋 功能说明

### 课程讲义
- 按科目分类显示讲义列表
- 支持PDF在线预览
- 提供下载功能
- 筛选功能快速查找

### 刷题题库
- 按科目和章节选择题目
- 交互式答题界面
- 即时反馈和解析
- 答题结果统计

### 记忆闪卡
- 3D翻转动画效果
- 按科目筛选闪卡
- 学习进度跟踪
- 键盘快捷键支持

### 扩展阅读
- 文章列表展示
- 文章详情模态框
- 阅读进度跟踪
- 分享和打印功能

## 🎨 设计特色

### 视觉设计
- **主色调**：米黄色系（#f5f1eb, #e8ddd4）营造温暖氛围
- **辅助色**：莫兰迪色系，低饱和度，温和不刺眼
- **毛玻璃效果**：使用backdrop-filter实现iOS风格
- **圆角设计**：大圆角营造亲切感

### 动画效果
- **页面切换**：淡入淡出+位移动画
- **卡片交互**：悬停上浮、点击缩放
- **闪卡翻转**：3D翻转动画
- **答题反馈**：弹性动画效果

### 响应式设计
- **移动端优先**：针对手机用户优化
- **弹性布局**：自适应不同屏幕尺寸
- **触摸优化**：适合触摸操作的按钮大小

## 📝 内容维护

所有内容都通过JSON文件维护，无需修改代码：

### 更新讲义
编辑 `notes.json`，添加新的讲义条目：
```json
{
  "subject": "科目名称",
  "subject_key": "科目键名",
  "title": "讲义标题",
  "file_path": "assets/docs/科目文件夹/文件名.pdf",
  "date": "2023-11-20",
  "description": "简要描述"
}
```

### 更新题库
编辑 `quizzes.json`，按科目和章节添加题目：
```json
{
  "subject": "科目名称",
  "questions": [
    {
      "id": 1,
      "question": "题目内容",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "answer_index": 0,
      "explanation": "答案解析"
    }
  ]
}
```

### 更新闪卡
编辑 `flashcards.json`：
```json
{
  "term": "术语名称",
  "definition": "术语定义",
  "subject": "所属科目",
  "subject_key": "科目键名"
}
```

### 更新文章
编辑 `articles.json`：
```json
{
  "id": 1,
  "title": "文章标题",
  "excerpt": "文章摘要",
  "content": "文章内容（支持Markdown样式）",
  "date": "2023-11-20",
  "read_time": "5分钟"
}
```

## 🚀 部署到GitHub Pages

1. **创建GitHub仓库**
在GitHub上创建一个新的仓库

2. **推送代码**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/psy-note.git
git push -u origin main
```

3. **启用GitHub Pages**
- 进入仓库设置
- 找到Pages选项
- 选择main分支作为源
- 保存设置

4. **访问网站**
网站地址：`https://your-username.github.io/psy-note`

## 🌐 Vercel部署

1. **连接GitHub**
访问 [vercel.com](https://vercel.com) 并连接你的GitHub账户

2. **导入项目**
- 点击"New Project"
- 选择你的PsyNote仓库
- 保持默认设置，点击Deploy

3. **自定义域名（可选）**
在Vercel控制台中可以设置自定义域名

## 🔧 自定义配置

### 修改配色方案
编辑 `styles.css` 中的CSS变量：
```css
:root {
  --primary-beige: #f5f1eb;
  --secondary-beige: #e8ddd4;
  /* 修改这些值来改变配色 */
}
```

### 修改动画效果
编辑 `styles.css` 中的动画定义：
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 添加新科目
1. 在JSON数据中添加新的subject_key
2. 在 `getSubjectColor()` 函数中添加对应颜色
3. 在筛选器中增加新选项

## 📱 浏览器兼容性

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：
- 邮箱：[your-email@example.com]
- 微信：[your-wechat]

---

**PsyNote** - 让心理学学习更简单、更有趣！📚✨
