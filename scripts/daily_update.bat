@echo off
REM ============================================
REM GSMA Open Gateway 情报站 - 每日自动更新
REM 通过 GitHub API 直接推送更新
REM ============================================

REM 切换到项目目录
cd /d "%~dp0\.."

REM 运行推送脚本
python scripts/api_push.py

REM 输出日志到文件
echo [%date% %time%] Update completed >> scripts/update.log
