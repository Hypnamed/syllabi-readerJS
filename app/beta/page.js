"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PdfDisplay from "@/components/PDFDisplay";

export default function Beta() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/syllabi-reader.users.json", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <main>
      <header>
        <h1 className="flex justify-self-center text-4xl font-bold my-10">
          Syllabi-Reader
        </h1>
      </header>
      <PdfDisplay />
    </main>
  );
}
