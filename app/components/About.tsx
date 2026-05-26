// app/components/About.tsx
"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";

const facts = [
  { label: "Formation", value: "L2 MIASHS" },
  { label: "Passion depuis", value: "15 ans" },
  { label: "Spécialités maths", value: "Algèbre & Stats" },
  { label: "Cap actuel", value: "Data Science" },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 sm:px-8 bg-gray-50/50">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-600 mb-10 md:mb-16"
        >
          À propos
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative max-w-md mx-auto md:max-w-none w-full"
          >
            <div className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 aspect-4/5 grayscale-50 hover:grayscale-0 transition-all duration-700">
              <img
                src="/CV-Photo.png"
                alt="Hoareau Cédric"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-neutral-500" />
            </div>

            {/* Positionnement sécurisé du badge de localisation pour éviter les débordements sur écran mobile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-3 right-3 md:-bottom-6 md:-right-6 bg-background border border-neutral-100 dark:border-neutral-500 rounded-xl px-4 py-3 md:px-5 md:py-4 shadow-sm"
            >
              <p className="text-[10px] md:text-xs text-neutral-400 dark:text-neutral-600 uppercase tracking-widest mb-0.5">
                Localisation
              </p>
              <p className="text-xs md:text-sm font-medium text-black dark:text-white">La Réunion 🇷🇪</p>
            </motion.div>
          </motion.div>

          {/* Bloc Texte & Faits */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="pt-2"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug tracking-tight text-black dark:text-white mb-6"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Curieux de nature,
              <br />
              <span className="italic font-normal text-neutral-400 dark:text-neutral-600">
                rigoureux par choix.
              </span>
            </h2>

            <div className="space-y-4 text-neutral-500 dark:text-neutral-400 leading-relaxed text-[15px]">
              <p>
                Depuis mes 15 ans, l'informatique n'est pas qu'un outil — c'est
                un terrain d'exploration. J'ai commencé par{" "}
                <span className="text-black font-medium">Python</span>,
                découvert le web avec{" "}
                <span className="text-black font-medium">React et Next.js</span>
                , et aujourd'hui je plonge dans la{" "}
                <span className="text-black font-medium">Data Science</span>.
              </p>
              <p>
                En parallèle, les mathématiques ont toujours occupé une place
                centrale — pas comme une contrainte académique, mais comme une
                façon de penser. L'
                <span className="text-black font-medium">algèbre</span> et les{" "}
                <span className="text-black font-medium">statistiques</span> me
                fascinent pour leur capacité à structurer le chaos.
              </p>
              <p>
                Ce qui me motive vraiment ? Trouver la{" "}
                <span className="text-black font-medium">
                  meilleure solution
                </span>{" "}
                à un problème — pas juste une solution. Apprendre, remettre en
                question, recommencer.
              </p>
            </div>

            <div className="my-6 md:my-8 h-px bg-neutral-100 dark:bg-neutral-500" />

 
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                  className="border border-neutral-100 dark:border-neutral-500 bg-white dark:bg-neutral-800 rounded-xl px-3 py-2.5 md:px-4 md:py-3"
                >
                  <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-1">
                    {fact.label}
                  </p>
                  <p className="text-xs md:text-sm font-medium text-black dark:text-white">{fact.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Bouton de téléchargement */}
            <motion.a
              href="/CV.pdf"
              download
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="inline-flex items-center gap-2 mt-8 text-sm text-black dark:text-white group py-2"
            >
              <span className="relative">
                Télécharger mon CV
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-black dark:bg-neutral-500 transition-all duration-300 ease-in-out group-hover:w-full" />
              </span>
              <Icon icon="material-symbols:download" className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
            </motion.a>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}