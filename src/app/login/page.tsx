"use client";
import { useState } from "react";
import { handleLogin } from "../actions/auth";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function clientAction(formData: FormData) {
    const result = await handleLogin(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <form action={clientAction} className="flex flex-col gap-4 w-80 p-8 border rounded shadow-md bg-white">
        <h2 className="text-xl font-bold text-center">Connexion</h2>
        
        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input name="email" type="email" className="border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none" required />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Mot de passe</label>
          <input name="password" type="password" className="border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none" required />
        </div>

        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white p-2 rounded font-bold transition-colors">
          Se connecter
        </button>
      </form>
    </div>
  );
}