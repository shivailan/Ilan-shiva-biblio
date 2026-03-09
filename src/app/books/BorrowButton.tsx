"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BorrowButton({ bookId }: { bookId: string }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // On récupère l'ID stocké après l'inscription/connexion
    const id = localStorage.getItem("user_id");
    setUserId(id);
  }, []);

  const handleBorrow = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, userId }),
      });

      if (res.ok) {
        alert("📖 Livre emprunté avec succès !");
        window.location.reload();
      } else {
        alert("Erreur lors de l'emprunt.");
      }
    } catch (err) {
      alert("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  };

  // CAS 1 : Pas connecté -> On redirige vers l'inscription/connexion
  if (!userId) {
    return (
      <Link 
        href="/login" 
        className="block text-center w-full bg-slate-100 text-slate-600 font-bold py-3 rounded-2xl hover:bg-slate-200 transition-all text-sm"
      >
        Connectez-vous pour emprunter
      </Link>
    );
  }

  // CAS 2 : Connecté -> On affiche le bouton d'action
  return (
    <button 
      onClick={handleBorrow}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:bg-slate-300"
    >
      {loading ? "Traitement..." : "Emprunter maintenant"}
    </button>
  );
}