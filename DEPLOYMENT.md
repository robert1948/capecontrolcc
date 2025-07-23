# Deployment Guide

This comprehensive guide covers deployment strategies, configuration, and maintenance for the CapeControl MVP application.

## 🚀 Current Deployment Status

**Production Environment**: ✅ **Live and Operational**
- **URL**: https://capecontrolcc-c2f665014c47.herokuapp.com/
- **Platform**: Heroku
- **Database**: PostgreSQL (Heroku Postgres)
- **CI/CD**: GitHub Actions
- **Status**: Fully automated deployment pipeline

## 📋 Table of Contents

- [Overview](#overview)
- [Production Deployment (Heroku)](#production-deployment-heroku)
- [Development Environment](#development-environment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Configuration](#environment-configuration)
- [Database Management](#database-management)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Troubleshooting](#troubleshooting)

## 🔍 Overview

### Deployment Architecture

```
GitHub Repository
       ↓
GitHub Actions (CI/CD)
       ↓
Heroku Platform
       ↓
PostgreSQL Database
```

### Deployment Types

1. **Automated Deployment** (Recommended)
   - Triggered by pushes to main branch
   - Includes testing, building, and deployment
   - Automatic database migrations

2. **Manual Deployment**
   - Direct git push to Heroku
   - Manual database migration
   - For hotfixes and emergency updates

## 🌐 Production Deployment (Heroku)

### Prerequisites

- Heroku CLI installed
- Git repository access
- Environment variables configured
- GitHub secrets configured

### Initial Setup

1. **Create Heroku Application**
   ```bash
   heroku create capecontrolcc
   heroku addons:create heroku-postgresql:essential-0 --app capecontrolcc
   ```

2. **Configure Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production --app capecontrolcc
   heroku config:set JWT_SECRET=your-super-secret-jwt-key --app capecontrolcc
   heroku config:set FRONTEND_URL=https://capecontrolcc-c2f665014c47.herokuapp.com --app capecontrolcc
   heroku config:set STRIPE_SECRET_KEY=sk_live_... --app capecontrolcc
   heroku config:set STRIPE_PUBLISHABLE_KEY=pk_live_... --app capecontrolcc
   ```

3. **Deploy Application**
   ```bash
   git push heroku main
   ```

### Application Configuration

#### Procfile
```
web: NODE_ENV=production node server/index.js
release: npx prisma generate --schema=./server/models/schema.prisma && npx prisma db push --schema=./server/models/schema.prisma
```

#### app.json
```json
{
  "name": "CapeControl MVP",
  "description": "AI-driven solutions platform",
  "repository": "https://github.com/robert1948/capecontrolcc",
  "keywords": ["node", "express", "react", "postgresql"],
  "addons": [
    {
      "plan": "heroku-postgresql:essential-0",
      "as": "DATABASE"
    }
  ],
  "env": {
    "NODE_ENV": {
      "description": "Environment mode",
      "value": "production"
    },
    "JWT_SECRET": {
      "description": "JWT secret key",
      "generator": "secret"
    },
    "FRONTEND_URL": {
      "description": "Frontend URL",
      "value": "https://capecontrolcc-c2f665014c47.herokuapp.com"
    }
  },
  "scripts": {
    "postdeploy": "npx prisma generate --schema=./server/models/schema.prisma && npx prisma db push --schema=./server/models/schema.prisma"
  }
}
```

## 🛠️ Development Environment

### Local Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/robert1948/capecontrolcc.git
   cd capecontrolcc
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd client && npm install --legacy-peer-deps
   cd ..
   ```

3. **Configure Environment**
   ```bash
   cp env.example .env
   # Edit .env with your local configuration
   ```

4. **Setup Database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start Development**
   ```bash
   # Terminal 1: Backend
   npm run dev:backend
   
   # Terminal 2: Frontend  
   npm run dev:frontend
   ```

### Docker Development

1. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **View Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - Database: localhost:5432

3. **Development Commands**
   ```bash
   # View logs
   docker-compose logs -f
   
   # Restart services
   docker-compose restart
   
   # Stop services
   docker-compose down
   ```

## ⚙️ CI/CD Pipeline

### GitHub Actions Workflow

The deployment pipeline includes three main jobs:

#### 1. Test Job
```yaml
test:
  runs-on: ubuntu-latest
  services:
    postgres:
      image: postgres:14
      env:
        POSTGRES_PASSWORD: postgres
        POSTGRES_DB: test_db
  steps:
    - Install dependencies
    - Setup test environment
    - Generate Prisma client
    - Run database migrations
    - Execute tests
    - Build client
```

#### 2. Deploy Job
```yaml
deploy:
  needs: test
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  steps:
    - Check GitHub secrets
    - Deploy to Heroku
    - Health check validation
```

#### 3. Database Migration Job
```yaml
database-migrate:
  needs: deploy
  runs-on: ubuntu-latest
  steps:
    - Install Heroku CLI
    - Run database migrations
    - Verify migration success
```

### Required GitHub Secrets

Navigate to: `https://github.com/robert1948/capecontrolcc/settings/secrets/actions`

Add the following secrets:
- `HEROKU_API_KEY` - Your Heroku API key
- `HEROKU_EMAIL` - Your Heroku account email

### Deployment Triggers

- **Automatic**: Push to `main` branch
- **Manual**: Re-run GitHub Actions workflow
- **Pull Request**: Tests only (no deployment)

## 🔧 Environment Configuration

### Environment Variables

#### Production (Heroku)
```bash
NODE_ENV=production
DATABASE_URL=postgresql://[automatically_set_by_heroku]
JWT_SECRET=[generated_secret]
FRONTEND_URL=https://capecontrolcc-c2f665014c47.herokuapp.com
STRIPE_SECRET_KEY=sk_live_[your_key]
STRIPE_PUBLISHABLE_KEY=pk_live_[your_key]
```

#### Development (Local)
```bash
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/capecontrol
JWT_SECRET=dev-secret-key
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_[your_test_key]
STRIPE_PUBLISHABLE_KEY=pk_test_[your_test_key]
```

#### Testing
```bash
NODE_ENV=test
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/test_db
JWT_SECRET=test_jwt_secret
STRIPE_SECRET_KEY=sk_test_dummy
```

### Configuration Management

1. **Environment Files**
   - `.env` - Local development
   - `.env.example` - Template for environment variables
   - GitHub Actions - Set in workflow YAML

2. **Heroku Config**
   ```bash
   # View current config
   heroku config --app capecontrolcc
   
   # Set variables
   heroku config:set VARIABLE_NAME=value --app capecontrolcc
   
   # Remove variables
   heroku config:unset VARIABLE_NAME --app capecontrolcc
   ```

## 🗄️ Database Management

### Production Database (Heroku Postgres)

#### Connection Info
```bash
# Get database URL
heroku config:get DATABASE_URL --app capecontrolcc

# Connect to database
heroku pg:psql --app capecontrolcc
```

#### Migrations
```bash
# Generate Prisma client
heroku run "npx prisma generate --schema=./server/models/schema.prisma" --app capecontrolcc

# Push schema changes
heroku run "npx prisma db push --schema=./server/models/schema.prisma" --app capecontrolcc

# View database status
heroku pg:info --app capecontrolcc
```

#### Backup and Restore
```bash
# Create backup
heroku pg:backups:capture --app capecontrolcc

# List backups
heroku pg:backups --app capecontrolcc

# Download backup
heroku pg:backups:download --app capecontrolcc
```

### Development Database

#### Local PostgreSQL Setup
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb capecontrol

# Create user
sudo -u postgres createuser --interactive
```

#### Database Operations
```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Reset database
npx prisma db push --force-reset --schema=./server/models/schema.prisma
```

## 📊 Monitoring and Maintenance

### Health Monitoring

#### Endpoints
- **Health Check**: `GET /health`
- **API Status**: `GET /api/health`

#### Health Check Response
```json
{
  "status": "OK",
  "timestamp": "2025-07-23T14:30:11.741Z",
  "service": "CapeControl MVP API",
  "environment": "production"
}
```

### Application Monitoring

#### Heroku Metrics
```bash
# View app status
heroku ps --app capecontrolcc

# View logs
heroku logs --tail --app capecontrolcc

# View metrics
heroku apps:info capecontrolcc
```

#### Performance Monitoring
- **Response Time**: Target <200ms
- **Memory Usage**: Monitor dyno memory
- **Database Performance**: Query optimization
- **Error Rate**: Track 4xx/5xx responses

### Maintenance Tasks

#### Daily
- [ ] Check application health
- [ ] Monitor error logs
- [ ] Review performance metrics

#### Weekly
- [ ] Database performance review
- [ ] Security update check
- [ ] Backup verification

#### Monthly
- [ ] Dependency updates
- [ ] Security audit
- [ ] Performance optimization review

## 🔧 Troubleshooting

### Common Issues

#### 1. Application Start Issues
```bash
# Check logs
heroku logs --tail --app capecontrolcc

# Common causes:
# - Missing environment variables
# - Database connection issues
# - Build failures
```

#### 2. Database Connection Issues
```bash
# Verify database addon
heroku addons --app capecontrolcc

# Check database URL
heroku config:get DATABASE_URL --app capecontrolcc

# Test connection
heroku pg:psql --app capecontrolcc
```

#### 3. GitHub Actions Failures
```bash
# Common causes:
# - Missing GitHub secrets
# - Test failures
# - Environment configuration issues

# Solutions:
# 1. Check GitHub secrets configuration
# 2. Review workflow logs
# 3. Test locally before pushing
```

#### 4. Build Failures
```bash
# Check build logs
heroku logs --tail --app capecontrolcc

# Common solutions:
# - Clear build cache: heroku plugins:install heroku-builds && heroku builds:cache:purge --app capecontrolcc
# - Check package.json engines
# - Verify dependencies
```

### Debug Commands

#### Application Debug
```bash
# Connect to Heroku dyno
heroku run bash --app capecontrolcc

# Check environment
heroku run env --app capecontrolcc

# Test database connection
heroku run "node -e 'console.log(process.env.DATABASE_URL)'" --app capecontrolcc
```

#### Local Debug
```bash
# Check environment
node -e 'console.log(process.env)'

# Test database connection
npm run db:generate && npx prisma db push --schema=./server/models/schema.prisma

# Run tests
npm test
```

### Emergency Procedures

#### Rollback Deployment
```bash
# Rollback to previous release
heroku releases --app capecontrolcc
heroku rollback v[previous_version] --app capecontrolcc
```

#### Database Recovery
```bash
# Restore from backup
heroku pg:backups:restore [backup_id] DATABASE_URL --app capecontrolcc
```

#### Scale Down/Up
```bash
# Scale down (maintenance)
heroku ps:scale web=0 --app capecontrolcc

# Scale up
heroku ps:scale web=1 --app capecontrolcc
```

## 📚 Additional Resources

### Documentation Links
- [Heroku Dev Center](https://devcenter.heroku.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Support Contacts
- **Heroku Support**: https://help.heroku.com/
- **GitHub Support**: https://support.github.com/
- **Project Issues**: https://github.com/robert1948/capecontrolcc/issues

---

**Last Updated**: July 23, 2025
**Deployment Status**: ✅ Production deployment successful and operational
**Next Review**: Weekly maintenance check scheduled
