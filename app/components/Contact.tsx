"use client";

import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

type Subject = "information" | "projet" | "autres" | "";

type FormData = {
  email: string;
  subject: Subject;
  info: string;
  projectName: string;
  projectDetails: string;
  other: string;
};

const subjects = [
  {
    value: "information",
    label: "Information",
    description: "Renseignements divers",
  },
  {
    value: "projet",
    label: "Projet",
    description: "Proposer une collaboration",
  },
  { value: "autres", label: "Autres", description: "Autre sujet" },
] as const;

const inputClass =
  "w-full text-sm text-black bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors duration-200 placeholder:text-neutral-300 resize-none";

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    email: "",
    subject: "",
    info: "",
    projectName: "",
    projectDetails: "",
    other: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const set = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!form.email || !form.subject) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ email: "", subject: "", info: "", projectName: "", projectDetails: "", other: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-4"
        >
          Contact
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              className="text-3xl md:text-4xl font-semibold tracking-tight text-black mb-5 leading-snug"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Une idée,
              <br />
              <span className="italic font-normal text-neutral-400">
                une question ?
              </span>
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed mb-8">
              Que ce soit pour un projet, une collaboration ou simplement pour
              échanger — je lis tous les messages et réponds dans les meilleurs
              délais.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { label: "GitHub", href: "https://github.com/Ingeniir", icon: "devicon:github" },
                { label: "LinkedIn", href: "https://linkedin.com/in/cédric-hoareau", icon: "devicon:linkedin" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex w-fit text-sm text-black group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{link.label}</span>
                    <Icon icon={link.icon} fontSize={16} />
                  </div>
                  <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-black transition-all duration-300 ease-in-out group-hover:w-full" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <input
              type="email"
              placeholder="Votre adresse email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className="w-full text-sm text-black bg-white border-b border-b-neutral-300 focus:border-b-foreground hover:border-b-foreground px-4 py-3 outline-none transition-colors duration-200 placeholder:text-neutral-300 resize-none"
            />

            <div className="grid grid-cols-3 gap-2">
              {subjects.map((s) => (
                <button
                  key={s.value}
                  onClick={() => set("subject", s.value)}
                  className={`rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
                    form.subject === s.value
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 bg-white text-black hover:border-neutral-400"
                  }`}
                >
                  <p className="text-xs font-medium">{s.label}</p>
                  <p
                    className={`text-[11px] mt-0.5 ${form.subject === s.value ? "text-neutral-300" : "text-neutral-400"}`}
                  >
                    {s.description}
                  </p>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {form.subject === "information" && (
                <motion.div
                  key="information"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <textarea
                    rows={4}
                    placeholder="Votre message ou demande d'information..."
                    value={form.info}
                    onChange={(e) => set("info", e.target.value)}
                    className={inputClass}
                  />
                </motion.div>
              )}

              {form.subject === "projet" && (
                <motion.div
                  key="projet"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="Nom du projet"
                    value={form.projectName}
                    onChange={(e) => set("projectName", e.target.value)}
                    className={inputClass}
                  />
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre projet, vos attentes, le contexte..."
                    value={form.projectDetails}
                    onChange={(e) => set("projectDetails", e.target.value)}
                    className={inputClass}
                  />
                </motion.div>
              )}

              {form.subject === "autres" && (
                <motion.div
                  key="autres"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <textarea
                    rows={4}
                    placeholder="Écrivez ce que vous souhaitez..."
                    value={form.other}
                    onChange={(e) => set("other", e.target.value)}
                    className={inputClass}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleSubmit}
              disabled={!form.email || !form.subject || status === "loading"}
              className="w-full bg-black text-white text-sm font-medium py-3 rounded-xl hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {status === "loading"
                ? "Envoi en cours..."
                : "Envoyer le message"}
            </button>

            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-center text-neutral-500"
                >
                  ✓ Message envoyé avec succès. Je vous répondrai rapidement.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-center text-red-400"
                >
                  Une erreur est survenue. Réessayez ou contactez-moi
                  directement.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
