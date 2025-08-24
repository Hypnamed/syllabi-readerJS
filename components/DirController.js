"use client";
import { useEffect } from "react";
import { useLocale } from "next-intl";

export default function DirController() {
  const locale = useLocale();
  useEffect(() => {
    const isRtl = locale === "ar";
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
  }, [locale]);
  return null;
}
