export const revalidate = 0;
// 1. AJOUT DE L'IMPORT (Très important)
import BorrowButton from "@/app/books/BorrowButton";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";

  let books = [];
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/books?q=${query}`, {
      cache: "no-store", 
    });
    books = await res.json();
  } catch (err) {
    console.error("Erreur Fetch:", err);
  }

  if (!Array.isArray(books)) {
    books = [];
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Catalogue des Livres</h1>
        
        <form action="/books" method="GET" className="flex gap-2">
          <input 
            name="q" 
            placeholder="Rechercher..." 
            className="border p-2 rounded-lg shadow-sm w-64"
            defaultValue={query}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Filtrer
          </button>
        </form>
      </div>

      {books.length === 0 ? (
        <div className="p-10 border-2 border-dashed rounded-xl text-center text-gray-500">
          Aucun livre ne correspond à votre recherche ou la base est vide.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book: any) => (
            <div key={book.id} className="border p-5 rounded-xl shadow-sm bg-white flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${book.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {book.available ? 'DISPONIBLE' : 'EMPRUNTÉ'}
                  </span>
                </div>
                <p className="text-gray-600 italic mb-4">de {book.author}</p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="text-[10px] font-mono text-gray-400">ISBN: {book.isbn}</div>
                
                {/* 2. INTÉGRATION DU BOUTON INTERACTIF */}
                {book.available ? (
                  <BorrowButton bookId={book.id} />
                ) : (
                  <button disabled className="w-full bg-gray-100 text-gray-400 py-2 rounded-lg cursor-not-allowed font-semibold">
                    Déjà emprunté
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}