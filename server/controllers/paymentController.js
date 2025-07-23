const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user.id;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'CapeControl Premium',
            description: 'Monthly subscription to CapeControl premium features',
          },
          unit_amount: 2999, // $29.99
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      client_reference_id: userId.toString(),
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.handleWebhook = async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = parseInt(session.client_reference_id);

      await prisma.user.update({
        where: { id: userId },
        data: { subscription: 'premium' },
      });
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscription: true },
    });

    res.json({ subscription: user.subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
