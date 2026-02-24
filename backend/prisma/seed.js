const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database with premium assets...');

    // Clear existing data
    await prisma.order.deleteMany();
    await prisma.emiPlan.deleteMany();
    await prisma.variant.deleteMany();
    await prisma.product.deleteMany();

    // ── PRODUCT 1: iPhone 17 Pro ──────────────────────────────────────────────
    const iphone = await prisma.product.create({
        data: {
            name: 'iPhone 17 Pro',
            slug: 'iphone-17-pro',
            description: 'The most powerful iPhone ever with A19 Pro chip, titanium design, and pro camera system.',
            imageUrl: '/images/iphone-17-pro.png',
            mrp: 134900,
            price: 127400,
            badge: 'NEW',
        },
    });

    const iphone256 = await prisma.variant.create({
        data: {
            productId: iphone.id,
            color: 'Deep Blue',
            storage: '256GB',
            priceOverride: 127400,
            imageUrl: '/images/iphone-17-pro.png',
        },
    });

    await prisma.emiPlan.createMany({
        data: [
            { variantId: iphone256.id, monthlyAmount: 42467, tenureMonths: 3, interestRate: 0, cashbackAmount: 7500 },
            { variantId: iphone256.id, monthlyAmount: 21234, tenureMonths: 6, interestRate: 0, cashbackAmount: 7500 },
            { variantId: iphone256.id, monthlyAmount: 10617, tenureMonths: 12, interestRate: 0, cashbackAmount: 7500 },
            { variantId: iphone256.id, monthlyAmount: 5621, tenureMonths: 24, interestRate: 0, cashbackAmount: 7500 },
            { variantId: iphone256.id, monthlyAmount: 4297, tenureMonths: 36, interestRate: 10.5, cashbackAmount: 7500 },
            { variantId: iphone256.id, monthlyAmount: 3385, tenureMonths: 48, interestRate: 10.5, cashbackAmount: 7500 },
            { variantId: iphone256.id, monthlyAmount: 2842, tenureMonths: 60, interestRate: 10.5, cashbackAmount: 7500 },
        ],
    });

    // ── PRODUCT 2: Samsung Galaxy S25 Ultra ───────────────────────────────────
    const samsung = await prisma.product.create({
        data: {
            name: 'Samsung Galaxy S25 Ultra',
            slug: 'samsung-s25-ultra',
            description: 'Experience the next level of mobile innovation with AI integration and 200MP zoom.',
            imageUrl: '/images/samsung-s24-ultra.png',
            mrp: 134999,
            price: 124999,
            badge: 'NEW',
        },
    });

    const samsung256 = await prisma.variant.create({
        data: {
            productId: samsung.id,
            color: 'Titanium Black',
            storage: '256GB',
            priceOverride: 124999,
            imageUrl: '/images/samsung-s24-ultra.png',
        },
    });

    await prisma.emiPlan.createMany({
        data: [
            { variantId: samsung256.id, monthlyAmount: 41666, tenureMonths: 3, interestRate: 0, cashbackAmount: 6500 },
            { variantId: samsung256.id, monthlyAmount: 20833, tenureMonths: 6, interestRate: 0, cashbackAmount: 6500 },
            { variantId: samsung256.id, monthlyAmount: 10417, tenureMonths: 12, interestRate: 0, cashbackAmount: 6500 },
            { variantId: samsung256.id, monthlyAmount: 5500, tenureMonths: 24, interestRate: 0, cashbackAmount: 6500 },
            { variantId: samsung256.id, monthlyAmount: 4100, tenureMonths: 36, interestRate: 10.5, cashbackAmount: 6500 },
            { variantId: samsung256.id, monthlyAmount: 3200, tenureMonths: 48, interestRate: 10.5, cashbackAmount: 6500 },
            { variantId: samsung256.id, monthlyAmount: 2781, tenureMonths: 60, interestRate: 10.5, cashbackAmount: 6500 },
        ],
    });

    // ── PRODUCT 3: OnePlus 13 ─────────────────────────────────────────────────
    const oneplus = await prisma.product.create({
        data: {
            name: 'OnePlus 13',
            slug: 'oneplus-13',
            description: 'Fast and smooth performance with Hasselblad camera for mobile and ultra-fast charging.',
            imageUrl: '/images/google-pixel-9-pro.png', // Temporary, will use placeholder if needed
            mrp: 79999,
            price: 69999,
            badge: 'HOT',
        },
    });

    const oneplus256 = await prisma.variant.create({
        data: {
            productId: oneplus.id,
            color: 'Arctic Dawn',
            storage: '256GB',
            priceOverride: 69999,
            imageUrl: '/images/google-pixel-9-pro.png',
        },
    });

    await prisma.emiPlan.createMany({
        data: [
            { variantId: oneplus256.id, monthlyAmount: 23333, tenureMonths: 3, interestRate: 0, cashbackAmount: 4000 },
            { variantId: oneplus256.id, monthlyAmount: 11667, tenureMonths: 6, interestRate: 0, cashbackAmount: 4000 },
            { variantId: oneplus256.id, monthlyAmount: 5833, tenureMonths: 12, interestRate: 0, cashbackAmount: 4000 },
            { variantId: oneplus256.id, monthlyAmount: 3100, tenureMonths: 24, interestRate: 0, cashbackAmount: 4000 },
            { variantId: oneplus256.id, monthlyAmount: 2400, tenureMonths: 36, interestRate: 10.5, cashbackAmount: 4000 },
            { variantId: oneplus256.id, monthlyAmount: 1900, tenureMonths: 48, interestRate: 10.5, cashbackAmount: 4000 },
            { variantId: oneplus256.id, monthlyAmount: 1600, tenureMonths: 60, interestRate: 10.5, cashbackAmount: 4000 },
        ],
    });

    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
