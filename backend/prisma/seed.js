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
    const storages = ['256GB', '512GB', '1TB'];

    for (const color of colors) {
        for (const storage of storages) {
            let priceOverride = 127400;
            if (storage === '512GB') priceOverride = 137400;
            if (storage === '1TB') priceOverride = 157400;

            const variant = await prisma.variant.create({
                data: {
                    productId: iphone.id,
                    color: color.name,
                    storage: storage,
                    priceOverride: priceOverride,
                    imageUrl: color.img,
                },
            });
            console.log(`✅ Created Variant: ${color.name} - ${storage} (ID: ${variant.id})`);

            // Advanced Plan Structure
            const plans = [
                { variantId: variant.id, monthlyAmount: Math.round(priceOverride / 3), tenureMonths: 3, interestRate: 0, cashbackAmount: 1000 },
                { variantId: variant.id, monthlyAmount: Math.round(priceOverride / 6), tenureMonths: 6, interestRate: 0, cashbackAmount: 1500 },
                { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.05) / 9), tenureMonths: 9, interestRate: 5, cashbackAmount: 1750 },
                { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.05) / 12), tenureMonths: 12, interestRate: 5, cashbackAmount: 2000 },
                { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.105) / 15), tenureMonths: 15, interestRate: 10.5, cashbackAmount: 2250 },
                { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.105) / 18), tenureMonths: 18, interestRate: 10.5, cashbackAmount: 2500 },
                { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.105) / 24), tenureMonths: 24, interestRate: 10.5, cashbackAmount: 3000 },
                { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.12) / 30), tenureMonths: 30, interestRate: 12, cashbackAmount: 3500 },
                { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.15) / 36), tenureMonths: 36, interestRate: 15, cashbackAmount: 4000 },
                { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.18) / 42), tenureMonths: 42, interestRate: 18, cashbackAmount: 4500 },
                { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.20) / 48), tenureMonths: 48, interestRate: 20, cashbackAmount: 5000 },
                { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.25) / 60), tenureMonths: 60, interestRate: 25, cashbackAmount: 6000 },
            ];
            await prisma.emiPlan.createMany({ data: plans });
        }
    }

    // Samsung Galaxy S24 Ultra
    const samsung = await prisma.product.create({
        data: {
            name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-s24-ultra', imageUrl: '/images/samsung-s24-ultra.png', mrp: 134999, price: 119999, badge: 'HOT',
            description: 'The ultimate Galaxy experience with S Pen and 200MP camera.',
        },
    });
    for (const color of ['Titanium Black', 'Titanium Silver Blue']) {
        for (const sStorage of ['256GB', '512GB', '1TB']) {
            const sPrice = sStorage === '1TB' ? 149999 : (sStorage === '512GB' ? 129999 : 119999);
            const variantImg = color === 'Titanium Silver Blue' ? '/images/samsung-s24-titanium-silver-blue.png' : '/images/samsung-s24-ultra.png';

            const sVariant = await prisma.variant.create({
                data: {
                    productId: samsung.id,
                    color: color,
                    storage: sStorage,
                    priceOverride: sPrice,
                    imageUrl: variantImg
                }
            });

            await prisma.emiPlan.createMany({
                data: [
                    { variantId: sVariant.id, monthlyAmount: Math.round(sPrice / 3), tenureMonths: 3, interestRate: 0, cashbackAmount: 1000 },
                    { variantId: sVariant.id, monthlyAmount: Math.round(sPrice / 6), tenureMonths: 6, interestRate: 0, cashbackAmount: 1500 },
                    { variantId: sVariant.id, monthlyAmount: Math.round((sPrice * 1.05) / 12), tenureMonths: 12, interestRate: 5, cashbackAmount: 2000 },
                    { variantId: sVariant.id, monthlyAmount: Math.round((sPrice * 1.105) / 24), tenureMonths: 24, interestRate: 10.5, cashbackAmount: 3000 },
                    { variantId: sVariant.id, monthlyAmount: Math.round((sPrice * 1.15) / 36), tenureMonths: 36, interestRate: 15, cashbackAmount: 4000 },
                    { variantId: sVariant.id, monthlyAmount: Math.round((sPrice * 1.25) / 60), tenureMonths: 60, interestRate: 25, cashbackAmount: 6000 },
                ]
            });
        }
    }

    // Google Pixel 9 Pro
    const pixel = await prisma.product.create({
        data: {
            name: 'Google Pixel 9 Pro', slug: 'google-pixel-9-pro', imageUrl: '/images/google-pixel-9-pro.png', mrp: 109999, price: 99999, badge: 'SALE',
            description: 'Google\'s most advanced Pixel with Tensor G4 chip.',
        },
    });
    for (const pStorage of ['512GB', '256GB', '128GB']) {
        const pPrice = pStorage === '128GB' ? 99999 : (pStorage === '256GB' ? 109999 : 119999);
        const pVariant = await prisma.variant.create({ data: { productId: pixel.id, color: 'Obsidian', storage: pStorage, priceOverride: pPrice, imageUrl: '/images/google-pixel-9-pro.png' } });
        await prisma.emiPlan.createMany({
            data: [
                { variantId: pVariant.id, monthlyAmount: Math.round(pPrice / 3), tenureMonths: 3, interestRate: 0, cashbackAmount: 800 },
                { variantId: pVariant.id, monthlyAmount: Math.round(pPrice / 6), tenureMonths: 6, interestRate: 0, cashbackAmount: 1200 },
                { variantId: pVariant.id, monthlyAmount: Math.round((pPrice * 1.105) / 12), tenureMonths: 12, interestRate: 10.5, cashbackAmount: 1800 },
                { variantId: pVariant.id, monthlyAmount: Math.round((pPrice * 1.15) / 24), tenureMonths: 24, interestRate: 15, cashbackAmount: 2500 },
                { variantId: pVariant.id, monthlyAmount: Math.round((pPrice * 1.20) / 36), tenureMonths: 36, interestRate: 20, cashbackAmount: 3500 },
            ]
        });
    }

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
