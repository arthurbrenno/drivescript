@echo off

cd ..\..\frontend\DEFAULT

REM Instalar as dependências
call npm install

REM Iniciar o servidor frontend em outro processo
start npm start
