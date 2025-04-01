import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Calendar() {
  return (
    <main>
      <header className="">
        <h1 className="flex justify-self-center text-3xl font-bold my-10">
          Upload Your Syllabus
        </h1>
      </header>
      <section className="grid w-full gap-1.5 justify-self-center mb-10">
        <Input
          type="file"
          className="w-48 h-10 justify-self-center text-center bg-primary text-secondary"
        />
        <iframe
          src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FLos_Angeles"
          className="justify-self-center"
          width="800"
          height="600"
        ></iframe>
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
