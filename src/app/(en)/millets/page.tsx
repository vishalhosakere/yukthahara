import { MilletsPage, milletsMetadata } from "@/components/pages/MilletsPage";

export const generateMetadata = () => milletsMetadata("en");

export default function Page() {
  return <MilletsPage lang="en" />;
}
