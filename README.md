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
Configuración de la Base de Datos
Crear la Base de Datos
Asegúrate de que PostgreSQL esté en ejecución y crea la base de datos para la aplicación:

Conéctate a PostgreSQL:
```bash
psql -U postgres
```

Crea la base de datos:
```bash
CREATE DATABASE inventarioBD;
```
