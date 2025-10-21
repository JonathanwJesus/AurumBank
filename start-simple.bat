@echo off
title 🏦 Aurum Bank - Modo Simples

echo ========================================
echo    🏦 AURUM BANK - MODO SIMPLES
echo ========================================
echo.
echo Vamos iniciar o sistema SEM Docker e SEM MySQL!
echo.

:menu
echo.
echo [1] Iniciar Spring Boot (Backend)
echo [2] Iniciar Frontend
echo [3] Abrir no Navegador
echo [4] Sair
echo.
set /p choice="Escolha uma opção (1-4): "

if "%choice%"=="1" goto springboot
if "%choice%"=="2" goto frontend
if "%choice%"=="3" goto browser
if "%choice%"=="4" exit

goto menu

:springboot
echo.
echo 🚀 Iniciando Spring Boot...
cd backend
call mvn.cmd spring-boot:run
pause
cd ..
goto menu

:frontend
echo.
echo ⚛️ Iniciando Frontend...
cd frontend
call npm run dev
pause
cd ..
goto menu

:browser
echo.
echo 🌐 Abrindo no navegador...
start http://localhost:3000
start http://localhost:8080/api/health
goto menu