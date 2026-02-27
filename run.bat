@echo off
echo ====================================
echo   SISTEMA DE ORDENES - INICIANDO
echo ====================================
echo.

REM Verificar MongoDB
echo Verificando MongoDB...
sc query MongoDB | find "RUNNING" >nul 2>&1
if %errorlevel% neq 0 (
    echo ADVERTENCIA: MongoDB no esta corriendo
    echo Intentando iniciar MongoDB...
    net start MongoDB >nul 2>&1
    if %errorlevel% neq 0 (
        echo ERROR: No se pudo iniciar MongoDB
        echo Inicia MongoDB manualmente desde Servicios
        pause
        exit /b 1
    )
)
echo OK: MongoDB corriendo
echo.

echo Iniciando Backend en puerto 8001...
start "Backend" cmd /k "cd backend && python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload"

echo Esperando a que el backend inicie...
timeout /t 5 /nobreak >nul

echo Iniciando Frontend en puerto 3000...
start "Frontend" cmd /k "cd frontend && yarn start"

echo.
echo ====================================
echo   SISTEMA INICIADO
echo ====================================
echo.
echo Backend: http://localhost:8001
echo Frontend: http://localhost:3000
echo.
echo El navegador se abrira automaticamente...
echo.
echo Para detener: Cierra las ventanas de Backend y Frontend
echo o presiona Ctrl+C en cada una
echo.
pause
