import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { bookId, userId } = await request.json();

    // Règle Master : Date de retour à +14 jours
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const result = await prisma.$transaction([
      // 1. Créer la ligne d'emprunt
      prisma.borrowing.create({
        data: {
          bookId,
          userId,
          dueDate,
        },
      }),
      // 2. Mettre à jour le livre
      prisma.book.update({
        where: { id: bookId },
        data: { available: false },
      }),
    ]);

    return NextResponse.json({ message: "Succès", result }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Impossible d'emprunter ce livre" }, { status: 400 });
  }
}