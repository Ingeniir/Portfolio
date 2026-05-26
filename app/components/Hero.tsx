// app/components/Hero.tsx

"use client";

import { motion } from "motion/react";

const tags = [
  "React & Next.js",
  "Python",
  "Data Science",
  "Algèbre",
  "Statistiques",
];

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-8 overflow-hidden bg-background"
    >

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      <div className="relative max-w-5xl mx-auto w-full pt-32 pb-32 md:pt-28 md:pb-24 flex flex-col justify-center min-h-screen-minus-nav">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6 md:mb-10 self-start"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
          </span>
          <span className="text-[10px] md:text-sx tracking-widest uppercase text-neutral-500 dark:text-neutral-200 font-medium">
            Disponible pour des opportunités
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="text-xs md:text-sm tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-100 mb-3 font-medium"
        >
          Hoareau Cédric
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36 }}
          className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.1] md:leading-[1.05] tracking-tight text-foreground mb-6 font-georgia"
        >
          Coder, analyser,
          <br />
          <span className="italic font-normal text-neutral-400 dark:text-neutral-100">
            comprendre.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28 }}
          className="text-base md:text-lg text-neutral-500 dark:text-neutral-200 max-w-xl leading-relaxed mb-8 md:mb-10"
        >
          Étudiant en L2 MIASHS, je construis à la frontière entre le{" "}
          <span className="text-foreground font-medium">code</span>, les{" "}
          <span className="text-foreground font-medium">mathématiques</span> et
          la <span className="text-foreground font-medium">data</span> -
          passionné par les problèmes qui méritent qu'on y réfléchisse vraiment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="flex flex-wrap gap-2 mb-10 md:mb-12"
        >
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.38 + index * 0.07 }}
              className="text-xs border border-neutral-200 dark:border-neutral-600 text-neutral-500 dark:text-neutral-200 px-3 py-1.5 rounded-full tracking-wide bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="flex items-center gap-6 mb-16 md:mb-0"
        >
          <a
            href="#projects"
            className="relative text-sm font-medium text-foreground group py-2"
          >
            Voir mes projets
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-background dark:bg-neutral-500 transition-all duration-300 ease-in-out group-hover:w-full" />
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-white bg-foreground dark:border dark:border-gray-800 px-5 py-2.5 rounded-full dark:hover:bg-neutral-600 hover:bg-neutral-800 transition-colors duration-200 shadow-sm"
          >
            Me contacter
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.6, delay: 1 }} 
          className="absolute bottom-6 md:bottom-10 left-6 sm:left-8 md:left-0 flex items-center gap-3 sm:flex"
        >
          <motion.div 
            animate={{ y: [0, 6, 0] }} 
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} 
            className="w-px h-8 md:h-10 bg-neutral-300 dark:bg-neutral-600" 
          />
          <span className="text-[10px] md:text-sx tracking-widest text-neutral-400 dark:text-neutral-600 uppercase font-medium">
            Scroll
          </span>
        </motion.div>

      </div>
    </section>
  );
};