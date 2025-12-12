// 数据文件 - 模拟从JSON文件加载的数据

// 课程讲义数据
const notesData = [
    {
        subject: "普通心理学",
        subject_key: "general_psych",
        title: "第一章：心理学概述",
        file_path: "general_psych_chap1.pdf",
        date: "2023-10-01",
        description: "介绍心理学的基本概念、研究方法和主要分支"
    },
    {
        subject: "普通心理学", 
        subject_key: "general_psych",
        title: "第二章：感觉与知觉",
        file_path: "assets/docs/general_psych/chap2.pdf",
        date: "2023-10-08",
        description: "探讨感觉和知觉的基本原理和机制"
    },
    {
        subject: "发展心理学",
        subject_key: "developmental", 
        title: "第一章：发展心理学导论",
        file_path: "assets/docs/developmental/chap1.pdf",
        date: "2023-10-15",
        description: "发展心理学的基本理论和研究方法"
    },
    {
        subject: "发展心理学",
        subject_key: "developmental",
        title: "第二章：皮亚杰认知发展理论",
        file_path: "developmental_chap2.pdf", 
        date: "2023-10-22",
        description: "详细解析皮亚杰的认知发展阶段理论"
    },
    {
        subject: "心理统计学",
        subject_key: "statistics",
        title: "第一章：统计学基础",
        file_path: "assets/docs/statistics/chap1.pdf",
        date: "2023-11-01",
        description: "统计学基本概念和描述性统计"
    },
    {
        subject: "实验心理学",
        subject_key: "experimental",
        title: "第一章：实验设计基础",
        file_path: "assets/docs/experimental/chap1.pdf",
        date: "2023-11-08",
        description: "实验心理学的基本原理和实验设计方法"
    }
];

// 题库数据
const quizzesData = {
    general_psych: {
        name: "普通心理学",
        chapters: {
            "chap1": {
                name: "第一章：心理学概述",
                questions: [
                    {
                        id: 1,
                        question: "心理学的研究对象是？",
                        options: ["心理现象", "行为表现", "生理机制", "社会现象"],
                        answer_index: 0,
                        explanation: "心理学是研究心理现象的科学，包括认知、情绪、动机等心理过程。"
                    },
                    {
                        id: 2,
                        question: "科学心理学的创始人是？",
                        options: ["弗洛伊德", "冯特", "华生", "詹姆斯"],
                        answer_index: 1,
                        explanation: "威廉·冯特（Wilhelm Wundt）于1879年在德国莱比锡大学建立了世界上第一个心理学实验室，标志着科学心理学的诞生。"
                    }
                ]
            },
            "chap2": {
                name: "第二章：感觉与知觉",
                questions: [
                    {
                        id: 3,
                        question: "感觉阈限是指？",
                        options: ["感觉器官的最大感受能力", "感觉器官的最小感受能力", "引起感觉的最小刺激量", "感觉的持续时間"],
                        answer_index: 2,
                        explanation: "感觉阈限是指能够引起感觉的最小刺激量，低于这个量的刺激我们无法感知到。"
                    }
                ]
            }
        }
    },
    developmental: {
        name: "发展心理学",
        chapters: {
            "chap2": {
                name: "第二章：皮亚杰认知发展理论",
                questions: [
                    {
                        id: 4,
                        question: "皮亚杰认为前运算阶段的年龄范围是？",
                        options: ["0-2岁", "2-7岁", "7-11岁", "11岁以上"],
                        answer_index: 1,
                        explanation: "前运算阶段大约在2-7岁，这个阶段的儿童开始发展符号思维，但还不能进行逻辑思维。"
                    },
                    {
                        id: 5,
                        question: "客体永久性概念出现在哪个阶段？",
                        options: ["感知运动阶段", "前运算阶段", "具体运算阶段", "形式运算阶段"],
                        answer_index: 0,
                        explanation: "客体永久性是在感知运动阶段（0-2岁）末期形成的，指儿童理解物体即使不在视野中也仍然存在。"
                    }
                ]
            }
        }
    },
    statistics: {
        name: "心理统计学",
        chapters: {
            "chap1": {
                name: "第一章：统计学基础",
                questions: [
                    {
                        id: 6,
                        question: "下列哪个是描述集中趋势的统计量？",
                        options: ["方差", "标准差", "平均数", "全距"],
                        answer_index: 2,
                        explanation: "平均数是最常用的集中趋势统计量，表示数据的中心位置。"
                    }
                ]
            }
        }
    }
};

// 闪卡数据
const flashcardsData = [
    {
        term: "客体永久性",
        definition: "儿童理解即使物体从视野中消失，它依然存在的认知能力。这是感知运动阶段的重要成就。",
        subject: "发展心理学",
        subject_key: "developmental"
    },
    {
        term: "感觉阈限",
        definition: "能够引起感觉的最小刺激量。分为绝对阈限和差别阈限两种。",
        subject: "普通心理学",
        subject_key: "general_psych"
    },
    {
        term: "认知失调",
        definition: "个体同时持有两个或多个相互矛盾的认知、态度或信念时所产生的不舒适心理状态。",
        subject: "普通心理学",
        subject_key: "general_psych"
    },
    {
        term: "形式运算阶段",
        definition: "皮亚杰认知发展理论的第四阶段（11岁以上），儿童开始能够进行抽象思维和假设推理。",
        subject: "发展心理学",
        subject_key: "developmental"
    },
    {
        term: "标准差",
        definition: "衡量数据离散程度的统计量，表示数据点与平均数的平均距离。",
        subject: "心理统计学",
        subject_key: "statistics"
    },
    {
        term: "实验组",
        definition: "在实验研究中接受实验处理的被试组，用于观察实验处理的效果。",
        subject: "实验心理学",
        subject_key: "experimental"
    }
];

// 文章数据
const articlesData = [
    {
        id: 1,
        title: "心理学考研复习策略：如何高效备考",
        excerpt: "分享心理学考研的复习方法和时间管理技巧，帮助同学们制定科学的复习计划。",
        content: `# 心理学考研复习策略：如何高效备考

心理学考研是一个系统性的工程，需要科学的复习方法和合理的时间安排。

## 复习阶段规划

### 基础阶段（3-6月）
- 通读教材，建立知识框架
- 理解基本概念和理论
- 做基础练习题

### 强化阶段（7-9月）
- 深入学习重点难点
- 整理笔记和思维导图
- 大量刷题巩固知识

### 冲刺阶段（10-12月）
- 模拟考试训练
- 查漏补缺
- 背诵重要知识点

## 各科目复习要点

### 普通心理学
普通心理学是心理学的基础，要重点掌握：
- 感觉与知觉的基本原理
- 学习与记忆的理论
- 动机与情绪的关系
- 智力和人格的测量

### 发展心理学
发展心理学要理解：
- 各学派的理论观点
- 认知发展的阶段性特征
- 社会性发展的影响因素

### 统计与实验
这部分需要：
- 掌握基本统计方法
- 理解实验设计原理
- 能够分析实验结果

## 时间管理技巧

1. **制定详细计划**：将大目标分解成小任务
2. **番茄工作法**：25分钟专注学习，5分钟休息
3. **定期复习**：遵循艾宾浩斯遗忘曲线
4. **模拟考试**：提前适应考试节奏

记住，考研不仅是知识的比拼，更是意志力的考验。保持积极的心态，相信自己的努力一定会有回报！`,
        date: "2023-11-15",
        read_time: "5分钟"
    },
    {
        id: 2,
        title: "认知心理学：信息加工的理论与应用",
        excerpt: "探讨认知心理学的基本理论，包括注意、记忆、思维等信息加工过程。",
        content: `# 认知心理学：信息加工的理论与应用

认知心理学是研究人类如何获取、加工、储存和使用信息的科学。

## 信息加工模型

认知心理学将人脑比作计算机，信息加工过程包括：

### 输入阶段
- 感觉登记：短暂保持感觉信息
- 注意选择：筛选重要信息

### 加工阶段
- 模式识别：识别刺激模式
- 短时记忆：临时储存信息
- 长时记忆：永久储存知识

### 输出阶段
- 反应选择：选择合适的反应
- 反应执行：执行具体行为

## 记忆系统

### 感觉记忆
- 保持时间：几百毫秒
- 容量：很大
- 编码：感觉通道特异性

### 短时记忆
- 保持时间：15-30秒
- 容量：7±2个项目
- 编码：主要是听觉编码

### 长时记忆
- 保持时间：几分钟到终身
- 容量：几乎无限
- 编码：主要是语义编码

## 认知偏差

人类信息加工存在一些系统性偏差：

### 确认偏差
倾向于寻找支持自己观点的信息，忽略相反的证据。

### 可得性启发
根据信息提取的容易程度来判断概率。

### 代表性启发
根据原型匹配来做出判断，忽略基础概率。

理解这些认知过程有助于我们更好地学习和记忆知识。`,
        date: "2023-11-10",
        read_time: "8分钟"
    },
    {
        id: 3,
        title: "发展心理学：毕生发展的视角",
        excerpt: "从毕生发展的角度理解人的心理变化，包括认知、情绪、社会性的发展规律。",
        content: `# 发展心理学：毕生发展的视角

发展心理学研究个体从出生到死亡整个生命过程中的心理变化规律。

## 发展的基本理论

### 皮亚杰的认知发展理论
皮亚杰提出认知发展经历四个阶段：

1. **感知运动阶段（0-2岁）**
   - 通过感觉和动作探索世界
   - 发展客体永久性概念
   - 出现目标指向行为

2. **前运算阶段（2-7岁）**
   - 符号思维开始发展
   - 语言和想象能力出现
   - 思维具有自我中心性

3. **具体运算阶段（7-11岁）**
   - 获得守恒概念
   - 能够进行逻辑思维
   - 理解分类和序列关系

4. **形式运算阶段（11岁以上）**
   - 抽象思维能力发展
   - 假设演绎推理
   - 系统性解决问题

### 埃里克森的心理社会发展理论
埃里克森认为人的一生经历八个发展阶段，每个阶段都有特定的发展任务：

1. **婴儿期（0-1岁）**：基本信任vs不信任
2. **幼儿期（1-3岁）**：自主性vs羞怯怀疑
3. **学前期（3-6岁）**：主动性vs内疚感
4. **学龄期（6-12岁）**：勤奋感vs自卑感
5. **青年期（12-18岁）**：同一性vs角色混乱
6. **成年早期（18-25岁）**：亲密感vs孤独感
7. **成年中期（25-50岁）**：繁殖感vs停滞感
8. **成年晚期（50岁以上）**：完善感vs失望感

## 发展的影响因素

### 遗传因素
- 基因决定的发展潜能
- 遗传疾病的限制
- 气质类型的影响

### 环境因素
- 家庭环境的影响
- 学校教育的促进
- 社会文化的塑造

### 个人因素
- 个体的主观能动性
- 生活经验的影响
- 社会交往的作用

发展心理学告诉我们，人的发展是一个持续终身的过程，受到多种因素的交互影响。理解发展规律有助于我们更好地促进自身和他人的心理发展。`,
        date: "2023-11-05",
        read_time: "10分钟"
    }
];

// 模拟从JSON文件加载数据的函数
function loadData(dataType) {
    return new Promise((resolve) => {
        setTimeout(() => {
            switch(dataType) {
                case 'notes':
                    resolve(notesData);
                    break;
                case 'quizzes':
                    resolve(quizzesData);
                    break;
                case 'flashcards':
                    resolve(flashcardsData);
                    break;
                case 'articles':
                    resolve(articlesData);
                    break;
                default:
                    resolve([]);
            }
        }, 300); // 模拟网络延迟
    });
}
