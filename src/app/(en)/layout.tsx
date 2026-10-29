import { SiteShell, siteMetadata, siteViewport } from "@/components/layout/SiteShell";

export const generateMetadata = () => siteMetadata("en");
export const viewport = siteViewport;

export default function EnglishLayout({ children }: LayoutProps<"/">) {
  return (
    <SiteShell lang="en">
      {children}
    </SiteShell>
  );
}
