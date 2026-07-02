// app/components/Project.tsx
"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  github?: string;
  year: string;
  icon?: React.ReactNode;
  image?: string;
  status?: boolean;
};

const projects: Project[] = [
  {
    title: "BoundNotes",
    description:
      "BoundNotes est une application desktop de prise de notes Markdown, locale et orientée productivité, pensée comme une alternative légère à Inkdrop. Elle combine un éditeur CodeMirror avec aperçu en temps réel, notebooks hiérarchiques, tags colorés, notes épinglées, corbeille, recherche plein texte SQLite FTS5 et restauration automatique de la dernière note ouverte.\n" +
        "\n" +
        "Le projet est construit avec Tauri v2, SolidJS, TypeScript et Rust, avec une architecture local-first centrée sur la performance, la simplicité et une expérience fluide.",
    tags: ["Solid", "Tauri", "Rust", "SQLite"],
    year: "2026",
    icon: <Icon icon="catppuccin:tauri" className="w-6 h-6" />,
    github: "https://github.com/Ingeniir/BoundNotes"
  },
  {
    title: "Organised",
    description:
      "Application mobile de productivité étudiante développée en React Native (Expo), ciblant iPad et iPhone. Intègre un calendrier hebdomadaire et mensuel avec synchronisation de l'emploi du temps universitaire via iCal ADE, une gestion de tâches avec timer de révision, un suivi financier avec compte principal et argent de poche, et un dashboard avec previews en temps réel. Backend Supabase avec authentification, Row Level Security et transactions atomiques. Distribuée via sideload sur iPad avec un pipeline CI/CD GitHub Actions.",
    tags: ["React Native", "Expo", "TanStack"],
    year: "2026",
    image: "/icon.svg",
    github: "https://github.com/Ingeniir/Organised"
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
      className="group relative flex flex-col border border-[var(--color-border)] bg-[var(--color-card)] rounded-2xl p-5 md:p-6 hover:border-neutral-300 dark:hover:border-neutral-500 transition-all duration-300 hover:shadow-sm"
    >

      <div className={`absolute ${project.image ? 'top-2 right-2' : 'top-4 right-4'} text-neutral-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200`}>
        {project.icon ? (
          project.icon
        ) : project.image ? (
          <Image src={project.image} width={50} height={50} alt="icon" />
        ) : 
        (
          <Icon icon="ph:dev-to-logo-light" className="w-6 h-6" />
        )}
      </div>

      <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-3 md:mb-4">
        {project.year}
      </span>

      <h3 className="text-base font-semibold text-black dark:text-white mb-2 tracking-tight">
        {project.title}
      </h3>

      <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed flex-1 mb-5">
          {project.description.split("\n\n").map((para, i) => (
              <span key={i} className={"block mb-2"}>{para}</span>
          ))}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] md:text-[11px] bg-[var(--color-surface)] text-[var(--color-subtle)] border border-[var(--color-border-light)] px-2.5 py-1 rounded-full tracking-wide"
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
              <span>GitHub</span>
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
          <span className="inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-medium rounded-lg bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border-light)]">
            En cours
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 px-6 sm:px-8 bg-background">
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
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-strong)] mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Ce que j&#39;ai construit.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-neutral-400 dark:text-neutral-600 text-sm mb-10 md:mb-14 max-w-md leading-relaxed"
        >
          Quelques projets qui reflètent ma façon d&#39;apprendre — en construisant,
          en cassant, et en recommençant mieux.
        </motion.p>

        {/* Grille responsive : 1 col sur mobile, 2 cols sur tablette, 3 cols sur desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-neutral-300 text-center mt-12 py-2"
        >
          D&#39;autres projets arrivent bientôt —{" "}
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