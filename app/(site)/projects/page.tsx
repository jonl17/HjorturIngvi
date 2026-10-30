import type { Metadata } from "next";
import Link from "next/link";
import { LangText } from "@/components/lang-text";
import { getProjects } from "@/sanity/fetch";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getProjects();
  if (!projects || projects.length === 0) return <h1 className="bold">Coming soon...</h1>;
  return (
    <>
      {projects.map((project) => (
        <h1 className="project-link bold" key={project.slug}>
          <Link href={`/projects/${project.slug}`}>
            <LangText is={project.title} en={project.titleEn} />
          </Link>
        </h1>
      ))}
    </>
  );
}
