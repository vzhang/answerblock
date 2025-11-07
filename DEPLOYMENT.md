# 部署指南

本项目支持多种部署方式。选择最适合你的方案：

## 🚀 快速部署对比

| 方案 | 难度 | 成本 | 配置时间 | 部署时间 | 说明 |
|------|------|------|--------|---------|------|
| **GitHub Pages** | ⭐ | 免费 | 5分钟 | 自动 | 推荐首选 |
| **Vercel** | ⭐ | 免费 | 3分钟 | 自动 | Next.js 官方推荐 |
| **Netlify** | ⭐⭐ | 免费 | 5分钟 | 自动 | 需要构建脚本 |
| **VPS/云服务器** | ⭐⭐⭐ | 付费 | 15分钟 | 手动 | 完全控制 |

---

## 1️⃣ GitHub Pages（推荐）

### 优点
- ✅ 完全免费
- ✅ 无需付款信息
- ✅ 自动HTTPS
- ✅ 全球CDN加速
- ✅ GitHub Actions自动部署

### 快速开始

#### 方式 A：自动部署（推荐）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **配置 GitHub Pages**
   - 进入仓库 **Settings → Pages**
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`
   - 点击 **Save**

3. **等待部署完成**
   - 进入 **Actions** 标签查看构建状态
   - 绿色 ✅ 表示成功
   - 应用将在 `https://username.github.io/repository-name` 可用

#### 方式 B：手动部署

```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 构建并部署
npm run build
npx gh-pages -d out
```

### 访问地址
```
https://<username>.github.io/<repository-name>
```

### 详细指南
查看 [GitHub Pages 部署指南](./docs/GitHub-Pages部署指南.md)

---

## 2️⃣ Vercel（次选）

### 优点
- ✅ Next.js 官方推荐
- ✅ 部署最快
- ✅ 自动环境变量管理
- ✅ 自动预览部署
- ✅ 性能分析工具

### 快速开始

1. **访问 Vercel**
   - 进入 [vercel.com](https://vercel.com)
   - 用 GitHub 账户登录

2. **创建项目**
   - 点击 **New Project**
   - 选择你的 GitHub 仓库
   - 点击 **Import**

3. **配置项目**
   - Framework: `Next.js`
   - 其他保持默认
   - 点击 **Deploy**

4. **完成**
   - 等待部署完成
   - 获得自动生成的 URL

### 访问地址
```
https://<project-name>.vercel.app
```

---

## 3️⃣ Netlify

### 优点
- ✅ 部署简单
- ✅ 良好的构建缓存
- ✅ 分支部署

### 快速开始

1. **连接 GitHub**
   - 进入 [netlify.com](https://netlify.com)
   - 点击 **New site from Git**
   - 连接 GitHub 账户

2. **选择仓库**
   - 搜索并选择你的仓库

3. **配置构建**
   - Build command: `npm run build`
   - Publish directory: `out`
   - 点击 **Deploy site**

4. **完成**
   - 等待部署完成
   - 获得自动生成的 URL

---

## 4️⃣ VPS/云服务器（自托管）

### 支持的平台
- 阿里云 ECS
- 腾讯云 CVM
- 华为云 ECS
- DigitalOcean Droplet
- Linode
- AWS EC2

### 快速开始

#### 使用 pm2 进程管理

```bash
# 1. 登录到服务器
ssh root@your-server-ip

# 2. 克隆项目
git clone https://github.com/username/blockanswer.git
cd blockanswer

# 3. 安装依赖
npm install

# 4. 构建项目
npm run build

# 5. 安装 pm2
npm install -g pm2

# 6. 启动应用
pm2 start "npm start" --name blockanswer

# 7. 保存 pm2 配置
pm2 save

# 8. 启用开机自启
pm2 startup
```

#### 使用 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 使用 Let's Encrypt 配置 HTTPS

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d yourdomain.com

# 自动续期
sudo systemctl enable certbot.timer
```

---

## 📋 部署检查清单

- [ ] 项目已在本地测试
- [ ] `npm run build` 成功执行
- [ ] 代码已推送到 GitHub
- [ ] 选择了合适的部署方案
- [ ] 已配置部署平台
- [ ] 首次部署已完成
- [ ] 应用可在生产环境访问
- [ ] 所有功能已测试

---

## 🔄 持续部署

### GitHub Actions 自动部署

每次推送到 main 分支时自动部署：

```bash
git add .
git commit -m "Update features"
git push origin main
# GitHub Actions 自动开始构建和部署
```

### 手动触发部署

在 GitHub Actions 中：
1. 进入 **Actions** 标签
2. 选择 **Deploy to GitHub Pages**
3. 点击 **Run workflow**
4. 选择分支（通常是 main）
5. 点击 **Run workflow**

---

## ⚡ 性能优化建议

### GitHub Pages
- 默认使用全球 CDN
- 自动 gzip 压缩
- 缓存优化

### Vercel
- 自动 Image Optimization
- 自动 Code Splitting
- Edge Functions 支持

### 自托主
- 启用 gzip 压缩
- 配置 CDN（如 Cloudflare）
- 启用浏览器缓存

---

## 📞 故障排除

### 部署失败

**检查清单：**
1. 检查 GitHub Actions 日志
2. 确保 `npm run build` 本地可以成功
3. 检查 Node.js 版本一致性
4. 查看 `.next/` 和 `out/` 目录

### 功能异常

**常见原因：**
1. LocalStorage 被禁用 → 检查浏览器设置
2. CORS 错误 → 检查跨域配置
3. 路由错误 → 检查 basePath 配置

### 性能慢

**优化建议：**
1. 启用浏览器缓存
2. 配置 CDN
3. 使用浏览器开发工具检查
4. 检查网络连接

---

## 🎯 推荐配置

### 个人使用
**推荐：GitHub Pages**
- 免费，无需维护
- 足够稳定和快速
- 自动 HTTPS

### 小团队使用
**推荐：Vercel + GitHub**
- Next.js 官方支持
- 部署速度快
- 自动预览部署

### 生产环境
**推荐：VPS + Nginx + Let's Encrypt**
- 完全控制
- 自定义配置
- 高可靠性

---

## 📚 更多资源

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/learn/basics/deploying-nextjs-app)
- [Nginx 反向代理配置](https://nginx.org/en/docs/)

---

**选择适合你的部署方案，开始享受！** 🚀
