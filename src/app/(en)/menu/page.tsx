import { MenuPage, menuMetadata } from "@/components/pages/MenuPage";

export const generateMetadata = () => menuMetadata("en");

export default function Page() {
  return <MenuPage lang="en" />;
}
