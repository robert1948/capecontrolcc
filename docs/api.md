# CapeControl API Documentation

## Overview
The CapeControl API provides access to AI-driven solutions through RESTful endpoints.

## Base URL
```
https://api.capecontrol.cc/api
```

## Authentication
All API requests require authentication using Bearer tokens:
```
Authorization: Bearer <your-token>
```

## Endpoints

### Authentication

#### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "userId": "number"
}
```

#### POST /auth/login
Authenticate user and receive access token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "userId": "number",
  "token": "string"
}
```

### AI Services

#### POST /ai/query
Submit an AI query for processing.

**Request Body:**
```json
{
  "query": "string",
  "moduleId": "string (optional)"
}
```

**Response:**
```json
{
  "response": "string",
  "timestamp": "string"
}
```

#### GET /ai/history
Get user's query history.

**Response:**
```json
[
  {
    "id": "number",
    "moduleId": "string",
    "queryCount": "number",
    "revenue": "number",
    "createdAt": "string"
  }
]
```

### Payments

#### POST /payments/checkout
Create a Stripe checkout session for premium subscription.

**Response:**
```json
{
  "url": "string"
}
```

#### GET /payments/subscription
Get current subscription status.

**Response:**
```json
{
  "subscription": "free|premium"
}
```

#### POST /payments/webhook
Stripe webhook endpoint for payment events.

## Error Responses
All endpoints may return error responses in the following format:
```json
{
  "error": "Error message"
}
```

## Rate Limiting
- Free tier: 100 requests per hour
- Premium tier: Unlimited requests

## SDK Examples

### JavaScript
```javascript
import api from './api';

// Login
const { data } = await api.post('/auth/login', {
  email: 'user@example.com',
  password: 'password'
});

// Submit AI query
const response = await api.post('/ai/query', {
  query: 'What is the weather like?'
});
```

### cURL
```bash
# Login
curl -X POST https://api.capecontrol.cc/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Submit query
curl -X POST https://api.capecontrol.cc/api/ai/query \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"query":"What is the weather like?"}'
```

## Support
For API support, contact: api-support@capecontrol.cc
