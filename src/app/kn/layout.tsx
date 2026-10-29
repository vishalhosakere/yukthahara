import { SiteShell, siteMetadata, siteViewport } from "@/components/layout/SiteShell";

export const generateMetadata = () => siteMetadata("kn");
export const viewport = siteViewport;

export default function KannadaLayout({ children }: LayoutProps<"/kn">) {
  return (
    <SiteShell lang="kn">
      {children}
    </SiteShell>
  );
}
