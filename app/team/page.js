import Image from "next/image";
import Link from "next/link";

export default function Team() {
  return (
    <main>
      <header>
        <h1 className="flex justify-self-center text-3xl font-bold my-10">
          Meet our team
        </h1>
      </header>
      <section>
        <Image
          alt="Most handsome CS Student in Whitworth"
          src="/eren.webp"
          width="400"
          height="300"
          className="justify-self-center"
        />
        <h1 className="flex justify-self-center text-2xl font-bold my-10">
          Eren Demirtas, Freshman CS Major
        </h1>
      </section>
      <section>
        <Image
          alt="Second handsome CS Student in Whitworth"
          src="/hassan.webp"
          width="400"
          height="300"
          className="justify-self-center"
        />
        <h1 className="flex justify-self-center text-2xl font-bold my-10">
          Hassan Raza, Junior CS Major
        </h1>
      </section>
      <footer>
        <Link
          href="/"
          className="flex justify-self-center text-3xl font-bold my-10"
        >
          Back to Homepage
        </Link>
      </footer>
    </main>
  );
}
