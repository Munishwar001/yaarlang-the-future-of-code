import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, ConceptGuide } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/comments")({
  head: () => ({
    meta: [
      { title: "Comments — YaarLang Docs" },
      { name: "description", content: "Single-line comments with //." },
    ],
  }),
  component: CommentsPage,
});

function CommentsPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Language Guide" title="Comments">
        <DocSection id="comments" title="//">
          <ConceptGuide
            whatItIs="A comment is text the compiler ignores — for notes to yourself or other readers of the code."
            syntax={`// <text, runs to end of line>`}
            example={`// this line is ignored\nmaan_lo x = 10 // inline comment\nbol x`}
            output={`10`}
            notes={[
              <>
                A <InlineCode>//</InlineCode> comment can start its own line or follow code on the same line —
                everything after it to the end of the line is ignored.
              </>,
            ]}
            commonMistakes={[
              <>
                Block comments (<InlineCode>{"/* ... */"}</InlineCode>) aren't supported — the lexer throws{" "}
                <InlineCode>Unexpected token '/'</InlineCode> if you try one.
              </>,
            ]}
          />
        </DocSection>
      </DocsArticle>
    </main>
  );
}
