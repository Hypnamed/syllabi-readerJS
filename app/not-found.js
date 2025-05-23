import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function notFound() {
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
        <h1 className="text-center text-4xl font-semibold">
          The page you are looking for doesn&apos;t exist.
        </h1>
        <Button className="flex justify-self-center my-10 h-12 w-60 text-xl">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </main>
  );
}
