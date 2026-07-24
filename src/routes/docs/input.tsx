import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, ConceptGuide } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/input")({
  head: () => ({
    meta: [
      { title: "Input — YaarLang Docs" },
      { name: "description", content: "Read user input with sun." },
    ],
  }),
  component: InputPage,
});

function InputPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Language Guide" title="Input">
        <DocSection id="input" title="sun">
          <ConceptGuide
            whatItIs={
              <>
                <InlineCode>sun</InlineCode> blocks and reads one line of text typed by the user, optionally
                printing a prompt first.
              </>
            }
            syntax={`sun()\nsun(<prompt>)`}
            example={`maan_lo naam = sun("Naam? ")\nbol "Namaste, " + naam`}
            output={`Naam? Aditi\nNamaste, Aditi`}
            notes={[
              <>The prompt (if given) is printed without a trailing newline, so the user types on the same line.</>,
              <>
                <InlineCode>sun</InlineCode> reads synchronously — the program pauses at that line until the user
                presses Enter.
              </>,
              <>The returned value always has surrounding whitespace trimmed.</>,
            ]}
            commonMistakes={[
              <>
                <InlineCode>sun</InlineCode> always returns a string, even if the user types digits. Using{" "}
                <InlineCode>+</InlineCode> on it concatenates instead of adding —{" "}
                <InlineCode>sun("Age? ") + 5</InlineCode> with input <InlineCode>20</InlineCode> gives{" "}
                <InlineCode>"205"</InlineCode>, not <InlineCode>25</InlineCode>. There's no built-in
                string-to-number conversion yet.
              </>,
            ]}
          />
        </DocSection>
      </DocsArticle>
    </main>
  );
}
