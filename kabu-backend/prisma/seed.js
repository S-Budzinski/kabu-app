/**
 * Run with: node prisma/seed.js
 * Make sure DATABASE_URL is set.
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      sku: 'TAC-FLASH-PRO',
      name: 'Tactical Flashlight Pro',
      description: 'Powerful torch with multiple modes.',
      price: 129.99,
      image: 'https://vivid-shop-zone.lovable.app/product/tactical-flashlight-pro',
    },
    {
      sku: 'UNIV-CHARGER-EL',
      name: 'Universal Charger Elite',
      description: 'Fast charger for multiple devices.',
      price: 89.99,
      image: 'https://vivid-shop-zone.lovable.app/product/universal-charger-elite',
    },
    {
      sku: 'TAC-FLASH-MINI',
      name: 'Tactical Flashlight Mini',
      description: 'Compact torch for everyday carry.',
      price: 59.99,
      image: 'https://vivid-shop-zone.lovable.app/product/tactical-flashlight-mini',
    },
    {
      sku: 'CAR-CHG-DUAL',
      name: 'Car Charger Dual',
      description: 'Dual-port car charger.',
      price: 49.99,
      image: 'https://vivid-shop-zone.lovable.app/product/car-charger-dual',
    },
    {
      sku: 'HEADLAMP-PRO',
      name: 'Headlamp Pro',
      description: 'Hands-free headlamp.',
      price: 79.99,
      image: 'https://vivid-shop-zone.lovable.app/product/headlamp-pro',
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: p,
      create: p
    });
  }
  console.log('Seed finished');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
