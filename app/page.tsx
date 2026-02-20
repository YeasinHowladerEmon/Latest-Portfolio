import { About } from "@/components/Home/About";
import { Contact } from "@/components/Home/Contact";
import { Hero } from "@/components/Home/Hero";
import { Projects } from "@/components/Home/Projects";
import { Skills } from "@/components/Home/Skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />

    </div>
  );
}
