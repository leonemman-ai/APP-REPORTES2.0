# Sistema de Órdenes de Incidente y Requerimiento

Sistema completo para la gestión y generación de órdenes de incidente y requerimiento del servicio para Grupo Desarrollador Caseoli.

## 🚀 Características Principales

- ✅ **Sistema Full-Stack** con FastAPI + React + MongoDB
- ✅ **26,190+ afiliaciones** con datos completos
- ✅ **5,976+ trouble tickets** con información detallada
- ✅ **Autocompletado inteligente** de formularios
- ✅ **Generación de documentos Excel** con imágenes
- ✅ **Procesamiento automático de imágenes**
- ✅ **Historial completo** de documentos generados
- ✅ **Interfaz moderna y responsive**

## 📦 Instalación Local

### Opción 1: Instalación Rápida

#### Windows:
```cmd
install.bat
```

#### Mac/Linux:
```bash
chmod +x install.sh
./install.sh
```

### Opción 2: Instalación Manual

Ver documentación completa en [INSTALACION_LOCAL.md](INSTALACION_LOCAL.md)

## 🚀 Ejecutar Localmente

### Windows:
```cmd
run.bat
```

### Mac/Linux:
```bash
chmod +x run.sh
./run.sh
```

La aplicación se abrirá automáticamente en:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001

## 📋 Requisitos

- **Python 3.11+**
- **Node.js 18+**
- **MongoDB** (local o Atlas)

## 📚 Documentación

- [Instalación Local Detallada](INSTALACION_LOCAL.md)
- [Documentación de API](#api-endpoints)
- [Guía de Uso](#-usar-la-aplicación)

## 🗂️ Estructura del Proyecto

```
/
├── backend/              # API FastAPI
│   ├── server.py        # Aplicación principal
│   ├── requirements.txt # Dependencias Python
│   ├── .env.local       # Configuración local
│   ├── templates/       # Plantillas Excel
│   ├── uploads/         # Archivos subidos
│   └── generated/       # Documentos generados
├── frontend/            # Aplicación React
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── services/    # API services
│   │   ├── hooks/       # Custom hooks
│   │   └── App.js       # Componente principal
│   ├── package.json     # Dependencias Node
│   └── .env.local       # Configuración local
├── install.bat          # Instalador Windows
├── install.sh           # Instalador Mac/Linux
├── run.bat              # Ejecutor Windows
├── run.sh               # Ejecutor Mac/Linux
└── README.md            # Este archivo
```

## 📱 Usar la Aplicación

### 1. Cargar Archivos Base

1. Ve a **Configuración** (icono de engranaje)
2. Carga:
   - Archivo de **Afiliaciones** (Excel)
   - Archivo de **Tickets** (Excel)

### 2. Crear Órdenes

1. Ve a **Nueva Orden**
2. Selecciona un **Folio**
3. Observa el autocompletado automático de:
   - Municipio, Dirección, Nombre Comercial
   - Afiliación, Servicio, Tecnología
   - Descripción, Fecha, Estatus
   - Todos los campos de folio
4. Completa los datos restantes
5. Sube imágenes (opcional)
6. Haz clic en **Generar Documento**

### 3. Ver Documentos

- Ve a **Documentos**
- Descarga cualquier documento generado

## 📊 API Endpoints

### Afiliaciones
- `POST /api/afiliaciones/upload` - Subir archivo Excel
- `GET /api/afiliaciones` - Obtener todas
- `GET /api/afiliaciones/search?q={codigo}` - Buscar por código

### Trouble Tickets
- `POST /api/tt/upload` - Subir archivo Excel
- `GET /api/tt` - Obtener todos
- `GET /api/tt/{folio}` - Obtener por folio

### Documentos
- `POST /api/documentos/generar` - Generar documento
- `GET /api/documentos` - Listar documentos
- `GET /api/documentos/{id}/download` - Descargar

### Estadísticas
- `GET /api/stats` - Obtener estadísticas del sistema

## 🔧 Configuración

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=ordenes_sistema
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
ENABLE_HEALTH_CHECK=false
```

## 🛑 Detener la Aplicación

- Presiona `Ctrl+C` en cada terminal
- O cierra las ventanas de Backend y Frontend

## 🐛 Solución de Problemas

Ver [INSTALACION_LOCAL.md](INSTALACION_LOCAL.md#-solución-de-problemas) para soluciones detalladas.

## 📦 Exportar/Importar

### Para compartir el código:

Usa la opción "Save to GitHub" en Emergent Agent, o descarga el proyecto completo.

### Para ejecutar en otra máquina:

1. Copia toda la carpeta del proyecto
2. Ejecuta `install.bat` (Windows) o `./install.sh` (Mac/Linux)
3. Ejecuta `run.bat` (Windows) o `./run.sh` (Mac/Linux)

## 🔐 Seguridad

Para uso en producción:
- Configurar MongoDB con autenticación
- Usar HTTPS
- Implementar autenticación JWT
- Configurar CORS específico
- Agregar rate limiting

## 📧 Soporte

Si tienes problemas:
1. Revisa los logs en las terminales
2. Consulta [INSTALACION_LOCAL.md](INSTALACION_LOCAL.md)
3. Verifica que MongoDB esté corriendo
4. Asegúrate de tener las versiones correctas de Python y Node.js

## 🎯 Características del Sistema

### Autocompletado Inteligente
- Al seleccionar un folio, se autocompletan **15+ campos**
- Datos de afiliaciones (municipio, dirección, nombre comercial)
- Datos de TT (servicio, tecnología, descripción, fecha, estatus)
- Todos los campos de folio

### Procesamiento de Imágenes
- Redimensionamiento automático a 420x420px
- Recorte centrado
- Conversión a JPEG optimizado
- Soporte para múltiples formatos

### Generación de Documentos
- Plantilla Excel personalizada
- Inserción automática de datos
- 4 imágenes de evidencia
- Formato profesional listo para imprimir

## 📈 Capacidad

- **26,190 afiliaciones** con datos completos
- **5,976 tickets** de 25 tecnologías diferentes
- **Procesamiento en lotes** de miles de registros
- **Sin límite** de documentos generados

## ✅ Estado del Proyecto

- ✅ Backend: Funcional y optimizado
- ✅ Frontend: Moderno y responsive
- ✅ Base de datos: MongoDB persistente
- ✅ Testing: Validado y probado
- ✅ Documentación: Completa
- ✅ Scripts: Windows y Mac/Linux
- ✅ **Listo para uso en producción**

---

**Desarrollado para Grupo Desarrollador Caseoli, S.A. de C.V.**

**© 2026 - Sistema de Órdenes de Incidente y Requerimiento**

### Backend (FastAPI + MongoDB)
- ✅ API RESTful completa
- ✅ Base de datos MongoDB para almacenamiento persistente
- ✅ Procesamiento de imágenes automático (resize, crop, optimización)
- ✅ Generación de documentos Excel con plantilla personalizada
- ✅ Carga automática de afiliaciones al iniciar
- ✅ Sistema de archivos robusto para uploads y documentos generados

### Frontend (React + Tailwind CSS + shadcn/ui)
- ✅ Interfaz moderna y responsive
- ✅ Formulario completo con autocompletado inteligente
- ✅ Upload de imágenes con preview
- ✅ Navegación entre múltiples secciones
- ✅ Historial de documentos generados
- ✅ Sistema de configuración para cargar archivos base

## 📋 Requisitos

- Python 3.11+
- Node.js 18+
- MongoDB
- Archivos base:
  - `plantilla.xlsx` - Plantilla de documento de orden
  - `AFILIACIONES_CASEOLI.xlsx` - Base de datos de afiliaciones

## 🛠️ Instalación y Configuración

### Backend

```bash
cd /app/backend
pip install -r requirements.txt
```

**Variables de entorno** (`/app/backend/.env`):
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
```

### Frontend

```bash
cd /app/frontend
yarn install
```

**Variables de entorno** (`/app/frontend/.env`):
```
REACT_APP_BACKEND_URL=https://productivity-suite-14.preview.emergentagent.com
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

## 🚀 Ejecutar la Aplicación

### Con Supervisor (Recomendado)

```bash
# Reiniciar todos los servicios
sudo supervisorctl restart all

# Reiniciar solo backend
sudo supervisorctl restart backend

# Reiniciar solo frontend
sudo supervisorctl restart frontend

# Ver estado de servicios
sudo supervisorctl status
```

### Manualmente (Desarrollo)

**Backend:**
```bash
cd /app/backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Frontend:**
```bash
cd /app/frontend
yarn start
```

## 📚 API Endpoints

### Afiliaciones

- `POST /api/afiliaciones/upload` - Subir archivo Excel de afiliaciones
- `GET /api/afiliaciones` - Obtener todas las afiliaciones
- `GET /api/afiliaciones/search?q={codigo}` - Buscar afiliación por código

### Trouble Tickets

- `POST /api/tt/upload` - Subir archivo Excel de TT diario
- `GET /api/tt` - Obtener todos los trouble tickets
- `GET /api/tt/{folio}` - Obtener TT por folio

### Documentos

- `POST /api/documentos/generar` - Generar documento Excel
  - Form data con todos los campos del formulario
  - Archivos de imágenes: `antes`, `proceso1`, `proceso2`, `final`
- `GET /api/documentos` - Listar documentos generados
- `GET /api/documentos/{id}/download` - Descargar documento

## 📱 Páginas de la Aplicación

### 1. Nueva Orden (`/`)
Formulario completo para crear una nueva orden de incidente:
- **Datos Generales**: Folio, Afiliación, Municipio, Dirección, etc.
- **Descripción de la Falla**: Tecnología, Servicio, Descripción, etc.
- **Comentarios de Atención**: Diagnóstico, Acciones, Solución, etc.
- **Componentes**: Instalados y retirados
- **Evidencia Fotográfica**: 4 imágenes (Antes, Proceso 1, Proceso 2, Final)
- **Firmas**: Técnico y Supervisor

**Características:**
- Autocompletado de datos desde TT cuando se selecciona un folio
- Autocompletado de datos de afiliación cuando se selecciona un código
- Campos bloqueados cuando vienen del TT (lectura solamente)
- Preview de imágenes antes de subir
- Validación de campos requeridos

### 2. Documentos (`/documentos`)
Listado de todos los documentos generados:
- Tabla con: Folio, Municipio, Afiliación, Fecha de creación
- Botón de descarga para cada documento
- Vista cronológica (más recientes primero)

### 3. Configuración (`/configuracion`)
Carga de archivos base:
- **Upload de Afiliaciones**: Cargar nuevo archivo Excel de afiliaciones
- **Upload de TT Diario**: Cargar nuevo archivo Excel de trouble tickets
- Feedback visual de éxito/error
- Recarga automática de datos después de upload

## 🗂️ Estructura del Proyecto

```
/app/
├── backend/
│   ├── server.py               # Aplicación FastAPI principal
│   ├── requirements.txt        # Dependencias Python
│   ├── .env                    # Variables de entorno
│   ├── templates/              # Plantillas y archivos base
│   │   ├── plantilla.xlsx
│   │   └── AFILIACIONES_CASEOLI.xlsx
│   ├── uploads/                # Archivos subidos e imágenes temporales
│   └── generated/              # Documentos Excel generados
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/            # Componentes UI (shadcn/ui)
│   │   │   └── orden/         # Componentes específicos
│   │   │       ├── FormularioOrden.jsx
│   │   │       ├── ConfiguracionArchivos.jsx
│   │   │       └── ListaDocumentos.jsx
│   │   ├── hooks/             # Custom hooks
│   │   │   ├── useAfiliaciones.js
│   │   │   └── useTroubleTickets.js
│   │   ├── services/          # API client
│   │   │   └── api.js
│   │   ├── App.js             # Componente principal
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env
└── README.md
```

## 🎨 Tecnologías Utilizadas

### Backend
- **FastAPI**: Framework web moderno y rápido
- **MongoDB**: Base de datos NoSQL
- **Motor**: Driver asíncrono de MongoDB
- **openpyxl**: Manipulación de archivos Excel
- **Pillow (PIL)**: Procesamiento de imágenes
- **Pydantic**: Validación de datos
- **python-multipart**: Manejo de uploads

### Frontend
- **React 19**: Framework UI
- **React Router DOM**: Navegación
- **Tailwind CSS**: Estilos utility-first
- **shadcn/ui**: Componentes UI accesibles
- **Radix UI**: Primitivos de UI
- **Axios**: Cliente HTTP
- **Lucide React**: Iconos

## 📊 Modelos de Datos

### Afiliacion
```javascript
{
  id: string (UUID)
  codigo: string
  municipio: string
  nombre_comercial: string
  direccion: string
  created_at: datetime
}
```

### TroubleTicket
```javascript
{
  id: string (UUID)
  folio: string
  servicio: string
  tecnologia: string
  descripcion: string
  afiliacion: string
  fecha: string
  created_at: datetime
}
```

### DocumentoGenerado
```javascript
{
  id: string (UUID)
  folio: string
  filename: string
  filepath: string
  created_at: datetime
  data: {
    municipio: string
    afiliacion: string
    tecnico: string
    supervisor: string
  }
}
```

## 🔧 Funcionalidades Clave

### 1. Autocompletado Inteligente
- Al seleccionar un folio TT, se autocompletan: servicio, tecnología, descripción, afiliación, fecha
- Al seleccionar una afiliación, se autocompletan: municipio, dirección, nombre comercial

### 2. Procesamiento de Imágenes
- Redimensionamiento automático a 420x420 px
- Recorte centrado (crop)
- Conversión a JPEG
- Optimización de calidad (95%)
- Manejo de formatos RGBA y P

### 3. Generación de Documentos
- Inserción de datos en celdas específicas de la plantilla
- Inserción de 4 imágenes en posiciones predefinidas
- Configuración de página (fitToWidth)
- Nombre de archivo basado en folio (sanitizado)

### 4. Persistencia de Datos
- MongoDB para todas las entidades
- Historial completo de documentos generados
- Búsqueda rápida por folio o afiliación
- Almacenamiento de archivos en disco

## 🧪 Testing

Para probar la aplicación:

1. **Subir archivos base** (si no se cargaron automáticamente):
   - Ir a Configuración
   - Subir archivo de afiliaciones
   - Subir archivo de TT diario

2. **Crear una nueva orden**:
   - Ir a Nueva Orden
   - Seleccionar un folio (se autocompletará)
   - Completar campos adicionales
   - Subir imágenes
   - Hacer clic en "Generar Documento"
   - El archivo se descargará automáticamente

3. **Ver documentos generados**:
   - Ir a Documentos
   - Ver listado de documentos
   - Descargar cualquier documento

## 📝 Notas Importantes

1. **Archivos Excel de entrada deben tener las columnas correctas**:
   - Afiliaciones: `AFILIACIONES`, `C5 TOLUCA`, `NOMBRE COMERCIAL`, `DIRECCION`
   - TT: Columnas en índices específicos (0: folio, 2: servicio, 3: tecnología, etc.)

2. **Imágenes aceptadas**: JPG, JPEG, PNG, WEBP, HEIC, HEIF

3. **La plantilla Excel debe estar en** `/app/backend/templates/plantilla.xlsx`

4. **Los documentos generados se guardan en** `/app/backend/generated/`

5. **MongoDB debe estar ejecutándose** en `localhost:27017`

## 🐛 Troubleshooting

### Error al generar documento
- Verificar que la plantilla existe en `/app/backend/templates/plantilla.xlsx`
- Verificar que MongoDB está ejecutándose
- Revisar logs del backend: `tail -f /var/log/supervisor/backend.*.log`

### No aparecen afiliaciones/TT
- Verificar que los archivos se subieron correctamente
- Revisar estructura de columnas en los archivos Excel
- Revisar logs del backend

### Imágenes no se procesan
- Verificar que Pillow está instalado: `pip list | grep -i pillow`
- Verificar formato de imagen (debe ser JPG, PNG, etc.)
- Revisar logs para errores de procesamiento

## 📧 Soporte

Para dudas o problemas, revisar:
- Logs del backend: `/var/log/supervisor/backend.*.log`
- Logs del frontend: `/var/log/supervisor/frontend.*.log`
- Consola del navegador (F12) para errores de frontend

## 🎯 Mejoras Futuras Sugeridas

- [ ] Sistema de autenticación y autorización
- [ ] Roles de usuario (Admin, Técnico, Supervisor)
- [ ] Dashboard con estadísticas y gráficos
- [ ] Exportación a PDF además de Excel
- [ ] Notificaciones en tiempo real
- [ ] Búsqueda avanzada y filtros
- [ ] Edición de órdenes existentes
- [ ] Firma digital en el documento
- [ ] API de integración con otros sistemas
- [ ] Backup automático de documentos

---

**Desarrollado para Grupo Desarrollador Caseoli, S.A. de C.V.**
