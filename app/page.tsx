// app/page.tsx

import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
    </main>
  )
}