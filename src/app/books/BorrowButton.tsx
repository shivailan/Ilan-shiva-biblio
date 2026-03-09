"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleBorrowAction } from "../actions/borrow"; // On va créer/vérifier ce fichier

// AJOUT DE userId DANS L'INTERFACE
interface BorrowButtonProps {
  bookId: string;
  userId?: string; 
}

export default function BorrowButton({ bookId, userId }: BorrowButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBorrow = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const result = await handleBorrowAction(bookId);

      if (result?.success) {
        alert("📖 Livre emprunté !");
        router.refresh(); // Actualise la page pour montrer "Emprunté"
      } else {
        alert(result?.error || "Erreur lors de l'emprunt");
      }
    } catch (err) {
      alert("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  // SI PAS DE USER_ID (COOKIE VIDE) -> REDIRIGER VERS LOGIN
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

  // SI CONNECTÉ -> AFFICHER LE BOUTON BLEU
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