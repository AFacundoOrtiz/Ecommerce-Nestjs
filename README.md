<p align="center">
<h1 align="center">🛒 Ecommerce API - NestJS Backend</h1>
</p>

<p align="center">
API REST robusta para e-commerce. Gestión de usuarios, productos, órdenes y archivos.





Developed for <strong>SoyHenry Backend Specialization</strong>
</p>

<p align="center">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/nestjs-%2523E0234E.svg%3Fstyle%3Dfor-the-badge%26logo%3Dnestjs%26logoColor%3Dwhite" alt="NestJS" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/typescript-%2523007ACC.svg%3Fstyle%3Dfor-the-badge%26logo%3Dtypescript%26logoColor%3Dwhite" alt="TypeScript" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/mysql-%252300f.svg%3Fstyle%3Dfor-the-badge%26logo%3Dmysql%26logoColor%3Dwhite" alt="MySQL" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/typeorm-%2523FE0C05.svg%3Fstyle%3Dfor-the-badge%26logo%3Dtypeorm%26logoColor%3Dwhite" alt="TypeORM" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/auth0-%2523EB5424.svg%3Fstyle%3Dfor-the-badge%26logo%3Dauth0%26logoColor%3Dwhite" alt="Auth0" />
<img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white" alt="Swagger" />
</p>

✨ Características Principales

🔐 Autenticación Híbrida: Login tradicional y OAuth 2.0 integrado con Auth0.

🛡️ Autorización RBAC: Control de acceso basado en roles (Admin/User).

🗄️ Persistencia Robusta: Implementación de MySQL en la nube (Railway) con TypeORM.

☁️ Gestión de Archivos: Carga de imágenes optimizada en Cloudinary.

🌱 Seeders Inteligentes: Poblado automático de base de datos para desarrollo.

📄 Documentación Viva: API explorables con Swagger.

🚀 Módulos de la API

Módulo

Endpoint Base

Descripción

Auth

/auth

Registro, Login y gestión de tokens JWT.

Users

/users

CRUD de usuarios y roles administrativos.

Products

/products

Catálogo público y gestión de inventario.

Orders

/orders

Procesamiento de compras.

Files

/files

Upload de imágenes (multipart/form-data).

🛠️ Instalación y Configuración

1. Clonar el repositorio

git clone <url-del-repositorio>
cd Ecommerce-Nestjs


2. Instalar dependencias

npm install


3. Configurar Variables de Entorno

Crea un archivo .env.development en la raíz:

# --- APP ---
PORT=3000
HOST=http://localhost

# --- DATABASE (MySQL Railway) ---
DB_HOST=tu_host_railway
DB_PORT=puerto_railway
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_NAME=railway
DB_SYNC=false

# --- SEEDER ---
RUN_SEEDER=true

# --- AUTH ---
JWT_SECRET=super_secreto
JWT_EXPIRATION=1h

# --- CLOUDINARY ---
CLOUDINARY_CLOUD_NAME=tu_cloud
CLOUDINARY_API_KEY=tu_key
CLOUDINARY_API_SECRET=tu_secret

# --- AUTH0 ---
AUTH0_DOMAIN=tu-dominio.auth0.com
AUTH0_CLIENT_ID=tu_id
AUTH0_CLIENT_SECRET=tu_secret
AUTH0_CALLBACK_URL=http://localhost:3000/callback


4. Base de Datos

npm run migration:run


5. Ejecutar

npm run start:dev


📚 Documentación (Swagger)

Con el servidor corriendo, entra a:

👉 http://localhost:3000/api

Clic en Authorize.

Ingresa tu token JWT (obtenido en /auth/signin).

Prueba los endpoints.

🌱 Seeders (Datos de Prueba)

Configura RUN_SEEDER=true en tu .env y reinicia la app para cargar automáticamente:

Roles (Admin/User)

Usuarios de prueba

Categorías

Productos

<p align="center">
Desarrollado para la especialización backend de SoyHenry
</p>
