import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, ConceptGuide } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/errors")({
  head: () => ({
    meta: [
      { title: "Errors — YaarLang Docs" },
      { name: "description", content: "Throw errors with galti." },
    ],
  }),
  component: ErrorsPage,
});

function ErrorsPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Language Guide" title="Errors">
        <DocSection id="errors" title="galti">
          <ConceptGuide
            whatItIs={
              <>
                <InlineCode>galti</InlineCode> throws an error with a message, immediately stopping the program.
              </>
            }
            syntax={`galti <expression>`}
            example={`maan_lo age = -5\n\nagar age < 0 {\n  galti "Age cannot be negative"\n}\nbol "this line never runs"`}
            output={`YaarLang error: Age cannot be negative`}
            notes={[
              <>
                The CLI catches the thrown error and prints it prefixed with{" "}
                <InlineCode>YaarLang error:</InlineCode>, then exits — nothing after the{" "}
                <InlineCode>galti</InlineCode> runs.
              </>,
              <>You can throw any expression, not just a string literal.</>,
            ]}
            commonMistakes={[
              <>
                There's no <InlineCode>try</InlineCode>/<InlineCode>catch</InlineCode> equivalent yet — a{" "}
                <InlineCode>galti</InlineCode> anywhere in the program halts it completely, it can't be recovered
                from.
              </>,
            ]}
          />
        </DocSection>
      </DocsArticle>
    </main>
  );
}
