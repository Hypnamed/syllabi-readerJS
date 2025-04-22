"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState("");
  const router = useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");

    if (!formData.name || !formData.email || !formData.password) {
      setSignupError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        router.push("/login");
      } else {
        setSignupError(data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setSignupError("An unexpected error occurred.");
    } finally {
      setFormData({ name: "", email: "", password: "" });
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
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            className="flex justify-self-center w-60 mt-10 mb-5 bg-white"
            type="text"
            placeholder="Name"
            value={formData.name}
            name="name"
            onChange={onChange}
          />
          <Input
            className="flex justify-self-center w-60 mt-5 mb-5 bg-white"
            type="email"
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
          {signupError && <p className="text-red-500 mb-5">{signupError}</p>}
          <Button
            className="flex justify-self-center w-60 mt-5 mb-10"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
        <p className="flex justify-center mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
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
