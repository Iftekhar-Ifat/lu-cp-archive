import { Copyright } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bottom-0 w-full border-t border-neutral-200 bg-transparent dark:border-white/[0.1]">
      <Link
        href="https://github.com/Iftekhar-Ifat/lu-cp-archive"
        className="font-mono"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center justify-center">
          <Copyright size="20px" className="m-1" /> <span>LU-ACM</span>
        </div>
      </Link>
    </div>
  );
}
