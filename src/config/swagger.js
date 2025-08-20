const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const path = require('path');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '2.0.0',
      description: 'API para autenticación y gestión de usuarios, roles y permisos.\n\n**Novedades v2.0.0:**\n- Endpoints CRUD completos para usuarios (/api/user)\n- Validaciones robustas en todos los endpoints\n- Documentación Swagger mejorada',
      contact: {
        name: 'Andres Olarte',
        url: 'https://github.com/andres-olarte396',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.LOCAL_PORT || 4000}`,
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '64e1f2c2b1e4a2a1b2c3d4e5' },
            username: { type: 'string', example: 'testuser' },
            role: { type: 'string', example: 'user' },
            permissions: {
              type: 'array',
              items: { type: 'string', example: 'read' }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'User',
        description: 'Operaciones relacionadas con la gestión de usuarios',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Ruta correcta a los archivos de rutas
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Documentación Swagger disponible en http://localhost:${process.env.LOCAL_PORT}/api-docs`);
};

module.exports = swaggerDocs;
