@echo off

>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"


if %errorlevel% neq 0 (
    echo Requesting administrative privileges...
    powershell -Command "Start-Process '%0' -Verb RunAs"
    exit /b
) else (
    echo Rodando com privilégios de admin.
)

where node 2>nul
if %errorlevel% neq 0 (
    choco --version 2>nul
    if %errorlevel% neq 0 (
        echo Instalando Chocolatey...
        powershell -Command "& { Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1')) }"
    )

    echo Instalando Node.js...
    choco install nodejs -y

    echo.
    echo Verificando a versão do Node.js e do npm...
    node -v
    npm -v

    echo.
    echo Node.js e npm instalados com sucesso!
) else (
    echo Node.js já está instalado. Nenhuma ação necessária.
)

pause
