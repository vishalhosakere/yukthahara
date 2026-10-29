import { MilletsPage, milletsMetadata } from "@/components/pages/MilletsPage";

export const generateMetadata = () => milletsMetadata("kn");

export default function Page() {
  return <MilletsPage lang="kn" />;
}
