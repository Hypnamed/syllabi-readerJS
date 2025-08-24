"use client";
import { usePathname, useRouter } from "@/app/i18n/navigation";
import { routing } from "@/app/i18n/routing";
import { useLocale } from "next-intl";

export default function LanguageSwitcher({ className }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  return (
    <select
      className={className ?? "border rounded-lg px-3 py-2 w-28"} // fixed width
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value })}
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
