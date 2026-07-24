import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, ConceptGuide } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/booleans")({
  head: () => ({
    meta: [
      { title: "Booleans — YaarLang Docs" },
      { name: "description", content: "sach and jhoot — how booleans work in YaarLang." },
    ],
  }),
  component: BooleansPage,
});

function BooleansPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Language Guide" title="Booleans">
        <DocSection id="booleans" title="sach & jhoot">
          <ConceptGuide
            whatItIs={
              <>
                Booleans aren't written directly — they're produced by comparison and logical expressions, and
                print as <InlineCode>sach</InlineCode> (true) or <InlineCode>jhoot</InlineCode> (false).
              </>
            }
            syntax={`<comparison-or-logical-expression>   // produces a boolean\nagar <boolean-expression> { ... }`}
            example={`maan_lo isAdult = 20 >= 18\nbol isAdult\n\nagar isAdult {\n  bol "Bada ho gaya"\n}`}
            output={`sach\nBada ho gaya`}
            notes={[
              <>
                Booleans only come from comparison (<InlineCode>== != &lt; &gt; &lt;= &gt;=</InlineCode>) and
                logical (<InlineCode>&& ||</InlineCode>) expressions — there's no way to write a boolean literal
                directly.
              </>,
              <>
                A boolean can be stored in a variable and used directly as an <InlineCode>agar</InlineCode> or{" "}
                <InlineCode>jabtak</InlineCode> condition, exactly like a raw comparison.
              </>,
              <>
                <InlineCode>bol</InlineCode> prints <InlineCode>true</InlineCode> as{" "}
                <InlineCode>sach</InlineCode> and <InlineCode>false</InlineCode> as <InlineCode>jhoot</InlineCode>.
              </>,
            ]}
            commonMistakes={[
              <>
                Writing <InlineCode>maan_lo flag = sach</InlineCode> (or <InlineCode>jhoot</InlineCode>) throws{" "}
                <InlineCode>sach is not defined</InlineCode> — <InlineCode>sach</InlineCode>/
                <InlineCode>jhoot</InlineCode> are only ever printed output, never valid syntax to write into your
                source. Use a comparison instead, e.g. <InlineCode>maan_lo flag = 1 == 1</InlineCode>.
              </>,
            ]}
          />
        </DocSection>
      </DocsArticle>
    </main>
  );
}
