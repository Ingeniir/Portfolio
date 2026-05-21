# Portfolio — Hoareau Cédric

Portfolio personnel développé avec Next.js, présentant mon parcours, mes compétences et mes projets en tant qu'étudiant en L2 MIASHS passionné par le développement web et la Data Science.

🌐 **[Voir le portfolio en ligne](https://ton-portfolio.vercel.app)**

---

## Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Langage | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animations | [Motion](https://motion.dev/) |
| Envoi de mails | [Resend](https://resend.com/) |
| Icônes | [Iconify](https://iconify.design/) |
| Déploiement | [Vercel](https://vercel.com/) |

---

## Fonctionnalités

- **Single-page** — navigation fluide entre les sections via scroll smooth
- **Navbar fixe** avec effet underline animé au survol
- **Section Hero** — accroche, présentation rapide et liens CTA
- **Section À propos** — parcours, photo, carte de localisation et téléchargement du CV
- **Section Projets** — grille de cartes extensible avec liens GitHub et démo
- **Section Compétences** — niveaux visuels et modal descriptif au survol de chaque compétence
- **Section Contact** — formulaire intelligent avec sujets dynamiques (Information / Projet / Autres) et envoi de mail via Resend

---

## Lancer le projet en local

### Prérequis

- Node.js >= 18
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/ton-username/portfolio.git
cd portfolio

# Installer les dépendances
npm install
```

### Variables d'environnement

Crée un fichier `.env.local` à la racine du projet :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

> Obtiens ta clé API sur [resend.com](https://resend.com) — gratuit jusqu'à 3 000 mails/mois.

### Démarrer le serveur de développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## Structure du projet

```
portfolio/
├── app/
│   ├── layout.tsx          # Layout global + métadonnées
│   ├── page.tsx            # Page principale (assemblage des sections)
│   ├── globals.css         # Styles globaux + scroll-behavior: smooth
│   └── api/
│       └── contact/
│           └── route.ts    # Route API Resend pour le formulaire de contact
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── Contact.tsx
├── public/
│   ├── about.jpg           # Photo de profil
│   └── CV_Hoareau_Cedric.pdf
├── .env.local              # Variables d'environnement (non versionné)
├── .gitignore
└── README.md
```

---

## Déploiement sur Vercel

Ce portfolio est hébergé sur **Vercel**, la plateforme des créateurs de Next.js.

### Étapes

1. Crée un compte sur [vercel.com](https://vercel.com) si ce n'est pas déjà fait
2. Importe le dépôt GitHub depuis le dashboard Vercel
3. Ajoute la variable d'environnement `RESEND_API_KEY` dans **Settings → Environment Variables**
4. Clique sur **Deploy** — Vercel détecte automatiquement Next.js

Chaque `git push` sur la branche `main` déclenche un redéploiement automatique.

---

## Ajouter un projet

Dans `components/Projects.tsx`, ajoute un objet au tableau `projects` :

```ts
{
  title: "Nom du projet",
  description: "Ce que fait le projet en 2-3 phrases.",
  tags: ["Python", "Next.js"],
  github: "https://github.com/ton-username/projet",
  href: "https://demo-projet.vercel.app", // optionnel
  year: "2025",
}
```

---

## Auteur

**Hoareau Cédric** — Étudiant L2 MIASHS, La Réunion 🇷🇪

[![GitHub](https://img.shields.io/badge/GitHub-ton--username-black?logo=github)](https://github.com/ton-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hoareau%20C%C3%A9dric-blue?logo=linkedin)](https://linkedin.com/in/ton-profil)