import { getRequestConfig } from 'next-intl/server';
import { routing } from './middleware';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  try {
    return {
      locale,
      messages: (await import(`./locales/${locale}.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load locale messages for ${locale}:`, error);
    // Fallback to default locale if current locale fails
    try {
      return {
        locale: routing.defaultLocale,
        messages: (await import(`./locales/${routing.defaultLocale}.json`)).default
      };
    } catch (fallbackError) {
      console.error(`Failed to load fallback locale messages:`, fallbackError);
      throw fallbackError;
    }
  }
});
