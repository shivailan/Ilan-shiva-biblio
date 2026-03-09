"use client";

export default function ReturnButton({ borrowingId }: { borrowingId: string }) {
  const handleReturn = async () => {
    const res = await fetch("/api/return", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowingId }),
    });

    if (res.ok) {
      alert("✅ Livre rendu ! Merci.");
      window.location.reload();
    } else {
      alert("❌ Erreur lors du retour.");
    }
  };

  return (
    <button 
      onClick={handleReturn}
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
    >
      Rendre le livre
    </button>
  );
}