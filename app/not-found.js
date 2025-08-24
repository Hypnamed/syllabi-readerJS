import { redirect } from "next/navigation";

export default function RootNotFound() {
  redirect("/en"); // your default locale
}
