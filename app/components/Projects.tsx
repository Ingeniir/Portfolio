"use client";

import { motion } from "motion/react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  github?: string;
  year: string;
};

// ✏️ Ajoute tes projets ici
const projects: Project[] = [
  {
    title: "Nom du projet",
    description:
      "Une courte description de ce que fait le projet, le problème qu'il résout et ta contribution.",
    tags: ["Python", "Data Science"],
    github: "https://github.com/",
    year: "2024",
  },
  {
    title: "Nom du projet",
    description:
      "Une courte description de ce que fait le projet, le problème qu'il résout et ta contribution.",
    tags: ["React", "Next.js"],
    href: "https://",
    github: "https://github.com/",
    year: "2024",
  },
  {
    title: "Nom du projet",
    description:
      "Une courte description de ce que fait le projet, le problème qu'il résout et ta contribution.",
    tags: ["Statistiques", "Python"],
    github: "https://github.com/",
    year: "2025",
  },
];

// Icône GitHub
function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// Icône lien externe
function IconExternal() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col border border-neutral-100 rounded-2xl p-6 bg-white hover:border-neutral-300 transition-all duration-300 hover:shadow-sm"
    >
      {/* Year badge */}
      <span className="text-[11px] uppercase tracking-widest text-neutral-300 mb-4">
        {project.year}
      </span>

      {/* Title */}
      <h3 className="text-base font-semibold text-black mb-2 tracking-tight">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-500 leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      {/* Tags */}
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

      {/* Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-black transition-colors duration-200"
          >
            <IconGithub />
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
            <IconExternal />
            Voir le projet
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-8">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-4"
        >
          Projets
        </motion.p>

        {/* Heading */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        {/* Bottom note */}
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