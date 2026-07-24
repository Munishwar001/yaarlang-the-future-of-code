import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, CodeBlock, NoteList } from "@/components/yaarlang/DocsContent";
import { DocsToc } from "@/components/yaarlang/DocsToc";

export const Route = createFileRoute("/docs/internals")({
  head: () => ({
    meta: [
      { title: "How It Works — YaarLang Docs" },
      { name: "description", content: "The lexer, parser, and code generator behind YaarLang, and how .yl source becomes JavaScript." },
    ],
  }),
  component: InternalsPage,
});

const tocItems = [
  { id: "pipeline", label: "The pipeline" },
  { id: "lexer", label: "Lexer" },
  { id: "parser", label: "Parser" },
  { id: "codegen", label: "Codegen" },
  { id: "runtime", label: "Runtime" },
  { id: "walkthrough", label: "End-to-end example" },
];

function InternalsPage() {
  return (
    <>
      <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
        <DocsArticle
          eyebrow="Internals"
          title="How YaarLang Works"
          description="YaarLang doesn't interpret your code directly — it compiles .yl source into plain JavaScript and hands that to Node. This page walks through each stage of that pipeline."
        >
          <DocSection id="pipeline" title="The pipeline">
            <p>
              Every run of <InlineCode>yaarlang file.yl</InlineCode> passes through five small, single-purpose
              modules, each one feeding the next:
            </p>
            <CodeBlock
              code={`source text (.yl)\n  → lexer.js    tokens\n  → parser.js   AST\n  → codegen.js  JavaScript source (string)\n  → runtime.js  eval()'d and executed`}
            />
            <p>
              There's no bytecode, no virtual machine, and no type checker — the "runtime" is just Node itself,
              running JavaScript that codegen wrote. This keeps the whole implementation small enough to read in one
              sitting, which is the point: it's meant to be a readable example of how a compiler pipeline fits
              together, not a production language.
            </p>
          </DocSection>

          <DocSection id="lexer" title="Lexer">
            <p>
              <InlineCode>lexer.js</InlineCode> walks the source one character at a time and groups characters into
              tokens — the smallest meaningful chunks of a program. Each token looks like:
            </p>
            <CodeBlock code={`{ type: "keyword", value: "maan_lo", line: 1, col: 1 }`} />
            <p>
              The <InlineCode>line</InlineCode>/<InlineCode>col</InlineCode> on every token is what lets parser
              errors point at exactly where the mistake is, instead of just naming what went wrong.
            </p>
            <p>The lexer recognizes a fixed set of token types:</p>
            <NoteList
              items={[
                <>
                  <InlineCode>keyword</InlineCode> — one of the reserved words (<InlineCode>maan_lo</InlineCode>,{" "}
                  <InlineCode>bol</InlineCode>, <InlineCode>agar</InlineCode>, <InlineCode>nahito</InlineCode>,{" "}
                  <InlineCode>jabtak</InlineCode>, <InlineCode>kaam</InlineCode>, <InlineCode>wapis</InlineCode>,{" "}
                  <InlineCode>sun</InlineCode>, <InlineCode>lambai</InlineCode>, <InlineCode>jodo</InlineCode>,{" "}
                  <InlineCode>nikalo</InlineCode>, <InlineCode>galti</InlineCode>) — anything else made of letters,
                  digits, and underscores is an <InlineCode>identifier</InlineCode> instead.
                </>,
                <>
                  <InlineCode>number</InlineCode>, <InlineCode>string</InlineCode> (single or double quoted) —
                  literal values.
                </>,
                <>
                  <InlineCode>operator</InlineCode> — <InlineCode>{"= + - * /"}</InlineCode> and the two-character
                  operators <InlineCode>{"== != <= >= && ||"}</InlineCode> (matched before their single-character
                  prefixes, so <InlineCode>==</InlineCode> isn't read as two separate <InlineCode>=</InlineCode>{" "}
                  tokens), plus bare <InlineCode>&lt;</InlineCode>/<InlineCode>&gt;</InlineCode>.
                </>,
                <>
                  <InlineCode>paren</InlineCode>, <InlineCode>brace</InlineCode>, <InlineCode>bracket</InlineCode>,{" "}
                  <InlineCode>comma</InlineCode> — <InlineCode>{"( ) { } [ ] ,"}</InlineCode>.
                </>,
              ]}
            />
            <p>
              <InlineCode>//</InlineCode> comments are skipped entirely inside the lexer — everything from{" "}
              <InlineCode>//</InlineCode> to the next newline is consumed without producing a token, so the parser
              never has to know comments exist.
            </p>
            <p>
              If the lexer hits a character it doesn't recognize, or a string that's never closed, it throws
              immediately with the line and column of the problem — nothing downstream ever sees invalid input.
            </p>
          </DocSection>

          <DocSection id="parser" title="Parser">
            <p>
              <InlineCode>parser.js</InlineCode> is a hand-written{" "}
              <span className="text-foreground">recursive-descent</span> parser: one function per grammar rule,
              each calling the next tighter-binding one. It turns the flat token list into an AST (Abstract Syntax
              Tree) — a tree of nodes like <InlineCode>Declaration</InlineCode>, <InlineCode>If</InlineCode>,{" "}
              <InlineCode>While</InlineCode>, <InlineCode>FunctionDeclaration</InlineCode>, and{" "}
              <InlineCode>BinaryExpression</InlineCode>.
            </p>
            <p>Expressions are parsed through a precedence chain, lowest binding to highest:</p>
            <CodeBlock
              code={`logicalOr   ( || )\n  logicalAnd  ( && )\n    comparison  ( == != < > <= >= )\n      additive    ( + - )\n        term        ( * / )\n          unary       ( -x )\n            primary     ( atom, then optional [index] chaining )\n              atom        ( number, string, identifier, sun(...), lambai(...), \n                            (expr), [elements], function calls )`}
            />
            <p>
              Each level only handles its own operators and defers everything tighter-binding to the next function
              down — that's what makes <InlineCode>2 + 3 * 4</InlineCode> come out to <InlineCode>14</InlineCode>{" "}
              instead of <InlineCode>20</InlineCode>, with no explicit precedence table anywhere.
            </p>
            <p>
              At the statement level, the parser looks at the current keyword to decide what to parse next (
              <InlineCode>maan_lo</InlineCode> → a declaration, <InlineCode>agar</InlineCode> → an if/else,{" "}
              <InlineCode>jabtak</InlineCode> → a while loop, and so on). A bare identifier is parsed as a full
              expression first, then checked for a trailing <InlineCode>=</InlineCode> — that one rule is what lets{" "}
              <InlineCode>x = 5</InlineCode> and <InlineCode>arr[0] = 5</InlineCode> share the same code path instead
              of needing separate handling.
            </p>
            <p>
              Every error the parser throws is built from <InlineCode>errorAt(token, message)</InlineCode>, which
              reads <InlineCode>line</InlineCode>/<InlineCode>col</InlineCode> straight off the offending token — the
              same position data the lexer attached to it.
            </p>
          </DocSection>

          <DocSection id="codegen" title="Codegen">
            <p>
              <InlineCode>codegen.js</InlineCode> is the smallest piece: a single function that walks the AST and
              returns a string of real JavaScript, one <InlineCode>switch</InlineCode> case per node type. It never
              executes anything — it only builds up source text.
            </p>
            <p>
              A few YaarLang builtins compile down to small runtime helper functions, which codegen prepends to the
              top of every compiled program:
            </p>
            <NoteList
              items={[
                <>
                  <InlineCode>__yaarlang_print</InlineCode> — backs <InlineCode>bol</InlineCode>. Prints booleans as{" "}
                  <InlineCode>sach</InlineCode>/<InlineCode>jhoot</InlineCode> in yellow instead of JavaScript's{" "}
                  <InlineCode>true</InlineCode>/<InlineCode>false</InlineCode>, everything else prints as-is.
                </>,
                <>
                  <InlineCode>__yaarlang_input</InlineCode> — backs <InlineCode>sun</InlineCode>. Synchronously
                  blocks on stdin via <InlineCode>fs.readSync(0, ...)</InlineCode> and returns the trimmed line,
                  optionally writing a prompt first with no trailing newline.
                </>,
              ]}
            />
            <p>
              Everything else maps almost one-to-one onto JavaScript: <InlineCode>agar</InlineCode>/
              <InlineCode>nahito</InlineCode> becomes <InlineCode>if</InlineCode>/<InlineCode>else</InlineCode>,{" "}
              <InlineCode>jabtak</InlineCode> becomes <InlineCode>while</InlineCode>, <InlineCode>kaam</InlineCode>{" "}
              becomes <InlineCode>function</InlineCode>, <InlineCode>jodo</InlineCode>/<InlineCode>nikalo</InlineCode>{" "}
              become <InlineCode>.push</InlineCode>/<InlineCode>.splice</InlineCode>/<InlineCode>.pop</InlineCode>,
              and <InlineCode>galti</InlineCode> becomes <InlineCode>throw new Error(...)</InlineCode>.
            </p>
          </DocSection>

          <DocSection id="runtime" title="Runtime">
            <p>
              <InlineCode>runtime.js</InlineCode> is one function: it takes the JavaScript string codegen produced
              and runs it with a direct <InlineCode>eval(code)</InlineCode>. Because it's a{" "}
              <span className="text-foreground">direct</span> eval (not <InlineCode>(0, eval)(code)</InlineCode>),
              the generated code executes with access to the enclosing module scope — which is how the eval'd code
              can call <InlineCode>fs.readSync</InlineCode> for <InlineCode>sun</InlineCode> even though{" "}
              <InlineCode>fs</InlineCode> is never mentioned in your <InlineCode>.yl</InlineCode> source; it's
              imported once at the top of <InlineCode>runtime.js</InlineCode> and inherited from there.
            </p>
            <p>
              <InlineCode>index.js</InlineCode> is the CLI entry point that ties it all together: read the file,
              run it through <InlineCode>lexer → parser → codegen</InlineCode>, hand the result to{" "}
              <InlineCode>runtime</InlineCode>, and print any thrown error in red.
            </p>
          </DocSection>

          <DocSection id="walkthrough" title="End-to-end example">
            <p>A single line, traced through every stage:</p>
            <CodeBlock code={`maan_lo sum = 2 + 3 * 4`} />
            <p>
              <span className="font-medium text-foreground">1. Lexer</span> produces eight tokens:
            </p>
            <CodeBlock
              code={`keyword maan_lo, identifier sum, operator =,\nnumber 2, operator +, number 3, operator *, number 4`}
            />
            <p>
              <span className="font-medium text-foreground">2. Parser</span> turns that into a{" "}
              <InlineCode>Declaration</InlineCode> node, with the right-hand side parsed as a nested{" "}
              <InlineCode>BinaryExpression</InlineCode> tree — <InlineCode>*</InlineCode> binds tighter than{" "}
              <InlineCode>+</InlineCode>, so <InlineCode>3 * 4</InlineCode> becomes the right child of the{" "}
              <InlineCode>+</InlineCode> node, not the other way around:
            </p>
            <CodeBlock
              code={`{\n  type: "Declaration",\n  name: "sum",\n  value: {\n    type: "BinaryExpression", operator: "+",\n    left: { type: "NumberLiteral", value: 2 },\n    right: {\n      type: "BinaryExpression", operator: "*",\n      left: { type: "NumberLiteral", value: 3 },\n      right: { type: "NumberLiteral", value: 4 }\n    }\n  }\n}`}
            />
            <p>
              <span className="font-medium text-foreground">3. Codegen</span> walks that tree and emits:
            </p>
            <CodeBlock code={`let sum = (2 + (3 * 4));`} />
            <p>
              <span className="font-medium text-foreground">4. Runtime</span> evals that line as real JavaScript.{" "}
              <InlineCode>sum</InlineCode> ends up <InlineCode>14</InlineCode> — the same answer you'd get running
              it directly in Node, because by this point, it effectively is Node.
            </p>
          </DocSection>
        </DocsArticle>
      </main>
      <DocsToc items={tocItems} />
    </>
  );
}
