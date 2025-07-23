const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.trackUsage = async (userId, moduleId, queryCount) => {
  try {
    const revenue = queryCount * 0.01; // Example revenue calculation: $0.01 per query

    await prisma.usage.create({
      data: {
        userId,
        moduleId,
        queryCount,
        revenue,
      },
    });

    console.log(`Usage tracked: User ${userId}, Module ${moduleId}, Queries ${queryCount}, Revenue $${revenue}`);
  } catch (error) {
    console.error('Error tracking usage:', error);
  }
};

exports.calculateDeveloperPayments = async (moduleId, startDate, endDate) => {
  try {
    const totalRevenue = await prisma.usage.aggregate({
      where: {
        moduleId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        revenue: true,
      },
    });

    // Developer gets 70% of revenue (as per terms)
    const developerPayment = totalRevenue._sum.revenue * 0.7;

    return {
      totalRevenue: totalRevenue._sum.revenue,
      developerPayment,
      platformFee: totalRevenue._sum.revenue * 0.3,
    };
  } catch (error) {
    console.error('Error calculating developer payments:', error);
    return null;
  }
};
