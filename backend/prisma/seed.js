const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding production database on MongoDB...');

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
            description: 'The most powerful iPhone ever with A19 Pro chip, advanced multitasking capabilities, ProMotion display, and titanium design.',
            imageUrl: '/images/iphone-white.png',
            mrp: 149900,
            price: 127400,
            badge: 'NEW',
        },
    });

    const colors = [
        { name: 'Orange', img: '/images/iphone-orange.png' },
        { name: 'White', img: '/images/iphone-white.png' },
        { name: 'Blue', img: '/images/iphone-blue.png' }
    ];
    const storages = ['256GB', '512GB'];

    for (const color of colors) {
        for (const storage of storages) {
            const priceOverride = storage === '512GB' ? 147400 : 127400;
            const variant = await prisma.variant.create({
                data: {
                    productId: iphone.id,
                    color: color.name,
                    storage: storage,
                    priceOverride: priceOverride,
                    imageUrl: color.img,
                },
            });

            // Specific Plan Structure: 0%, 5%, and 10.5% interest
            await prisma.emiPlan.createMany({
                data: [
                    { variantId: variant.id, monthlyAmount: Math.round(priceOverride / 3), tenureMonths: 3, interestRate: 0, cashbackAmount: 1000 },
                    { variantId: variant.id, monthlyAmount: Math.round(priceOverride / 6), tenureMonths: 6, interestRate: 0, cashbackAmount: 1500 },
                    { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.05) / 9), tenureMonths: 9, interestRate: 5, cashbackAmount: 1750 },
                    { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.05) / 12), tenureMonths: 12, interestRate: 5, cashbackAmount: 2000 },
                    { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.105) / 15), tenureMonths: 15, interestRate: 10.5, cashbackAmount: 2250 },
                    { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.105) / 18), tenureMonths: 18, interestRate: 10.5, cashbackAmount: 2500 },
                    { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.105) / 24), tenureMonths: 24, interestRate: 10.5, cashbackAmount: 3000 },
                    { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.15) / 36), tenureMonths: 36, interestRate: 15, cashbackAmount: 4000 },
                    { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.20) / 48), tenureMonths: 48, interestRate: 20, cashbackAmount: 5000 },
                ],
            });
        }
    }

    // Samsung
    const samsung = await prisma.product.create({
        data: {
            name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-s24-ultra', imageUrl: '/images/samsung-s24-ultra.png', mrp: 134999, price: 119999, badge: 'HOT',
            description: 'The ultimate Galaxy experience with S Pen and 200MP camera.',
        },
    });
    const sVariant = await prisma.variant.create({ data: { productId: samsung.id, color: 'Titanium Black', storage: '256GB', priceOverride: 119999, imageUrl: '/images/samsung-s24-ultra.png' } });
    await prisma.emiPlan.createMany({
        data: [
            { variantId: sVariant.id, monthlyAmount: Math.round(119999 / 3), tenureMonths: 3, interestRate: 0, cashbackAmount: 1000 },
            { variantId: sVariant.id, monthlyAmount: Math.round((119999 * 1.05) / 6), tenureMonths: 6, interestRate: 5, cashbackAmount: 1500 },
            { variantId: sVariant.id, monthlyAmount: Math.round((119999 * 1.105) / 12), tenureMonths: 12, interestRate: 10.5, cashbackAmount: 2000 },
            { variantId: sVariant.id, monthlyAmount: Math.round((119999 * 1.15) / 24), tenureMonths: 24, interestRate: 15, cashbackAmount: 3000 },
        ]
    });

    // Pixel
    const pixel = await prisma.product.create({
        data: {
            name: 'Google Pixel 9 Pro', slug: 'google-pixel-9-pro', imageUrl: '/images/google-pixel-9-pro.png', mrp: 109999, price: 99999, badge: 'SALE',
            description: 'Google\'s most advanced Pixel with Tensor G4 chip.',
        },
    });
    const pVariant = await prisma.variant.create({ data: { productId: pixel.id, color: 'Obsidian', storage: '128GB', priceOverride: 99999, imageUrl: '/images/google-pixel-9-pro.png' } });
    await prisma.emiPlan.createMany({
        data: [
            { variantId: pVariant.id, monthlyAmount: Math.round(99999 / 3), tenureMonths: 3, interestRate: 0, cashbackAmount: 800 },
            { variantId: pVariant.id, monthlyAmount: Math.round((99999 * 1.05) / 6), tenureMonths: 6, interestRate: 5, cashbackAmount: 1200 },
            { variantId: pVariant.id, monthlyAmount: Math.round((99999 * 1.105) / 12), tenureMonths: 12, interestRate: 10.5, cashbackAmount: 1800 },
            { variantId: pVariant.id, monthlyAmount: Math.round((99999 * 1.15) / 24), tenureMonths: 24, interestRate: 15, cashbackAmount: 2500 },
        ]
    });

    console.log('✅ Seeding complete with specific 0%, 5%, and 10.5% interest plans');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
