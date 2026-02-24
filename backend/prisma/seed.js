const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database with professional assets...');

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
            imageUrl: '/images/iphone-white.png',
            mrp: 134900,
            price: 127400,
            badge: 'NEW',
        },
    });

    const colors = ['White', 'Orange', 'Blue'];
    const storages = ['256GB', '512GB'];
    const imageMap = {
        'White': '/images/iphone-white.png',
        'Orange': '/images/iphone-orange.png',
        'Blue': '/images/iphone-blue.png'
    };

    for (const color of colors) {
        for (const storage of storages) {
            const priceOverride = storage === '512GB' ? 147400 : 127400;
            const variant = await prisma.variant.create({
                data: {
                    productId: iphone.id,
                    color: color,
                    storage: storage,
                    priceOverride: priceOverride,
                    imageUrl: imageMap[color],
                },
            });

            await prisma.emiPlan.createMany({
                data: [
                    { variantId: variant.id, monthlyAmount: Math.round(priceOverride / 3), tenureMonths: 3, interestRate: 0, cashbackAmount: 7500 },
                    { variantId: variant.id, monthlyAmount: Math.round(priceOverride / 6), tenureMonths: 6, interestRate: 0, cashbackAmount: 7500 },
                    { variantId: variant.id, monthlyAmount: Math.round(priceOverride / 12), tenureMonths: 12, interestRate: 0, cashbackAmount: 7500 },
                    { variantId: variant.id, monthlyAmount: Math.round(priceOverride / 24), tenureMonths: 24, interestRate: 0, cashbackAmount: 7500 },
                    { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.1) / 36), tenureMonths: 36, interestRate: 10.5, cashbackAmount: 7500 },
                    { variantId: variant.id, monthlyAmount: Math.round((priceOverride * 1.15) / 48), tenureMonths: 48, interestRate: 10.5, cashbackAmount: 7500 },
                ],
            });
        }
    }

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

    const samsungVariant = await prisma.variant.create({
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
            { variantId: samsungVariant.id, monthlyAmount: 41666, tenureMonths: 3, interestRate: 0, cashbackAmount: 6500 },
            { variantId: samsungVariant.id, monthlyAmount: 20833, tenureMonths: 6, interestRate: 0, cashbackAmount: 6500 },
            { variantId: samsungVariant.id, monthlyAmount: 10417, tenureMonths: 12, interestRate: 0, cashbackAmount: 6500 },
        ],
    });

    // ── PRODUCT 3: OnePlus 13 ─────────────────────────────────────────────────
    const oneplus = await prisma.product.create({
        data: {
            name: 'OnePlus 13',
            slug: 'oneplus-13',
            description: 'Fast and smooth performance with Hasselblad camera for mobile and ultra-fast charging.',
            imageUrl: '/images/google-pixel-9-pro.png',
            mrp: 79999,
            price: 69999,
            badge: 'HOT',
        },
    });

    const oneplusVariant = await prisma.variant.create({
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
            { variantId: oneplusVariant.id, monthlyAmount: 23333, tenureMonths: 3, interestRate: 0, cashbackAmount: 4000 },
            { variantId: oneplusVariant.id, monthlyAmount: 11667, tenureMonths: 6, interestRate: 0, cashbackAmount: 4000 },
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
