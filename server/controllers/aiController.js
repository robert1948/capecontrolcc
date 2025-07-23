const { PrismaClient } = require('@prisma/client');
const { trackUsage } = require('../utils/revenueTracker');

const prisma = new PrismaClient();

exports.processQuery = async (req, res) => {
  try {
    const { query, moduleId } = req.body;
    const userId = req.user.id; // From auth middleware

    // TODO: Implement actual AI processing
    const aiResponse = `AI response to: ${query}`;

    // Track usage for revenue calculation
    await trackUsage(userId, moduleId || 'default', 1);

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQueryHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await prisma.usage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
