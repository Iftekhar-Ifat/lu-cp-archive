import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyBlockquote,
  TypographyInlineCode,
  TypographyList,
  TypographyOrderedList,
  TypographyListItem,
  TypographyTable,
  TypographyTableHead,
  TypographyTableBody,
  TypographyTableRow,
  TypographyTableHeader,
  TypographyTableCell,
  TypographyImage,
  TypographyHr,
} from "@/components/ui/typography";

export const baseComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <TypographyH1 {...props}>{children}</TypographyH1>
  ),
  h2: ({ children, ...props }) => (
    <TypographyH2 {...props}>{children}</TypographyH2>
  ),
  h3: ({ children, ...props }) => (
    <TypographyH3 {...props}>{children}</TypographyH3>
  ),
  h4: ({ children, ...props }) => (
    <TypographyH4 {...props}>{children}</TypographyH4>
  ),
  p: ({ children, ...props }) => (
    <TypographyP {...props}>{children}</TypographyP>
  ),
  a: ({ href, children, ...props }) => (
    <Link
      href={href as string}
      className="font-medium underline underline-offset-4 hover:text-primary"
      {...props}
    >
      {children}
    </Link>
  ),
  ul: ({ children, ...props }) => (
    <TypographyList {...props}>{children}</TypographyList>
  ),
  ol: ({ children, ...props }) => (
    <TypographyOrderedList {...props}>{children}</TypographyOrderedList>
  ),
  li: ({ children, ...props }) => (
    <TypographyListItem {...props}>{children}</TypographyListItem>
  ),
  blockquote: ({ children, ...props }) => (
    <TypographyBlockquote {...props}>{children}</TypographyBlockquote>
  ),
  code: ({ children, ...props }) => (
    <TypographyInlineCode {...props}>{children}</TypographyInlineCode>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  hr: (props) => <TypographyHr {...props} />,
  img: ({ alt, src, ...props }) => (
    <TypographyImage alt={alt || ""} src={src || ""} {...props} />
  ),
  table: ({ children, ...props }) => (
    <TypographyTable {...props}>{children}</TypographyTable>
  ),
  thead: ({ children, ...props }) => (
    <TypographyTableHead {...props}>{children}</TypographyTableHead>
  ),
  tbody: ({ children, ...props }) => (
    <TypographyTableBody {...props}>{children}</TypographyTableBody>
  ),
  tr: ({ children, ...props }) => (
    <TypographyTableRow {...props}>{children}</TypographyTableRow>
  ),
  th: ({ children, ...props }) => (
    <TypographyTableHeader {...props}>{children}</TypographyTableHeader>
  ),
  td: ({ children, ...props }) => (
    <TypographyTableCell {...props}>{children}</TypographyTableCell>
  ),
  lead: ({ children, ...props }) => (
    <TypographyLead {...props}>{children}</TypographyLead>
  ),
  large: ({ children, ...props }) => (
    <TypographyLarge {...props}>{children}</TypographyLarge>
  ),
  small: ({ children, ...props }) => (
    <TypographySmall {...props}>{children}</TypographySmall>
  ),
  muted: ({ children, ...props }) => (
    <TypographyMuted {...props}>{children}</TypographyMuted>
  ),
};

export function useMDXComponents(overrides: MDXComponents = {}): MDXComponents {
  return {
    ...baseComponents,
    ...overrides,
  };
}

export default baseComponents;
