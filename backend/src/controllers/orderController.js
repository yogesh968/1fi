const prisma = require('../config/db');

// POST /api/orders
const createOrder = async (req, res, next) => {
    try {
        const { variantId, emiPlanId } = req.body;

        const variant = await prisma.variant.findUnique({
            where: { id: variantId },
            include: { product: true }
        });

        const emiPlan = await prisma.emiPlan.findUnique({
            where: { id: emiPlanId }
        });

        if (!variant || !emiPlan) {
            return res.status(404).json({ success: false, message: 'Variant or EMI Plan not found' });
        }

        const orderNumber = `EMI-${Math.floor(100000 + Math.random() * 900000)}`;

        const order = await prisma.order.create({
            data: {
                variantId,
                emiPlanId,
                orderNumber,
                totalAmount: variant.priceOverride || variant.product.price,
                monthlySchedule: emiPlan.monthlyAmount,
                tenure: emiPlan.tenureMonths,
                status: 'CONFIRMED'
            },
            include: {
                variant: { include: { product: true } },
                emiPlan: true
            }
        });

        res.status(201).json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
};

// GET /api/orders
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                variant: { include: { product: true } },
                emiPlan: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, data: orders });
    } catch (error) {
        next(error);
    }
};

// PATCH /api/orders/:id/cancel
const cancelOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await prisma.order.update({
            where: { id },
            data: { status: 'CANCELLED' },
            include: {
                variant: { include: { product: true } },
                emiPlan: true
            }
        });
        res.json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder, getAllOrders, cancelOrder };
