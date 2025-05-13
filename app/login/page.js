"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!formData.email || !formData.password) {
      setLoginError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        router.push("/upload");
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("An unexpected error occurred.");
    } finally {
      setFormData({ email: "", password: "" });
    }
  };

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
        <form onSubmit={handleSubmit}>
          <Input
            className="flex justify-self-center w-60 mt-10 mb-5 bg-white"
            type="text"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={onChange}
          />
          <Input
            className="flex justify-self-center w-60 mt-5 mb-10 bg-white"
            type="password"
            placeholder="Password"
            value={formData.password}
            name="password"
            onChange={onChange}
          />
          <Button
            className="flex justify-self-center w-60 mt-5 mb-10"
            type="submit"
          >
            Log in
          </Button>
          <h2 className="flex justify-self-center text-2xl font-semibold my-10">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 underline">
              Sign up here
            </Link>
          </h2>
          {loginError && (
            <p className="flex justify-self-center text-3xl font-semibold my-10 text-red-500 mb-5">
              {loginError}
            </p>
          )}
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
