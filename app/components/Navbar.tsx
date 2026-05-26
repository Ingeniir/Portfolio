// app/components/Navbar.tsx
"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

const navLinks = [
  { label: "Accueil", href: "#home" },
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Compétences", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background text-foregrounds border-b border-neutral-300 dark:border-[#6e6e6e]">
      <div className="max-w-5xl mx-auto px-6 py-4 md:px-8 md:py-5 flex items-center justify-between">
        <motion.a
          href="#home"
          className="text-sm tracking-widest uppercase text-foreground font-medium flex items-center gap-2 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
          <span>Hoareau Cédric</span>
        </motion.a>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-center items-center md:hidden w-8 h-8 gap-1.5 z-50 focus:outline-none"
          aria-label="Menu de navigation"
        >
          {!isOpen ? (
            <Icon icon="quill:hamburger" className="w-6 h-6 text-foreground" />
          ) : (
            <Icon icon="ic:round-close" className="w-6 h-6 text-foreground" />
          )}
        </motion.button>

        <ul
          className={`
            fixed inset-0 bg-background text-foreground flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out z-40
            md:static md:flex md:flex-row md:items-center md:gap-10 md:bg-transparent md:translate-x-0
            ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          `}
        >
          {navLinks.map((link) => (
            <li key={link.href} className="w-full text-foreground text-center md:w-auto">
              <a
                onClick={() => setIsOpen(false)}
                href={link.href}
                className="relative text-lg md:text-sm text-foreground tracking-wide no-underline group block py-2 md:inline"
              >
                {link.label}
                <span className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 -bottom-0.5 h-px w-0 bg-black dark:bg-neutral-500 transition-all duration-300 ease-in-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};