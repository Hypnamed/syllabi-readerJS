import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "tr"],
  defaultLocale: "en",
  // localePrefix: 'as-needed' // optional
});
