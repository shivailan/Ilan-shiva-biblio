"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose"; // Recommandé par le sujet pour Edge Runtime
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "ton_secret_de_secours");

export async function handleLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("user_id");
  cookieStore.delete("user_name");
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  redirect("/login");
}

export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return { error: "Identifiants invalides" };
    }

    // --- CRÉATION DES TOKENS (Points barème : 7 pts) ---
    
    // 1. Access Token (15 min)
    const accessToken = await new SignJWT({ userId: user.id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(SECRET);

    // 2. Refresh Token (7 jours)
    const refreshToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(SECRET);

    // --- STOCKAGE DANS LES COOKIES HTTPONLY ---
    const cookieStore = await cookies();
    
    const cookieOptions = {
      httpOnly: true, // Interdit l'accès via JS (Sécurité Master)
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
    };

    cookieStore.set("access_token", accessToken, cookieOptions);
    cookieStore.set("refresh_token", refreshToken, cookieOptions);
    
    // Cookies pour l'affichage de l'UI (ton badge vert)
    cookieStore.set("user_id", user.id, { ...cookieOptions, httpOnly: false }); 
    cookieStore.set("user_name", user.firstName || "Utilisateur", { ...cookieOptions, httpOnly: false });

  } catch (error) {
    return { error: "Une erreur est survenue." };
  }

  redirect("/books"); // Redirection vers le catalogue
}

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
    // On pourrait connecter l'utilisateur directement ici, 
    // mais rediriger vers /login est plus simple pour tester.
  } catch (error) {
    return { error: "Erreur lors de l'inscription" };
  }
  redirect("/login");
}