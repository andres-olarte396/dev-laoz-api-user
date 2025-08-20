

const express = require('express');
const router = express.Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { body, param } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operaciones relacionadas con la gestión de usuarios
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtiene la lista de usuarios
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', getUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get(
	'/:id',
	[param('id').isMongoId().withMessage('Invalid user ID')],
	getUserById
);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 */
router.post(
	'/',
	[
		body('username')
			.trim()
			.notEmpty().withMessage('Username is required')
			.isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 chars'),
		body('password')
			.notEmpty().withMessage('Password is required')
			.isLength({ min: 8 }).withMessage('Password must be at least 8 chars'),
		body('role')
			.optional()
			.isIn(['user', 'guest', 'admin']).withMessage('Role not allowed'),
		body('permissions')
			.optional()
			.isArray().withMessage('Permissions must be an array')
			.custom((arr) => arr.every(p => ['read', 'write', 'delete'].includes(p)))
			.withMessage('Invalid permission value')
	],
	createUser
);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.put(
	'/:id',
	[
		param('id').isMongoId().withMessage('Invalid user ID'),
		body('username')
			.optional()
			.trim()
			.isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 chars'),
		body('role')
			.optional()
			.isIn(['user', 'guest', 'admin']).withMessage('Role not allowed'),
		body('permissions')
			.optional()
			.isArray().withMessage('Permissions must be an array')
			.custom((arr) => arr.every(p => ['read', 'write', 'delete'].includes(p)))
			.withMessage('Invalid permission value')
	],
	updateUser
);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete(
	'/:id',
	[param('id').isMongoId().withMessage('Invalid user ID')],
	deleteUser
);

module.exports = router;
