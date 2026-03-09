"use client";
import Link from "next/link";
import { useState } from "react";
import { handleBorrowAction } from "../actions/borrow"; // Assure-toi de créer ce fichier

export default function BorrowButton({ bookId, userId }: { bookId: string, userId?: string }) {
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    if (!userId) return;
    setLoading(true);

    // On utilise une Server Action pour respecter les règles métier 
    const result = await handleBorrowAction(bookId);

    if (result?.success) {
      alert("📖 Livre emprunté avec succès !");
      window.location.reload(); 
    } else {
      alert(result?.error || "Erreur lors de l'emprunt.");
      setLoading(false);
    }
  };

  // Si userId est vide (cookie absent), on affiche le lien de connexion [cite: 91]
  if (!userId) {
    return (
      <Link 
        href="/login" 
        className="block text-center w-full bg-slate-100 text-slate-500 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
      >
        Connectez-vous pour emprunter
      </Link>
    );
  }

  return (
    <button 
      onClick={handleBorrow}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:bg-slate-300"
    >
      {loading ? "Traitement..." : "Emprunter ce livre"}
    </button>
  );
}