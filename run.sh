#!/bin/bash

echo "===================================="
echo "  SISTEMA DE ORDENES - INICIANDO"
echo "===================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar MongoDB
echo "Verificando MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${YELLOW}ADVERTENCIA: MongoDB no esta corriendo${NC}"
    echo "Intentando iniciar MongoDB..."
    
    # Intentar iniciar segun el OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # Mac
        brew services start mongodb-community
    else
        # Linux
        sudo systemctl start mongod
    fi
    
    sleep 2
    
    if ! pgrep -x "mongod" > /dev/null; then
        echo -e "${RED}ERROR: No se pudo iniciar MongoDB${NC}"
        echo "Inicia MongoDB manualmente:"
        echo "  Mac: brew services start mongodb-community"
        echo "  Linux: sudo systemctl start mongod"
        exit 1
    fi
fi
echo -e "${GREEN}OK: MongoDB corriendo${NC}"
echo ""

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "Deteniendo servicios..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "Servicios detenidos"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Iniciar Backend
echo "Iniciando Backend en puerto 8001..."
cd backend
python3 -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload &
BACKEND_PID=$!
cd ..

echo "Esperando a que el backend inicie..."
sleep 5

# Iniciar Frontend
echo "Iniciando Frontend en puerto 3000..."
cd frontend
yarn start &
FRONTEND_PID=$!
cd ..

echo ""
echo "===================================="
echo "  SISTEMA INICIADO"
echo "===================================="
echo ""
echo -e "${GREEN}Backend: http://localhost:8001${NC}"
echo -e "${GREEN}Frontend: http://localhost:3000${NC}"
echo ""
echo "El navegador se abrira automaticamente..."
echo ""
echo -e "${YELLOW}Presiona Ctrl+C para detener todos los servicios${NC}"
echo ""

# Mantener el script corriendo
wait
