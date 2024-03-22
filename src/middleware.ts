import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  //   console.log("middleware running...");

  const session = await getToken({ req: request });

  console.log(session);

  //   return NextResponse.rewrite(new URL("/", request.url));
  return NextResponse.next();
}
