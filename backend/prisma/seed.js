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
            description: 'The most powerful iPhone ever with A19 Pro chip, ProMotion display, and titanium design.',
            imageUrl: '/images/iphone-white.png',
            mrp: 149900,
            price: 127400,
            badge: 'NEW',
        },
    });

    // Variants for iPhone 17 Pro
    const colors = [
        { name: 'Orange', img: '/images/iphone-orange.png' },
        { name: 'White', img: '/images/iphone-white.png' },
        { name: 'Blue', img: '/images/iphone-blue.png' }
    ];

    for (const color of colors) {
        const variant = await prisma.variant.create({
            data: {
                productId: iphone.id,
                color: color.name,
                storage: '256GB',
                priceOverride: 127400,
                imageUrl: color.img,
            },
        });

        // Add 3 EMI plans per variant
        await prisma.emiPlan.createMany({
            data: [
                { variantId: variant.id, monthlyAmount: 42467, tenureMonths: 3, interestRate: 0, cashbackAmount: 500 },
                { variantId: variant.id, monthlyAmount: 21234, tenureMonths: 6, interestRate: 0, cashbackAmount: 750 },
                { variantId: variant.id, monthlyAmount: 10617, tenureMonths: 12, interestRate: 0, cashbackAmount: 1000 },
            ],
        });
    }

    // ── PRODUCT 2: Samsung Galaxy S24 Ultra ───────────────────────────────────
    const samsung = await prisma.product.create({
        data: {
            name: 'Samsung Galaxy S24 Ultra',
            slug: 'samsung-s24-ultra',
            description: 'The ultimate Galaxy experience with S Pen, 200MP camera, and stunning titanium build.',
            imageUrl: '/images/samsung-s24-ultra.png',
            mrp: 134999,
            price: 119999,
            badge: 'HOT',
        },
    });

    const samsungVariant = await prisma.variant.create({
        data: {
            productId: samsung.id,
            color: 'Titanium Black',
            storage: '256GB',
            priceOverride: 119999,
            imageUrl: '/images/samsung-s24-ultra.png',
        },
    });

    await prisma.emiPlan.createMany({
        data: [
            { variantId: samsungVariant.id, monthlyAmount: 40000, tenureMonths: 3, interestRate: 0, cashbackAmount: 500 },
            { variantId: samsungVariant.id, monthlyAmount: 20000, tenureMonths: 6, interestRate: 0, cashbackAmount: 750 },
            { variantId: samsungVariant.id, monthlyAmount: 10000, tenureMonths: 12, interestRate: 0, cashbackAmount: 1000 },
        ],
    });

    // ── PRODUCT 3: Google Pixel 9 Pro ─────────────────────────────────────────
    const pixel = await prisma.product.create({
        data: {
            name: 'Google Pixel 9 Pro',
            slug: 'google-pixel-9-pro',
            description: 'Google\'s most advanced Pixel with Tensor G4 chip, Magic Eraser, and Pro-level cameras.',
            imageUrl: '/images/google-pixel-9-pro.png',
            mrp: 109999,
            price: 99999,
            badge: 'SALE',
        },
    });

    const pixelVariant = await prisma.variant.create({
        data: {
            productId: pixel.id,
            color: 'Obsidian',
            storage: '128GB',
            priceOverride: 99999,
            imageUrl: '/images/google-pixel-9-pro.png',
        },
    });

    await prisma.emiPlan.createMany({
        data: [
            { variantId: pixelVariant.id, monthlyAmount: 33333, tenureMonths: 3, interestRate: 0, cashbackAmount: 300 },
            { variantId: pixelVariant.id, monthlyAmount: 16667, tenureMonths: 6, interestRate: 0, cashbackAmount: 500 },
            { variantId: pixelVariant.id, monthlyAmount: 8333, tenureMonths: 12, interestRate: 0, cashbackAmount: 750 },
        ],
    });

    console.log('✅ Seeding complete!');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
