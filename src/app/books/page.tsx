export const revalidate = 0;
import BorrowButton from "@/app/books/BorrowButton";
import { prisma } from "@/lib/prisma"; // Import direct de Prisma

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";

  // RÉCUPÉRATION DIRECTE (Plus rapide, plus sûr, validé par le TP)
  const books = await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: query } }, // Filtre simple pour la recherche 
        { author: { contains: query } },
      ],
    },
    orderBy: { title: "asc" },
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-slate-900 italic">LE CATALOGUE.</h1>
        
        <form action="/books" method="GET" className="flex gap-2">
          <input 
            name="q" 
            placeholder="Titre, auteur..." 
            className="bg-white border-none p-3 rounded-xl shadow-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
            defaultValue={query}
          />
          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all">
            Filtrer
          </button>
        </form>
      </div>

      {books.length === 0 ? (
        <div className="p-20 border-2 border-dashed border-slate-200 rounded-[2rem] text-center text-slate-400 bg-white">
          Aucun livre ne correspond à votre recherche.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:border-blue-100 transition-all group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${book.available ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {book.available ? '● Disponible' : '● Emprunté'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">{book.title}</h2>
                <p className="text-slate-400 italic mt-2 italic">de {book.author}</p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 bg-slate-50 p-2 rounded-lg w-fit">
                  ISBN {book.isbn}
                </div>
                
                {book.available ? (
                  <BorrowButton bookId={book.id} />
                ) : (
                  <button disabled className="w-full bg-slate-50 text-slate-300 py-4 rounded-2xl cursor-not-allowed font-bold text-sm">
                    Indisponible
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