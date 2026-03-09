📚 BiblioMaster - Gestion de Bibliothèque Universitaire
Lien de la démo : https://ilan-shiva-biblio.vercel.app 

Groupe : Shiva Ilanchejian, Djabrail Khapizov 

🎯 Présentation du projet
Développé dans le cadre du Master 2 (2025/2026), ce projet est une application web fullstack moderne permettant aux étudiants et enseignants de gérer leurs emprunts de livres en toute sécurité.
+1

🛠️ Stack Technique (Obligatoire)
Framework : Next.js 15 (App Router) 
+2

Langage : TypeScript (Strict mode) 
+3

ORM : Prisma avec base de données MySQL 
+4

Authentification : Système JWT personnalisé (Access + Refresh Tokens) 
+2

Validation : Zod (côté serveur) 

Style : Tailwind CSS 

🔐 Sécurité & Authentification
Conformément aux exigences de sécurité "Hard Level" du sujet:

Zéro LocalStorage : Toutes les sessions sont gérées via des cookies HttpOnly, Secure et SameSite=Strict.

Double Token JWT :

Access Token : Durée de vie courte (15-20 min) pour sécuriser les actions.

Refresh Token : Durée de vie longue (7 jours) stocké de manière sécurisée.

Middleware de protection : Interception des routes privées (/books, /my-borrowings) avec vérification et rafraîchissement automatique du token.
+1

📖 Règles Métier Implémentées
Disponibilité : Un livre ne peut être emprunté que s'il est marqué comme "disponible".

Limite d'emprunts : Maximum 3 livres simultanés par utilisateur.

Gestion des dates : Calcul automatique de la date de retour à J+14.

Suivi des statuts : Affichage dynamique des états "En cours", "Rendu" et "En retard".

Déploiement
L'application est optimisée pour Vercel. Les Server Components et Server Actions sont utilisés pour maximiser les performances et la sécurité