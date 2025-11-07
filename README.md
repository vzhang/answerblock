# 答题系统 - BlockAnswer

![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=flat-square)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

一个功能完整的 Web 端答题系统，支持随机答题、实时改错、自动计分、错题分析等功能。

## 🎯 核心功能

- ✅ **随机答题** - 每次进入都是随机的题目顺序
- ✅ **实时改错** - 提交后立即显示答案和详细分析
- ✅ **自动计分** - 每题 0.7 分，满分 100 分
- ✅ **进度保存** - 自动保存到浏览器，支持恢复
- ✅ **错题分析** - 详细的错题统计和对比
- ✅ **题目导航** - 快速跳转到任意题目
- ✅ **响应式设计** - 完美适配桌面和移动设备

## 🚀 快速开始

### 1️⃣ 安装依赖

```bash
npm install
```

### 2️⃣ 启动开发服务器

```bash
./scripts/dev.sh
```

访问 `http://localhost:3000`

### 3️⃣ 导入题目数据

编辑 `data/questions.json`，添加你的题目数据（格式见下文）

### 4️⃣ 开始答题！

## 📋 题目数据格式

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

## 📚 文档

- 📖 [README - 完整项目文档](./docs/README.md)
- 🚀 [快速开始指南](./docs/快速开始.md)
- 🔄 [数据采集指南](./docs/数据采集指南.md)
- 🌐 [部署指南](./docs/部署指南.md)
- 📊 [项目概览](./discuss/项目概览.md)

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 15.4 | Web 框架 |
| **React** | 19 | UI 库 |
| **TypeScript** | 5 | 类型检查 |
| **Tailwind CSS** | 4 | 样式框架 |

## 📁 项目结构

```
blockanswer/
├── app/                      # Next.js 应用
│   ├── components/           # React 组件
│   ├── lib/                  # 工具和类型
│   ├── page.tsx              # 主页面
│   └── layout.tsx            # 根布局
├── data/
│   └── questions.json        # 题目数据
├── scripts/
│   ├── dev.sh               # 开发启动脚本
│   ├── build.sh             # 构建脚本
│   └── fetch-questions.js   # 数据采集脚本
├── docs/                    # 文档目录
└── package.json             # 项目配置
```

## 💻 使用方法

### 基础流程

1. **选择答案** - 点击任意选项进行选择
2. **浏览题目** - 使用左侧导航快速跳转
3. **提交答卷** - 点击"提交答卷"完成测试
4. **查看成绩** - 立即显示分数和错题
5. **错题分析** - 点击查看详细的错题信息

### 进度管理

- **自动保存** - 答题进度自动保存到浏览器
- **恢复进度** - 刷新页面后自动恢复上次进度
- **清除数据** - 点击"重新答题"按钮重新开始

## 📊 计分规则

- **总分** - 100 分
- **每题分值** - 0.7 分
- **计算公式** - 分数 = 正确题数 × 0.7，最高 100 分

## 🌍 部署

### Vercel（推荐）

```bash
npm install -g vercel
vercel
```

### Docker

```bash
npm run build
npm start
```

详见 [部署指南](./docs/部署指南.md)

## 🔧 命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 生产运行
npm start

# 代码检查
npm run lint
```

## 📝 数据采集

支持从课程网站自动采集题目：

```bash
# 编辑脚本配置（Cookie、URL 参数等）
vim scripts/fetch-questions.js

# 测试采集
node scripts/fetch-questions.js
```

详见 [数据采集指南](./docs/数据采集指南.md)

## 🎨 自定义

### 修改样式

编辑 `app/globals.css` 和 `tailwind.config.js`

### 修改颜色

在 `tailwind.config.js` 中更新色彩主题

### 修改文本

在各组件中编辑中文字符串

## 🐛 故障排除

### 题目加载不出来

- 检查 `data/questions.json` 是否存在
- 验证 JSON 格式正确性
- 查看浏览器控制台错误信息

### 答案保存不了

- 检查浏览器是否允许 localStorage
- 关闭隐私/无痕浏览模式
- 清除浏览器缓存

### 样式显示异常

- 清除浏览器缓存
- 检查 Tailwind CSS 是否正确编译
- 重新构建项目

详见 [完整文档](./docs/README.md)

## 📱 浏览器支持

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile

## 📊 性能

- **首屏加载** - ~1-2 秒
- **题目切换** - <100ms
- **提交响应** - <50ms
- **单文件大小** - <3.6 kB

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 👨‍💻 作者

BlockAnswer Team

## 🙏 致谢

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

**有问题？** 查看 [完整文档](./docs/) 或提交 Issue

**想部署？** 按照 [部署指南](./docs/部署指南.md) 操作

**需要帮助？** 查看 [快速开始](./docs/快速开始.md)
