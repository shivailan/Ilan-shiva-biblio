import { prisma } from "@/lib/prisma";
import ReturnButton from "./ReturnButton";

export default async function MyBorrowingsPage() {
  // On récupère ton utilisateur test (le même ID que pour l'emprunt)
  const user = await prisma.user.findFirst();

  if (!user) return <p className="p-10">Utilisateur non trouvé.</p>;

  const activeBorrowings = await prisma.borrowing.findMany({
    where: { 
      userId: user.id,
      returnedAt: null // On ne montre que ceux qui n'ont pas encore été rendus
    },
    include: { book: true },
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">📚 Mes Emprunts en cours</h1>
      
      {activeBorrowings.length === 0 ? (
        <div className="bg-gray-100 p-10 rounded-xl text-center text-gray-500">
          Vous n'avez aucun livre à rendre pour le moment.
        </div>
      ) : (
        <div className="grid gap-4">
          {activeBorrowings.map((b) => (
            <div key={b.id} className="bg-white border p-6 rounded-xl shadow-sm flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{b.book.title}</h2>
                <p className="text-gray-500 italic">de {b.book.author}</p>
                <p className="mt-2 text-sm">
                  ⏳ À rendre avant le : <span className="font-bold text-red-600">{new Date(b.dueDate).toLocaleDateString('fr-FR')}</span>
                </p>
              </div>
              
              <ReturnButton borrowingId={b.id} />
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8">
        <a href="/books" className="text-blue-600 hover:underline">← Retourner au catalogue</a>
      </div>
    </div>
  );
}