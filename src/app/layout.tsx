import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <nav className="flex justify-between items-center p-4 bg-blue-900 text-white shadow-md">
          <Link href="/" className="text-xl font-bold italic">BiblioMaster</Link>
          <div className="flex gap-6">
            <Link href="/books" className="hover:text-blue-300">Catalogue</Link>
            <Link href="/my-borrowings" className="hover:text-blue-300">Mes Emprunts</Link>
            <Link href="/login" className="bg-white text-blue-900 px-4 py-1 rounded font-bold">Connexion</Link>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}