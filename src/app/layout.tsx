import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import Script from "next/script";
import UserMenu from "./UserMenu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Récupération sécurisée des cookies côté serveur (exigé par le sujet)
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const userName = cookieStore.get("user_name")?.value;

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
              {/* Liens de navigation (Server Components) */}
              <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                <Link href="/books" className="hover:text-blue-600 transition-colors">Catalogue</Link>
                <Link href="/my-borrowings" className="hover:text-blue-600 transition-colors">Mes Emprunts</Link>
              </div>

              {/* APPEL DU COMPOSANT DYNAMIQUE 
                  On lui passe l'ID et le Nom récupérés des cookies HttpOnly 
              */}
              <UserMenu userId={userId} userName={userName} />
            </div>
          </div>
        </nav>

        {/* Contenu Principal */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer minimaliste exigé pour le rendu */}
        <footer className="py-8 text-center text-slate-400 text-[10px] border-t border-slate-100 bg-white">
          © 2026 BiblioMaster — Projet Master Digital [cite: 1]
        </footer>
      </body>
    </html>
  );
}