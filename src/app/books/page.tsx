
export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // 1. On attend les paramètres de recherche
  const params = await searchParams;
  const query = params.q || "";

  // 2. Appel API avec l'URL complète
  // On ajoute un try/catch pour ne pas faire crasher la page si l'API met du temps
  let books = [];
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/books?q=${query}`, {
      cache: "no-store", 
    });
    books = await res.json();
  } catch (err) {
    console.error("Erreur Fetch:", err);
  }

  // 3. Sécurité : si books n'est pas un tableau (ex: erreur JSON), on le vide
  if (!Array.isArray(books)) {
    books = [];
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Catalogue des Livres</h1>
        
        <form action="/books" method="GET" className="flex gap-2">
          <input 
            name="q" 
            placeholder="Rechercher..." 
            className="border p-2 rounded shadow-sm"
            defaultValue={query}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Filtrer</button>
        </form>
      </div>

      {books.length === 0 ? (
        <div className="p-10 border-2 border-dashed rounded-xl text-center text-gray-500">
          Aucun livre ne correspond à votre recherche ou la base est vide.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book: any) => (
            <div key={book.id} className="border p-4 rounded-xl shadow-sm bg-white">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-600 italic">de {book.author}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs font-mono text-gray-400">ISBN: {book.isbn}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${book.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {book.available ? 'DISPONIBLE' : 'EMPRUNTÉ'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}