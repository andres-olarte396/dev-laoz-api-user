# API de Usuarios - Documentación

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