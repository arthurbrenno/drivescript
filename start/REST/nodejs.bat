@echo off
cd ..\..\backend\API\NODE\api

REM Vou instalar as dependências
call npm install

REM Agora iniciar em outro processo
start npm start
