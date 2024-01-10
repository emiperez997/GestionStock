# Proyecto - Gestion de Stock

## Introducción

En comienzo era un desafío propuesto por [Hola Juniors]("https://www.holajuniors.com/") que consistía en lo siguiente:

Imagina que estás construyendo un sistema de gestión de inventario para una tienda en línea. Debes desarrollar una aplicación que se integre con una base de datos para realizar operaciones de gestión de inventario, como añadir nuevos productos, actualizar la cantidad disponible, y consultar la información del inventario.

1. Diseña un esquema de base de datos que almacene información sobre productos, incluyendo nombre, descripción, precio y cantidad disponible.

2. Implementa operaciones CRUD para gestionar productos en la base de datos.

3. Garantiza la consistencia de la base de datos, manejando adecuadamente transacciones y evitando problemas como la sobreventa de productos.

Este desafío no solo evaluará tu capacidad para integrar una base de datos en una aplicación, sino que también pondrá a prueba su habilidad para diseñar un esquema de base de datos eficiente y manejar situaciones complejas, como la gestión de inventario en un entorno de transacciones en tiempo real.

¡Buena suerte!

Pero lo convertí en una aplicación web completa, con usuarios (administradores y managers), con autorización y autenticación.

## Tecnologías

Backend:

- C#
- ASP.NET Core
- Dotnet 8.0.100
- Entity Framework (Utilizando Fluent API)
- Docker Compose (SQL Server)
- NuGet (Como gestor de paquetes)

Frontend:

- yarn
- React
- React Context
- React Router
- Tailwind CSS
- React Icons
- Uso de Fetch API

## Capturas

![Captura 1](/Pictures/1.png)

![Captura 2](/Pictures/2.png)

![Captura 3](/Pictures/3.png)

![Captura 4](/Pictures/4.png)

![Captura 5](/Pictures/5.png)

![Captura 6](/Pictures/6.png)

## Instalación y ejecución

1. Clonar el repositorio
2. Abrir la carpeta del proyecto en Visual Studio Code
3. Entrar una terminal y dentro de la carpeta de `Backend` ejecutar `dotnet restore`
4. Ejecutar en la consola `docker-compose up -d` para levantar el contenedor de SQL Server
5. Para crear la base de datos ejecutar `dotnet ef database update`
6. Ejecutar `dotnet run` o `dotnet watch run` para ejecutar el proyecto
7. Entrar a la carpeta `Frontend` y ejecutar `yarn install`
8. Ejecutar `yarn start` para ejecutar el proyecto
9. Abrir el navegador en `http://localhost:5173/`

## Enlaces

- [Hola Juniors]("https://www.holajuniors.com/") por el desafío
- [Tailwind CSS]("https://tailwindcss.com/") por el framework CSS
- [React Icons]("https://react-icons.github.io/react-icons/") por los iconos
- [React Router]("https://reactrouter.com/") por el enrutamiento
- [React]("https://es.reactjs.org/") por el framework de JavaScript

## Contacto

- [Github](https://github.com/emiperez997)
- [Linkedin](https://www.linkedin.com/in/emiliano-perez)
- [Email: emi.perez997@gmail.com](mailto:emi.perez997@gmail.com)
