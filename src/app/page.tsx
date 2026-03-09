export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold italic">Ilan & Shiva - Bibliothèque Numérique</h1>
      <p className="mt-4 text-lg">Projet Master 2 - Next.js 15 & Prisma</p>
      <div className="mt-8 flex gap-4">
        <a href="/signup" className="rounded bg-blue-600 px-4 py-2 text-white">S'inscrire</a>
        <a href="/login" className="rounded bg-gray-600 px-4 py-2 text-white">Se connecter</a>
      </div>
    </main>
  );
}