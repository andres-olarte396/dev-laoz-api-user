# API de Usuarios - Documentación

## Historias de Usuario

### 1. Como administrador del sistema,
**quiero poder crear un usuario nuevo**  
para registrar personas con un nombre de usuario, contraseña, rol permitido y permisos válidos.

- **Criterios de aceptación:**
  - Debo ingresar un nombre de usuario, contraseña, rol y permisos.
  - Si el nombre de usuario ya existe, debo recibir un mensaje de error claro.
  - Si el rol o los permisos no son válidos, debo recibir un mensaje de error.
  - Si falta algún dato obligatorio, debo recibir un mensaje de error.

---

### 2. Como administrador del sistema,
**quiero poder ver la lista de todos los usuarios registrados**  
para poder gestionar y consultar la información de los usuarios.

- **Criterios de aceptación:**
  - Debo poder obtener un listado de usuarios.
  - Si no hay usuarios, el sistema debe devolver una lista vacía.

---

### 3. Como administrador del sistema,
**quiero poder consultar la información de un usuario específico por su ID**  
para ver sus datos detallados.

- **Criterios de aceptación:**
  - Si el usuario existe, debo ver su información.
  - Si el usuario no existe, debo recibir un mensaje de error.
  - Si el ID no es válido, debo recibir un mensaje de error.

---

### 4. Como administrador del sistema,
**quiero poder actualizar los datos de un usuario existente**  
para corregir o modificar su información.

- **Criterios de aceptación:**
  - Debo poder actualizar el nombre de usuario, rol y permisos.
  - Si el usuario no existe, debo recibir un mensaje de error.
  - Si el ID no es válido, debo recibir un mensaje de error.
  - Si intento actualizar con un rol o permisos inválidos, debo recibir un mensaje de error.

---

### 5. Como administrador del sistema,
**quiero poder eliminar un usuario existente**  
para mantener la base de datos limpia y actualizada.

- **Criterios de aceptación:**
  - Debo poder eliminar un usuario por su ID.
  - Si el usuario no existe, debo recibir un mensaje de error.
  - Si el ID no es válido, debo recibir un mensaje de error.

---

## Endpoints

### 1. Crear usuario
**POST** `/api/user`

**Body (JSON):**
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

### 2. Listar usuarios
**GET** `/api/user`

**Respuestas:**
- `200 OK`: Devuelve un array de usuarios.

---

### 3. Obtener usuario por ID
**GET** `/api/user/:id`

**Respuestas:**
- `200 OK`: Devuelve el usuario.
- `400 Bad Request`: ID inválido.
- `404 Not Found`: Usuario no encontrado.

---

### 4. Actualizar usuario
**PUT** `/api/user/:id`

**Body (JSON):**
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

### 5. Eliminar usuario
**DELETE** `/api/user/:id`

**Respuestas:**
- `204 No Content`: Usuario eliminado.
- `400 Bad Request`: ID inválido.
- `404 Not Found`: Usuario no encontrado.

---

## Validaciones y reglas de negocio

- El campo `username` es obligatorio y debe ser único.
- El campo `password` es obligatorio al crear.
- El campo `role` solo acepta el valor `"user"`.
- El campo `permissions` solo acepta valores `"read"` y/o `"write"`.
- Todos los IDs deben ser válidos de MongoDB.

---

## Ejemplo de respuesta exitosa (GET /api/user)
```json
[
  {
    "_id": "64e1f6e2c2a4e2b1a1b2c3d4",
    "username": "testuser",
    "role": "user",
    "permissions": ["read"]
  }
]
```

---

## Errores comunes

- `400 Bad Request`: Datos faltantes, formato inválido o campos no permitidos.
- `404 Not Found`: Usuario no encontrado.
- `409 Conflict`: Nombre de usuario duplicado.
- `500 Server Error`: Error interno del servidor.

---

## Pruebas automatizadas

Las pruebas unitarias cubren:
- Creación, validación y duplicados.
- Listado y consulta por ID.
- Actualización y validación de datos.
- Eliminación y manejo de IDs inválidos.

---

**Autor:** Equipo de desarrollo LAOZ  
**Fecha:** Agosto 2025