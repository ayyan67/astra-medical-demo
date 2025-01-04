import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add demo banner indication to all protected pages
    const response = NextResponse.next();
    if (process.env.NEXT_PUBLIC_APP_MODE === 'demo') {
      response.headers.set('x-demo-mode', 'true');
    }
    return response;
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/claims/:path*",
    "/settings/:path*",
  ],
};