const prisma = require('../config/db');

// GET /api/products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                variants: {
                    include: {
                        emiPlans: true,
                    },
                },
            },
            orderBy: { createdAt: 'asc' },
        });
        res.json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

// GET /api/products/:slug
const getProductBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                variants: {
                    include: {
                        emiPlans: {
                            orderBy: { tenureMonths: 'asc' },
                        },
                    },
                },
            },
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// GET /api/products/:slug/variants
const getProductVariants = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const product = await prisma.product.findUnique({
            where: { slug },
            select: { id: true, name: true },
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const variants = await prisma.variant.findMany({
            where: { productId: product.id },
            include: {
                emiPlans: {
                    orderBy: { tenureMonths: 'asc' },
                },
            },
        });

        res.json({ success: true, data: variants });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllProducts, getProductBySlug, getProductVariants };
