const prisma = require('../config/db');

// GET /api/emi-plans/:variantId
const getEmiPlansByVariant = async (req, res, next) => {
    try {
        const { variantId } = req.params;

        const variant = await prisma.variant.findUnique({
            where: { id: variantId },
        });

        if (!variant) {
            return res.status(404).json({ success: false, message: 'Variant not found' });
        }

        const emiPlans = await prisma.emiPlan.findMany({
            where: { variantId },
            orderBy: { tenureMonths: 'asc' },
        });

        res.json({ success: true, data: emiPlans });
    } catch (error) {
        next(error);
    }
};

module.exports = { getEmiPlansByVariant };
