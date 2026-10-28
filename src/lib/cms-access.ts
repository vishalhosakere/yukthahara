/**
 * The CMS admin and its API are closed unless they are gated: GitHub mode (repo collaborators sign in),
 * Keystatic Cloud (invited team members sign in), or local mode explicitly opted into for development.
 */
export function isCmsEnabled(): boolean {
  const storage = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE;
  return storage === "github" || storage === "cloud" || process.env.KEYSTATIC_LOCAL_ADMIN === "true";
}
