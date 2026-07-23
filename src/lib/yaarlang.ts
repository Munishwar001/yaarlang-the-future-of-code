// Client-side port of the real YaarLang compiler pipeline
// (packages/YaarLang/{lexer,parser,codegen,compiler}.js), so the browser
// playground runs the same lexer/parser/codegen as the actual project.

type Token = { type: string; value: string };

function lexer(input: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    let char = input[cursor];

    if (/\s/.test(char)) {
      cursor++;
      continue;
    }

    if (/[a-zA-Z]/.test(char)) {
      let word = "";
      while (cursor < input.length && /[a-zA-Z0-9_]/.test(char)) {
        word += char;
        char = input[++cursor];
      }
      if (word === "maan_lo" || word === "bol") {
        tokens.push({ type: "keyword", value: word });
      } else {
        tokens.push({ type: "identifier", value: word });
      }
      continue;
    }
    if (/[0-9]/.test(char)) {
      let number = "";
      while (cursor < input.length && /[0-9]/.test(char)) {
        number += char;
        char = input[++cursor];
      }
      tokens.push({ type: "number", value: number });
      continue;
    }

    if (char === "=" || char === "+" || char === "-" || char === "*" || char === "/") {
      tokens.push({ type: "operator", value: char });
      cursor++;
      continue;
    }

    if (char === "'" || char === '"') {
      const quote = char;
      let str = "";
      char = input[++cursor];
      while (cursor < input.length && char !== quote) {
        str += char;
        char = input[++cursor];
      }
      if (cursor >= input.length) {
        throw new Error(`Unterminated string literal`);
      }
      cursor++;
      tokens.push({ type: "string", value: str });
      continue;
    }

    throw new Error(`Unexpected character '${char}' at position ${cursor}`);
  }
  return tokens;
}

function parser(tokens: Token[]) {
  const ast: { type: string; body: any[] } = { type: "Program", body: [] };

  while (tokens.length > 0) {
    const token = tokens.shift()!;
    if (token.type === "keyword" && token.value === "maan_lo") {
      const declaration: any = {
        type: "Declaration",
        name: tokens.shift()?.value,
        value: null,
      };

      if (tokens[0] && tokens[0].type === "operator" && tokens[0].value === "=") {
        tokens.shift();
        let expression = "";
        while (tokens.length > 0 && tokens[0].type !== "keyword") {
          const t = tokens.shift()!;
          const piece = t.type === "string" ? JSON.stringify(t.value) : t.value;
          expression += piece + " ";
        }
        declaration.value = expression.trim();
      }
      ast.body.push(declaration);
    }
    if (token.type === "keyword" && token.value === "bol") {
      const exprToken = tokens.shift()!;
      ast.body.push({
        type: "print",
        expression: exprToken.value,
        expressionType: exprToken.type,
      });
    }
  }
  return ast;
}

function codeGen(node: any): string {
  switch (node.type) {
    case "Program":
      return node.body.map(codeGen).join("\n");
    case "Declaration":
      return `let ${node.name} = ${node.value};`;
    case "print":
      if (node.expressionType === "string") {
        return `console.log(${JSON.stringify(node.expression)});`;
      }
      return `console.log(${node.expression});`;
    default:
      return "";
  }
}

export function compile(input: string): string {
  const tokens = lexer(input);
  const ast = parser(tokens);
  return codeGen(ast);
}

export function runYaarLang(source: string): { output: string[]; error: string | null; ms: number } {
  const start = performance.now();
  try {
    const jsCode = compile(source);
    const output: string[] = [];
    const sandboxConsole = {
      log: (...args: unknown[]) => output.push(args.map((a) => String(a)).join(" ")),
    };
    const run = new Function("console", jsCode);
    run(sandboxConsole);
    return { output, error: null, ms: Math.max(1, Math.round(performance.now() - start)) };
  } catch (err) {
    return {
      output: [],
      error: err instanceof Error ? err.message : String(err),
      ms: Math.round(performance.now() - start),
    };
  }
}
