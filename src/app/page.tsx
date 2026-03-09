import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
              Plateforme Master 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
              La lecture devient <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                instantanée.
              </span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Une bibliothèque numérique moderne conçue pour les étudiants. Empruntez, réservez et gérez vos lectures en un clic avec une interface intuitive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/books" 
                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 hover:-translate-y-1"
              >
                Explorer le catalogue
              </Link>
              <Link 
                href="/my-borrowings" 
                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all"
              >
                Mes emprunts
              </Link>
            </div>
          </div>
        </div>

        {/* Décoration d'arrière-plan (Cercles flous) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Stats Section - Bento Grid Style */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-4xl font-black text-blue-600 mb-2">10+</div>
              <div className="text-slate-900 font-bold">Livres Disponibles</div>
              <p className="text-slate-500 text-sm mt-2">Une sélection triée sur le volet pour vos études.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-4xl font-black text-indigo-600 mb-2">24/7</div>
              <div className="text-slate-900 font-bold">Accès Instantané</div>
              <p className="text-slate-500 text-sm mt-2">Empruntez vos livres à toute heure du jour ou de la nuit.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-4xl font-black text-slate-900 mb-2">0€</div>
              <div className="text-slate-900 font-bold">Frais de retard</div>
              <p className="text-slate-500 text-sm mt-2">Une gestion simplifiée et bienveillante de vos retours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm italic">
          Projet d'étude — Développé avec Next.js 16, Tailwind & Prisma.
        </p>
      </footer>
    </div>
  );
}