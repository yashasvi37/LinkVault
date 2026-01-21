$nodePath = "C:\Program Files\nodejs"
$env:Path = "$nodePath;$env:Path"

Write-Host "Setting up environment..."

Write-Host "Launching Backend Server..."
# Use npm.cmd explicitly to avoid PowerShell Execution Policy issues with npm.ps1
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:Path = '$nodePath;' + `$env:Path; cd backend; & '$nodePath\npm.cmd' run dev"

Write-Host "Launching Frontend Server..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:Path = '$nodePath;' + `$env:Path; cd frontend; & '$nodePath\npm.cmd' run dev"

Write-Host "Done! Check the two new PowerShell windows."
