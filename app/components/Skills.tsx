// app/components/Skills.tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import { useIsDarkMode } from "../hooks/useIsDarkMode";

type Icon = {
  whiteIcon: string;
  darkIcon: string;
};

type Skill = {
  name: string;
  level: "Maîtrisé" | "Avancé" | "En apprentissage";
  icon: Icon;
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
      "Mes langages de programmation contribuant au développement de mes projets personnels et professionnels.",
    skills: [
      {
        name: "Python",
        level: "Maîtrisé",
        icon: { whiteIcon: "devicon:python", darkIcon: "proicons:python" },
        detail:
          "Programmation polyvalente pour le développement web, la data science et l'automatisation, avec une syntaxe claire et une vaste bibliothèque standard.",
      },
      {
        name: "Rust",
        level: "En apprentissage",
        icon: { whiteIcon: "devicon:rust", darkIcon: "teenyicons:rust-outline" },
        detail:
          "Programmation système sécurisée avec gestion de la mémoire sans garbage collector et performances élevées.",
      },
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
        icon: { whiteIcon: "devicon:html5", darkIcon: "codex:html" },
        detail:
          "Bases solides : sémantique HTML, mise en page CSS, Flexbox, Grid et responsive design.",
      },
      {
        name: "JavaScript",
        level: "Maîtrisé",
        icon: {
          whiteIcon: "devicon:javascript",
          darkIcon: "ri:javascript-fill",
        },
        detail:
          "Manipulation du DOM, ES6+, async/await, fetch API et logique applicative côté client.",
      },
      {
        name: "React",
        level: "Maîtrisé",
        icon: { whiteIcon: "devicon:react", darkIcon: "akar-icons:react-fill" },
        detail:
          "Composants fonctionnels, hooks, gestion d'état et architecture de projets front-end modernes.",
      },
      {
        name: "Next.js",
        level: "Avancé",
        icon: { whiteIcon: "devicon:nextjs", darkIcon: "ri:nextjs-fill" },
        detail:
          "App Router, routes API, Server Components, SSR et déploiement sur Vercel.",
      },
      {
        name: "Tailwind CSS",
        level: "Avancé",
        icon: {
          whiteIcon: "devicon:tailwindcss",
          darkIcon: "mdi:tailwind",
        },
        detail:
          "Styling utility-first, design system cohérent et interfaces responsives sans CSS custom.",
      },
      {
        name: "Prisma",
        level: "En apprentissage",
        icon: { whiteIcon: "devicon:prisma", darkIcon: "lineicons:prisma" },
        detail:
          "ORM TypeScript pour modéliser les bases de données et interagir avec PostgreSQL ou SQLite.",
      },
      {
        name: "Supabase",
        level: "En apprentissage",
        icon: { whiteIcon: "devicon:supabase", darkIcon: "ri:supabase-fill" },
        detail:
          "Le complément idéal pour mes prototypes et projets de type Clip Battle : gestion fluide du stockage et des politiques de sécurité.",
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
        icon: {
          whiteIcon: "solar:graph-linear",
          darkIcon: "solar:graph-linear",
        },
        detail:
          "Modélisation de la relation entre une variable cible et un prédicteur continu, interprétation des coefficients.",
      },
      {
        name: "Régression multiple",
        level: "Maîtrisé",
        icon: {
          whiteIcon: "tabler:chart-dots-3",
          darkIcon: "tabler:chart-dots-3",
        },
        detail:
          "Extension à plusieurs prédicteurs, analyse de multicolinéarité et sélection de variables.",
      },
      {
        name: "Régression logistique",
        level: "Maîtrisé",
        icon: {
          whiteIcon: "mdi:chart-bell-curve",
          darkIcon: "mdi:chart-bell-curve",
        },
        detail:
          "Classification binaire, interprétation des odds ratios et évaluation par matrice de confusion.",
      },
      {
        name: "Scikit-learn",
        level: "En apprentissage",
        icon: {
          whiteIcon: "devicon:scikitlearn",
          darkIcon: "devicon-plain:scikitlearn",
        },
        detail:
          "Exploration des pipelines ML : preprocessing, entraînement de modèles et évaluation des performances.",
      },
      {
        name: "Deep Learning",
        level: "En apprentissage",
        icon: {
          whiteIcon: "carbon:machine-learning-model",
          darkIcon: "carbon:machine-learning-model",
        },
        detail:
          "Découverte des réseaux de neurones, des couches denses et des concepts fondamentaux comme la backpropagation.",
      },
    ],
  },
];

const levelConfig = {
  Maîtrisé: {
    dot: "bg-green-500",
    text: "text-neutral-800",
  },
  Avancé: {
    dot: "bg-amber-400",
    text: "text-neutral-600",
  },
  "En apprentissage": {
    dot: "bg-neutral-300 dark:bg-neutral-400",
    text: "text-neutral-400 dark:text-neutral-600",
  },
};

function SkillRow({ skill, index }: { skill: Skill; index: number }) {
  const config = levelConfig[skill.level];
  const [isOpen, setIsOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (rowRef.current && !rowRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.015, transition: { duration: 0.15 } }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative flex items-center justify-between gap-4 py-3 border-b border-neutral-100 dark:border-neutral-300 last:border-0 cursor-pointer md:cursor-default select-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-2.5">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-800">
            {skill.name}
          </span>
          {skill.icon && (
            <Icon
              icon={isDarkMode ? skill.icon.darkIcon : skill.icon.whiteIcon}
              className="text-base text-neutral-400 dark:text-neutral-500 shrink-0"
            />
          )}
        </div>
      </div>
      <span
        className={`text-[10px] md:text-[11px] font-medium uppercase tracking-widest shrink-0 ${config.text}`}
      >
        {skill.level}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 w-70 sm:w-64 bg-white border border-neutral-200/60 rounded-xl shadow-xl px-4 py-3.5 pointer-events-none"
          >
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-neutral-200/60 rotate-45" />

            <div className="flex items-center gap-2 mb-2">
              {skill.icon && (
                <Icon icon={isDarkMode ? skill.icon.darkIcon : skill.icon.whiteIcon} className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
              )}
              <p className="text-xs font-semibold text-neutral-900">
                {skill.name}
              </p>
              <span
                className={`ml-auto text-[9px] font-bold uppercase tracking-widest ${config.text}`}
              >
                {skill.level}
              </span>
            </div>
            <p className="text-[12px] text-neutral-500 leading-relaxed font-normal">
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
    <section
      id="skills"
      className="py-20 md:py-32 px-6 sm:px-8 bg-neutral-50/50"
    >
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
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-black mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Ce que je sais faire.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-neutral-400 text-sm mb-12 md:mb-16 max-w-md leading-relaxed"
        >
          Un ensemble de compétences construites par la pratique — et qui
          continue de grandir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10"
        >
          {Object.entries(levelConfig).map(([label, config]) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-medium text-neutral-400">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="bg-white border border-neutral-200/50 rounded-2xl p-5 md:p-6 shadow-sm/50"
            >
              <h3 className="text-sm font-semibold text-neutral-900 tracking-tight mb-1">
                {cat.label}
              </h3>
              <p className="text-[12px] text-neutral-400 leading-relaxed mb-5 min-h-9">
                {cat.description}
              </p>
              <div className="mt-2">
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
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 border border-neutral-200/50 rounded-2xl p-5 md:p-6 bg-white flex items-start gap-4"
        >
          <div className="p-2 bg-neutral-50 rounded-xl text-neutral-800 shrink-0">
            <Icon icon="boxicons:sigma" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-1">
              Mathématiques
            </h3>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              Une vraie passion pour l'
              <span className="font-medium text-neutral-800">algèbre</span> et
              les{" "}
              <span className="font-medium text-neutral-800">statistiques</span>{" "}
              — pas uniquement comme support à la data, mais comme discipline en
              soi. Les probabilités aussi, à leur juste mesure.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
