# CapeControl MVP

A platform for AI-driven solutions with a freemium model.

## Setup

1. Clone the repo: `git clone https://github.com/robert1948/capecontrolcc`
2. Install dependencies: `npm install`
3. Copy `env.example` to `.env` and set variables.
4. Run locally: `docker-compose up`
5. Deploy to Heroku: `heroku container:push web --app capecontrolcc`

## Environment Variables

- DATABASE_URL: PostgreSQL connection string
- STRIPE_SECRET_KEY: Stripe secret key
- STRIPE_PUBLISHABLE_KEY: Stripe publishable key

## Legal

- Customer Terms: See `/docs/Customer_Terms_and_Conditions.md`
- Developer Terms: See `/docs/Developer_Terms_and_Conditions.md`
