"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleBorrowAction(bookId: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value; // Récupération sécurisée via cookie 

  if (!userId) return { error: "Vous devez être connecté." };

  try {
    return await prisma.$transaction(async (tx) => {
      // 1. Vérifier si le livre est disponible [cite: 22, 26]
      const book = await tx.book.findUnique({ where: { id: bookId } });
      if (!book || !book.available) return { error: "Ce livre n'est plus disponible." };

      // 2. Vérifier la règle : max 3 livres simultanés [cite: 27]
      const count = await tx.borrowing.count({
        where: { userId, returnedAt: null }
      });
      if (count >= 3) return { error: "Limite de 3 livres atteinte." };

      // 3. Calculer la date de retour (+14 jours) [cite: 28]
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      // 4. Créer l'emprunt et marquer le livre comme indisponible [cite: 22, 49]
      await tx.borrowing.create({
        data: {
          userId,
          bookId,
          dueDate,
        }
      });

      await tx.book.update({
        where: { id: bookId },
        data: { available: false }
      });

      revalidatePath("/books");
      return { success: true };
    });
  } catch (e) {
    return { error: "Une erreur est survenue." };
  }
}