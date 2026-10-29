import { HomePage, homeMetadata } from "@/components/pages/HomePage";

export const generateMetadata = () => homeMetadata("kn");

export default function Page() {
  return <HomePage lang="kn" />;
}
