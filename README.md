<p align="center">
<h1>🛒 Ecommerce API - NestJS Backend</h1>
</p>

<p align="center">
Avanzada API REST para e-commerce. Gestión de usuarios, productos, órdenes y archivos con seguridad robusta.
</p>

<p align="center">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/nestjs-%2523E0234E.svg%3Fstyle%3Dfor-the-badge%26logo%3Dnestjs%26logoColor%3Dwhite" alt="NestJS" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/typescript-%2523007ACC.svg%3Fstyle%3Dfor-the-badge%26logo%3Dtypescript%26logoColor%3Dwhite" alt="TypeScript" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/mysql-%252300f.svg%3Fstyle%3Dfor-the-badge%26logo%3Dmysql%26logoColor%3Dwhite" alt="MySQL" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/typeorm-%2523FE0C05.svg%3Fstyle%3Dfor-the-badge%26logo%3Dtypeorm%26logoColor%3Dwhite" alt="TypeORM" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/auth0-%2523EB5424.svg%3Fstyle%3Dfor-the-badge%26logo%3Dauth0%26logoColor%3Dwhite" alt="Auth0" />
<img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white" alt="Swagger" />
</p>

<hr>

✨ Características Principales

🔐 Autenticación Híbrida: Login tradicional y OAuth 2.0 integrado con Auth0.

🛡️ Autorización RBAC: Control de acceso basado en roles (Admin/User) con Guards personalizados.

🗄️ Persistencia Robusta: Implementación de MySQL en la nube (Railway) gestionada por TypeORM.

☁️ Gestión de Archivos: Carga y almacenamiento optimizado de imágenes en Cloudinary.

🌱 Seeders Inteligentes: Sistema automático para poblar la base de datos en entornos de desarrollo.

doc Documentación Viva: API totalmente documentada y testeable con Swagger.

✨ Calidad de Código: Estandarización con ESLint y Prettier.

🚀 Módulos de la API

Módulo

Endpoint Base

Descripción

Auth

/auth

Registro, Login y gestión de tokens JWT.

Users

/users

CRUD de usuarios y asignación de roles administrativos.

Products

/products

Catálogo público y gestión privada de inventario.

Orders

/orders

Procesamiento de compras y relación usuario-producto.

Files

/files

Upload de imágenes vinculadas a productos.

🛠️ Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local.

1. Clonar el repositorio

git clone <url-del-repositorio>
cd Ecommerce-Nestjs


2. Instalar dependencias

npm install


3. Configurar Variables de Entorno

Crea un archivo llamado .env.development en la raíz del proyecto y configura tus credenciales:

# --- APP CONFIG ---
PORT=3000
HOST=http://localhost

# --- DATABASE (MySQL Railway/Local) ---
DB_HOST=tu_host_mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_NAME=ecommerce_db
DB_SYNC=false

# --- SEEDER ---
# true = Carga datos iniciales al arrancar
RUN_SEEDER=true

# --- SEGURIDAD ---
JWT_SECRET=secreto_super_seguro
JWT_EXPIRATION=1h

# --- CLOUDINARY ---
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# --- AUTH0 ---
AUTH0_DOMAIN=tu-dominio.auth0.com
AUTH0_CLIENT_ID=tu_client_id
AUTH0_CLIENT_SECRET=tu_client_secret
AUTH0_CALLBACK_URL=http://localhost:3000/callback


4. Base de Datos y Migraciones

Sincroniza el esquema con tu base de datos MySQL.

# Ejecutar migraciones
npm run migration:run


5. Iniciar el Servidor

# Modo desarrollo
npm run start:dev


📚 Documentación (Swagger)

Con el servidor corriendo, visita la documentación interactiva:

👉 http://localhost:3000/api

Authorize: Haz clic en el botón verde y pega tu token JWT (obtenido en /auth/signin).

Try it out: Prueba los endpoints directamente desde el navegador.

🌱 Seeders (Datos de Prueba)

El proyecto incluye datos pre-cargados para facilitar el testing.

Automático:
Configura RUN_SEEDER=true en el .env y reinicia la app.

Manual (Vía API):

POST /seed/roles (Crea roles Admin/User)

POST /seed/users (Crea usuario de prueba)

POST /seed/categories (Crea categorías)

POST /seed/products (Crea productos)

🧪 Testing

# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Coverage
npm run test:cov


<p align="center">
Desarrollado con ❤️ para la especialización Backend de SoyHenry
</p>