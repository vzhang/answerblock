# 答题系统 - BlockAnswer

一个功能完整的 Web 端答题系统，支持随机答题、实时改错、自动计分等功能。

## 功能特性

✅ **随机答题** - 每次进入都是随机的题目顺序
✅ **进度保存** - 自动保存答题进度到浏览器
✅ **实时改错** - 提交后立即显示错题信息
✅ **自动计分** - 每题 0.7 分，满分 100 分
✅ **错题分析** - 详细的错题统计和分析
✅ **题目导航** - 快速跳转到任意题目
✅ **进度恢复** - 刷新页面后自动恢复进度

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
./scripts/dev.sh
```

然后访问 `http://localhost:3000`

### 3. 构建生产版本

```bash
./scripts/build.sh
npm start
```

## 项目结构

```
blockanswer/
├── app/                          # Next.js 应用目录
│   ├── components/               # React 组件
│   │   ├── QuestionCard.tsx      # 题目卡片组件
│   │   ├── QuizNav.tsx           # 题目导航组件
│   │   ├── ResultSummary.tsx     # 成绩汇总组件
│   │   └── ErrorList.tsx         # 错题列表组件
│   ├── lib/
│   │   ├── types.ts              # TypeScript 类型定义
│   │   └── utils.ts              # 工具函数
│   ├── page.tsx                  # 主页面
│   ├── layout.tsx                # 根布局
│   └── globals.css               # 全局样式
├── data/
│   └── questions.json            # 题目数据（JSON 格式）
├── scripts/                      # 脚本目录
│   ├── dev.sh                    # 开发启动脚本
│   ├── build.sh                  # 构建脚本
│   └── fetch-questions.js        # 题目采集脚本
├── docs/                         # 文档目录
└── package.json                  # 项目配置
```

## 题目数据格式

题目存储在 `data/questions.json`，格式如下：

```json
[
  {
    "id": 1,
    "question": "题目内容",
    "options": {
      "A": "选项 A",
      "B": "选项 B",
      "C": "选项 C",
      "D": "选项 D"
    },
    "correctAnswer": "C"
  }
]
```

### 如何导入题目数据

#### 方法 1：手动编辑 JSON

直接编辑 `data/questions.json` 文件，添加题目数组。

#### 方法 2：使用采集脚本

使用提供的 `scripts/fetch-questions.js` 脚本从网站自动采集题目：

```bash
# 编辑脚本中的配置参数（Cookie、courseId 等）
vi scripts/fetch-questions.js

# 测试采集前 3 题
node scripts/fetch-questions.js

# 如果成功，编辑脚本将 fetchAllQuestions(3) 改为 fetchAllQuestions(130)
# 然后重新运行以采集全部题目
```

## 使用指南

### 答题流程

1. **进入应用** - 打开应用后会自动加载题目（随机顺序）
2. **选择答案** - 点击选项进行选择
3. **浏览进度** - 左侧导航栏显示答题进度
   - 灰色：未作答
   - 绿色：正确答案
   - 红色：错误答案
   - 蓝色：当前题目
4. **提交答卷** - 点击"提交答卷"按钮完成测试
5. **查看成绩** - 立即显示分数和统计信息
6. **分析错题** - 点击"查看错题分析"查看详细错题信息
7. **重新答题** - 点击"重新答题"开始新一轮测试

### 本地存储

应用会自动保存以下数据到浏览器：

- **当前题目索引** - 记录你在哪一题
- **所有答案** - 记录每题的答案

刷新页面后会自动恢复进度。要重新开始，点击"重新答题"按钮。

## 计分规则

- **总分** - 100 分
- **每题分值** - 0.7 分
- **总题数** - 130+ 题（可配置）
- **计算公式** - 分数 = 正确题数 × 0.7，最高 100 分

## 开发

### 技术栈

- **框架** - Next.js 15.4.0
- **前端库** - React 19
- **样式** - Tailwind CSS v4
- **语言** - TypeScript
- **浏览器存储** - LocalStorage API

### 项目约束

- **单文件大小** - TypeScript/JavaScript 不超过 300 行
- **文件夹深度** - 每层不超过 8 个文件

### 修改题目数据

编辑 `data/questions.json`，添加或修改题目。应用会自动重新加载。

### 自定义样式

编辑 `app/globals.css` 和 Tailwind 配置 `tailwind.config.js`。

## 故障排除

### Q: 为什么我的答案没有保存？
A: 检查浏览器是否允许 localStorage。在隐私模式下可能会有限制。

### Q: 如何清除所有进度？
A: 在开发者工具中手动删除 localStorage 中的 `quiz_main-quiz` 项，或点击"重新答题"。

### Q: 如何添加更多题目？
A: 编辑 `data/questions.json`，按照格式添加新题目。

## 部署

### 部署到 Vercel

```bash
npm install -g vercel
vercel
```

### 部署到其他平台

1. 运行 `npm run build` 生成生产版本
2. 上传 `.next` 和 `public` 目录
3. 设置 Node.js 版本 18+
4. 运行 `npm start`

## 许可证

MIT
