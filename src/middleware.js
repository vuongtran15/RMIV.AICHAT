import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware triggered');
  // Get the path that is being accessed
  const path = request.nextUrl.pathname;
  console.log('Path:', path);
  
  // Get auth token from cookies
  const authToken = request.cookies.get('auth-token')?.value;
  console.log('Auth token:', authToken);
  
  // If the path is not login and user is not authenticated, redirect to login
  if (!authToken && path !== '/login') {
    console.log('Redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If user is authenticated and tries to access login page, redirect to home
  if (authToken && path === '/login') {
    console.log('User authenticated, redirecting to home');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // if the not logged and in the login page, continue with the request return login page
  console.log('User authenticated or accessing login page, continuing request');
  
  // Continue with the request
  return NextResponse.next();
}

// Configure which paths this middleware should be run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|images).*)',
  ],
};
