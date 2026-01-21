@echo off
set "NODE_PATH=C:\Program Files\nodejs"
set "PATH=%NODE_PATH%;%PATH%"

echo Setting up environment...
echo Node Path: %NODE_PATH%

echo Launching Backend Server...
start "LinkVault Backend" powershell -NoExit -Command "$env:Path = '%NODE_PATH%;' + $env:Path; cd backend; & '%NODE_PATH%\npm.cmd' run dev"

echo Launching Frontend Server...
start "LinkVault Frontend" powershell -NoExit -Command "$env:Path = '%NODE_PATH%;' + $env:Path; cd frontend; & '%NODE_PATH%\npm.cmd' run dev"

echo Done! Two new windows should appear.
