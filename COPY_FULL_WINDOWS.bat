@echo off
powershell -NoProfile -Command "Set-Clipboard -Value ([IO.File]::ReadAllText('%~dp0KVPV_V1_FULL.js'))"
echo Da copy FULL vao clipboard.
pause
