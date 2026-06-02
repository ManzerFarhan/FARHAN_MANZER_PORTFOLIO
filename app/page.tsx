import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsWrapper from "@/components/SkillsWrapper";
import Projects from "@/components/Projects";
import News from "@/components/News";
import Events from "@/components/Events";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SkillsWrapper />
      <Projects />
      <News />
      <Events />
      <Contact />
    </>
  );
}
