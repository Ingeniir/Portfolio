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
      "Application de type notebook adapter pour l'analyse de données, les statistiques et même les prises de notes.",
    tags: ["React", "Tauri", "Rust", "Python"],
    github: "https://github.com/",
    year: "2026",
    icon: <Icon icon="catppuccin:tauri" className="w-6 h-6" />,
    status: true,
  },
  {
    title: "Clip Battle",
    description:
      "Transposer le format ultra-populaire des \"Beat Battle\" de la production musicale vers l'univers du montage vidéo court (TikTok, Reels, Shorts). L'objectif est de créer une plateforme communautaire et gamifiée où les monteurs s'affrontent chaque semaine autour d'un \"Pack de Battle\" imposé : des rushs vidéos bruts, des effets sonores (SFX) obligatoires et une contrainte technique précise (format, durée, style). Un système de vote intégré permet à la communauté d'élire le meilleur montage de la session.",
    tags: ["Next.js", "Supabase"],
    github: "https://github.com/",
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
      className="group relative flex flex-col border border-neutral-100 rounded-2xl p-6 bg-white hover:border-neutral-300 transition-all duration-300 hover:shadow-sm"
    >
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {project.icon ? (
          project.icon
        ) : (
          <Icon icon="ph:dev-to-logo-light" className="w-6 h-6" />
        )}
      </div>

      <span className="text-[11px] uppercase tracking-widest text-neutral-300 mb-4">
        {project.year}
      </span>

      <h3 className="text-base font-semibold text-black mb-2 tracking-tight">
        {project.title}
      </h3>

      <p className="text-sm text-neutral-500 leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] bg-neutral-50 text-neutral-400 border border-neutral-100 px-2.5 py-1 rounded-full tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-neutral-100 w-full">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-black transition-colors duration-200"
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
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-black transition-colors duration-200"
          >
            <Icon icon="mdi:external-link" className="w-4 h-4" />
            Voir le projet
          </a>
        )}
        {project.status && (
          <div className="w-full flex items-center justify-end">
            <span className="flex items-center justify-center px-3 py-1 text-xs font-medium rounded-lg bg-neutral-100 text-neutral-800">
              En cours
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-4"
        >
          Projets
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-black mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Ce que j'ai construit.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-neutral-400 text-sm mb-14 max-w-md leading-relaxed"
        >
          Quelques projets qui reflètent ma façon d'apprendre — en construisant,
          en cassant, et en recommençant mieux.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-neutral-300 text-center mt-12"
        >
          D'autres projets arrivent bientôt —{" "}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-black transition-colors duration-200 underline underline-offset-2"
          >
            voir mon GitHub
          </a>
        </motion.p>
      </div>
    </section>
  );
}
