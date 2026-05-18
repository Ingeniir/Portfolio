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
      className="relative min-h-screen flex flex-col justify-center px-8 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      <div className="relative max-w-5xl mx-auto w-full pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
          </span>
          <span className="text-sx tracking-widest uppercase text-neutral-500">
            Disponible pour des opportunités
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="text-sm tracking-[0.2em] uppercase text-neutral-400 mb-3 font-medium"
        >
          Hoareau Cédric
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36 }}
          className="text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-foreground mb-6 font-georgia"
        >
          Coder, analyser,
          <br />
          <span className="italic font-normal text-neutral-400">
            comprendre.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28 }}
          className="text-base md:text-lg text-neutral-500 max-w-xl leading-relaxed mb-10"
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
          className="flex flex-wrap gap-2 mb-12"
        >
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.38 + index * 0.07 }}
              className="text-sx border border-neutral-200 text-neutral-500 px-3 py-1.5 rounded-full tracking-wide"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="flex items-center gap-6"
        >
          <a
            href="#projects"
            className="relative text-sm font-medium text-foreground group"
          >
            Voir mes projets
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-white bg-foreground px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors duration-200"
          >
            Me contacter
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} className="absolute bottom-10 left-0 flex items-center gap-3">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} className="w-px h-10 bg-neutral-300 mx-auto" />
          <span className="text-sx tracking-widest text-neutral-400 uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
};
