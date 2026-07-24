import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, CodeBlock } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/cli-usage")({
  head: () => ({
    meta: [
      { title: "CLI Usage — YaarLang Docs" },
      { name: "description", content: "Run a .yl file with the yaarlang CLI." },
    ],
  }),
  component: CliUsagePage,
});

function CliUsagePage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Getting Started" title="CLI Usage">
        <DocSection id="cli-usage" title="Run a file">
          <p>
            Run any <InlineCode>.yl</InlineCode> file with:
          </p>
          <CodeBlock code="yaarlang path/to/file.yl" />
          <p>
            The CLI reads the file, compiles it through the lexer → parser → codegen pipeline, and runs the
            resulting JavaScript. Compile errors are printed with the line and column where they occurred.
          </p>
        </DocSection>
      </DocsArticle>
    </main>
  );
}
