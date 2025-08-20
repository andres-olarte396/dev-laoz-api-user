const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const app = require('../src/app'); 


describe('User API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/user', () => {
    it('debe crear un usuario válido', async () => {
      const res = await request(app)
        .post('/api/user')
        .send({ username: 'testuser', password: 'password123', role: 'user', permissions: ['read'] });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.username).toBe('testuser');
    });

    it('debe rechazar usuario sin username', async () => {
      const res = await request(app)
        .post('/api/user')
        .send({ password: 'password123' });
      expect(res.statusCode).toBe(400);
    });

    it('debe rechazar usuario sin password', async () => {
      const res = await request(app)
        .post('/api/user')
        .send({ username: 'testuser' });
      expect(res.statusCode).toBe(400);
    });

    it('debe rechazar usuario con username duplicado', async () => {
      await User.create({ username: 'testuser', password: 'password123', role: 'user', permissions: ['read'] });
      const res = await request(app)
        .post('/api/user')
        .send({ username: 'testuser', password: 'password123', role: 'user', permissions: ['read'] });
      expect(res.statusCode).toBe(409); // O el código que uses para duplicados
    });

    it('debe rechazar usuario con rol inválido', async () => {
      const res = await request(app)
        .post('/api/user')
        .send({ username: 'testuser2', password: 'password123', role: 'admin', permissions: ['read'] });
      expect(res.statusCode).toBe(400);
    });

    it('debe rechazar usuario con permisos inválidos', async () => {
      const res = await request(app)
        .post('/api/user')
        .send({ username: 'testuser3', password: 'password123', role: 'user', permissions: ['invalid'] });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/user', () => {
    it('debe devolver un array vacío si no hay usuarios', async () => {
      const res = await request(app).get('/api/user');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    it('debe devolver un array de usuarios', async () => {
      await User.create({ username: 'testuser', password: 'password123', role: 'user', permissions: ['read'] });
      const res = await request(app).get('/api/user');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/user/:id', () => {
    it('debe devolver un usuario por ID', async () => {
      const user = await User.create({ username: 'testuser', password: 'password123', role: 'user', permissions: ['read'] });
      const res = await request(app).get(`/api/user/${user._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.username).toBe('testuser');
    });

    it('debe devolver 404 si el usuario no existe', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/user/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });

    it('debe devolver 400 si el ID es inválido', async () => {
      const res = await request(app).get('/api/user/123');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('PUT /api/user/:id', () => {
    it('debe actualizar un usuario existente', async () => {
      const user = await User.create({ username: 'testuser', password: 'password123', role: 'user', permissions: ['read'] });
      const res = await request(app)
        .put(`/api/user/${user._id}`)
        .send({ username: 'updateduser' });
      expect(res.statusCode).toBe(200);
      expect(res.body.username).toBe('updateduser');
    });

    it('debe devolver 404 si el usuario no existe', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/user/${fakeId}`)
        .send({ username: 'updateduser' });
      expect(res.statusCode).toBe(404);
    });

    it('debe devolver 400 si el ID es inválido', async () => {
      const res = await request(app)
        .put('/api/user/123')
        .send({ username: 'updateduser' });
      expect(res.statusCode).toBe(400);
    });

    it('debe rechazar actualización con datos inválidos', async () => {
      const user = await User.create({ username: 'testuser', password: 'password123', role: 'user', permissions: ['read'] });
      const res = await request(app)
        .put(`/api/user/${user._id}`)
        .send({ role: 'admin' });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('DELETE /api/user/:id', () => {
    it('debe eliminar un usuario existente', async () => {
      const user = await User.create({ username: 'testuser', password: 'password123', role: 'user', permissions: ['read'] });
      const res = await request(app).delete(`/api/user/${user._id}`);
      expect(res.statusCode).toBe(204);
    });

    it('debe devolver 404 si el usuario no existe', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/user/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });

    it('debe devolver 400 si el ID es inválido', async () => {
      const res = await request(app).delete('/api/user/123');
      expect(res.statusCode).toBe(400);
    });
  });
});
