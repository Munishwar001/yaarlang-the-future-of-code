import { createFileRoute } from "@tanstack/react-router";
import {
  DocsArticle,
  DocSection,
  InlineCode,
  GuideBlock,
  CodeBlock,
  NoteList,
  MistakeList,
} from "@/components/yaarlang/DocsContent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/docs/operators")({
  head: () => ({
    meta: [
      { title: "Operators — YaarLang Docs" },
      { name: "description", content: "Arithmetic, comparison, logical, and assignment operators in YaarLang." },
    ],
  }),
  component: OperatorsPage,
});

type OpRow = { op: string; meaning: string; example: string };

const arithmetic: OpRow[] = [
  { op: "+", meaning: "Addition", example: "5 + 3 → 8" },
  { op: "-", meaning: "Subtraction", example: "5 - 3 → 2" },
  { op: "*", meaning: "Multiplication", example: "5 * 3 → 15" },
  { op: "/", meaning: "Division (always decimal)", example: "5 / 2 → 2.5" },
  { op: "-x", meaning: "Unary negation", example: "-5 → -5" },
];

const comparison: OpRow[] = [
  { op: "==", meaning: "Equal to", example: "5 == 5 → sach" },
  { op: "!=", meaning: "Not equal to", example: "5 != 3 → sach" },
  { op: "<", meaning: "Less than", example: "3 < 5 → sach" },
  { op: ">", meaning: "Greater than", example: "5 > 3 → sach" },
  { op: "<=", meaning: "Less than or equal to", example: "5 <= 5 → sach" },
  { op: ">=", meaning: "Greater than or equal to", example: "5 >= 6 → jhoot" },
];

const logical: OpRow[] = [
  { op: "&&", meaning: "Logical AND", example: "sach && jhoot → jhoot" },
  { op: "||", meaning: "Logical OR", example: "sach || jhoot → sach" },
];

const assignment: OpRow[] = [{ op: "=", meaning: "Assign a value", example: "maan_lo x = 5" }];

function OperatorTable({ rows }: { rows: OpRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">Operator</TableHead>
          <TableHead>Meaning</TableHead>
          <TableHead>Example</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.op}>
            <TableCell>
              <InlineCode>{row.op}</InlineCode>
            </TableCell>
            <TableCell className="text-muted-foreground">{row.meaning}</TableCell>
            <TableCell>
              <InlineCode>{row.example}</InlineCode>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function OperatorsPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Language Guide" title="Operators">
        <DocSection id="operators" title="Arithmetic, comparison & logical">
          <div className="space-y-6">
            <p>
              Operators combine values into new ones — arithmetic on numbers, comparisons that produce booleans,
              and logical operators that combine conditions.
            </p>

            <GuideBlock label="All Operators">
              <div className="space-y-6">
                <div>
                  <div className="mb-2 text-sm font-medium text-foreground">Arithmetic</div>
                  <OperatorTable rows={arithmetic} />
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-foreground">Comparison</div>
                  <OperatorTable rows={comparison} />
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-foreground">Logical</div>
                  <OperatorTable rows={logical} />
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-foreground">Assignment</div>
                  <OperatorTable rows={assignment} />
                </div>
              </div>
            </GuideBlock>

            <GuideBlock label="Syntax">
              <CodeBlock
                code={`<expr> + <expr>    <expr> - <expr>    <expr> * <expr>    <expr> / <expr>    -<expr>\n<expr> == <expr>   <expr> != <expr>   <expr> < <expr>   <expr> > <expr>   <expr> <= <expr>   <expr> >= <expr>\n<expr> && <expr>   <expr> || <expr>`}
              />
            </GuideBlock>

            <GuideBlock label="Example">
              <CodeBlock code={`maan_lo a = 10\nmaan_lo b = 3\n\nbol a + b\nbol a > b\nbol a > b && b > 0`} />
            </GuideBlock>

            <GuideBlock label="Output">
              <CodeBlock code={`13\nsach\nsach`} />
            </GuideBlock>

            <GuideBlock label="Notes & Rules">
              <NoteList
                items={[
                  <>
                    Comparisons produce booleans, which print as <InlineCode>sach</InlineCode> (true) or{" "}
                    <InlineCode>jhoot</InlineCode> (false) — you can store them in a variable like any other value.
                  </>,
                  <>
                    <InlineCode>&&</InlineCode> and <InlineCode>||</InlineCode> short-circuit the same way they do
                    in JavaScript.
                  </>,
                  <>
                    <InlineCode>=</InlineCode> is assignment only — it's a statement, not an expression, so it
                    can't be used inside a condition.
                  </>,
                ]}
              />
            </GuideBlock>

            <GuideBlock label="Common Mistakes">
              <MistakeList
                items={[
                  <>
                    <InlineCode>/</InlineCode> always produces a decimal result — <InlineCode>7 / 2</InlineCode> is{" "}
                    <InlineCode>3.5</InlineCode>, not <InlineCode>3</InlineCode>. There's no separate
                    integer-division operator.
                  </>,
                  <>
                    Writing <InlineCode>{"agar x = 5 { ... }"}</InlineCode> instead of{" "}
                    <InlineCode>{"agar x == 5 { ... }"}</InlineCode> is a parse error, not a silent bug — the
                    parser doesn't treat <InlineCode>=</InlineCode> as a condition expression.
                  </>,
                ]}
              />
            </GuideBlock>
          </div>
        </DocSection>
      </DocsArticle>
    </main>
  );
}
