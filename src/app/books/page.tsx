import { prisma } from "@/lib/prisma";

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold my-8">Catalogue des livres</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-gray-600 italic">par {book.author}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className={`text-sm px-2 py-1 rounded ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {book.available ? 'Disponible' : 'Emprunté'}
              </span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:bg-gray-400" disabled={!book.available}>
                Emprunter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}