// app/components/Contact.tsx
"use client";

import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import {useEffect, useState} from "react";

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


    const isReady =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
            form.info.trim() !== "" ||
            (form.projectName.trim() !== "" && form.projectDetails.trim() !== "") ||
            form.other.trim() !== ""
        );
    const [pathDone, setPathDone] = useState<boolean>(false);

  const set = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));


  const handleSubmit = async () => {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      if (!form.email || !isValidEmail || !form.subject) return;

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
    <section id="contact" className="py-20 md:py-32 px-6 sm:px-8 bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-black mb-5 leading-snug"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Une idée,
              <br />
              <span className="italic font-normal text-neutral-400">
                une question ?
              </span>
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed mb-8 max-w-sm">
              Que ce soit pour un projet, une collaboration ou simplement pour
              échanger — je lis tous les messages et réponds dans les meilleurs
              délais.
            </p>

            <div className="flex flex-col gap-3.5">
              {[
                { label: "GitHub", href: "https://github.com/Ingeniir", icon: "devicon:github" },
                { label: "LinkedIn", href: "https://linkedin.com/in/cédric-hoareau", icon: "devicon:linkedin" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex w-fit text-sm text-neutral-600 hover:text-black transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-2">
                    <span>{link.label}</span>
                    <Icon icon={link.icon} className="text-base text-neutral-400 group-hover:text-black transition-colors" />
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
            className="flex flex-col gap-5 w-full"
          >
            <div className="w-full">
              <input
                type="email"
                placeholder="Votre adresse email"
                value={form.email}
                onChange={(e) => {
                    set("email", e.target.value);
                    if (status === "error") setStatus("idle");
                }}
                className="w-full text-sm text-black bg-white border-b border-neutral-200 focus:border-black px-1 py-3 outline-none transition-colors duration-200 placeholder:text-neutral-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
              {subjects.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  aria-pressed={form.subject === s.value}
                  onClick={() => set("subject", s.value)}
                  className={`rounded-xl border p-3.5 text-left transition-all duration-200 ${
                    form.subject === s.value
                      ? "border-black bg-black text-white shadow-sm"
                      : "border-neutral-200 bg-white text-black hover:border-neutral-400"
                  }`}
                >
                  <p className="text-xs font-semibold">{s.label}</p>
                  <p
                    className={`text-[11px] mt-0.5 leading-tight ${
                      form.subject === s.value ? "text-neutral-300" : "text-neutral-400"
                    }`}
                  >
                    {s.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="overflow-hidden w-full">
              <AnimatePresence mode="wait">
                {form.subject === "information" && (
                  <motion.div
                    key="information"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
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
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
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
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
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
            </div>

              <div className="relative mt-1">
                  <button
                      onClick={handleSubmit}
                      disabled={!isReady || status === "loading"}
                      className="w-full bg-black text-white text-sm font-medium py-3 rounded-xl hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed shadow-sm"
                  >
                      {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
                  </button>


                  <div className="absolute hidden md:block" style={{ left: "100%", top: "70%", transform: "translateY(-50%)" }}>
                      <div className="relative" style={{ width: 310, height: 92 }}>
                          <svg width="310" height="92" viewBox="0 0 310 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d={"M0.5 34.0002C180.88 20.5443 198.382 25.9824 226.5 34.0002C258.086 43.0067 252.4 59.5693 252.5 70C252.681 88.8587 218.763 91.1144 214 90.5C204.42 89.2643 190.888 89.597 184.5 73.5C172.32 42.8064 217.886 19.0418 235 20C256.749 21.2177 306 11.5 309.5 0.5"}
                                  stroke={"lightgray"}
                                  strokeLinecap={"round"}
                                  strokeLinejoin={"bevel"}
                                  strokeWidth={"2"}
                                  strokeDasharray={"12 12"}
                              />

                              <motion.path
                                  d="M0.5 34.0002C180.88 20.5443 198.382 25.9824 226.5 34.0002C258.086 43.0067 252.4 59.5693 252.5 70C252.681 88.8587 218.763 91.1144 214 90.5C204.42 89.2643 190.888 89.597 184.5 73.5C172.32 42.8064 217.886 19.0418 235 20C256.749 21.2177 306 11.5 309.5 0.5"
                                  stroke="black"
                                  strokeLinecap="round"
                                  strokeLinejoin="bevel"
                                  strokeWidth="2"
                                  fill="none"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: isReady ? 1 : 0 }}
                                  transition={{ duration: 0.8, ease: "easeInOut" }}
                                  onAnimationComplete={() => setPathDone(isReady)}
                              />
                          </svg>



                          <div className="absolute" style={{ left: 295, top: -18 }}>
                              <motion.div
                                  animate={{ color: pathDone ? "#000000" : "#d1d5db" }}
                                  transition={{ duration: 0.3 }}
                              >
                                  <Icon icon="lucide:send" className="text-4xl" />
                              </motion.div>
                          </div>
                      </div>
                  </div>
              </div>

            <div className="min-h-5">
              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-center text-neutral-500 font-medium"
                  >
                    ✓ Message envoyé avec succès. Je vous répondrai rapidement.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-center text-red-500 font-medium"
                  >
                    Une erreur est survenue. Réessayez ou utilisez un autre canal.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}