"use client";

import Link from "next/link";
import { handleLogout } from "./actions/auth";

interface UserMenuProps {
  userId?: string;
  userName?: string;
}

export default function UserMenu({ userId, userName }: UserMenuProps) {
  
  const onLogout = async () => {
    await handleLogout();
    // On force la redirection pour vider le cache et rafraîchir la barre
    window.location.href = "/login";
  };

  // CAS : NON CONNECTÉ
  if (!userId) {
    return (
      <div className="flex items-center gap-6">
        <Link 
          href="/login" 
          className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          Connexion
        </Link>
        <Link 
          href="/signup" 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
        >
          S'inscrire
        </Link>
      </div>
    );
  }

  // CAS : CONNECTÉ
  return (
    <div className="flex items-center gap-4 bg-white border border-slate-200 p-1.5 pr-4 rounded-2xl shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black text-sm uppercase border border-blue-100">
            {userName ? userName.charAt(0) : "U"}
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm animate-pulse"></span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black text-green-600 uppercase tracking-widest leading-tight">
            En ligne
          </span>
          <span className="text-sm font-bold text-slate-800">
            {userName || "Utilisateur"}
          </span>
        </div>
      </div>

      <div className="w-[1px] h-6 bg-slate-200 mx-1"></div>

      <button 
        onClick={onLogout}
        className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all border border-slate-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  );
}