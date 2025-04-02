import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <header>
        <h1 className="flex justify-self-center text-4xl font-bold my-10">
          Syllabi-Reader
        </h1>
      </header>
      <section className="flex-grow">
        <h2 className="flex justify-self-center text-3xl font-semibold my-10">
          Log in to your account
        </h2>
        <form>
          <Input
            className="flex justify-self-center w-60 mt-10 mb-5 bg-white"
            type="text"
            placeholder="Email"
          />
          <Input
            className="flex justify-self-center w-60 mt-5 mb-10 bg-white"
            type="password"
            placeholder="Password"
          />
          <Link href="/calendar">
            <Button className="flex justify-self-center w-60 mt-5 mb-10">
              Log in
            </Button>
          </Link>
        </form>
      </section>
      <footer className="mt-auto">
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
