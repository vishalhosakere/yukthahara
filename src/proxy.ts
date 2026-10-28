import { NextResponse } from "next/server";
import { isCmsEnabled } from "@/lib/cms-access";

export function proxy() {
  if (isCmsEnabled()) return NextResponse.next();
  return new NextResponse("Not found", { status: 404, headers: { "content-type": "text/plain", "x-robots-tag": "noindex" } });
}

export const config = {
  matcher: ["/keystatic/:path*", "/keystatic", "/api/keystatic/:path*"],
};
