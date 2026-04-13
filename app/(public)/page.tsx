import { Hero } from "@/components/Home/Hero";
import { Projects } from "@/components/Home/Projects";
import { Skills } from "@/components/Home/Skills";
import { Contact } from "@/components/Home/Contact";
import { About } from "@/components/Home/About";
import { Experience } from "@/components/Home/Experience";
import { Education } from "@/components/Home/Education";

export default function Home() {
    return (
        <main>
            <Hero />
            <About />
            <Skills />
            <Education />
            <Experience />
            <Projects />
            <Contact />
        </main>
    );
}
