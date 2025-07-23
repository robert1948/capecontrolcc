const request = require('supertest');
const app = require('../server/index');

describe('Payments API', () => {
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

  it('should create a checkout session', async () => {
    const res = await request(app)
      .post('/api/payments/checkout')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.url).toBeDefined();
    expect(res.body.url).toContain('checkout.stripe.com');
  });

  it('should get subscription status', async () => {
    const res = await request(app)
      .get('/api/payments/subscription')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.subscription).toBeDefined();
    expect(['free', 'premium']).toContain(res.body.subscription);
  });

  it('should require authentication for payment operations', async () => {
    const res = await request(app)
      .post('/api/payments/checkout');

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Access token required');
  });

  it('should handle webhook events', async () => {
    const webhookData = {
      type: 'checkout.session.completed',
      data: {
        object: {
          client_reference_id: '1'
        }
      }
    };

    const res = await request(app)
      .post('/api/payments/webhook')
      .send(webhookData);

    expect(res.status).toBe(200);
    expect(res.body.received).toBe(true);
  });
});
