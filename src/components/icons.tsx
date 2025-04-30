import { type LucideProps } from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 9V3.75C3 3.551 3.09 3.36 3.25 3.22C3.41 3.08 3.63 3 3.86 3H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21H3.86C3.63 21 3.41 20.91 3.25 20.75C3.09 20.59 3 20.37 3 20.14V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 9V3.75C21 3.551 20.91 3.36 20.75 3.22C20.59 3.08 20.37 3 20.14 3H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 16L14 12L10 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 21H20.14C20.37 21 20.59 20.91 20.75 20.75C20.91 20.59 21 20.37 21 20.14V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  codeforces: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 24 24"
      {...props}
    >
      <style>
        {`
          .st0{fill:#AE0F0A;}
          .st1{fill:#4F81C1;}
          .st2{fill:#FFD400;}
        `}
      </style>
      <path
        className="st0"
        d="M22.5,10.5c0.8,0,1.5,0.7,1.5,1.5v7.5c0,0.8-0.7,1.5-1.5,1.5h-3c-0.8,0-1.5-0.7-1.5-1.5V12c0-0.8,0.7-1.5,1.5-1.5H22.5z"
      />
      <path
        className="st1"
        d="M13.5,3C14.3,3,15,3.7,15,4.5v15c0,0.8-0.7,1.5-1.5,1.5h-3C9.7,21,9,20.3,9,19.5v-15C9,3.7,9.7,3,10.5,3H13.5z"
      />
      <path
        className="st2"
        d="M4.5,7.5C5.3,7.5,6,8.2,6,9v10.5C6,20.3,5.3,21,4.5,21h-3C0.7,21,0,20.3,0,19.5V9c0-0.8,0.7-1.5,1.5-1.5H4.5z"
      />
    </svg>
  ),
};
