# Project Structure

This document outlines the organization and architecture of the CapeControl MVP project.

## 📁 Root Directory Structure

```
capecontrolcc/
├── 📁 .github/                    # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml             # CI/CD pipeline configuration
├── 📁 client/                     # React frontend application
├── 📁 server/                     # Node.js/Express backend
├── 📁 docs/                       # Documentation files
├── 📁 scripts/                    # Utility scripts
├── 📁 tests/                      # Test files
├── 📄 .env.example               # Environment variables template
├── 📄 .gitignore                 # Git ignore rules
├── 📄 docker-compose.yml         # Docker development setup
├── 📄 Dockerfile                 # Docker container configuration
├── 📄 Procfile                   # Heroku process configuration
├── 📄 app.json                   # Heroku app configuration
├── 📄 package.json               # Root project dependencies
└── 📄 README.md                  # Main project documentation
```

## 🎨 Frontend Structure (`/client`)

```
client/
├── 📁 public/                     # Static public assets
│   ├── index.html                # Main HTML template
│   ├── favicon.ico               # Website favicon
│   └── manifest.json             # PWA manifest
├── 📁 src/                       # React source code
│   ├── 📁 components/            # Reusable UI components
│   │   ├── auth/                 # Authentication components
│   │   │   ├── LoginForm.js      # Login form component
│   │   │   ├── RegisterForm.js   # Registration form component
│   │   │   └── ProtectedRoute.js # Route protection wrapper
│   │   ├── common/               # Common UI components
│   │   │   ├── Header.js         # Application header
│   │   │   ├── Footer.js         # Application footer
│   │   │   ├── Loading.js        # Loading spinner component
│   │   │   └── ErrorBoundary.js  # Error boundary wrapper
│   │   ├── dashboard/            # Dashboard components
│   │   │   ├── DashboardStats.js # Statistics overview
│   │   │   ├── UsageChart.js     # Usage visualization
│   │   │   └── QuickActions.js   # Action buttons
│   │   └── payments/             # Payment-related components
│   │       ├── SubscriptionCard.js  # Subscription display
│   │       ├── PaymentForm.js    # Payment processing form
│   │       └── BillingHistory.js # Billing history display
│   ├── 📁 pages/                 # Page-level components
│   │   ├── Home.js               # Landing page
│   │   ├── Login.js              # Login page
│   │   ├── Register.js           # Registration page
│   │   ├── Dashboard.js          # User dashboard
│   │   ├── Profile.js            # User profile page
│   │   ├── Billing.js            # Billing management
│   │   └── NotFound.js           # 404 error page
│   ├── 📁 contexts/              # React Context providers
│   │   ├── AuthContext.js        # Authentication context
│   │   ├── PaymentContext.js     # Payment context
│   │   └── ThemeContext.js       # Theme context
│   ├── 📁 hooks/                 # Custom React hooks
│   │   ├── useAuth.js            # Authentication hook
│   │   ├── useApi.js             # API interaction hook
│   │   └── useLocalStorage.js    # Local storage hook
│   ├── 📁 services/              # API service functions
│   │   ├── authService.js        # Authentication API calls
│   │   ├── paymentService.js     # Payment API calls
│   │   ├── aiService.js          # AI processing API calls
│   │   └── apiClient.js          # Base API client
│   ├── 📁 styles/                # Styling files
│   │   ├── globals.css           # Global styles
│   │   ├── tailwind.css          # Tailwind CSS imports
│   │   └── components.css        # Component-specific styles
│   ├── 📁 utils/                 # Utility functions
│   │   ├── helpers.js            # General helper functions
│   │   ├── validators.js         # Form validation functions
│   │   ├── formatters.js         # Data formatting functions
│   │   └── constants.js          # Application constants
│   ├── App.js                    # Main App component
│   ├── index.js                  # React entry point
│   └── setupTests.js             # Test configuration
├── package.json                  # Frontend dependencies
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
└── Dockerfile                    # Frontend Docker configuration
```

## ⚙️ Backend Structure (`/server`)

```
server/
├── 📁 controllers/               # Request handlers
│   ├── authController.js         # Authentication logic
│   ├── userController.js         # User management
│   ├── paymentController.js      # Payment processing
│   ├── aiController.js           # AI processing logic
│   └── healthController.js       # Health check endpoint
├── 📁 middleware/                # Express middleware
│   ├── auth.js                   # JWT authentication middleware
│   ├── validation.js             # Input validation middleware
│   ├── errorHandler.js           # Error handling middleware
│   ├── rateLimit.js              # Rate limiting middleware
│   └── cors.js                   # CORS configuration
├── 📁 routes/                    # API route definitions
│   ├── auth.js                   # Authentication routes
│   ├── users.js                  # User management routes
│   ├── payments.js               # Payment processing routes
│   ├── ai.js                     # AI processing routes
│   └── health.js                 # Health check routes
├── 📁 models/                    # Database models
│   ├── schema.prisma             # Prisma database schema
│   └── index.js                  # Model exports
├── 📁 utils/                     # Utility functions
│   ├── jwt.js                    # JWT helper functions
│   ├── encryption.js             # Encryption utilities
│   ├── validators.js             # Server-side validation
│   ├── emailService.js           # Email sending service
│   └── logger.js                 # Logging configuration
├── config.js                     # Server configuration
└── index.js                      # Express server entry point
```

## 🗄️ Database Schema (`/server/models/schema.prisma`)

```prisma
// User management
model User {
  id          Int      @id @default(autoincrement())
  email       String   @unique
  password    String
  firstName   String?
  lastName    String?
  tier        String   @default("free")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  usage       Usage[]
  payments    Payment[]
}

// Usage tracking
model Usage {
  id        Int      @id @default(autoincrement())
  userId    Int
  action    String
  timestamp DateTime @default(now())
  metadata  Json?
  
  // Relations
  user      User     @relation(fields: [userId], references: [id])
}

// Payment records
model Payment {
  id              Int      @id @default(autoincrement())
  userId          Int
  stripePaymentId String   @unique
  amount          Int      // in cents
  currency        String   @default("usd")
  status          String
  createdAt       DateTime @default(now())
  
  // Relations
  user            User     @relation(fields: [userId], references: [id])
}
```

## 🧪 Testing Structure (`/tests`)

```
tests/
├── 📁 unit/                      # Unit tests
│   ├── controllers/              # Controller unit tests
│   ├── middleware/               # Middleware unit tests
│   ├── utils/                    # Utility function tests
│   └── models/                   # Model tests
├── 📁 integration/               # Integration tests
│   ├── auth.test.js              # Authentication flow tests
│   ├── payments.test.js          # Payment processing tests
│   └── api.test.js               # API endpoint tests
├── 📁 e2e/                       # End-to-end tests
│   ├── user-journey.test.js      # Complete user workflows
│   └── payment-flow.test.js      # Payment processing flows
├── 📁 fixtures/                  # Test data and fixtures
│   ├── users.json                # Sample user data
│   └── payments.json             # Sample payment data
└── setup.js                      # Test environment setup
```

## 📚 Documentation Structure (`/docs`)

```
docs/
├── api/                          # API documentation
│   ├── authentication.md        # Auth API docs
│   ├── payments.md              # Payment API docs
│   └── ai-processing.md         # AI API docs
├── deployment/                   # Deployment guides
│   ├── heroku.md                # Heroku deployment
│   ├── docker.md               # Docker setup
│   └── github-actions.md       # CI/CD setup
├── Customer_Terms_and_Conditions.md
├── Developer_Terms_and_Conditions.md
└── CHANGELOG.md                 # Version history
```

## 🔧 Configuration Files

### Root Level Configuration
- **`package.json`** - Project metadata, scripts, and dependencies
- **`.env.example`** - Environment variable template
- **`docker-compose.yml`** - Development environment setup
- **`Procfile`** - Heroku process definition
- **`app.json`** - Heroku app metadata
- **`jest.config.json`** - Test configuration

### Frontend Configuration
- **`tailwind.config.js`** - Tailwind CSS customization
- **`postcss.config.js`** - PostCSS processing rules
- **`public/manifest.json`** - PWA configuration

### Backend Configuration
- **`server/config.js`** - Server environment configuration
- **`server/models/schema.prisma`** - Database schema definition

## 🚀 Deployment Structure

### GitHub Actions (`.github/workflows/`)
- **`deploy.yml`** - Main CI/CD pipeline
  - Test stage with PostgreSQL service
  - Build and test both frontend and backend
  - Deploy to Heroku on main branch pushes
  - Run database migrations post-deployment

### Heroku Configuration
- **`Procfile`** - Defines web and release processes
- **`app.json`** - App metadata and add-on requirements
- **Build Process** - Automated client build and server setup

## 📦 Dependencies Overview

### Backend Dependencies
- **Runtime**: Express.js, Prisma, Stripe, JWT, bcryptjs
- **Development**: Jest, Nodemon, Supertest
- **Database**: PostgreSQL with Prisma ORM

### Frontend Dependencies
- **Runtime**: React, React Router, Tailwind CSS, Stripe.js
- **Development**: Create React App, Testing Library

## 🔄 Data Flow Architecture

1. **Client Request** → React Frontend
2. **API Call** → Express Backend
3. **Authentication** → JWT Middleware
4. **Business Logic** → Controllers
5. **Data Access** → Prisma ORM
6. **Database** → PostgreSQL
7. **Response** → JSON API Response
8. **UI Update** → React State Management

This structure promotes:
- **Separation of Concerns** - Clear boundaries between layers
- **Scalability** - Modular architecture for easy expansion
- **Maintainability** - Organized code structure for team development
- **Testability** - Isolated components for comprehensive testing
