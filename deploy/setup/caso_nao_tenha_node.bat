@echo off

REM Verificar perm de apresentador
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

REM Se tem erro, não temos admin
if %errorlevel% neq 0 (
    REM Iniciar novamente com privilégios
    echo Requesting administrative privileges...
    powershell -Command "Start-Process '%0' -Verb RunAs"
    exit /b
) else (
    echo Rodando com privilégios de admin.
)

REM Verifica se o Node.js já está instalado
where node 2>nul
if %errorlevel% neq 0 (
    REM Node.js não encontrado, então vamos instalar

    REM Verifica se o Chocolatey está instalado
    choco --version 2>nul
    if %errorlevel% neq 0 (
        REM Instala o Chocolatey usando PowerShell
        echo Instalando Chocolatey...
        powershell -Command "& { Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1')) }"
    )

    REM Instala o Node.js usando o Chocolatey
    echo Instalando Node.js...
    choco install nodejs -y

    REM Exibe as versões instaladas
    echo.
    echo Verificando a versão do Node.js e do npm...
    node -v
    npm -v

    echo.
    echo Node.js e npm instalados com sucesso!
) else (
    REM Node.js já está instalado
    echo Node.js já está instalado. Nenhuma ação necessária.
)

pause
