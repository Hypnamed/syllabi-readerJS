import { Button } from "@/components/ui/button";
import Slider from "@/components/Slider";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <header>
        <h1 className="flex justify-self-center text-4xl font-bold my-10">
          Syllabi-Reader
        </h1>
        <Link
          href="/login"
          className="flex justify-self-center text-3xl font-semibold my-10 mx-10"
        >
          Login
        </Link>
        <Image
          alt="A person looking to a syllabus"
          className="flex justify-self-center"
          src="https://www.takestockinchildren.org/wp-content/uploads/2022/08/picture1.jpg"
          width={600}
          height={400}
        />
      </header>
      <section>
        <h1 className="flex justify-self-center text-3xl font-bold my-10">
          Our Mission
        </h1>
        <p className="flex justify-self-center break-words mx-10 text-2xl">
          We are planning to develop SyllabiReader, an app where you can import
          your syllabi and work/school schedules to your outlook calendar. This
          app will scan your deadlines, exam dates and prioritize them for you
          to help you get organized. Based on the event importance, it can set
          reminders, send notifications through outlook calender and make sure
          you don&apos;t forget. For further details, please check the
          documentation.
        </p>
        <Button className="flex justify-self-center my-10 h-20 w-60 text-xl">
          <a href="/calendar">Upload your syllabus</a>
        </Button>
      </section>
      <section>
        <h1 className="flex justify-self-center text-3xl font-bold my-10">
          Screenshots from our app
        </h1>
        <Slider />
      </section>
      <footer>
        <Link
          href="/team"
          className="flex justify-self-center text-3xl font-bold my-10"
        >
          Meet our team
        </Link>
      </footer>
    </main>
  );
}
