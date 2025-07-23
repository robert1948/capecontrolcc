# GitHub Actions Deployment to Heroku Setup Guide

## Overview
This guide sets up automatic deployment from GitHub to Heroku using GitHub Actions. Every push to the `main` branch will trigger tests and deploy to your Heroku app.

## Prerequisites
1. GitHub repository: `robert1948/capecontrolcc`
2. Heroku account and Heroku CLI installed
3. Heroku app created: `capecontrolcc`

## Setup Steps

### 1. Create Heroku App (if not already created)
```bash
# Login to Heroku
heroku login

# Create the app
heroku create capecontrolcc

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:essential-0 --app capecontrolcc

# Set buildpack
heroku buildpacks:set heroku/nodejs --app capecontrolcc
```

### 2. Configure Environment Variables on Heroku
```bash
# Set production environment variables
heroku config:set NODE_ENV=production --app capecontrolcc
heroku config:set JWT_SECRET=your_secure_jwt_secret_here --app capecontrolcc
heroku config:set STRIPE_SECRET_KEY=sk_live_your_stripe_secret --app capecontrolcc
heroku config:set STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable --app capecontrolcc
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret --app capecontrolcc
heroku config:set FRONTEND_URL=https://capecontrolcc.herokuapp.com --app capecontrolcc

# The DATABASE_URL is automatically set by the PostgreSQL addon
```

### 3. Get Heroku API Key
```bash
# Get your API key (copy this for GitHub secrets)
heroku auth:token
```

### 4. Configure GitHub Secrets
Go to your GitHub repository: https://github.com/robert1948/capecontrolcc

1. Click **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets:

| Secret Name | Value |
|-------------|-------|
| `HEROKU_API_KEY` | Your Heroku API key from step 3 |
| `HEROKU_APP_NAME` | `capecontrolcc` |
| `HEROKU_EMAIL` | Your Heroku account email |

### 5. Update Heroku Email in Workflow
Edit `.github/workflows/deploy.yml` and replace:
```yaml
heroku_email: "robert1948@example.com"
```
with your actual Heroku email address.

### 6. Set Up Domain (Optional)
```bash
# Add your custom domain
heroku domains:add capecontrol.cc --app capecontrolcc

# View domain settings
heroku domains --app capecontrolcc
```

## GitHub Actions Workflow Features

### 🧪 **Automated Testing**
- Runs on every push and pull request
- Sets up PostgreSQL test database
- Installs dependencies for both backend and frontend
- Runs Jest test suite
- Builds React frontend
- Only deploys if tests pass

### 🚀 **Automated Deployment**
- Deploys only when pushing to `main` branch
- Uses Docker for consistent deployments
- Runs health checks after deployment
- Automatically rolls back on health check failure
- Runs database migrations after successful deployment

### 📊 **Deployment Process**
1. **Test Stage**: Run all tests with PostgreSQL
2. **Deploy Stage**: Deploy to Heroku using Docker
3. **Migrate Stage**: Run database migrations on production

## Workflow File Structure
```yaml
.github/
└── workflows/
    └── deploy.yml
```

## Heroku Configuration Files
- `Procfile`: Defines how Heroku runs your app
- `app.json`: Heroku app configuration
- `package.json`: Updated with Heroku-specific scripts

## Testing the Setup

### 1. Make a Test Change
```bash
# Make a small change to trigger deployment
echo "# Test deployment" >> README.md
git add README.md
git commit -m "Test GitHub Actions deployment"
git push origin main
```

### 2. Monitor the Deployment
1. Go to your GitHub repository
2. Click **Actions** tab
3. Watch the workflow run in real-time
4. Check logs for any issues

### 3. Verify Deployment
```bash
# Check if app is running
curl https://capecontrolcc.herokuapp.com/health

# Check Heroku logs
heroku logs --tail --app capecontrolcc
```

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build logs
heroku logs --app capecontrolcc

# Check GitHub Actions logs
# Go to GitHub → Actions → Failed workflow
```

#### 2. Database Issues
```bash
# Check database connection
heroku pg:info --app capecontrolcc

# Run migrations manually
heroku run npx prisma db push --schema=./server/models/schema.prisma --app capecontrolcc
```

#### 3. Environment Variables
```bash
# List all config vars
heroku config --app capecontrolcc

# Set missing variables
heroku config:set VARIABLE_NAME=value --app capecontrolcc
```

## Security Best Practices

### ✅ **Implemented**
- API keys stored as GitHub secrets
- Environment variables properly configured
- Test database separate from production
- Health checks and rollback on failure

### 🔐 **Additional Recommendations**
- Enable Heroku's automatic security updates
- Set up monitoring with Heroku metrics
- Configure log drains for better monitoring
- Use Heroku's SSL certificates

## Monitoring and Maintenance

### View Application Metrics
```bash
# Open Heroku dashboard
heroku open --app capecontrolcc

# View metrics
heroku logs --tail --app capecontrolcc

# Check dyno status
heroku ps --app capecontrolcc
```

### Manual Deployment (if needed)
```bash
# Deploy manually from local
git push heroku main

# Or trigger GitHub Actions
git push origin main
```

## Next Steps
1. ✅ Set up GitHub secrets with your Heroku API key
2. ✅ Update the email in the workflow file
3. ✅ Push changes to trigger first deployment
4. ✅ Configure custom domain DNS settings
5. ✅ Set up monitoring and alerts
6. ✅ Add staging environment (optional)

Your CapeControl MVP now has continuous deployment! Every push to main will automatically test and deploy your application. 🚀
