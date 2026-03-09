"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function handleSignup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        firstName: name,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Erreur lors de l'inscription" };
  }
  redirect("/login");
}
export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // 1. Chercher l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Identifiants invalides" };
    }

    // 2. Comparer le mot de passe avec le hash en base
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return { error: "Identifiants invalides" };
    }

    // 3. Rediriger vers la bibliothèque (Accueil)
    // Plus tard, on ajoutera ici un cookie de session
  } catch (error) {
    console.error("Erreur login:", error);
    return { error: "Une erreur est survenue lors de la connexion." };
  }

  redirect("/"); 
}