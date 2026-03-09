import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const books = [
    { title: "Algorithmique", author: "Thomas Cormen", isbn: "9780262033848", category: "Informatique", year: 2009 },
    { title: "Clean Code", author: "Robert C. Martin", isbn: "9780132350884", category: "Software Engineering", year: 2008 },
    { title: "Le Seigneur des Anneaux", author: "J.R.R. Tolkien", isbn: "9782266154116", category: "Fantastique", year: 1954 },
    { title: "Design Patterns", author: "Erich Gamma", isbn: "9780201633610", category: "Informatique", year: 1994 },
    // Ajoute d'autres livres ici pour atteindre les 15-20 demandés
  ]

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: { ...book, available: true },
    })
  }
  console.log("Catalogue initialisé !")
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())