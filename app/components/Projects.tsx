// app/components/Project.tsx
"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  github?: string;
  year: string;
  icon?: React.ReactNode;
  status?: boolean;
};

const projects: Project[] = [
  {
    title: "Databook",
    description:
      "Application de type notebook adaptée pour l'analyse de données, les statistiques et même les prises de notes.",
    tags: ["React", "Tauri", "Rust", "Python"],
    year: "2026",
    icon: <Icon icon="catppuccin:tauri" className="w-6 h-6" />,
    status: true,
  },
  {
    title: "Clip Battle",
    description:
      "Transposer le format ultra-populaire des \"Beat Battle\" de la production musicale vers l'univers du montage vidéo court (TikTok, Reels, Shorts). L'objectif est de créer une plateforme communautaire et gamifiée où les monteurs s'affrontent chaque semaine autour d'un \"Pack de Battle\" imposé : des rushs vidéos bruts, des effets sonores (SFX) obligatoires et une contrainte technique précise (format, durée, style). Un système de vote intégré permet à la communauté d'élire le meilleur montage de la session.",
    tags: ["Next.js", "Supabase"],
    year: "2026",
    icon: <Icon icon="material-symbols:http" className="w-6 h-6" />,
    status: true,
  },
  {
    title: "Snapshot Manager",
    description:
      "Bibliothèque logicielle en Rust dédiée à la gestion d'historique pour une application de prise de notes scientifiques. Ce projet m'a permis d'appliquer des concepts de programmation système (gestion de l'ownership, manipulation asynchrone d'I/O et cycle de vie de la mémoire) pour offrir un moteur de persistance ultra-rapide et tolérant aux pannes, prêt à être interfacé avec un frontend React via Tauri.",
    tags: ["Rust"],
    github: "https://github.com/Ingeniir/snapshot_manager",
    year: "2026",
    icon: <Icon icon="catppuccin:rust-alt" className="w-6 h-6" />,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col border border-neutral-100 dark:border-neutral-500 rounded-2xl p-5 md:p-6 bg-background dark:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-500 transition-all duration-300 hover:shadow-sm"
    >

      <div className="absolute top-4 right-4 text-neutral-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        {project.icon ? (
          project.icon
        ) : (
          <Icon icon="ph:dev-to-logo-light" className="w-6 h-6" />
        )}
      </div>

      <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-neutral-300 dark:text-neutral-600 mb-3 md:mb-4">
        {project.year}
      </span>

      <h3 className="text-base font-semibold text-black dark:text-white mb-2 tracking-tight">
        {project.title}
      </h3>

      <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] md:text-[11px] bg-neutral-50 text-neutral-400 dark:text-neutral-600 border border-neutral-100 dark:border-neutral-500 px-2.5 py-1 rounded-full tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer adaptatif pour gérer les liens et les statuts sans chevauchement */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-100 w-full mt-auto">
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-600 hover:text-black dark:hover:text-white transition-colors duration-200 py-1"
            >
              <Icon icon="mdi:github" className="w-4 h-4" />
              GitHub
            </a>
          )}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-black transition-colors duration-200 py-1"
            >
              <Icon icon="mdi:external-link" className="w-4 h-4" />
              Voir le projet
            </a>
          )}
        </div>
        
        {project.status && (
          <span className="inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-medium rounded-lg bg-neutral-50 text-neutral-500 border border-neutral-100">
            En cours
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 px-6 sm:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-700 mb-4"
        >
          Projets
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-black mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Ce que j'ai construit.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-neutral-400 dark:text-neutral-600 text-sm mb-10 md:mb-14 max-w-md leading-relaxed"
        >
          Quelques projets qui reflètent ma façon d'apprendre — en construisant,
          en cassant, et en recommençant mieux.
        </motion.p>

        {/* Grille responsive : 1 col sur mobile, 2 cols sur tablette, 3 cols sur desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-neutral-300 text-center mt-12 py-2"
        >
          D'autres projets arrivent bientôt —{" "}
          <a
            href="https://github.com/Ingeniir?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 dark:text-neutral-600 hover:text-black transition-colors duration-200 underline underline-offset-2"
          >
            voir mon GitHub
          </a>
        </motion.p>
      </div>
    </section>
  );
}