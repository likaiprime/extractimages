import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip if the request is for static files or API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return
  }

  // Check if the pathname starts with a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    // Get the preferred locale from cookie or default to 'en'
    const locale = request.cookies.get('NEXT_LOCALE')?.value || i18n.defaultLocale

    // Redirect to the same pathname with locale prefixed
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === '/' ? '' : pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip all static files (images, etc)
    '/((?!api|_next|.*\\..*).*)',
  ],
}
