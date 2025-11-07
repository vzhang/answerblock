#!/bin/bash

# GitHub Pages 部署脚本
# 用途：手动部署项目到 GitHub Pages

set -e

echo "📦 BlockAnswer - GitHub Pages 部署"
echo "=================================="
echo ""

# 检查 git 仓库
if [ ! -d ".git" ]; then
  echo "❌ 错误：这不是一个 Git 仓库"
  echo "请先在 GitHub 创建仓库并克隆"
  exit 1
fi

# 检查分支
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 当前分支：$CURRENT_BRANCH"

# 构建项目
echo ""
echo "🔨 正在构建项目..."
npm run build

# 检查输出目录
if [ ! -d "out" ]; then
  echo "❌ 错误：输出目录 'out' 不存在"
  exit 1
fi

echo "✅ 构建成功"
echo ""

# 显示部署信息
echo "📤 部署信息："
echo "  - 输出目录：./out"
echo "  - 输出大小：$(du -sh out | cut -f1)"
echo "  - 文件数量：$(find out -type f | wc -l)"
echo ""

# 提供两种部署选项
echo "选择部署方式："
echo "  1) 自动部署（推荐）- 使用 GitHub Actions"
echo "  2) 手动部署 - 使用 gh-pages 工具"
echo ""

if [ -z "$1" ]; then
  read -p "请选择 (1/2，默认 1): " CHOICE
  CHOICE=${CHOICE:-1}
else
  CHOICE=$1
fi

case $CHOICE in
  1)
    echo ""
    echo "📝 自动部署说明："
    echo "  1. 确保你已推送代码到 GitHub main 分支"
    echo "  2. GitHub Actions 会自动构建和部署"
    echo "  3. 检查 https://github.com/<username>/<repo>/actions"
    echo ""
    echo "👉 推送代码："
    echo "   git add ."
    echo "   git commit -m 'Deploy to GitHub Pages'"
    echo "   git push origin main"
    echo ""
    echo "✨ 部署完成后，应用将在以下地址可用："
    REPO_NAME=$(git config --get remote.origin.url | sed 's/.*\///;s/.git$//')
    REPO_OWNER=$(git config --get remote.origin.url | sed 's/.*://;s/\/.*//')
    echo "   https://${REPO_OWNER}.github.io/${REPO_NAME}"
    ;;
  2)
    echo ""
    echo "📦 手动部署（使用 gh-pages）..."

    # 检查 gh-pages 是否安装
    if ! npm list gh-pages > /dev/null 2>&1; then
      echo "📥 安装 gh-pages..."
      npm install --save-dev gh-pages
    fi

    echo "🚀 部署中..."
    npx gh-pages -d out

    echo ""
    echo "✅ 部署完成！"
    REPO_NAME=$(git config --get remote.origin.url | sed 's/.*\///;s/.git$//')
    REPO_OWNER=$(git config --get remote.origin.url | sed 's/.*://;s/\/.*//')
    echo "📍 访问地址："
    echo "   https://${REPO_OWNER}.github.io/${REPO_NAME}"
    ;;
  *)
    echo "❌ 无效选择"
    exit 1
    ;;
esac

echo ""
echo "🎉 部署脚本完成！"
