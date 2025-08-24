import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Button } from "@/components/ui/button";

import LanguageSwitch from "@/components/LanguageSwitch";

export default function HomePage() {
  const t = useTranslations("Homepage");
  return (
    <main className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold min-h-[2.5rem] flex items-center">
          <Link href="/" className="whitespace-nowrap">
            Syllabi-Reader
          </Link>
        </h1>
        <LanguageSwitch className="w-28" />
      </header>
      <section className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-center text-2xl lg:text-3xl font-bold my-10">
          {t("title")}
        </h2>
        <p className="mx-10 lg:mx-40 text-2xl max-w-[70ch] text-center md:text-justify [text-wrap:balance] leading-relaxed">
          {t("description")}
        </p>

        <Button
          asChild
          className="mx-auto my-10 h-16 w-60 text-xl whitespace-nowrap"
        >
          <Link href="/upload">{t("button")}</Link>
        </Button>

        <h2 className="text-center text-3xl font-bold my-10">{t("goals")}</h2>
        <p className="text-center break-words md:text-justify mx-10 mb-10 lg:mx-40 text-2xl">
          {t("features")}
        </p>
      </section>
      <footer className="mt-auto mb-10">
        <div className="flex justify-center items-center gap-1 text-2xl flex-wrap">
          <span>{t("footer")}</span>
          <a
            href="https://ilkeeren.dev"
            target="_blank"
            rel="noopener"
            className="text-blue-500 hover:underline"
          >
            Eren
          </a>
          <span>&</span>
          <a
            href="https://www.linkedin.com/in/hassan-syed/"
            target="_blank"
            rel="noopener"
            className="text-blue-500 hover:underline"
          >
            Hassan
          </a>
        </div>
      </footer>
    </main>
  );
}
