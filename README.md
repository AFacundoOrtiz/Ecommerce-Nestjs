🛒 Ecommerce API - NestJS Backend

API REST robusta diseñada para gestionar un sistema de comercio electrónico completo. Incluye autenticación segura, gestión de roles, carga de archivos y procesamiento de órdenes. Desarrollada como parte de la especialización en Backend (Módulo 4 - SoyHenry).

✨ Características Principales

Autenticación Híbrida: Soporte para Login tradicional y OAuth mediante Auth0.

Autorización por Roles: Protección de rutas mediante Guards y Roles (Admin/User).

Gestión de Base de Datos: Persistencia de datos usando TypeORM con MySQL (migrado desde PostgreSQL).

Carga de Archivos: Integración con Cloudinary para almacenamiento de imágenes de productos.

Seeders Automáticos: Poblado inteligente de la base de datos para entornos de desarrollo.

Documentación Viva: API documentada completamente con Swagger.

Calidad de Código: Configuración estricta con ESLint y Prettier.

🚀 Módulos de la API

Módulo

Descripción

Auth

Registro (/signup) e inicio de sesión (/signin) con generación de JWT.

Users

Gestión de usuarios (CRUD), historial de compras y asignación de roles de administrador.

Products

Catálogo de productos con paginación, filtrado y gestión de stock.

Categories

Clasificación de productos (creada vía Seeders).

Orders

Creación de órdenes de compra con validación de stock y relación usuario-producto.

Files

Subida de imágenes (multipart/form-data) vinculadas a productos.

🛠️ Instalación y Configuración

1. Clonar el repositorio

git clone <url-del-repositorio>
cd Ecommerce-Nestjs


2. Instalar dependencias

npm install


3. Configurar Variables de Entorno

Crea un archivo llamado .env.development en la raíz del proyecto. Puedes copiar el siguiente template y rellenarlo con tus credenciales:

# --- APP CONFIG ---
PORT=3000
HOST=http://localhost

# --- DATABASE (MySQL) ---
# Si usas Railway u otro servicio, usa las credenciales públicas
DB_HOST=tu_host_mysql
DB_PORT=3306
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
DB_SYNC=false

# --- SEEDER AUTOMÁTICO ---
# true = Ejecuta el llenado de datos al iniciar la app
RUN_SEEDER=true

# --- JWT ---
JWT_SECRET=tu_secreto_super_seguro
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

Este proyecto utiliza Migraciones para gestionar el esquema de la base de datos.

# Ejecutar migraciones (Crear tablas)
npm run migration:run

# (Opcional) Si haces cambios en las entidades y necesitas una nueva migración:
# npm run migration:generate -- src/migrations/nombre_del_cambio


5. Iniciar el Servidor

# Modo desarrollo (con watch)
npm run start:dev


La API estará corriendo en: http://localhost:3000

📚 Documentación (Swagger)

Una vez iniciada la aplicación, puedes acceder a la documentación interactiva y probar los endpoints directamente desde el navegador:

👉 URL: http://localhost:3000/api

Desde allí podrás:

Ver todos los esquemas de datos (DTOs).

Autenticarte (botón Authorize) pegando tu Token JWT.

Ejecutar peticiones de prueba.

🌱 Seeders (Poblado de Datos)

El proyecto incluye un sistema de llenado de datos iniciales.

Método Automático:
Configura RUN_SEEDER=true en tu .env.development y reinicia el servidor. Se crearán automáticamente:

Roles

Usuarios de prueba

Categorías

Productos

Método Manual (Endpoints):
Puedes disparar los seeders individualmente desde Swagger bajo la etiqueta Seeders:

POST /seed/roles

POST /seed/users

POST /seed/categories

POST /seed/products

🧪 Testing

# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov


📝 Licencia

Este proyecto está bajo la Licencia MIT.