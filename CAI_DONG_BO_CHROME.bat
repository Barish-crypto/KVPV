@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0edge-addon\native\install.ps1" -Browser Chrome
pause
