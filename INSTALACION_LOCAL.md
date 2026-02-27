# 🚀 Sistema de Órdenes - Instalación Local

Guía completa para instalar y ejecutar el sistema en **Windows** y **Mac/Linux**.

---

## 📋 Requisitos Previos

### Para Windows:
- **Python 3.11+**: [Descargar](https://www.python.org/downloads/)
  - ⚠️ Importante: Marcar "Add Python to PATH" durante la instalación
- **Node.js 18+**: [Descargar](https://nodejs.org/)
- **MongoDB Community Edition**: [Descargar](https://www.mongodb.com/try/download/community)
  - O usar MongoDB Atlas (nube gratis)

### Para Mac:
- **Python 3.11+**: Ya viene instalado, o instalar con Homebrew:
  ```bash
  brew install python@3.11
  ```
- **Node.js 18+**: 
  ```bash
  brew install node
  ```
- **MongoDB**: 
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  ```

---

## 📦 Instalación Rápida

### Opción 1: Instalación Automática (Recomendada)

#### En Windows:
1. Abre PowerShell o CMD como **Administrador**
2. Navega a la carpeta del proyecto
3. Ejecuta:
```cmd
install.bat
```

#### En Mac/Linux:
1. Abre Terminal
2. Navega a la carpeta del proyecto
3. Ejecuta:
```bash
chmod +x install.sh
./install.sh
```

### Opción 2: Instalación Manual

#### 1. Instalar dependencias del Backend

**Windows:**
```cmd
cd backend
python -m pip install --upgrade pip
pip install -r requirements.txt
cd ..
```

**Mac/Linux:**
```bash
cd backend
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
cd ..
```

#### 2. Instalar dependencias del Frontend

**Windows y Mac/Linux:**
```bash
cd frontend
npm install -g yarn
yarn install
cd ..
```

#### 3. Configurar MongoDB

**Windows:**
- Iniciar MongoDB desde Servicios o ejecutar:
```cmd
net start MongoDB
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

---

## ⚙️ Configuración

### 1. Backend (.env)

Edita el archivo `/backend/.env`:

```env
# MongoDB
MONGO_URL=mongodb://localhost:27017
DB_NAME=ordenes_sistema

# CORS
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 2. Frontend (.env)

Edita el archivo `/frontend/.env`:

```env
# Backend URL
REACT_APP_BACKEND_URL=http://localhost:8001

# Development
ENABLE_HEALTH_CHECK=false
```

---

## 🚀 Ejecutar la Aplicación

### Opción 1: Ejecución Automática (Recomendada)

#### Windows:
```cmd
run.bat
```

#### Mac/Linux:
```bash
chmod +x run.sh
./run.sh
```

Esto abrirá automáticamente:
- Backend: http://localhost:8001
- Frontend: http://localhost:3000

### Opción 2: Ejecución Manual

Necesitarás **3 terminales** abiertas:

#### Terminal 1 - MongoDB (si no está como servicio):

**Windows:**
```cmd
mongod
```

**Mac/Linux:**
```bash
mongod --dbpath /usr/local/var/mongodb
```

#### Terminal 2 - Backend:

**Windows:**
```cmd
cd backend
python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Mac/Linux:**
```bash
cd backend
python3 -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

#### Terminal 3 - Frontend:

**Windows y Mac/Linux:**
```bash
cd frontend
yarn start
```

Espera a que compile y se abrirá automáticamente en http://localhost:3000

---

## 📂 Estructura del Proyecto

```
sistema-ordenes/
├── backend/
│   ├── server.py              # API principal
│   ├── requirements.txt       # Dependencias Python
│   ├── .env                   # Configuración backend
│   ├── templates/             # Plantillas Excel
│   ├── uploads/               # Archivos subidos
│   └── generated/             # Documentos generados
├── frontend/
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── services/          # API services
│   │   ├── hooks/             # Custom hooks
│   │   └── App.js             # Componente principal
│   ├── package.json           # Dependencias Node
│   └── .env                   # Configuración frontend
├── install.bat                # Instalador Windows
├── install.sh                 # Instalador Mac/Linux
├── run.bat                    # Ejecutor Windows
├── run.sh                     # Ejecutor Mac/Linux
├── README.md                  # Documentación general
└── INSTALACION_LOCAL.md       # Esta guía
```

---

## 🔧 Solución de Problemas

### Error: "MongoDB connection failed"

**Solución:**
1. Verifica que MongoDB esté corriendo:
   - Windows: `services.msc` → Buscar MongoDB
   - Mac: `brew services list`
   - Linux: `sudo systemctl status mongod`

2. Verifica la URL en `/backend/.env`:
   ```env
   MONGO_URL=mongodb://localhost:27017
   ```

### Error: "Port 8001 already in use"

**Solución:**
- Windows:
  ```cmd
  netstat -ano | findstr :8001
  taskkill /PID [PID] /F
  ```
- Mac/Linux:
  ```bash
  lsof -ti:8001 | xargs kill -9
  ```

### Error: "Python not found" o "node not found"

**Solución:**
1. Verifica la instalación:
   ```bash
   python --version
   node --version
   ```
2. Añade al PATH si es necesario
3. Reinicia la terminal

### Error: "Module not found"

**Solución Backend:**
```bash
cd backend
pip install -r requirements.txt --force-reinstall
```

**Solución Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
yarn install
```

### Frontend no compila

**Solución:**
```bash
cd frontend
yarn cache clean
yarn install
yarn start
```

---

## 📱 Usar la Aplicación

### 1. Cargar Archivos Base

1. Abre http://localhost:3000
2. Ve a **Configuración** (icono de engranaje)
3. Carga:
   - Archivo de **Afiliaciones** (Excel)
   - Archivo de **Tickets** (Excel)

### 2. Crear Órdenes

1. Ve a **Nueva Orden**
2. Selecciona un **Folio**
3. Observa el autocompletado automático
4. Completa los datos restantes
5. Sube imágenes (opcional)
6. Haz clic en **Generar Documento**

### 3. Ver Documentos

1. Ve a **Documentos**
2. Verás el historial de documentos generados
3. Descarga cualquier documento con un clic

---

## 🛑 Detener la Aplicación

### Si usaste run.bat o run.sh:
- Presiona `Ctrl+C` en cada terminal

### Detener servicios:
**Windows:**
```cmd
taskkill /IM python.exe /F
taskkill /IM node.exe /F
```

**Mac/Linux:**
```bash
pkill -f uvicorn
pkill -f node
```

---

## 🗄️ Backup de Datos

### Exportar base de datos:
```bash
mongodump --db ordenes_sistema --out backup/
```

### Importar base de datos:
```bash
mongorestore --db ordenes_sistema backup/ordenes_sistema/
```

---

## 📦 Crear Ejecutable (Opcional)

### Para Windows (.exe):

1. Instalar PyInstaller:
```bash
pip install pyinstaller
```

2. Crear ejecutable:
```bash
cd backend
pyinstaller --onefile --name "OrdenesBackend" server.py
```

### Para Mac (.app):

1. Usar py2app:
```bash
pip install py2app
python setup.py py2app
```

---

## 🔐 Seguridad

Para uso en producción:

1. **Cambiar variables de entorno:**
   - Usar MongoDB con autenticación
   - Configurar CORS específico
   - Usar HTTPS

2. **Agregar autenticación:**
   - JWT tokens
   - OAuth2
   - Roles y permisos

3. **Configurar firewall:**
   - Limitar acceso a puertos
   - Solo IPs autorizadas

---

## 📞 Soporte

Si tienes problemas:

1. **Verifica los logs:**
   - Backend: Terminal donde corre uvicorn
   - Frontend: Terminal donde corre yarn
   - MongoDB: `mongod.log`

2. **Revisa la consola del navegador:**
   - Presiona F12 → Console

3. **Contacta al equipo de desarrollo**

---

## ✅ Checklist de Instalación

- [ ] Python 3.11+ instalado
- [ ] Node.js 18+ instalado
- [ ] MongoDB instalado y corriendo
- [ ] Dependencias backend instaladas
- [ ] Dependencias frontend instaladas
- [ ] Archivos .env configurados
- [ ] Backend corriendo en :8001
- [ ] Frontend corriendo en :3000
- [ ] Archivos base cargados
- [ ] Primer documento generado exitosamente

---

**¡Listo! El sistema está instalado y funcionando localmente.** 🎉
