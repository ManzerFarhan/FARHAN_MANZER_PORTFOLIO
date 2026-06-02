import ScrollyCanvas from "@/components/ScrollyCanvas";
import HeroOverlay from "@/components/HeroOverlay";
import About from "@/components/About";
import SkillsWrapper from "@/components/SkillsWrapper";
import Projects from "@/components/Projects";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import News from "@/components/News";

export default function Home() {
  return (
    <>
      <div className="relative">
        <ScrollyCanvas />
        <HeroOverlay />
      </div>
      <About />
      <SkillsWrapper />
      <Projects />
      <News />
      <Events />
      <Contact />
    </>
  );
}
