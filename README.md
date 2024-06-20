# Instrucciones para Desplegar y Usar el Software

A continuación, se presentan las instrucciones detalladas para desplegar y utilizar el software de inventario desarrollado con Node.js, Sequelize y PostgreSQL según la prueba técnica.
## Descripción del Proyecto

Este proyecto es un sistema de inventario desarrollado con Node.js, utilizando el ORM Sequelize para manejar la base de datos PostgreSQL. El sistema permite la gestión de usuarios, productos y compras, con roles de administrador y cliente. Además, incluye la generación de documentación de la API utilizando APIDoc.

## Requisitos Previos

Antes de desplegar y utilizar el software, asegúrate de tener los siguientes componentes instalados en tu sistema:

- **Node.js** y **npm**: 
- **PostgreSQL**:

## Clonar el Repositorio

Primero, clona el repositorio del proyecto desde GitHub:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```
##  Instalación de Dependencias

Instala todas las dependencias necesarias utilizando npm:

```bash
npm install
```
##  Configuración de la Base de Datos
Crear la Base de Datos
PostgreSQL debe estar en ejecución y crea la base de datos para la aplicación:

Conéctate a PostgreSQL:
```bash
psql -U postgres
```

Crea la base de datos:
```bash
CREATE DATABASE inventarioBD;
```

Configurar las Variables de Entorno
Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias.

Edita el archivo .env y añade las siguientes configuraciones:

```bash
DB_NAME=inventarioBD
DB_USER=postgres
DB_PASS=root
DB_HOST=127.0.0.1
DB_DIALECT=postgres
DB_PORT=5432
JWT_SECRET=jwt
PORT=3000
```
## Iniciar la Aplicación
Inicia la aplicación utilizando el siguiente comando:
```bash
npm start
```
La aplicación estará disponible en http://localhost:3000.

## Generar y Servir la Documentación APIDoc
Generar la Documentación
Luego, genera la documentación utilizando el siguiente comando:
```bash
apidoc -i src/ -o apidoc/
```

Servir la Documentación
Puedes servir la documentación generada utilizando un servidor estático como http-server. Primero, instala http-server si no lo tienes:

```bash
npm install -g http-server
```

Luego, sirve la documentación:

```bash
http-server apidoc/
```

La documentación estará disponible en http://localhost:8080
