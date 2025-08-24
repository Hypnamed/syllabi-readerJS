import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/app/i18n/routing";
import DirController from "@/components/DirController";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <DirController />
      {children}
    </NextIntlClientProvider>
  );
}

// app/[locale]/layout.js
export function generateStaticParams() {
  return ["en", "es", "tr", "fr", "ja", "ko", "zh", "ar"].map((l) => ({
    locale: l,
  }));
}
