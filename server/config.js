module.exports = {
  port: process.env.PORT || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3001',
  },
};
