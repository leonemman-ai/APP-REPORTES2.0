#!/bin/bash

echo "===================================="
echo "  INSTALADOR - SISTEMA DE ORDENES"
echo "===================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar Python
echo "[1/5] Verificando Python..."
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}ERROR: Python3 no esta instalado${NC}"
    echo "Instala Python3 con:"
    echo "  Mac: brew install python@3.11"
    echo "  Ubuntu/Debian: sudo apt install python3"
    exit 1
fi
echo -e "${GREEN}OK: Python instalado${NC}"
echo ""

# Verificar Node.js
echo "[2/5] Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js no esta instalado${NC}"
    echo "Instala Node.js con:"
    echo "  Mac: brew install node"
    echo "  Ubuntu/Debian: sudo apt install nodejs npm"
    exit 1
fi
echo -e "${GREEN}OK: Node.js instalado${NC}"
echo ""

# Instalar dependencias Backend
echo "[3/5] Instalando dependencias del Backend..."
cd backend
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Fallo la instalacion del backend${NC}"
    exit 1
fi
cd ..
echo -e "${GREEN}OK: Backend instalado${NC}"
echo ""

# Instalar Yarn
echo "[4/5] Instalando Yarn..."
sudo npm install -g yarn
echo ""

# Instalar dependencias Frontend
echo "[5/5] Instalando dependencias del Frontend..."
cd frontend
yarn install
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Fallo la instalacion del frontend${NC}"
    exit 1
fi
cd ..
echo -e "${GREEN}OK: Frontend instalado${NC}"
echo ""

echo "===================================="
echo "  INSTALACION COMPLETADA"
echo "===================================="
echo ""
echo -e "${GREEN}Para ejecutar la aplicacion, usa: ./run.sh${NC}"
echo ""
echo -e "${YELLOW}IMPORTANTE: Asegurate de que MongoDB este corriendo${NC}"
echo "  Mac: brew services start mongodb-community"
echo "  Linux: sudo systemctl start mongod"
echo ""
