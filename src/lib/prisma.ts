import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient() // Laisse vide, il va lire le .env localement

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma