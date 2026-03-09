"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addBook(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const isbn = formData.get("isbn") as string;
  const category = formData.get("category") as string;

  try {
    await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        category,
        available: true,
      },
    });
    revalidatePath("/books"); // Pour mettre à jour la liste immédiatement
    return { success: true };
  } catch (error) {
    return { error: "Erreur lors de l'ajout du livre (ISBN peut-être déjà existant)." };
  }
}