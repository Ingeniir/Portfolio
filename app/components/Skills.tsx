"use client";

import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { useState, useRef } from "react";

type Skill = {
  name: string;
  level: "Maîtrisé" | "Avancé" | "En apprentissage";
  icon: string;
  detail: string;
};

type Category = {
  label: string;
  description: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    label: "Langages",
    description:
      "Mes langages de programmation contribuant au développement de mes/vos projets personnels et professionnels.",
    skills: [
      {
        name: "Python",
        level: "Maîtrisé",
        icon: "devicon:python",
        detail:
          "Programmation polyvalente pour le développement web, la data science et l'automatisation, avec une syntaxe claire et une vaste bibliothèque standard.",
      },
      {
        name: "Rust",
        level: "En apprentissage",
        icon: "devicon:rust",
        detail:
          "Programmation système sécurisée avec gestion de la mémoire et performances élevées.",
      }
    ],
  },
  {
    label: "Web",
    description:
      "Du HTML brut jusqu'aux frameworks modernes — l'écosystème JS dans son ensemble.",
    skills: [
      {
        name: "HTML / CSS",
        level: "Maîtrisé",
        icon: "devicon:html5",
        detail:
          "Bases solides : sémantique HTML, mise en page CSS, Flexbox, Grid et responsive design.",
      },
      {
        name: "JavaScript",
        level: "Maîtrisé",
        icon: "devicon:javascript",
        detail:
          "Manipulation du DOM, ES6+, async/await, fetch API et logique applicative côté client.",
      },
      {
        name: "React",
        level: "Maîtrisé",
        icon: "devicon:react",
        detail:
          "Composants fonctionnels, hooks, gestion d'état et architecture de projets front-end modernes.",
      },
      {
        name: "Next.js",
        level: "Avancé",
        icon: "devicon:nextjs",
        detail:
          "App Router, routes API, Server Components, SSR et déploiement sur Vercel.",
      },
      {
        name: "Tailwind CSS",
        level: "Avancé",
        icon: "devicon:tailwindcss",
        detail:
          "Styling utility-first, design system cohérent et interfaces responsives sans CSS custom.",
      },
      {
        name: "Prisma",
        level: "En apprentissage",
        icon: "devicon:prisma",
        detail:
          "ORM TypeScript pour modéliser les bases de données et interagir avec PostgreSQL ou SQLite.",
      },
      {
        name: "Supabase",
        level: "En apprentissage",
        icon: "devicon:supabase",
        detail:
          "Plateforme de développement backend serverless avec base de données PostgreSQL intégrée.",
      },
    ],
  },
  {
    label: "Data Science",
    description:
      "Des bases solides en modélisation statistique, un domaine que j'explore activement.",
    skills: [
      {
        name: "Régression linéaire",
        level: "Maîtrisé",
        icon: "solar:graph-linear",
        detail:
          "Modélisation de la relation entre une variable cible et un prédicteur continu, interprétation des coefficients.",
      },
      {
        name: "Régression multiple",
        level: "Maîtrisé",
        icon: "tabler:chart-dots-3",
        detail:
          "Extension à plusieurs prédicteurs, analyse de multicolinéarité et sélection de variables.",
      },
      {
        name: "Régression logistique",
        level: "Maîtrisé",
        icon: "mdi:chart-bell-curve",
        detail:
          "Classification binaire, interprétation des odds ratios et évaluation par matrice de confusion.",
      },
      {
        name: "Scikit-learn",
        level: "En apprentissage",
        icon: "devicon:scikitlearn",
        detail:
          "Exploration des pipelines ML : preprocessing, entraînement de modèles et évaluation des performances.",
      },
      {
        name: "Deep Learning",
        level: "En apprentissage",
        icon: "carbon:machine-learning-model",
        detail:
          "Découverte des réseaux de neurones, des couches denses et des concepts fondamentaux comme la backpropagation.",
      },
    ],
  },
];

const levelConfig = {
  Maîtrisé: {
    dot: "bg-green-500",
    text: "text-black",
  },
  Avancé: {
    dot: "bg-yellow-400",
    text: "text-neutral-400",
  },
  "En apprentissage": {
    dot: "bg-neutral-200",
    text: "text-neutral-300",
  },
};

function SkillRow({ skill, index }: { skill: Skill; index: number }) {
  const config = levelConfig[skill.level];
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.15, delay: 0.07 } }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="relative flex items-center justify-between gap-4 py-3 border-b border-neutral-50 last:border-0 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2.5">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
        <div className="flex items-center gap-2">
          <span className="text-sm text-black">{skill.name}</span>
          {skill.icon && (
            <Icon icon={skill.icon} className="text-lg text-neutral-400" />
          )}
        </div>
      </div>
      <span
        className={`text-[11px] uppercase tracking-widest shrink-0 ${config.text}`}
      >
        {skill.level}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 bottom-full mb-2 z-50 w-64 bg-white border border-neutral-100 rounded-xl shadow-md px-4 py-3 pointer-events-none"
          >
            {/* Arrow */}
            <div className="absolute -bottom-1.5 left-5 w-3 h-3 bg-white border-r border-b border-neutral-100 rotate-45" />

            <div className="flex items-center gap-2 mb-1.5">
              {skill.icon && (
                <Icon
                  icon={skill.icon}
                  className="text-base text-neutral-500"
                />
              )}
              <p className="text-xs font-semibold text-black">{skill.name}</p>
              <span
                className={`ml-auto text-[10px] uppercase tracking-widest ${config.text}`}
              >
                {skill.level}
              </span>
            </div>
            <p className="text-[12px] text-neutral-400 leading-relaxed">
              {skill.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-4"
        >
          Compétences
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-black mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Ce que je sais faire.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-neutral-400 text-sm mb-16 max-w-md leading-relaxed"
        >
          Un ensemble de compétences construites par la pratique — et qui
          continue de grandir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-6 mb-10"
        >
          {Object.entries(levelConfig).map(([label, config]) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              <span className="text-[11px] uppercase tracking-widest text-neutral-400">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.12 }}
              className="bg-white border border-neutral-100 rounded-2xl p-6 overflow-visible"
            >
              <h3 className="text-sm font-semibold text-black tracking-tight mb-1">
                {cat.label}
              </h3>
              <p className="text-[12px] text-neutral-400 leading-relaxed mb-5">
                {cat.description}
              </p>
              <div>
                {cat.skills.map((skill, si) => (
                  <SkillRow key={skill.name} skill={skill} index={si} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 border border-neutral-100 rounded-2xl p-6 bg-white flex items-start gap-5"
        >
          <Icon icon="boxicons:sigma" fontSize={30} />
          <div>
            <h3 className="text-sm font-semibold text-black mb-1">
              Mathématiques
            </h3>
            <p className="text-[13px] text-neutral-400 leading-relaxed">
              Une vraie passion pour l'
              <span className="text-black">algèbre</span> et les{" "}
              <span className="text-black">statistiques</span> — pas uniquement
              comme support à la data, mais comme discipline en soi. Les
              probabilités aussi, à leur juste mesure.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
