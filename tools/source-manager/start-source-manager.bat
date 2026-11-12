@echo off
setlocal
cd /d "%~dp0..\.."
node tools\source-manager\server.cjs
pause
