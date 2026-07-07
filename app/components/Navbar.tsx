// app/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

const sections: string[] = [
  "home",
  "about",
  "projects",
  "agenda",
  "skills",
  "contact",
];

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Accueil", href: "#home" },
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Agenda", href: "#agenda" },
  { label: "Compétences", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background border-b border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto px-6 py-4 md:px-8 md:py-5 flex items-center justify-between">
        <motion.a
          href="#home"
          className="text-sm tracking-widest uppercase font-medium flex items-center gap-2 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Image src="/favicon.ico" alt="Logo" width={28} height={28} />
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
          {navLinks.map((link, index) => (
            <li
              key={sections[index]}
              className="w-full text-center md:w-auto text-[--color-strong] bg-[--color-card]"
            >
              <a
                onClick={() => setIsOpen(false)}
                href={link.href}
                className={`relative text-lg md:text-sm font-sans tracking-wide no-underline block py-2 hover:text-foreground transition-colors duration-200 ${
                  activeSection === sections[index]
                    ? "text-foreground"
                    : "text-foreground/70"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 bottom-1 h-0.5 transition-all duration-300 ease-in-out bg-[var(--color-strong)] ${
                    activeSection === sections[index]
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
