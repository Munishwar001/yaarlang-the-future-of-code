import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, ConceptGuide } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/variables")({
  head: () => ({
    meta: [
      { title: "Variables & Printing — YaarLang Docs" },
      { name: "description", content: "Declare variables with maan_lo and print values with bol." },
    ],
  }),
  component: VariablesPage,
});

function VariablesPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Language Guide" title="Variables & Printing">
        <DocSection id="variables" title="maan_lo & bol">
          <ConceptGuide
            whatItIs={
              <>
                <InlineCode>maan_lo</InlineCode> declares a variable. <InlineCode>bol</InlineCode> prints a value
                to the terminal.
              </>
            }
            syntax={`maan_lo <name> = <expression>\nbol <expression>`}
            example={`maan_lo naam = "yaar"\nmaan_lo sum = 10 + 20\n\nbol naam\nbol sum`}
            output={`yaar\n30`}
            notes={[
              <>
                Variables are dynamically typed — the same name can later be reassigned a value of a different
                type.
              </>,
              <>
                To change a value after it's declared, assign without <InlineCode>maan_lo</InlineCode> —{" "}
                <InlineCode>maan_lo</InlineCode> is only for the first declaration.
              </>,
              <>
                <InlineCode>bol</InlineCode> can print any expression, not just a bare variable — numbers, strings,
                arrays, and arithmetic all work.
              </>,
            ]}
            commonMistakes={[
              <>
                Declaring the same name with <InlineCode>maan_lo</InlineCode> twice throws{" "}
                <InlineCode>Identifier 'x' has already been declared</InlineCode>. Reassign it instead:{" "}
                <InlineCode>x = 20</InlineCode>.
              </>,
              <>Printing or using a variable before it's declared throws a reference error.</>,
            ]}
          />
        </DocSection>
      </DocsArticle>
    </main>
  );
}
