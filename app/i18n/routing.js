import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "tr", "fr", "ja", "ko", "zh", "ar"],
  defaultLocale: "en",
});
