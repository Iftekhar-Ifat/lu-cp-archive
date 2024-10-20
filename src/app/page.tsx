"use client";

import Globe from "./components/Homepage/Globe";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <div className="full flex justify-center">
        <Globe />
      </div>
    </div>
  );
}
