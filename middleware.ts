import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function
export function middleware(request: NextRequest) {
  // Get the current pathname
  const { pathname } = request.nextUrl;

  // Check if the path is '/privacy-policy'
  if (pathname === '/privacy-policy') {
    // Redirect to another route
    return NextResponse.redirect("https://www.crowdpolicy.com/terms-crowdapps-generic/");
  }

  // Allow the request to continue if no redirect is needed
  return NextResponse.next();
}

// Define the matcher for routes
export const config = {
  // This will match all routes
  matcher: '/:path*',
};
