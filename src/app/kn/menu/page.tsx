import { MenuPage, menuMetadata } from "@/components/pages/MenuPage";

export const generateMetadata = () => menuMetadata("kn");

export default function Page() {
  return <MenuPage lang="kn" />;
}
