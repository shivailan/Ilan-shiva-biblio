"use client";
import { useState } from "react";

export default function BorrowButton({ bookId }: { bookId: string }) {
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          bookId, 
          userId: "dcf5bf68-57e4-444c-8214-1325e0718b27" // <--- TRÈS IMPORTANT
        }),
      });

      if (res.ok) {
        alert("📖 Livre emprunté ! Il apparaît maintenant dans 'Mes Emprunts'.");
        window.location.reload(); // Rafraîchit pour voir le livre passer en 'SORTI'
      } else {
        alert("Erreur lors de l'emprunt.");
      }
    } catch (err) {
      alert("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleBorrow}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all disabled:bg-gray-400"
    >
      {loading ? "Chargement..." : "Emprunter"}
    </button>
  );
}