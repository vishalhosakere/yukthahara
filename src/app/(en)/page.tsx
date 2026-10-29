import { HomePage, homeMetadata } from "@/components/pages/HomePage";

export const generateMetadata = () => homeMetadata("en");

export default function Page() {
  return <HomePage lang="en" />;
}
