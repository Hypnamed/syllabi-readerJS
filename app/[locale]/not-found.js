import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/app/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <main>
      <div className="flex justify-center m-20">
        <Image
          src="/not-found.svg"
          alt="Not Found Image"
          width="500"
          height="500"
        />
      </div>
      <div>
        <h1 className="text-center text-4xl font-semibold">{t("title")}</h1>
        <Button className="flex justify-self-center my-10 h-12 w-60 text-xl">
          <Link href="/">{t("return")}</Link>
        </Button>
      </div>
    </main>
  );
}
