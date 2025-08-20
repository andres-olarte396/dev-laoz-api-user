// Middleware de ejemplo para verificar permisos de usuario
module.exports = (requiredPermission) => (req, res, next) => {
  if (!req.user || !req.user.permissions || !req.user.permissions.includes(requiredPermission)) {
    return res.status(403).json({ message: 'Permiso denegado' });
  }
  next();
};
