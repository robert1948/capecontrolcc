const request = require('supertest');
const app = require('../server/index');

describe('Auth API', () => {
  it('should register a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User created successfully');
    expect(res.body.userId).toBeDefined();
  });

  it('should login an existing user', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(credentials);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful');
    expect(res.body.userId).toBeDefined();
  });

  it('should reject invalid credentials', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'wrongpassword'
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(credentials);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });
});
