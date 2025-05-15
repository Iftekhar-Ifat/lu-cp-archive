import * as React from "react";
import { cn } from "@/lib/utils";

export function TypographyH1({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl",
        "mb-6 mt-10 first:mt-0",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH2({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-bold leading-snug tracking-tight lg:text-4xl",
        "mb-5 mt-8 border-b border-muted/40 pb-2 dark:border-muted/30",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH3({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold leading-snug tracking-tight",
        "mb-4 mt-8",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH4({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold leading-snug tracking-tight",
        "mb-3 mt-6",
        className
      )}
      {...props}
    />
  );
}

export function TypographyP({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  );
}

export function TypographyLead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xl leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export function TypographyLarge({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-lg font-semibold leading-relaxed", className)}
      {...props}
    />
  );
}

export function TypographySmall({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

export function TypographyMuted({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function TypographyBlockquote({
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function TypographyInlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "rounded bg-muted px-[0.35rem] py-[0.2rem] font-mono text-sm font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function TypographyList({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("my-6 ml-6 list-disc space-y-2", className)} {...props} />
  );
}

export function TypographyOrderedList({
  className,
  ...props
}: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn("my-6 ml-6 list-decimal space-y-2", className)}
      {...props}
    />
  );
}

export function TypographyListItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn(className)} {...props} />;
}

export function TypographyLink({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "font-medium underline underline-offset-4 hover:text-primary",
        className
      )}
      {...props}
    />
  );
}

export function TypographyTable({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TypographyTableHead({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-muted/50", className)} {...props} />;
}

export function TypographyTableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y", className)} {...props} />;
}

export function TypographyTableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted/20", className)}
      {...props}
    />
  );
}

export function TypographyTableHeader({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn("border px-4 py-2 text-left font-semibold", className)}
      {...props}
    />
  );
}

export function TypographyTableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("border px-4 py-2 text-left", className)} {...props} />
  );
}

export function TypographyImage({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className="my-6 overflow-hidden rounded-md">
      <img className={cn("h-auto w-full", className)} {...props} />
    </div>
  );
}

export function TypographyHr({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("my-8", className)} {...props} />;
}

export const typography = {
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
  TypographyLink,
  TypographyTable,
  TypographyTableHead,
  TypographyTableBody,
  TypographyTableRow,
  TypographyTableHeader,
  TypographyTableCell,
  TypographyImage,
  TypographyHr,
};

export default typography;
