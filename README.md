# TestDev
Ejercicio práctico para perfil de Development 

# Administración de Salas de Juntas

Este proyecto es una aplicación para administrar salas de juntas, donde se pueden reservar salas con un horario inicial y final. Está desarrollado usando Angular para el frontend y Node.js con Express y MySQL para el backend.

## Descripción

La aplicación permite a los usuarios:
- Crear y gestionar salas de juntas.
- Reservar salas para reuniones.
- Ver todas las reservas y salas existentes.
- Actualizar y eliminar reservas y salas.

## Requisitos Previos

- Node.js (v20.10.0 o superior)
- MySQL
- Angular CLI (v17.0.5 o superior)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/AlanUzielo/TestDev.git
    cd tu_repositorio
    ```

2. Instala las dependencias del backend:
    ```bash
    cd backend
    npm install
    ```

3. Instala las dependencias del frontend:
    ```bash
    cd ../frontend
    npm install
    ```

## Configuracion
1. Configura la base de datos MySQL:

2. Configura la conexión a la base de datos en el backend:
    - Edita el archivo `backend/src/conexiondb.js` con tus credenciales de MySQL.

3. Inicia el servidor backend:
    ```bash
    cd backend
    node src/index.js
    ```

4. Inicia el servidor frontend:
    ```bash
    cd ../frontend
    ng serve -o
    ```

## Uso

- Visita `http://localhost:4200` en tu navegador para usar la aplicación frontend.
- El backend estará corriendo en `http://localhost:3000`.

## Contacto

- Autor: Alan Uziel López García
- Email: lalanuziel@gmail.com
