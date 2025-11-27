import createMiddleware from 'next-intl/middleware';

export const routing = {
  // A list of all locales that are supported
  locales: ['uz', 'ru', 'en'],

  // Used when no locale matches
  defaultLocale: 'uz'
};

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(uz|ru|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
