import React from "react";
import { type BundledLanguage } from "shiki";
import CodeBlock from "./shared/code-block";
import { TypographyInlineCode } from "./ui/typography";

export function MDXCodeBlock({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const match = /language-(\w+)/.exec(className || "");
  const lang = match
    ? (match[1] as BundledLanguage)
    : ("text" as BundledLanguage);

  const codeString = React.Children.toArray(children)
    .filter((child) => typeof child === "string")
    .join("");

  if (!match) {
    return <TypographyInlineCode {...props}>{children}</TypographyInlineCode>;
  }

  return <CodeBlock lang={lang}>{codeString}</CodeBlock>;
}
