import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
// 1. On importe le menu utilisateur dynamique
import UserMenu from "./UserMenu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Chargement de Tailwind via CDN */}
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {/* Navigation Épurée et Moderne */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-black tracking-tight text-blue-600 italic">
              BIBLIO<span className="text-slate-400 font-light">MASTER</span>
            </Link>
            
            <div className="flex items-center gap-8">
              {/* Liens de navigation (cachés sur mobile) */}
              <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                <Link href="/books" className="hover:text-blue-600 transition-colors">Catalogue</Link>
                <Link href="/my-borrowings" className="hover:text-blue-600 transition-colors">Mes Emprunts</Link>
              </div>

              {/* 2. APPEL DU COMPOSANT DYNAMIQUE (Gère Connexion / Inscription / Logout) */}
              <UserMenu />
            </div>
          </div>
        </nav>

        {/* Contenu Principal */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer minimaliste */}
        <footer className="py-8 text-center text-slate-400 text-[10px] border-t border-slate-100 bg-white">
          © 2026 BiblioMaster — Projet Master Digital
        </footer>
      </body>
    </html>
  );
}