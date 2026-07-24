import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, ConceptGuide } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/functions")({
  head: () => ({
    meta: [
      { title: "Functions — YaarLang Docs" },
      { name: "description", content: "Declare functions with kaam and return values with wapis." },
    ],
  }),
  component: FunctionsPage,
});

function FunctionsPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Language Guide" title="Functions">
        <DocSection id="functions" title="kaam & wapis">
          <ConceptGuide
            whatItIs={
              <>
                <InlineCode>kaam</InlineCode> declares a reusable function. <InlineCode>wapis</InlineCode> returns
                a value from it.
              </>
            }
            syntax={`kaam <name>(<param1>, <param2>) {\n  <statements>\n  wapis <expression>\n}`}
            example={`kaam add(a, b) {\n  wapis a + b\n}\n\nbol add(3, 4)`}
            output={`7`}
            notes={[
              <>
                A function with no <InlineCode>wapis</InlineCode> (or a bare <InlineCode>wapis</InlineCode> with no
                value) returns <InlineCode>undefined</InlineCode>, same as JavaScript.
              </>,
              <>Functions can call other functions, including themselves (recursion).</>,
              <>Parameters are plain local variables — reassigning one inside the function doesn't affect the caller.</>,
            ]}
            commonMistakes={[
              <>
                Calling a function with fewer arguments than it declares doesn't error — the missing parameters
                are <InlineCode>undefined</InlineCode>. <InlineCode>add(3)</InlineCode> above would print{" "}
                <InlineCode>NaN</InlineCode> instead of throwing, since <InlineCode>3 + undefined</InlineCode> is{" "}
                <InlineCode>NaN</InlineCode>.
              </>,
            ]}
          />
        </DocSection>
      </DocsArticle>
    </main>
  );
}
