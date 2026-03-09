"use client";
import Link from "next/link";
import { handleLogout } from "./actions/auth";

export default function UserMenu({ userId, userName }: { userId?: string, userName?: string }) {
  
  if (!userId) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600">Connexion</Link>
        <Link href="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-100">S'inscrire</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 bg-white p-2 pr-4 rounded-2xl border border-slate-100 shadow-sm">
      {/* Indicateur Statut Vert */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-blue-600 font-black">
            {userName?.charAt(0) || "U"}
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Connecté</span>
          <span className="text-xs font-bold text-slate-900">ID: {userId.substring(0, 8)}...</span>
        </div>
      </div>

      {/* Bouton Déconnexion */}
      <button 
        onClick={() => handleLogout()}
        className="group flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all border border-slate-100"
        title="Se déconnecter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </button>
    </div>
  );
}