# Historias de Usuario - API de Usuarios

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