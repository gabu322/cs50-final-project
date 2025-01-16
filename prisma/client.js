import { PrismaClient } from "@/prisma/generated/client";

export const prisma = new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
