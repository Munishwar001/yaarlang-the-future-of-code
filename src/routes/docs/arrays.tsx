import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, ConceptGuide } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/arrays")({
  head: () => ({
    meta: [
      { title: "Arrays — YaarLang Docs" },
      { name: "description", content: "Array literals, indexing, jodo, nikalo, and lambai." },
    ],
  }),
  component: ArraysPage,
});

function ArraysPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Language Guide" title="Arrays">
        <DocSection id="arrays" title="Literals, indexing & helpers">
          <ConceptGuide
            whatItIs="Arrays hold an ordered list of values, accessed by a zero-based index, with jodo/nikalo/lambai as push/remove/length helpers."
            syntax={`maan_lo <name> = [<elements>]\n<name>[<index>]\n<name>[<index>] = <expression>\n\njodo(<array>, <value>)          // push\njodo(<array>, <value>, <index>) // insert at index\nnikalo(<array>)                 // pop\nnikalo(<array>, <index>)        // remove at index\nlambai(<array>)                 // length`}
            example={`maan_lo nums = [10, 20, 30]\nbol nums[0]\n\nnums[1] = 99\njodo(nums, 40)\nbol nums\nbol lambai(nums)`}
            output={`10\n[ 10, 99, 30, 40 ]\n4`}
            notes={[
              <>Indexing is zero-based, same as JavaScript.</>,
              <>
                <InlineCode>jodo</InlineCode> without an index pushes to the end; with an index, it inserts there.{" "}
                <InlineCode>nikalo</InlineCode> works the same way for removing.
              </>,
              <>Arrays can hold mixed types — numbers, strings, and other arrays.</>,
            ]}
            commonMistakes={[
              <>
                Reading an out-of-range index (e.g. <InlineCode>nums[99]</InlineCode>) doesn't error — it silently
                returns <InlineCode>undefined</InlineCode>.
              </>,
              <>
                An out-of-range index passed to <InlineCode>jodo</InlineCode>/<InlineCode>nikalo</InlineCode> is
                clamped to the array's bounds rather than erroring, so it's easy to insert somewhere you didn't
                expect.
              </>,
            ]}
          />
        </DocSection>
      </DocsArticle>
    </main>
  );
}
