"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleBorrowAction(bookId: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) return { error: "Vous devez être connecté." };

  try {
    // Vérification de la limite de 3 livres (Règle métier du TP)
    const count = await prisma.borrowing.count({
      where: { userId, returnedAt: null }
    });
    if (count >= 3) return { error: "Vous avez déjà 3 livres en cours !" };

    // Transaction : on crée l'emprunt et on met le livre à 'indisponible'
    await prisma.$transaction([
      prisma.borrowing.create({
        data: {
          userId,
          bookId,
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // J+14
        }
      }),
      prisma.book.update({
        where: { id: bookId },
        data: { available: false }
      })
    ]);

    revalidatePath("/books");
    return { success: true };
  } catch (e) {
    return { error: "Erreur lors de l'emprunt." };
  }
}