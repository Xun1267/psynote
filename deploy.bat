@echo off
chcp 65001 >nul 2>&1
echo 🚀 PsyNote GitHub 部署脚本
echo ==================================
echo.

REM 检查是否已经初始化了git仓库
if not exist ".git" (
    echo 📁 初始化Git仓库...
    git init
) else (
    echo 📁 Git仓库已存在
)

REM 添加所有文件
echo 📦 添加文件到暂存区...
git add .

REM 提交更改
echo 💾 提交更改...
git commit -m "Initial commit: PsyNote心理学学习网站"

REM 询问用户GitHub仓库信息
echo.
set /p "username=请输入你的GitHub用户名："
set /p "repo_name=请输入仓库名称（默认为psy-note）："
if "%repo_name%"=="" set repo_name=psy-note

REM 添加远程仓库
echo 🔗 添加远程仓库...
git remote add origin https://github.com/%username%/%repo_name%.git

REM 推送到GitHub
echo 📤 推送到GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ 部署完成！
echo 🌐 你的网站地址是：https://%username%.github.io/%repo_name%
echo.
echo 📋 接下来你可以：
echo 1. 访问GitHub仓库页面，启用GitHub Pages
echo 2. 或者使用Vercel进行部署（推荐）
echo.
echo 🔗 Vercel部署步骤：
echo 1. 访问 https://vercel.com
echo 2. 使用GitHub账号登录
echo 3. 点击'New Project'
echo 4. 选择你的psy-note仓库
echo 5. 点击'Deploy'即可自动部署

echo.
set /p "open_browser=是否现在打开Vercel网站？(y/n): "
if /i "%open_browser%"=="y" (
    start https://vercel.com
)

pause