/**
 * The CMS admin and its API are closed unless they are gated: GitHub mode (repo collaborators sign in),
 * Keystatic Cloud (invited team members sign in), or local mode explicitly opted into for development.
 */
export function isCmsEnabled(): boolean {
  const storage = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE;
  // Local mode's save API is unauthenticated, so the opt-in only ever works under `next dev` on loopback.
  const localOptIn = process.env.KEYSTATIC_LOCAL_ADMIN === "true" && process.env.NODE_ENV === "development";
  return storage === "github" || storage === "cloud" || localOptIn;
}
