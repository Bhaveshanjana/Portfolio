import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/projects/Project";
import TechStack from "@/components/TechStack";
import { GitHubGraph } from "@/components/github/GitHubGraph";
import SectionEffect from "@/components/utils/textEffect";
import { getGitHubContributions } from "@/lib/github";

export const revalidate = 3600;

export default async function Page() {
  let githubData = null;

  try {
    githubData = await getGitHubContributions();
  } catch (error) {
    console.error("Failed to prefetch GitHub contributions", error);
  }

  return (
    <div>
      <main className="max-w-[680px] mx-auto px-5 space-y-12 pb-20">
        <SectionEffect delay={0.1}>
          <Hero />
        </SectionEffect>

        <SectionEffect delay={0.12}>
          <GitHubGraph initialData={githubData} />
        </SectionEffect>

        <SectionEffect delay={0.15}>
          <Experience />
        </SectionEffect>

        <SectionEffect delay={0.2}>
          <Projects />
        </SectionEffect>

        <SectionEffect delay={0.2}>
          <TechStack />
        </SectionEffect>

        <SectionEffect delay={0.2}>
          <Contact />
        </SectionEffect>
      </main>
    </div>
  );
}
