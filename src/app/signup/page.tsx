"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleSignup } from "../actions/auth";

export default function Signup() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function clientAction(formData: FormData) {
    const result = await handleSignup(formData);
    if (result?.error) setError(result.error);
    else router.push("/");
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <form action={clientAction} className="flex flex-col gap-4 w-80 p-8 border rounded">
        <h2 className="text-xl font-bold">Inscription</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input name="name" placeholder="Nom" className="border p-2 rounded" required />
        <input name="email" type="email" placeholder="Email" className="border p-2 rounded" required />
        <input name="password" type="password" placeholder="Mot de passe" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Créer mon compte</button>
      </form>
    </div>
  );
}