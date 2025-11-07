# 快速参考卡片

## 🚀 5 分钟快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
./scripts/dev.sh

# 3. 打开浏览器
# http://localhost:3000
```

## 📝 数据格式

`data/questions.json`

```json
[
  {
    "id": 1,
    "question": "题目文本",
    "options": {
      "A": "选项A",
      "B": "选项B",
      "C": "选项C",
      "D": "选项D"
    },
    "correctAnswer": "C"
  }
]
```

## 🎯 核心命令

| 命令 | 用途 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm start` | 启动生产服务器 |
| `npm run lint` | 代码检查 |

## 📂 重要文件

| 文件 | 用途 |
|------|------|
| `app/page.tsx` | 主应用逻辑（280 行） |
| `data/questions.json` | 题目数据 |
| `scripts/fetch-questions.js` | 自动采集脚本 |
| `docs/快速开始.md` | 入门指南 |
| `docs/部署指南.md` | 部署教程 |

## 🌐 部署（3 选 1）

### 方案 A：Vercel（推荐）

```bash
npm install -g vercel
vercel
```

### 方案 B：Netlify

```bash
npm install -g netlify-cli
netlify init
```

### 方案 C：自托管

```bash
npm run build
npm start
```

## 💾 数据采集

```bash
# 编辑脚本
vi scripts/fetch-questions.js
# 设置 Cookie 和 URL 参数

# 测试采集
node scripts/fetch-questions.js
```

## 🐛 常见问题

| 问题 | 解决 |
|------|------|
| 题目加载不出来 | 检查 `data/questions.json` |
| 答案保存不了 | 允许浏览器 localStorage |
| 样式不显示 | 清除缓存，重新构建 |
| 采集失败 | 检查 Cookie 是否过期 |

## 📚 完整文档

- 入门：`docs/快速开始.md`
- 数据：`docs/数据采集指南.md`
- 部署：`docs/部署指南.md`
- 技术：`discuss/项目概览.md`
- 完整：`docs/README.md`

## ✨ 项目特点

✅ 完整的答题功能
✅ 自动计分（每题 0.7 分）
✅ 实时改错显示
✅ 进度自动保存
✅ 错题详细分析
✅ 响应式设计
✅ TypeScript 类型安全
✅ Tailwind CSS 美观样式

## 🎯 典型使用流程

1. **准备题目**
   - 编辑 `data/questions.json`
   - 或使用采集脚本自动获取

2. **启动应用**
   - 运行 `./scripts/dev.sh`
   - 打开 `http://localhost:3000`

3. **测试答题**
   - 选择答案
   - 提交答卷
   - 查看成绩和错题

4. **部署上线**
   - `npm run build`
   - 部署到 Vercel/Netlify/VPS

## 📊 技术栈

- **框架：** Next.js 15.4
- **UI：** React 19 + Tailwind CSS 4
- **语言：** TypeScript 5
- **存储：** Browser LocalStorage
- **部署：** Vercel / Netlify / VPS

## 🎓 学习资源

- Next.js 官网：https://nextjs.org
- React 文档：https://react.dev
- Tailwind CSS：https://tailwindcss.com
- TypeScript：https://www.typescriptlang.org

---

**需要帮助？** 查看完整文档或提交 Issue 🚀
