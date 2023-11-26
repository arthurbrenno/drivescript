@echo off
cd ..\..\backend\API\NODE\

REM Vou instalar as dependências
call npm install

REM Agora iniciar em outro processo
start npm start
