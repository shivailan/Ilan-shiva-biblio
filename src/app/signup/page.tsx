"use client";
import { useState } from "react";
import { handleSignup } from "../actions/auth";

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Optionnel : pour le feedback visuel

  async function clientAction(formData: FormData) {
    setError("");
    setLoading(true);

    // On appelle l'action serveur
    const result = await handleSignup(formData);

    // Si l'action renvoie un objet avec une erreur (et pas une redirection)
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } 
    // Note : Si handleSignup utilise redirect("/"), 
    // le navigateur changera de page tout seul sans passer par ici.
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <form action={clientAction} className="flex flex-col gap-4 w-80 p-8 border rounded shadow-sm">
        <h2 className="text-xl font-bold">Inscription</h2>
        
        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
            {error}
          </p>
        )}

        <input name="name" placeholder="Nom" className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
        <input name="email" type="email" placeholder="Email" className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
        <input name="password" type="password" placeholder="Mot de passe" className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
        
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors disabled:bg-blue-300"
        >
          {loading ? "Création en cours..." : "Créer mon compte"}
        </button>
      </form>
    </div>
  );
}