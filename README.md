# API REST de Clientes - Taller de Plataformas Web (Semana 9)

Este proyecto consiste en una API REST segura y funcional desarrollada con Node.js y Express.js, conectada a una base de datos relacional MySQL a través de XAMPP. La aplicación permite gestionar de forma completa el ciclo de vida de la entidad `cliente` mediante operaciones CRUD, aplicando buenas prácticas de desarrollo backend, manejo estricto de códigos de estado HTTP y medidas avanzadas de seguridad informática.

## 📋 Estructura del Modelo de Datos

La base de datos relacional está compuesta por la entidad `cliente`, estructurada bajo las siguientes especificaciones técnicas:

* `id_cliente` (INT): Clave primaria, autoincremental.
* `nombre` (VARCHAR): Nombre completo del cliente.
* `email` (VARCHAR): Dirección de correo electrónico, definida como campo ÚNICO a nivel de esquema.
* `telefono` (VARCHAR): Teléfono de contacto.
* `created_at` (DATETIME): Marca de tiempo generada automáticamente al registrar el usuario.

## 🔒 Medidas de Seguridad Implementadas

Como profesional de ciberseguridad, la integridad de los datos es un pilar fundamental en este desarrollo:
Prevención de Inyección SQL: Todas las interacciones con la base de datos se ejecutan utilizando consultas preparadas (parametrizadas mediante marcadores de posición `?`). Esto garantiza la separación estricta entre la lógica de la consulta SQL y los datos provistos por el usuario, neutralizando vectores de ataque de inyección.
Manejo Crítico de Errores (Conflictos): Se implementó una lógica de control de excepciones que intercepta los códigos de error del motor de bases de datos. Ante un intento de duplicidad en el campo `email` (violación de restricción única), la API responde de forma precisa con un código de estado HTTP 409 Conflict, evitando la filtración o corrupción de datos.

## 🚀 Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de contar con las siguientes herramientas instaladas en tu entorno local:
* [Node.js](https://nodejs.org/)
* [XAMPP](https://www.apachefriends.org/) (Para los servicios de Apache y MySQL)
* [Postman](https://www.postman.com/) (Para la validación y ejecución de pruebas)

## 🛠️ Instalación y Configuración

1. Descargar o Clonar el Repositorio:
   Asegúrate de extraer los archivos en tu directorio de trabajo local.

2. Instalación de Dependencias:
   Abre una terminal dentro de la raíz del proyecto y ejecuta el siguiente comando para instalar las librerías necesarias:
   \`\`\`bash
   npm install
   \`\`\`

3. Configuración de la Base de Datos (XAMPP):
   * Inicia el panel de control de XAMPP y enciende los módulos Apache y MySQL.
   * Accede a tu gestor web a través de `http://localhost/phpmyadmin/`.
   * Crea una nueva base de datos llamada `clase_semana9`.
   * Dirígete a la pestaña SQL, pega el siguiente script y presiona Continuar:
     \`\`\`sql
     CREATE TABLE IF NOT EXISTS cliente (
         id_cliente INT AUTO_INCREMENT PRIMARY KEY,
         nombre VARCHAR(100) NOT NULL,
         email VARCHAR(100) NOT NULL UNIQUE,
         telefono VARCHAR(20) NOT NULL,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
     );
     \`\`\`

## ⚙️ Ejecución del Servidor

Para levantar el entorno local de la API, ejecuta el comando de arranque configurado:

\`\`\`bash
npm start
\`\`\`

La terminal confirmará el estado de los servicios con los siguientes mensajes:
> ¡Conectado exitosamente a la Base de Datos en XAMPP!
> Servidor escuchando en http://localhost:3000

## 🧪 Pruebas de Funcionamiento con Postman

En la raíz de este proyecto se adjunta el archivo de colección de pruebas:
📄 `API_REST_Clientes.postman_collection.json`

### Endpoints Disponibles

| Método | Endpoint | Cuerpo (JSON) / Parámetros | Código Esperado | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/clientes` | `{"nombre", "email", "telefono"}` | **201 Created** | Registra un nuevo cliente en el sistema. |
| POST | `/clientes` | `{"nombre", "email" (duplicado), ...}` | **409 Conflict** | Control de error ante correos duplicados. |
| GET | `/clientes` | *Ninguno* | **200 OK** | Retorna la lista completa de clientes registrados. |
| GET | `/clientes/:id` | `id_cliente` en URL | **200 OK** / **404** | Retorna un cliente específico o error si no existe. |
| PUT | `/clientes/:id` | `{"nombre", "email", "telefono"}` | **200 OK** | Actualiza los campos de un cliente existente. |
| DELETE| `/clientes/:id` | `id_cliente` en URL | **200 OK** | Remueve permanentemente un registro por su ID. |

Para validar el ecosistema, importa la colección en tu cliente Postman y ejecuta el set de pruebas secuencialmente.
