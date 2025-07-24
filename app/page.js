import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <header>
        <h1 className="text-center text-4xl font-bold my-10">
          <Link href="/">Syllabi-Reader</Link>
        </h1>
      </header>
      <section className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-center text-2xl lg:text-3xl font-bold my-10">
          Simplifying Your Academic Life
        </h2>
        <p className="text-center break-words md:text-justify mx-10 lg:mx-40 text-2xl">
          Are you tired of sifting through endless syllabi to find important
          dates? Syllabi-Reader is here to help! Syllabi-Reader extracts key
          dates from your syllabi and compiles them into a one calendar. No more
          missing deadlines or important events. Just upload your syllabi, and
          Syllabi-Reader will do the rest. It&apos;s that simple!
        </p>
        <Button className="mx-auto my-10 h-16 w-60 text-xl">
          <Link href="/upload">Upload your syllabus</Link>
        </Button>
        <h2 className="text-center text-3xl font-bold my-10">Strech Goals</h2>
        <p className="text-center break-words md:text-justify mx-10 mb-10 lg:mx-40 text-2xl">
          I&apos;m are working on adding more features to make your academic
          life even easier. Features like automatic calendar syncing, reminders,
          and an authentation sysetm to save your syllabi so you can overwrite
          outdated syllabi and keep track of your classes. I&apos;m also working
          on improving the date extraction process to make it more accurate and
          reliable. Stay tuned for more updates!
        </p>
      </section>
      <footer>
        <div className="flex justify-center text-2xl mt-auto mb-10">
          Made with ❤️ by{" "}
          <Link
            href="https://ilkeeren.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            Eren
          </Link>
          {" & "}
          <Link
            href="https://www.linkedin.com/in/hassan-syed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            Hassan
          </Link>
        </div>
      </footer>
    </main>
  );
}
