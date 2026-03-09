"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function borrowBook(bookId: string, userId: string) {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14); // Règle : +14 jours

  try {
    // Utilisation d'une transaction Prisma pour garantir l'intégrité
    await prisma.$transaction([
      // 1. Créer l'emprunt
      prisma.borrowing.create({
        data: {
          bookId,
          userId,
          dueDate,
        },
      }),
      // 2. Marquer le livre comme indisponible
      prisma.book.update({
        where: { id: bookId },
        data: { available: false },
      }),
    ]);

    revalidatePath("/books");
    return { success: true };
  } catch (error) {
    return { error: "Impossible d'emprunter ce livre." };
  }
}