import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, ConceptGuide } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/conditions")({
  head: () => ({
    meta: [
      { title: "Conditions — YaarLang Docs" },
      { name: "description", content: "if/else with agar and nahito." },
    ],
  }),
  component: ConditionsPage,
});

function ConditionsPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Language Guide" title="Conditions">
        <DocSection id="conditions" title="agar & nahito">
          <ConceptGuide
            whatItIs={
              <>
                <InlineCode>agar</InlineCode> runs a block if a condition is true. <InlineCode>nahito</InlineCode>{" "}
                is its optional else-branch.
              </>
            }
            syntax={`agar <condition> {\n  <statements>\n} nahito {\n  <statements>\n}`}
            example={`maan_lo score = 92\n\nagar score >= 90 {\n  bol "A"\n} nahito {\n  bol "keep going"\n}`}
            output={`A`}
            notes={[
              <>
                <InlineCode>nahito</InlineCode> is optional — an <InlineCode>agar</InlineCode> with no matching
                condition and no <InlineCode>nahito</InlineCode> block simply does nothing.
              </>,
              <>Braces are required around every block, even a single statement.</>,
              <>
                There's no <InlineCode>nahito agar</InlineCode> ("else if") chaining yet — nest a second{" "}
                <InlineCode>agar</InlineCode> inside the <InlineCode>nahito</InlineCode> block instead.
              </>,
            ]}
            commonMistakes={[
              <>
                Using JavaScript's <InlineCode>else</InlineCode> instead of <InlineCode>nahito</InlineCode> throws{" "}
                <InlineCode>Unexpected token '{"{"}'</InlineCode> — <InlineCode>else</InlineCode> is parsed as a
                plain identifier, not a keyword.
              </>,
              <>
                Omitting the braces, like <InlineCode>{"agar x > 1 bol \"hi\""}</InlineCode>, throws{" "}
                <InlineCode>Expected '{"{"}' to start block</InlineCode> — there's no single-statement form.
              </>,
            ]}
          />
        </DocSection>
      </DocsArticle>
    </main>
  );
}
