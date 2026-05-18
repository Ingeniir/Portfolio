// app/page.tsx

import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  )
}