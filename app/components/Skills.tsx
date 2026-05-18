"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";

type Skill = {
  name: string;
  level: "Maîtrisé" | "Avancé" | "En apprentissage";
  icon: string;
};

type Category = {
  label: string;
  description: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    label: "Python",
    description: "Mon premier langage, celui que je maîtrise le mieux depuis des années.",
    skills: [
      { name: "Python", level: "Maîtrisé", icon: "devicon:python" },
      { name: "NumPy", level: "Avancé", icon: "devicon:numpy" },
      { name: "Pandas", level: "Avancé", icon: "devicon:pandas" },
      { name: "Matplotlib", level: "Avancé", icon: "devicon:matplotlib" },
    ],
  },
  {
    label: "Web",
    description: "Du HTML brut jusqu'aux frameworks modernes — l'écosystème JS dans son ensemble.",
    skills: [
      { name: "HTML / CSS", level: "Maîtrisé", icon: "devicon:html5" },
      { name: "JavaScript", level: "Maîtrisé", icon: "devicon:javascript" },
      { name: "React", level: "Avancé", icon: "devicon:react" },
      { name: "Next.js", level: "Avancé", icon: "devicon:nextjs" },
      { name: "Tailwind CSS", level: "Avancé", icon: "devicon:tailwindcss" },
      { name: "Motion", level: "Avancé", icon: "devicon:motion" },
      { name: "Prisma", level: "Avancé", icon: "devicon:prisma" },
    ],
  },
  {
    label: "Data Science",
    description: "Des bases solides en modélisation statistique, un domaine que j'explore activement.",
    skills: [
      { name: "Régression linéaire", level: "Maîtrisé", icon: "solar:graph-linear" },
      { name: "Régression multiple", level: "Maîtrisé", icon: "tabler:chart-dots-3" },
      { name: "Régression logistique", level: "Maîtrisé", icon: "mdi:chart-bell-curve" },
      { name: "Scikit-learn", level: "En apprentissage", icon: "devicon:scikitlearn" },
      { name: "Deep Learning", level: "En apprentissage", icon: "" },
    ],
  },
];

const levelConfig = {
  "Maîtrisé": {
    dot: "bg-green-500",
    text: "text-black",
    bar: "bg-black",
    width: "w-full",
  },
  "Avancé": {
    dot: "bg-yellow-400",
    text: "text-neutral-400",
    bar: "bg-neutral-300",
    width: "w-2/3",
  },
  "En apprentissage": {
    dot: "bg-neutral-200",
    text: "text-neutral-300",
    bar: "bg-neutral-100",
    width: "w-1/3",
  },
};

function SkillRow({ skill, index }: { skill: Skill; index: number }) {
  const config = levelConfig[skill.level];

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.03 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex items-center justify-between gap-4 py-3 border-b border-neutral-50 last:border-0"
    >
      <div className="flex items-center gap-2.5">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
        <div className="flex items-center gap-2">
            <span className="text-sm text-black">{skill.name}</span>
            <Icon icon={skill.icon} className="text-lg text-neutral-400" />
        </div>
      </div>
      <span className={`text-[11px] uppercase tracking-widest ${config.text}`}>
        {skill.level}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8 bg-neutral-50/50">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-4"
        >
          Compétences
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
          Ce que je sais faire.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-neutral-400 text-sm mb-16 max-w-md leading-relaxed"
        >
          Un ensemble de compétences construites par la pratique — et qui continue de grandir.
        </motion.p>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-6 mb-10"
        >
          {Object.entries(levelConfig).map(([label, config]) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              <span className="text-[11px] uppercase tracking-widest text-neutral-400">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.12 }}
              className="bg-white border border-neutral-100 rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold text-black tracking-tight mb-1">
                {cat.label}
              </h3>
              <p className="text-[12px] text-neutral-400 leading-relaxed mb-5">
                {cat.description}
              </p>

              <div>
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
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 border border-neutral-100 rounded-2xl p-6 bg-white flex items-start gap-5"
        >
            <Icon icon="boxicons:sigma" fontSize={30} />
          <div>
            <h3 className="text-sm font-semibold text-black mb-1">Mathématiques</h3>
            <p className="text-[13px] text-neutral-400 leading-relaxed">
              Une vraie passion pour l'
              <span className="text-black">algèbre</span> et les{" "}
              <span className="text-black">statistiques</span> — pas uniquement
              comme support à la data, mais comme discipline en soi. Les
              probabilités aussi, à leur juste mesure.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}