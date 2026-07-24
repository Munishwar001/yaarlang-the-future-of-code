import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, ConceptGuide } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/loops")({
  head: () => ({
    meta: [
      { title: "Loops — YaarLang Docs" },
      { name: "description", content: "while loops with jabtak." },
    ],
  }),
  component: LoopsPage,
});

function LoopsPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Language Guide" title="Loops">
        <DocSection id="loops" title="jabtak">
          <ConceptGuide
            whatItIs={
              <>
                <InlineCode>jabtak</InlineCode> repeats a block for as long as its condition stays true — a{" "}
                <InlineCode>while</InlineCode> loop.
              </>
            }
            syntax={`jabtak <condition> {\n  <statements>\n}`}
            example={`maan_lo i = 1\njabtak i <= 5 {\n  bol i\n  i = i + 1\n}`}
            output={`1\n2\n3\n4\n5`}
            notes={[
              <>The condition is checked before each iteration, so the block may run zero times.</>,
              <>
                There's no <InlineCode>for</InlineCode> loop yet — counting loops are written as{" "}
                <InlineCode>jabtak</InlineCode> with a manually incremented variable.
              </>,
              <>There's no <InlineCode>break</InlineCode> or <InlineCode>continue</InlineCode> keyword yet.</>,
            ]}
            commonMistakes={[
              <>
                Forgetting to update the loop variable inside the block (e.g. leaving out{" "}
                <InlineCode>i = i + 1</InlineCode>) creates an infinite loop, since{" "}
                <InlineCode>jabtak</InlineCode> re-checks the same condition forever.
              </>,
            ]}
          />
        </DocSection>
      </DocsArticle>
    </main>
  );
}
