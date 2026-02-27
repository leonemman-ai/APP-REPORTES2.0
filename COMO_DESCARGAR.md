# 📦 Cómo Descargar y Usar Este Proyecto Localmente

## Opción 1: Guardar en GitHub (Recomendado)

1. **En Emergent Agent**, haz clic en el icono de **GitHub** (arriba a la derecha)
2. Selecciona **"Save to GitHub"**
3. Autoriza tu cuenta de GitHub
4. Elige un nombre para el repositorio (ej: `sistema-ordenes`)
5. Haz clic en **"Save"**

6. **Clonar en tu computadora:**

```bash
# En tu terminal (Windows PowerShell, Mac Terminal, Linux Terminal)
git clone https://github.com/TU_USUARIO/sistema-ordenes.git
cd sistema-ordenes
```

## Opción 2: Descarga Directa (Alternativa)

1. **Desde Emergent Agent**, usa la opción de **Descarga** o **Export**
2. Descarga el archivo ZIP completo
3. Extrae el ZIP en tu computadora
4. Navega a la carpeta extraída

---

## 🚀 Instalación y Ejecución

Una vez descargado el proyecto:

### En Windows:

```cmd
# 1. Navegar a la carpeta
cd ruta\a\sistema-ordenes

# 2. Instalar dependencias
install.bat

# 3. Ejecutar aplicación
run.bat
```

### En Mac/Linux:

```bash
# 1. Navegar a la carpeta
cd ruta/a/sistema-ordenes

# 2. Dar permisos de ejecución
chmod +x install.sh run.sh

# 3. Instalar dependencias
./install.sh

# 4. Ejecutar aplicación
./run.sh
```

---

## 📋 Requisitos Previos

Antes de ejecutar `install`, asegúrate de tener instalado:

### Windows:
- [Python 3.11+](https://www.python.org/downloads/) (marcar "Add to PATH")
- [Node.js 18+](https://nodejs.org/)
- [MongoDB Community](https://www.mongodb.com/try/download/community)

### Mac:
```bash
# Usando Homebrew
brew install python@3.11
brew install node
brew tap mongodb/brew
brew install mongodb-community
```

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install python3 python3-pip nodejs npm
# MongoDB según tu distribución
```

---

## 🔧 Configuración Inicial

### 1. Configurar MongoDB

**Windows:**
- MongoDB se instala como servicio automático
- Verifica en Servicios que "MongoDB" esté corriendo

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Verificar Configuración

Los archivos `.env.local` ya están configurados para uso local:

**Backend** (`backend/.env.local`):
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=ordenes_sistema
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

**Frontend** (`frontend/.env.local`):
```env
REACT_APP_BACKEND_URL=http://localhost:8001
ENABLE_HEALTH_CHECK=false
```

Si necesitas cambiar algo, edita estos archivos.

---

## 📂 Estructura Después de Descargar

```
sistema-ordenes/
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   ├── .env.local
│   ├── templates/
│   ├── uploads/
│   └── generated/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env.local
├── install.bat        # Instalador Windows
├── install.sh         # Instalador Mac/Linux
├── run.bat            # Ejecutor Windows
├── run.sh             # Ejecutor Mac/Linux
├── README.md
├── INSTALACION_LOCAL.md
└── COMO_DESCARGAR.md  # Este archivo
```

---

## 🎯 Primer Uso

Una vez ejecutado con `run.bat` o `./run.sh`:

1. Se abrirá automáticamente http://localhost:3000
2. Ve a **Configuración** (icono de engranaje)
3. Carga tus archivos:
   - Archivo de **Afiliaciones** (Excel)
   - Archivo de **Tickets** (Excel)
4. Ve a **Nueva Orden** y empieza a crear documentos

---

## ❓ Solución de Problemas Comunes

### "MongoDB connection failed"
```bash
# Verificar si MongoDB está corriendo
# Windows
services.msc → Buscar MongoDB

# Mac
brew services list

# Linux
sudo systemctl status mongod
```

### "Python not found"
- Asegúrate de haber marcado "Add Python to PATH" durante la instalación
- Reinicia la terminal después de instalar Python

### "Port 8001 already in use"
```bash
# Windows
netstat -ano | findstr :8001
taskkill /PID [PID] /F

# Mac/Linux
lsof -ti:8001 | xargs kill -9
```

### Frontend no compila
```bash
cd frontend
rm -rf node_modules package-lock.json
yarn cache clean
yarn install
```

---

## 🔄 Actualizar el Sistema

Si descargas una nueva versión:

1. Guarda tus archivos `.env` personalizados
2. Reemplaza todos los archivos con la nueva versión
3. Restaura tus archivos `.env`
4. Ejecuta `install` de nuevo:
   - Windows: `install.bat`
   - Mac/Linux: `./install.sh`

---

## 💾 Backup de Datos

### Exportar datos de MongoDB:
```bash
mongodump --db ordenes_sistema --out backup/
```

### Importar datos de MongoDB:
```bash
mongorestore --db ordenes_sistema backup/ordenes_sistema/
```

---

## 📧 Soporte

Para más ayuda:
- Lee [README.md](README.md)
- Consulta [INSTALACION_LOCAL.md](INSTALACION_LOCAL.md)
- Revisa los logs en las terminales donde corren los servicios

---

## ✅ Checklist de Descarga e Instalación

- [ ] Python 3.11+ instalado
- [ ] Node.js 18+ instalado
- [ ] MongoDB instalado y corriendo
- [ ] Proyecto descargado (GitHub o ZIP)
- [ ] `install.bat` o `./install.sh` ejecutado exitosamente
- [ ] `run.bat` o `./run.sh` ejecutado
- [ ] Frontend abierto en http://localhost:3000
- [ ] Archivos de datos cargados
- [ ] Primera orden creada exitosamente

---

**¡Listo! El sistema está funcionando localmente en tu computadora.** 🎉
