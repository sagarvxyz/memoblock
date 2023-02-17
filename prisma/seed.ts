import { PrismaClient } from '@prisma/client';
import { blocks, ideas, memos } from './db';

const prisma = new PrismaClient();
async function main() {
  for (const record of blocks) {
    const block = await prisma.block.upsert({
      where: { id: record.id },
      update: {},
      create: record,
    });
  }

  for (const record of ideas) {
    const idea = await prisma.idea.upsert({
      where: { id: record.id },
      update: {},
      create: record,
    });
  }
  for (const record of memos) {
    const memo = await prisma.memo.upsert({
      where: { id: record.id },
      update: {},
      create: record,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
