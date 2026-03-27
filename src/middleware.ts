import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host')

  // Production redirect from vytrixe.com to www.vytrixe.com
  if (process.env.NODE_ENV === 'production' && hostname === 'vytrixe.com') {
    url.hostname = 'www.vytrixe.com'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

// Only run on home and app pages
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
