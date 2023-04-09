import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(req.nextUrl.pathname);

  if (user && req.nextUrl.pathname === '/' && !req.nextUrl.searchParams.get('noredirect')) {
    return NextResponse.redirect(new URL('/add', req.url));
  } else if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
