import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, CodeBlock } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/installation")({
  head: () => ({
    meta: [
      { title: "Installation — YaarLang Docs" },
      { name: "description", content: "Install the YaarLang CLI globally or run it with npx." },
    ],
  }),
  component: InstallationPage,
});

function InstallationPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Getting Started" title="Installation" description="Requires Node.js with ES module support.">
        <DocSection id="installation" title="Install the CLI">
          <p>
            Install YaarLang globally with npm to get the <InlineCode>yaarlang</InlineCode> command anywhere on
            your machine:
          </p>
          <CodeBlock code="npm install -g yaarlang" />
          <p>Or run it without installing, via npx:</p>
          <CodeBlock code="npx yaarlang path/to/file.yl" />
        </DocSection>
      </DocsArticle>
    </main>
  );
}
