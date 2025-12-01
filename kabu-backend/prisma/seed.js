/**
 * Run with: node prisma/seed.js
 * Make sure DATABASE_URL is set.
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      sku: 'LAMPKA-LIS',
      name: 'Lampka pixelowa Lis',
      description: 'Idealna lampka Lis do pokoju lub na biurko',
      price: 89.99,
      image: '',
    },
    {
      sku: 'LAMPKA-PSZCZ',
      name: 'Lampka Latajaca Pszczola',
      description: 'Lampka na biurko Latajaca Pszczola',
      price: 79.99,
      image: '',
    },
    {
      sku: 'BRELOK-LAMP',
      name: 'Swiecacy brelok do kluczy Pochodnia',
      description: 'Swiecacy brelok idealnie sprawi sie podczas nocy',
      price: 24.99,
      image: '',
    },
    {
      sku: 'LAMPION-LAMP',
      name: 'Lampka na sciane Lampion',
      description: 'Lampka na sciane Lampion RGB USB-C',
      price: 89.99,
      image: '',
    },
    {
      sku: 'AXOLOTL-LAMP',
      name: 'Lampka Axolotl',
      description: 'Kolorowa lampka Axolotl',
      price: 99.99,
      image: '',
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
