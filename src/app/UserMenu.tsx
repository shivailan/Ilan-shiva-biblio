"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserMenu() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_name");
    if (storedUser) {
      setUser({ name: storedUser });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id"); // Nettoie aussi l'ID pour la sécurité
    setUser(null);
    window.location.href = "/";
  };

  // --- MODIFICATION ICI POUR AFFICHER LES DEUX BOUTONS ---
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link 
          href="/login" 
          className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors px-3 py-2"
        >
          Connexion
        </Link>
        <Link 
          href="/signup" 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
        >
          S'inscrire
        </Link>
      </div>
    );
  }

  // --- LE RESTE RESTE INCHANGÉ ---
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Étudiant</span>
        <span className="text-sm font-bold text-slate-900">{user.name}</span>
      </div>
      
      <button 
        onClick={handleLogout}
        className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors border border-red-100"
        title="Déconnexion"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  );
}