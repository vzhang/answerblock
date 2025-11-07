# GitHub Pages 部署指南

## 概述

本项目已配置为可以自动部署到 GitHub Pages，无需任何额外配置。使用 GitHub Actions 自动化部署流程。

## 前置条件

1. 项目已推送到 GitHub
2. 拥有仓库的 write 权限
3. GitHub Pages 已启用（通常默认启用）

## 自动部署设置

### 步骤 1：推送到 GitHub

```bash
git add .
git commit -m "Add GitHub Pages deployment config"
git push origin main
```

### 步骤 2：配置 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 `Deploy from a branch`
3. **Branch** 选择 `gh-pages`
4. 点击 **Save**

### 步骤 3：等待部署完成

GitHub Actions 会自动：
1. 检测 push 事件
2. 运行 `npm install` 安装依赖
3. 运行 `npm run build` 构建项目
4. 生成静态文件到 `out/` 目录
5. 自动部署到 `gh-pages` 分支

部署完成后，你的应用将在以下 URL 可访问：
- `https://<username>.github.io/<repository-name>`

## 部署状态查看

1. 进入仓库主页
2. 点击 **Actions** 标签
3. 查看 "Deploy to GitHub Pages" 工作流的运行状态

绿色 ✅ 表示部署成功，红色 ❌ 表示部署失败。

## 常见问题

### 问题 1：部署后页面为空

**原因**：可能是 `basePath` 配置问题

**解决**：
- 如果仓库名称不是用户名（即不是 `<username>.github.io`），需要在 URL 中包含仓库名
- 应用会自动处理这个问题，无需手动配置

### 问题 2：样式缺失或图片加载失败

**原因**：资源路径问题

**解决**：
```bash
# 使用正确的基路径重新构建
NEXT_PUBLIC_BASE_PATH=/repository-name npm run build
```

### 问题 3：GitHub Pages 未启用

**解决**：
1. 进入仓库 Settings
2. 向下滚动到 Pages 部分
3. 启用 GitHub Pages
4. 选择部署分支为 `gh-pages`

## 手动部署（可选）

如果不想使用自动部署，也可以手动部署：

```bash
# 1. 构建项目
npm run build

# 2. 部署到 gh-pages 分支
npx gh-pages -d out
```

需要先安装 `gh-pages` 工具：
```bash
npm install --save-dev gh-pages
```

## 构建输出

部署文件位置：`./out/`

这是一个完全静态的网站，包含：
- HTML 文件
- CSS/JavaScript 资源
- 图片和其他资产

## 域名配置（可选）

### 使用自定义域名

1. 购买或配置自定义域名
2. 在仓库 Settings → Pages 中配置域名
3. 添加 CNAME 记录或 A 记录指向 GitHub Pages

### CNAME 配置示例

创建 `public/CNAME` 文件：
```
yourdomain.com
```

## 安全性

- GitHub Pages 托管的所有网站都通过 HTTPS 保护
- 数据存储在用户的浏览器 LocalStorage 中（不上传服务器）
- 完全符合隐私保护要求

## 更新部署

每次推送到 `main` 分支时，GitHub Actions 会自动：
1. 拉取最新代码
2. 重新构建应用
3. 部署到 GitHub Pages

无需手动操作！

## 性能优化

GitHub Pages 提供的优化：
- 全球 CDN 加速
- 自动压缩和缓存
- GZIP 传输压缩
- HTTP/2 支持

## 监控和日志

查看部署日志：
1. 进入仓库 **Actions** 标签
2. 点击最近的工作流运行
3. 查看详细的构建和部署日志

## 故障排除

### 检查工作流文件

确保 `.github/workflows/deploy.yml` 存在且内容正确。

### 清除缓存

GitHub Pages 有缓存，更新可能需要几分钟才能生效。

### 强制重新部署

1. 进入仓库 **Settings** → **Pages**
2. 改变 **Source** 设置后再改回
3. 或者推送一个新的提交触发重新构建

## 下一步

- 监控应用使用情况
- 根据反馈进行改进
- 添加更多题目和功能
- 配置自定义域名（可选）

---

**提示**：第一次部署可能需要 5-10 分钟，之后的更新通常只需 2-3 分钟。
