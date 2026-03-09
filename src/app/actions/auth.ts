"use server";
console.log("Ma DB URL est :", process.env.DATABASE_URL);
import * as dotenv from 'dotenv';
dotenv.config(); // Force le chargement du .env immédiatement
import { createToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  name: z.string().min(2, "Nom trop court"),
});

export async function handleSignup(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = signupSchema.safeParse(data);

  if (!validated.success) return { error: validated.error.errors[0].message };

  const { email, password, name } = validated.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = await createToken({ userId: user.id }, "2h");
    
    // Stockage sécurisé HttpOnly (Exigence Master)
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return { success: true };
  } catch (e) {
    return { error: "Cet email est déjà pris." };
  }
}