import { makeRouteHandler } from "@keystatic/next/route-handler";
import { isCmsEnabled } from "@/lib/cms-access";
import config from "../../../../../keystatic.config";

const handler = makeRouteHandler({ config });

// Second gate behind src/proxy.ts: local mode writes to disk, so it must never answer unless explicitly enabled.
const notFound = () => new Response("Not found", { status: 404 });

export function GET(request: Request) {
  return isCmsEnabled() ? handler.GET(request) : notFound();
}

export function POST(request: Request) {
  return isCmsEnabled() ? handler.POST(request) : notFound();
}
