# DESAFIOLATAM BAZAR K-FÉ

Bienvenido al repositorio de **DESAFIOLATAM BAZAR K-FÉ**.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Despliegue](#despliegue)
  - [Desplegar el Backend en Render](#desplegar-el-backend-en-render)
  - [Desplegar el Frontend en Netlify](#desplegar-el-frontend-en-netlify)
- [API Endpoints Destacados](#api-endpoints-destacados)

---

## Descripción

Este repositorio contiene el código fuente de la aplicación **Bazar K-FE**, un proyecto fullstack que consta de un **backend** (API en Express y PostgreSQL) y un **frontend** (aplicación React con Vite).

---

## Características

- Registro e inicio de sesión de usuarios.
- Formulario de contacto sin requerir autenticación.
- Gestión y publicación de comentarios.
- Integración con una base de datos PostgreSQL en Render.
- Despliegue del backend en Render y del frontend en Netlify.

---

## Tecnologías

- **Backend:** Node.js, Express, PostgreSQL
- **Frontend:** React, Vite
- **Despliegue:** Render (backend), Netlify (frontend)

---

## Estructura del Proyecto

- **/backend:**  
  Contiene el servidor API desarrollado con Express, que se conecta a una base de datos PostgreSQL.

- **/frontend:**  
  Contiene la aplicación web en React (Vite) que consume la API.

---

## Variables de Entorno

### Backend

Crea un archivo `.env` en el directorio `/backend` con las siguientes variables:

```env
DB_HOST="dpg-cv5ee3ofnakc73es1ao0-a.oregon-postgres.render.com"
DB_DATABASE="bazar_k_fe"
DB_USER="bazar_k_fe_user"
DB_PASSWORD="MOIxvkSfkw58Acoj6fU9bGHBqYsMehHD"
SECRET_JWT_KEY="tu_clave_secreta"
PORT=5000  # Render inyecta la variable PORT automáticamente
```

**Nota:**  
En la configuración de conexión a PostgreSQL, se recomienda usar SSL de la siguiente forma para Render:

```js
ssl: { rejectUnauthorized: false }

```
### Frontend

Crea un archivo `.env` en el directorio `/frontend` con la siguiente variable:

```env
VITE_API_URL=https://bazar-k-fe-1.onrender.com
DESPLIEGUE
```

#### Desplegar el Backend en Render

- **Tipo de Servicio:** Web Service.
- **Directorio Raíz:** `backend`
- **Build Command:** `npm install`  
  *(No es necesario ejecutar un build si el backend es solo Node.js).*
- **Start Command:** `npm start`
- **Variables de Entorno:** Configura las variables de entorno (`DB_HOST`, `DB_DATABASE`, `DB_USER`, `DB_PASSWORD`, `SECRET_JWT_KEY`) en el panel de Render.
- **Puerto:** El servidor debe escuchar en `process.env.PORT`  
  *(Render inyecta automáticamente la variable PORT).*

#### Desplegar el Frontend en Netlify

- **Repositorio:** Conecta tu repositorio de GitHub a Netlify.
- **Directorio Base:** `frontend`
- **Build Command:**  
  - Si usas Vite: `npm run build` *(esto generará una carpeta `dist`)*  
  - Si usas Create React App: `npm run build` *(esto generará una carpeta `build`)*
- **Directorio de Publicación:**  
  - Para Vite: `dist`  
  - Para Create React App: `build`
- **Variables de Entorno:** Agrega la variable `VITE_API_URL` en la configuración de Netlify con el valor `https://bazar-k-fe-1.onrender.com`.

#### API Endpoints Destacados

- **POST** `/registro`: Registro de nuevos usuarios.
- **POST** `/login`: Inicio de sesión.
- **POST** `/contacto`: Envío del formulario de contacto.
- **GET** `/comentarios`: Obtención de comentarios.
- **POST** `/comentarios`: Envío de nuevos comentarios.


