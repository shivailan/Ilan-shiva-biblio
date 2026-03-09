import type { Metadata } from "next";
import "./globals.css"; // Assure-toi que ce fichier existe ou commente cette ligne

export const metadata: Metadata = {
  title: "Bibliothèque - Ilan & Shiva",
  description: "Projet de gestion de bibliothèque - Master 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <header className="p-4 border-b">
          <nav className="container mx-auto flex justify-between">
            <span className="font-bold">📚 Ma Biblio</span>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}