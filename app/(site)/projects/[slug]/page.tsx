import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BackLink } from "@/components/back-link";
import { EmptyState } from "@/components/empty-state";
import { ExpandableImage } from "@/components/expandable-image";
import { LangText } from "@/components/lang-text";
import { hasBlocks, PortableBody } from "@/components/portable-body";
import { legacyProjectSlug } from "@/lib/slugs";
import { getProject, getProjects } from "@/sanity/fetch";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects?.map((project) => ({ slug: project.slug })) ?? [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(decodeSlug(slug));
  return { title: project?.title ?? "Projects" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decodeSlug((await params).slug);
  const direct = await getProject(slug);
  if (!direct) {
    const projects = await getProjects();
    const legacy = projects?.find((project) => legacyProjectSlug(project.title) === slug && project.slug !== slug);
    if (legacy) permanentRedirect(`/projects/${legacy.slug}`);
    notFound();
  }
  return (
    <>
      <BackLink href="/projects" label="Projects" />
      <h1 className="detail-title bold">
        <LangText is={direct.title} en={direct.titleEn} />
      </h1>
      {direct.imageUrl ? (
        <ExpandableImage src={direct.imageUrl} width={direct.imageWidth} height={direct.imageHeight} alt={direct.title} />
      ) : null}
      {hasBlocks(direct.bodyIs) || hasBlocks(direct.bodyEn) ? (
        <PortableBody is={direct.bodyIs} en={direct.bodyEn} />
      ) : (
        <EmptyState />
      )}
    </>
  );
}

function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}
