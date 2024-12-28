const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: El usuario ya existe
 *       500:
 *         description: Error del servidor
 */
router.post('/register', registerUser);


module.exports = router;
