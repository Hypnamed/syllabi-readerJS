import { getPosts } from "@/_actions/postAction";
import Slider from "@/components/Slider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { data, errMsg } = getPosts();
  console.log(data);

  if (errMsg) {
    return <h1>{errMsg}</h1>;
  }

  return (
    <main>
      <header>
        <h1 className="flex justify-self-center text-4xl font-bold my-10">
          Syllabi Reader
        </h1>
        <Image
          alt="A person looking to a syllabus"
          className="flex justify-self-center"
          src="https://www.takestockinchildren.org/wp-content/uploads/2022/08/picture1.jpg"
          width={600}
          height={400}
        />
      </header>
      <div>
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
      </div>
      <div>
        <h1 className="flex justify-self-center text-3xl font-bold my-10">
          Screenshots from our app
        </h1>
        <Slider />
      </div>
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
