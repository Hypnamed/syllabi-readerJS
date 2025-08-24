import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

const routing = { locales: ["en", "es", "tr"], defaultLocale: "en" };

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // i18n → ../locales/... because both are under /app
  const messages = (await import(`../locales/${locale}/common.json`)).default;

  return { locale, messages };
});
