const request = require('supertest');
const app = require('../server/index');

describe('AI API', () => {
  let authToken;

  beforeAll(async () => {
    // Login to get auth token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    authToken = loginRes.body.token;
  });

  it('should process AI query', async () => {
    const queryData = {
      query: 'What is artificial intelligence?',
      moduleId: 'test-module'
    };

    const res = await request(app)
      .post('/api/ai/query')
      .set('Authorization', `Bearer ${authToken}`)
      .send(queryData);

    expect(res.status).toBe(200);
    expect(res.body.response).toBeDefined();
    expect(res.body.timestamp).toBeDefined();
  });

  it('should require authentication for AI queries', async () => {
    const queryData = {
      query: 'What is artificial intelligence?'
    };

    const res = await request(app)
      .post('/api/ai/query')
      .send(queryData);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Access token required');
  });

  it('should get query history', async () => {
    const res = await request(app)
      .get('/api/ai/history')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
