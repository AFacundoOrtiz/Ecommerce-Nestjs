<p align="center">
  <h1 align="center">🛒 Ecommerce API - NestJS Backend</h1>
</p>

<p align="center">
  API REST robusta para e-commerce. Gestión de usuarios, productos, órdenes y archivos con seguridad profesional.
  
  Developed for <strong>SoyHenry Backend Specialization</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/typeorm-%23FE0C05.svg?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM" />
  <img src="https://img.shields.io/badge/auth0-%23EB5424.svg?style=for-the-badge&logo=auth0&logoColor=white" alt="Auth0" />
  <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white" alt="Swagger" />
</p>

---

## ✨ Características Principales

- **🔐 Autenticación Híbrida:** Login tradicional y OAuth 2.0 integrado con **Auth0**.
- **🛡️ Autorización RBAC:** Control de acceso basado en roles (Admin/User).
- **🗄️ Persistencia Robusta:** Implementación de **MySQL** en la nube (Railway) con **TypeORM**.
- **☁️ Gestión de Archivos:** Carga de imágenes optimizada en **Cloudinary**.
- **🌱 Seeders Inteligentes:** Poblado automático de base de datos para desarrollo.
- **📄 Documentación Viva:** API explorables con **Swagger**.

## 🚀 Módulos de la API

| Módulo | Endpoint Base | Descripción |
| :--- | :--- | :--- |
| **Auth** | `/auth` | Registro, Login y gestión de tokens JWT. |
| **Users** | `/users` | CRUD de usuarios y roles administrativos. |
| **Products** | `/products` | Catálogo público y gestión de inventario. |
| **Orders** | `/orders` | Procesamiento de compras. |
| **Files** | `/files` | Upload de imágenes (`multipart/form-data`). |

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd Ecommerce-Nestjs
```
### 2. Instalar dependencias
```bash
npm install
```
### 3. Configurar Variables de Entorno
Crea un archivo `.env.development` en la raíz con el siguiente contenido:

```properties
# --- APP ---
PORT=3000
HOST=http://localhost

# --- DATABASE (MySQL Railway) ---
# Usa los datos de "Connect" -> "Public Networking" en Railway
DB_HOST=tu_host_railway
DB_PORT=puerto_railway
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_NAME=railway
DB_SYNC=false

# --- SEEDER ---
# true = Carga datos de prueba al iniciar (Roles, Users, Products)
RUN_SEEDER=true

# --- AUTH ---
JWT_SECRET=super_secreto_seguro
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
```
### 4. Base de Datos (Migraciones)
Este proyecto usa MySQL. Asegúrate de ejecutar las migraciones:

```bash
npm run migration:run
```
### 5. Ejecutar Servidor
```bash
npm run start:dev
```
## 📚 Documentación (Swagger)

Con el servidor corriendo, entra a:

👉 **[http://localhost:3000/api](http://localhost:3000/api)**

1. Clic en el botón verde **Authorize**.
2. Ingresa tu token JWT (obtenido en `/auth/signin`).
3. Prueba los endpoints.

## 🌱 Seeders (Datos de Prueba)

El sistema incluye una carga automática de datos.

1. Configura `RUN_SEEDER=true` en tu `.env.development`.
2. Reinicia la aplicación (`npm run start:dev`).
3. Verás en la consola que se crean usuarios, categorías y productos automáticamente.

**Nota:** Una vez cargados los datos, puedes cambiar la variable a `false` para iniciar más rápido.

---
