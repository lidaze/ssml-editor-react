"use client";

import SSMLEditorDemo from "@/components/ssml-editor-demo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  return (
    <main className="py-16 px-8 max-w-screen-md mx-auto flex flex-col gap-8">
      <header className="flex justify-between">
        <h2 className="text-3xl font-semibold">SSML Editor</h2>
        <ThemeToggle />
      </header>
      {isBrowser && <SSMLEditorDemo />} {/* Render only in the browser */}
    </main>
  );
}
