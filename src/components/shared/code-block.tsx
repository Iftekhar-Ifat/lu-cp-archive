import { codeToHtml, type BundledLanguage } from "shiki";

type Props = {
  children: string;
  lang: BundledLanguage;
};

export default async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: "aurora-x",
  });

  return (
    <div
      className="my-6 overflow-x-auto rounded-md"
      dangerouslySetInnerHTML={{ __html: out }}
    />
  );
}
