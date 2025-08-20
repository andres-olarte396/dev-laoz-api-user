# 🚀 API de Usuarios

La API de usuarios proporciona servicios CRUD para la gestión de usuarios, incluyendo validaciones robustas y pruebas automatizadas. Es un componente esencial para arquitecturas modernas y seguras.

---

## 📂 **Estructura del Proyecto**

```plaintext
📂 dev-laoz-api-user/
├── 📂 config/
│   ├── db.js                # Configuración de conexión a MongoDB
│   └── swagger.js           # Configuración de Swagger para documentar y consumir APIs
├── 📂 controllers/
│   └── userController.js    # Controladores para gestión de usuarios
├── 📂 middleware/
│   └── (vacío o middlewares generales)
├── 📂 models/
│   └── User.js              # Modelo de datos de usuario (roles y permisos)
├── 📂 routes/
│   └── userRoutes.js        # Rutas CRUD de usuario
├── 📂 test/
│   └── user.test.js         # Pruebas unitarias para la API de usuarios
├── 📂 docs/
│   └── API_Usuarios.md      # Documentación funcional y técnica de la API
├── .env                     # Variables de entorno (no subir a git)
├── .gitignore               # Ignora node_modules y .env
├── package.json             # Dependencias y scripts del proyecto
├── app.js                   # Instancia de Express (para pruebas)
└── server.js                # Archivo principal que corre el servidor
```

---

## 🛠️ **Instalación**

1. Clona este repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd dev-laoz-api-user
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/dev-laoz-api-user
   PORT=4000
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

   La API estará disponible en el puerto configurado (por defecto `4000`).

---

## 🧑‍💻 **Endpoints CRUD de Usuario**

### Crear usuario
**POST** `/api/user`

**Body:**
```json
{
  "username": "testuser",
  "password": "password123",
  "role": "user",
  "permissions": ["read"]
}
```
**Respuestas:**
- `201 Created`: Usuario creado exitosamente.
- `400 Bad Request`: Faltan campos obligatorios o datos inválidos.
- `409 Conflict`: El nombre de usuario ya existe.

---

### Listar usuarios
**GET** `/api/user`

**Respuestas:**
- `200 OK`: Devuelve un array de usuarios.

---

### Obtener usuario por ID
**GET** `/api/user/:id`

**Respuestas:**
- `200 OK`: Devuelve el usuario.
- `400 Bad Request`: ID inválido.
- `404 Not Found`: Usuario no encontrado.

---

### Actualizar usuario
**PUT** `/api/user/:id`

**Body:**
```json
{
  "username": "updateduser",
  "role": "user",
  "permissions": ["read", "write"]
}
```
**Respuestas:**
- `200 OK`: Usuario actualizado.
- `400 Bad Request`: ID inválido o datos inválidos.
- `404 Not Found`: Usuario no encontrado.

---

### Eliminar usuario
**DELETE** `/api/user/:id`

**Respuestas:**
- `204 No Content`: Usuario eliminado.
- `400 Bad Request`: ID inválido.
- `404 Not Found`: Usuario no encontrado.

---

## ✅ **Validaciones y reglas de negocio**

- El campo `username` es obligatorio y debe ser único.
- El campo `password` es obligatorio al crear.
- El campo `role` solo acepta el valor `"user"`.
- El campo `permissions` solo acepta valores `"read"` y/o `"write"`.
- Todos los IDs deben ser válidos de MongoDB.

---

## 🧪 **Pruebas Automatizadas**

Las pruebas unitarias cubren:
- Creación, validación y duplicados.
- Listado y consulta por ID.
- Actualización y validación de datos.
- Eliminación y manejo de IDs inválidos.

Ejecuta las pruebas con:
```bash
npm test
```

---

## 📖 **Documentación Interactiva (Swagger)**

La API cuenta con documentación interactiva generada automáticamente con Swagger. Puedes explorar y probar los endpoints desde tu navegador.

- **URL de la documentación:**
  [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

---

## 📬 **Colección Postman**

Importa el archivo `Dev_LAOZ.postman_collection.json` para probar todos los endpoints y casos de error.  
Incluye scripts para capturar automáticamente el `user_id` y reutilizarlo en las pruebas siguientes.

---

## 📚 **Documentación Funcional y Técnica**

Consulta el archivo [`docs/API_Usuarios.md`](docs/API_Usuarios.md) para ver:
- Descripción de endpoints
- Ejemplos de request/response
- Validaciones y reglas de negocio
- Errores comunes

---

## 🪧 **Tecnologías Utilizadas**

- **Node.js**: Plataforma para construir la API.
- **Express.js**: Framework para manejar rutas y middlewares.
- **MongoDB**: Base de datos para almacenar usuarios.
- **dotenv**: Manejo de variables de entorno.
- **express-validator**: Validación de datos.
- **Jest & Supertest**: Pruebas unitarias y de integración.
- **Swagger**: Documentación interactiva.

---

## 👨‍💻 **Contribuciones**

Si deseas contribuir a este proyecto, realiza un fork del repositorio, haz tus cambios y envía un pull request.

---

## 📜 **Licencia**

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
