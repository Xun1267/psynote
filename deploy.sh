#!/bin/bash

# PsyNote GitHub 部署脚本

echo "🚀 PsyNote GitHub 部署脚本"
echo "=================================="

# 检查是否已经初始化了git仓库
if [ ! -d ".git" ]; then
    echo "📁 初始化Git仓库..."
    git init
else
    echo "📁 Git仓库已存在"
fi

# 添加所有文件
echo "📦 添加文件到暂存区..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "Initial commit: PsyNote心理学学习网站"

# 询问用户GitHub仓库信息
echo ""
echo "请输入你的GitHub用户名："
read username

echo "请输入仓库名称（默认为psy-note）："
read repo_name
repo_name=${repo_name:-psy-note}

# 添加远程仓库
echo "🔗 添加远程仓库..."
git remote add origin https://github.com/$username/$repo_name.git

# 推送到GitHub
echo "📤 推送到GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ 部署完成！"
echo "🌐 你的网站地址是：https://$username.github.io/$repo_name"
echo ""
echo "📋 接下来你可以："
echo "1. 访问GitHub仓库页面，启用GitHub Pages"
echo "2. 或者使用Vercel进行部署（推荐）"
echo ""
echo "🔗 Vercel部署步骤："
echo "1. 访问 https://vercel.com"
echo "2. 使用GitHub账号登录"
echo "3. 点击'New Project'"
echo "4. 选择你的psy-note仓库"
echo "5. 点击'Deploy'即可自动部署"

# 询问是否打开浏览器
read -p "是否现在打开Vercel网站？(y/n): " open_browser
if [[ $open_browser == "y" || $open_browser == "Y" ]]; then
    if command -v open &> /dev/null; then
        open https://vercel.com
    elif command -v xdg-open &> /dev/null; then
        xdg-open https://vercel.com
    elif command -v start &> /dev/null; then
        start https://vercel.com
    fi
fi