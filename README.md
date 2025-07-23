# CapeControl MVP

[![Deploy to Heroku](https://github.com/robert1948/capecontrolcc/actions/workflows/deploy.yml/badge.svg)](https://github.com/robert1948/capecontrolcc/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Heroku-purple)](https://capecontrolcc-c2f665014c47.herokuapp.com/)

A comprehensive platform for AI-driven solutions with a freemium model, featuring user authentication, payment processing, and scalable AI processing capabilities.

## 🚀 Live Application

- **Production URL**: https://capecontrolcc-c2f665014c47.herokuapp.com/
- **API Health Check**: https://capecontrolcc-c2f665014c47.herokuapp.com/health
- **Status**: ✅ Fully Deployed and Operational

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - JWT-based authentication system
- 💳 **Payment Processing** - Stripe integration for subscription management
- 🤖 **AI Processing** - Scalable AI workflow processing
- 📊 **Usage Tracking** - Monitor and track user activity
- 📱 **Responsive UI** - Modern React frontend with Tailwind CSS

### Business Model
- 💰 **Freemium Model** - Free tier with premium upgrade options
- 📈 **Usage-based Billing** - Flexible pricing based on consumption
- 🎯 **Multi-tier Access** - Different feature sets for different user levels

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Tailwind CSS** - Utility-first CSS framework
- **Stripe.js** - Payment processing integration
- **React Router** - Client-side routing

### Backend
- **Node.js 18** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma ORM** - Database toolkit and ORM
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Token authentication
- **Stripe API** - Payment processing

### DevOps & Deployment
- **GitHub Actions** - CI/CD pipeline
- **Heroku** - Cloud platform deployment
- **Docker** - Containerization (development)
- **Jest** - Testing framework

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- PostgreSQL database
- Heroku CLI (for deployment)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/robert1948/capecontrolcc.git
   cd capecontrolcc
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install --legacy-peer-deps
   cd ..
   ```

3. **Environment setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start development**
   ```bash
   # Terminal 1: Backend
   npm run dev:backend
   
   # Terminal 2: Frontend
   npm run dev:frontend
   ```

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev:backend` | Start backend in development mode |
| `npm run dev:frontend` | Start frontend in development mode |
| `npm run build` | Build frontend for production |
| `npm test` | Run all tests |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push database schema |

### Environment Variables

Create a `.env` file based on `env.example`:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/capecontrol"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Application
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

### Docker Development

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🚢 Deployment

### Automated Deployment (Recommended)

The project includes automated CI/CD via GitHub Actions:

1. **Push to main branch** triggers automatic deployment
2. **Tests run** on every push and pull request
3. **Deploy to Heroku** on successful main branch pushes
4. **Database migrations** run automatically post-deployment

### Manual Deployment

```bash
# Deploy to Heroku
npm run deploy:heroku

# Or using Heroku CLI
git push heroku main
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Payment Endpoints
- `POST /api/payments/create-subscription` - Create Stripe subscription
- `GET /api/payments/subscription-status` - Check subscription status

### AI Processing Endpoints
- `POST /api/ai/process` - Submit AI processing job
- `GET /api/ai/status/:jobId` - Check job status

### Health Check
- `GET /health` - Application health status

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed project organization.

## 📊 Implementation Status

Current implementation status and roadmap available in [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages

## 📄 Legal

- **Customer Terms**: [Customer Terms and Conditions](./docs/Customer_Terms_and_Conditions.md)
- **Developer Terms**: [Developer Terms and Conditions](./docs/Developer_Terms_and_Conditions.md)

## 📧 Support

For support and questions:
- Create an issue on GitHub
- Check existing documentation
- Review the deployment guides

## 🎯 Roadmap

- [ ] Enhanced AI model integration
- [ ] Real-time processing updates
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] API rate limiting
- [ ] Advanced user roles and permissions

---

**CapeControl MVP** - Empowering businesses with AI-driven solutions.
