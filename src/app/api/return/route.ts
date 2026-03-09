import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { borrowingId } = await request.json();

    // On utilise une transaction pour être sûr que les deux étapes réussissent
    const result = await prisma.$transaction(async (tx) => {
      // 1. Marquer l'emprunt comme terminé avec la date actuelle
      const borrowing = await tx.borrowing.update({
        where: { id: borrowingId },
        data: { returnedAt: new Date() },
      });

      // 2. Remettre le livre en "disponible"
      await tx.book.update({
        where: { id: borrowing.bookId },
        data: { available: true },
      });

      return borrowing;
    });

    return NextResponse.json({ message: "Livre rendu avec succès", result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors du retour du livre" }, { status: 400 });
  }
}