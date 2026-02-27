@echo off
echo ====================================
echo   INSTALADOR - SISTEMA DE ORDENES
echo ====================================
echo.

REM Verificar Python
echo [1/5] Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python no esta instalado
    echo Descarga Python desde: https://www.python.org/downloads/
    pause
    exit /b 1
)
echo OK: Python instalado
echo.

REM Verificar Node.js
echo [2/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado
    echo Descarga Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)
echo OK: Node.js instalado
echo.

REM Instalar dependencias Backend
echo [3/5] Instalando dependencias del Backend...
cd backend
python -m pip install --upgrade pip
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Fallo la instalacion del backend
    pause
    exit /b 1
)
cd ..
echo OK: Backend instalado
echo.

REM Instalar Yarn
echo [4/5] Instalando Yarn...
npm install -g yarn
echo.

REM Instalar dependencias Frontend
echo [5/5] Instalando dependencias del Frontend...
cd frontend
yarn install
if %errorlevel% neq 0 (
    echo ERROR: Fallo la instalacion del frontend
    pause
    exit /b 1
)
cd ..
echo OK: Frontend instalado
echo.

echo ====================================
echo   INSTALACION COMPLETADA
echo ====================================
echo.
echo Para ejecutar la aplicacion, usa: run.bat
echo.
echo IMPORTANTE: Asegurate de que MongoDB este corriendo
echo.
pause
