// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {}, 
      create: {
        email: 'admin@example.com',
        username: 'admin',
        password: hashedPassword,
      },
    });

    console.log('Done');
  } catch (error) {
    console.error('Failed', error instanceof Error ? error.message : error);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
