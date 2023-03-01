import { Prisma, PrismaClient } from '@prisma/client';

/** Instantiate PrismaClient in global namespace in development. See
 * https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 * for details.
 */
export let prisma: PrismaClient;

const config = {} satisfies
  | Prisma.Subset<Prisma.PrismaClientOptions, Prisma.PrismaClientOptions>
  | undefined;
const globalPrisma = global as unknown as { prisma: PrismaClient };

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(config);
} else {
  if (!globalPrisma.prisma) {
    globalPrisma.prisma = new PrismaClient(config);
  }
  prisma = globalPrisma.prisma;
}
