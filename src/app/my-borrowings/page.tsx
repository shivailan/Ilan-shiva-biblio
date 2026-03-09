import { prisma } from "@/lib/prisma";

export default async function MyBorrowingsPage() {
  // Simuler l'utilisateur connecté (Prends le premier de la base pour le TP)
  const user = await prisma.user.findFirst();
  
  if (!user) return <div className="p-8">Utilisateur non trouvé. Inscrivez-vous !</div>;

  // On récupère les emprunts NON rendus avec les infos du livre
  const borrowings = await prisma.borrowing.findMany({
    where: { 
      userId: user.id,
      returnedAt: null // Filtrer uniquement ce qui n'est pas encore rendu
    },
    include: {
      book: true // Jointure pour avoir le titre et l'auteur
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📚 Mes Emprunts</h1>
      
      {borrowings.length === 0 ? (
        <p className="text-gray-500">Vous n'avez aucun livre en cours.</p>
      ) : (
        <div className="space-y-4">
          {borrowings.map((b) => (
            <div key={b.id} className="border p-4 rounded-lg bg-blue-50 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">{b.book.title}</h2>
                <p className="text-sm text-gray-600">À rendre pour le : 
                  <span className="text-red-600 font-bold ml-1">
                    {new Date(b.dueDate).toLocaleDateString('fr-FR')}
                  </span>
                </p>
              </div>
              
              <button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                // Prochaine étape : Ajouter l'action pour RENDRE le livre
              >
                Rendre
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}