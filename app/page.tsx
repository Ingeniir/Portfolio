// app/page.tsx

import { About } from "./components/About";
import Agenda from "./components/Agenda";
import Contact from "./components/Contact";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Agenda />
      <Skills />
      <Contact />
    </main>
  );
}
