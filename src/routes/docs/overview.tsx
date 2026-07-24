import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, CodeBlock } from "@/components/yaarlang/DocsContent";
import { DocsToc } from "@/components/yaarlang/DocsToc";

export const Route = createFileRoute("/docs/overview")({
  head: () => ({
    meta: [
      { title: "Overview — YaarLang Docs" },
      { name: "description", content: "What YaarLang is, how it works under the hood, and how to run your first program." },
    ],
  }),
  component: OverviewPage,
});

const tocItems = [
  { id: "what-is-yaarlang", label: "What is YaarLang?" },
  { id: "how-it-works", label: "How it works" },
  { id: "first-program", label: "Your first program" },
];

function OverviewPage() {
  return (
    <>
      <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
        <DocsArticle
          eyebrow="Documentation"
          title="Overview"
          description="What YaarLang is, how it turns your code into something that runs, and how to print your first line."
        >
          <DocSection id="what-is-yaarlang" title="What is YaarLang?">
            <p>
              YaarLang is a tiny toy programming language with Hinglish keywords, built from scratch in JavaScript.
              Instead of <InlineCode>let</InlineCode>, <InlineCode>if</InlineCode>, and{" "}
              <InlineCode>while</InlineCode>, you write <InlineCode>maan_lo</InlineCode>,{" "}
              <InlineCode>agar</InlineCode>, and <InlineCode>jabtak</InlineCode> — the same ideas, in words that
              read naturally if you speak Hindi and English together.
            </p>
            <p>
              It's an early, minimal implementation intended for learning how compilers and interpreters work, not a
              production language. Currently supported: variable declarations, printing, input, string/number
              literals, arithmetic/comparison/logical expressions, <InlineCode>if</InlineCode>/
              <InlineCode>else</InlineCode>, <InlineCode>while</InlineCode> loops, functions with{" "}
              <InlineCode>return</InlineCode>, arrays, and thrown errors. There's no support yet for classes,
              async/await, or a package manager — if you see those mentioned anywhere, they're aspirational, not
              real yet.
            </p>
          </DocSection>

          <DocSection id="how-it-works" title="How it works">
            <p>
              Every YaarLang program passes through a small compiler pipeline before it runs. Nothing is
              interpreted directly — your <InlineCode>.yl</InlineCode> source is translated into plain JavaScript,
              then handed to Node to execute:
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Lexer</strong> — turns raw source text into a stream of tokens:
                keywords, identifiers, numbers, strings, and operators.
              </li>
              <li>
                <strong className="text-foreground">Parser</strong> — turns those tokens into an AST (an Abstract
                Syntax Tree): declarations, conditionals, loops, functions, and so on.
              </li>
              <li>
                <strong className="text-foreground">Codegen</strong> — walks the AST and emits equivalent JavaScript
                source code.
              </li>
              <li>
                <strong className="text-foreground">Compiler</strong> — wires the lexer, parser, and codegen
                together into one pipeline.
              </li>
              <li>
                <strong className="text-foreground">Runtime</strong> — executes the generated JavaScript.
              </li>
            </ol>
            <p>
              The CLI entry point reads your <InlineCode>.yl</InlineCode> file, runs it through that pipeline, and
              prints the result — that's the whole implementation.
            </p>
          </DocSection>

          <DocSection id="first-program" title="Your first program">
            <p>
              Create a file called <InlineCode>hello.yl</InlineCode> with two variables and a print statement:
            </p>
            <CodeBlock code={`maan_lo naam = "Duniya"\nmaan_lo sum = 10 + 20\n\nbol naam\nbol sum`} />
            <p>Then run it with the CLI:</p>
            <CodeBlock code="yaarlang hello.yl" />
            <p>You should see:</p>
            <CodeBlock code={`Duniya\n30`} />
            <p>
              That's it — <InlineCode>maan_lo</InlineCode> declared two variables, and{" "}
              <InlineCode>bol</InlineCode> printed each one. From here, the Language Guide covers everything else
              the language supports, one concept at a time.
            </p>
          </DocSection>
        </DocsArticle>
      </main>
      <DocsToc items={tocItems} />
    </>
  );
}
