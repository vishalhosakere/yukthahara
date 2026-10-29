import { isSharePage, SHARE_PAGES, shareImage } from "@/lib/share";

/** Share images for each page, prerendered at build: /og/home, /og/menu, /og/millets. */
export const generateStaticParams = () => SHARE_PAGES.map((page) => ({ page }));

export async function GET(_request: Request, { params }: RouteContext<"/og/[page]">) {
  const { page } = await params;
  if (!isSharePage(page)) return new Response("Not found", { status: 404 });
  return shareImage(page);
}
