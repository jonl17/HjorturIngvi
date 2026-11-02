export interface PublicSanityEnv {
  projectId: string;
  dataset: string;
  configured: boolean;
}

/** Public ids only. Safe to import from Studio and from server code. */
export function publicSanityEnv(): PublicSanityEnv {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "";
  const configured = /^[a-z0-9-]+$/i.test(projectId) && projectId.length >= 8 && dataset.length > 0;
  return { projectId, dataset, configured };
}
