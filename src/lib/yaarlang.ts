// Client-side port of the real YaarLang compiler pipeline
// (packages/YaarLang/{lexer,parser,codegen}.js), so the browser playground
// supports the full language, not just a subset. Two runtime helpers differ
// from the Node CLI because there's no `fs`/stdin/TTY colors in a browser:
// `sun` maps to `window.prompt`, and `bol` skips ANSI color codes.

type Token = { type: string; value: string; line: number; col: number };
// The AST has ~20 node shapes (Declaration, If, While, BinaryExpression, ...);
// this is a straight port of the untyped Node AST, so `any` matches the source.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Node = any;

function lineColAt(input: string, pos: number) {
  let line = 1;
  let col = 1;
  for (let i = 0; i < pos; i++) {
    if (input[i] === "\n") {
      line++;
      col = 1;
    } else {
      col++;
    }
  }
  return { line, col };
}

function lexer(input: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    let char = input[cursor];
    const { line, col } = lineColAt(input, cursor);

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
      const keywords = [
        "maan_lo", "bol", "agar", "nahito", "sun", "jabtak",
        "kaam", "wapis", "lambai", "jodo", "nikalo", "galti",
      ];
      tokens.push({ type: keywords.includes(word) ? "keyword" : "identifier", value: word, line, col });
      continue;
    }
    if (/[0-9]/.test(char)) {
      let number = "";
      while (cursor < input.length && /[0-9]/.test(char)) {
        number += char;
        char = input[++cursor];
      }
      tokens.push({ type: "number", value: number, line, col });
      continue;
    }

    if (char === "/" && input[cursor + 1] === "/") {
      while (cursor < input.length && input[cursor] !== "\n") {
        cursor++;
      }
      continue;
    }

    const twoChar = char + (input[cursor + 1] || "");
    if (["==", "!=", "<=", ">=", "&&", "||"].includes(twoChar)) {
      tokens.push({ type: "operator", value: twoChar, line, col });
      cursor += 2;
      continue;
    }

    if ("=+-*/<>".includes(char)) {
      tokens.push({ type: "operator", value: char, line, col });
      cursor++;
      continue;
    }

    if (char === "(" || char === ")") {
      tokens.push({ type: "paren", value: char, line, col });
      cursor++;
      continue;
    }

    if (char === "{" || char === "}") {
      tokens.push({ type: "brace", value: char, line, col });
      cursor++;
      continue;
    }

    if (char === "[" || char === "]") {
      tokens.push({ type: "bracket", value: char, line, col });
      cursor++;
      continue;
    }

    if (char === ",") {
      tokens.push({ type: "comma", value: char, line, col });
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
        throw new Error(`Unterminated string literal at line ${line}, column ${col}`);
      }
      cursor++; // skip closing quote
      tokens.push({ type: "string", value: str, line, col });
      continue;
    }

    throw new Error(`Unexpected character '${char}' at line ${line}, column ${col}`);
  }
  return tokens;
}

function parser(tokens: Token[]): Node {
  let pos = 0;

  const peek = () => tokens[pos];
  const next = () => tokens[pos++];
  const isOp = (...values: string[]) => {
    const t = peek();
    return !!t && t.type === "operator" && values.includes(t.value);
  };
  const isBrace = (value: string) => {
    const t = peek();
    return !!t && t.type === "brace" && t.value === value;
  };
  const errorAt = (token: Token | undefined, message: string) =>
    token ? new Error(`${message} (line ${token.line}, column ${token.col})`) : new Error(`${message} (at end of input)`);

  function parseProgram(): Node {
    const body: Node[] = [];
    while (pos < tokens.length) {
      body.push(parseStatement());
    }
    return { type: "Program", body };
  }

  function parseStatement(): Node {
    const token = peek();
    if (token.type === "keyword" && token.value === "maan_lo") return parseDeclaration();
    if (token.type === "keyword" && token.value === "bol") return parsePrint();
    if (token.type === "keyword" && token.value === "agar") return parseIf();
    if (token.type === "keyword" && token.value === "jabtak") return parseWhile();
    if (token.type === "keyword" && token.value === "kaam") return parseFunctionDeclaration();
    if (token.type === "keyword" && token.value === "wapis") return parseReturn();
    if (token.type === "keyword" && token.value === "jodo") return parsePush();
    if (token.type === "keyword" && token.value === "nikalo") return parseRemove();
    if (token.type === "keyword" && token.value === "galti") return parseThrow();
    if (token.type === "identifier") {
      const expr = parseExpression();
      if (isOp("=")) {
        next();
        const value = parseExpression();
        return { type: "Assignment", target: expr, value };
      }
      return { type: "ExpressionStatement", expression: expr };
    }
    throw errorAt(token, `Unexpected token '${token.value}'`);
  }

  function parseFunctionDeclaration(): Node {
    next(); // 'kaam'
    const name = next().value;
    if (!(peek() && peek().type === "paren" && peek().value === "(")) throw errorAt(peek(), "Expected '(' after function name");
    next();
    const params: string[] = [];
    if (!(peek() && peek().type === "paren" && peek().value === ")")) {
      params.push(next().value);
      while (peek() && peek().type === "comma") {
        next();
        params.push(next().value);
      }
    }
    if (!(peek() && peek().type === "paren" && peek().value === ")")) throw errorAt(peek(), "Expected ')' after parameters");
    next();
    const body = parseBlock();
    return { type: "FunctionDeclaration", name, params, body };
  }

  function parseReturn(): Node {
    next(); // 'wapis'
    let value = null;
    if (peek() && !isBrace("}")) value = parseExpression();
    return { type: "Return", value };
  }

  function parseThrow(): Node {
    next(); // 'galti'
    return { type: "Throw", value: parseExpression() };
  }

  function parsePush(): Node {
    next(); // 'jodo'
    if (!(peek() && peek().type === "paren" && peek().value === "(")) throw errorAt(peek(), "Expected '(' after jodo");
    next();
    const target = parseExpression();
    if (!(peek() && peek().type === "comma")) throw errorAt(peek(), "Expected ',' after array in jodo(...)");
    next();
    const value = parseExpression();
    let index = null;
    if (peek() && peek().type === "comma") {
      next();
      index = parseExpression();
    }
    if (!(peek() && peek().type === "paren" && peek().value === ")")) throw errorAt(peek(), "Expected ')' after jodo(...)");
    next();
    return { type: "Push", target, value, index };
  }

  function parseRemove(): Node {
    next(); // 'nikalo'
    if (!(peek() && peek().type === "paren" && peek().value === "(")) throw errorAt(peek(), "Expected '(' after nikalo");
    next();
    const target = parseExpression();
    let index = null;
    if (peek() && peek().type === "comma") {
      next();
      index = parseExpression();
    }
    if (!(peek() && peek().type === "paren" && peek().value === ")")) throw errorAt(peek(), "Expected ')' after nikalo(...)");
    next();
    return { type: "Remove", target, index };
  }

  function parseWhile(): Node {
    next(); // 'jabtak'
    const condition = parseExpression();
    const body = parseBlock();
    return { type: "While", condition, body };
  }

  function parseBlock(): Node[] {
    if (!isBrace("{")) throw errorAt(peek(), "Expected '{' to start block");
    next();
    const body: Node[] = [];
    while (pos < tokens.length && !isBrace("}")) body.push(parseStatement());
    if (!isBrace("}")) throw errorAt(peek(), "Expected '}' to close block");
    next();
    return body;
  }

  function parseIf(): Node {
    next(); // 'agar'
    const condition = parseExpression();
    const consequent = parseBlock();
    let alternate = null;
    if (peek() && peek().type === "keyword" && peek().value === "nahito") {
      next();
      alternate = parseBlock();
    }
    return { type: "If", condition, consequent, alternate };
  }

  function parseDeclaration(): Node {
    next(); // 'maan_lo'
    const name = next().value;
    let value = null;
    if (isOp("=")) {
      next();
      value = parseExpression();
    }
    return { type: "Declaration", name, value };
  }

  function parsePrint(): Node {
    next(); // 'bol'
    return { type: "Print", expression: parseExpression() };
  }

  const parseExpression = (): Node => parseLogicalOr();

  function parseLogicalOr(): Node {
    let left = parseLogicalAnd();
    while (isOp("||")) {
      const operator = next().value;
      left = { type: "LogicalExpression", operator, left, right: parseLogicalAnd() };
    }
    return left;
  }

  function parseLogicalAnd(): Node {
    let left = parseComparison();
    while (isOp("&&")) {
      const operator = next().value;
      left = { type: "LogicalExpression", operator, left, right: parseComparison() };
    }
    return left;
  }

  function parseComparison(): Node {
    let left = parseAdditive();
    while (isOp("==", "!=", "<", ">", "<=", ">=")) {
      const operator = next().value;
      left = { type: "BinaryExpression", operator, left, right: parseAdditive() };
    }
    return left;
  }

  function parseAdditive(): Node {
    let left = parseTerm();
    while (isOp("+", "-")) {
      const operator = next().value;
      left = { type: "BinaryExpression", operator, left, right: parseTerm() };
    }
    return left;
  }

  function parseTerm(): Node {
    let left = parseUnary();
    while (isOp("*", "/")) {
      const operator = next().value;
      left = { type: "BinaryExpression", operator, left, right: parseUnary() };
    }
    return left;
  }

  function parseUnary(): Node {
    if (isOp("-")) {
      next();
      return { type: "UnaryExpression", operator: "-", argument: parseUnary() };
    }
    return parsePrimary();
  }

  function parsePrimary(): Node {
    let expr = parseAtom();
    while (peek() && peek().type === "bracket" && peek().value === "[") {
      next();
      const index = parseExpression();
      if (!(peek() && peek().type === "bracket" && peek().value === "]")) throw errorAt(peek(), "Expected ']' after index");
      next();
      expr = { type: "IndexExpression", object: expr, index };
    }
    return expr;
  }

  function parseAtom(): Node {
    const token = next();
    if (!token) throw errorAt(undefined, "Unexpected end of input while parsing expression");
    if (token.type === "number") return { type: "NumberLiteral", value: Number(token.value) };
    if (token.type === "string") return { type: "StringLiteral", value: token.value };
    if (token.type === "identifier") {
      if (peek() && peek().type === "paren" && peek().value === "(") {
        next();
        const args: Node[] = [];
        if (!(peek() && peek().type === "paren" && peek().value === ")")) {
          args.push(parseExpression());
          while (peek() && peek().type === "comma") {
            next();
            args.push(parseExpression());
          }
        }
        if (!(peek() && peek().type === "paren" && peek().value === ")")) throw errorAt(peek(), "Expected ')' after arguments");
        next();
        return { type: "CallExpression", callee: token.value, args };
      }
      return { type: "Identifier", name: token.value };
    }
    if (token.type === "keyword" && token.value === "sun") {
      let prompt = null;
      if (peek() && peek().type === "paren" && peek().value === "(") {
        next();
        if (!(peek() && peek().type === "paren" && peek().value === ")")) prompt = parseExpression();
        if (!peek() || peek().type !== "paren" || peek().value !== ")") throw errorAt(peek(), "Expected closing ')' after sun(...)");
        next();
      }
      return { type: "Input", prompt };
    }
    if (token.type === "keyword" && token.value === "lambai") {
      if (!(peek() && peek().type === "paren" && peek().value === "(")) throw errorAt(peek(), "Expected '(' after lambai");
      next();
      const target = parseExpression();
      if (!(peek() && peek().type === "paren" && peek().value === ")")) throw errorAt(peek(), "Expected ')' after lambai(...)");
      next();
      return { type: "Length", target };
    }
    if (token.type === "paren" && token.value === "(") {
      const expr = parseExpression();
      if (!peek() || peek().type !== "paren" || peek().value !== ")") throw errorAt(peek(), "Expected closing ')'");
      next();
      return expr;
    }
    if (token.type === "bracket" && token.value === "[") {
      const elements: Node[] = [];
      if (!(peek() && peek().type === "bracket" && peek().value === "]")) {
        elements.push(parseExpression());
        while (peek() && peek().type === "comma") {
          next();
          elements.push(parseExpression());
        }
      }
      if (!(peek() && peek().type === "bracket" && peek().value === "]")) throw errorAt(peek(), "Expected ']' to close array literal");
      next();
      return { type: "ArrayLiteral", elements };
    }
    throw errorAt(token, `Unexpected token '${token.value}' in expression`);
  }

  return parseProgram();
}

function codeGen(node: Node): string {
  switch (node.type) {
    case "Program":
      return [
        `function __yaarlang_print(value) {`,
        `  console.log(typeof value === 'boolean' ? (value ? 'sach' : 'jhoot') : __yaarlang_inspect(value));`,
        `}`,
        `function __yaarlang_inspect(value) {`,
        `  if (Array.isArray(value)) {`,
        `    if (value.length === 0) return '[]';`,
        `    return '[ ' + value.map(__yaarlang_inspectElement).join(', ') + ' ]';`,
        `  }`,
        `  return String(value);`,
        `}`,
        `function __yaarlang_inspectElement(value) {`,
        `  if (typeof value === 'string') return "'" + value + "'";`,
        `  if (Array.isArray(value)) return __yaarlang_inspect(value);`,
        `  return String(value);`,
        `}`,
        `function __yaarlang_input(prompt) {`,
        `  var result = window.prompt(prompt !== undefined ? String(prompt) : "");`,
        `  return result === null ? "" : result;`,
        `}`,
        ...node.body.map(codeGen),
      ].join("\n");
    case "Declaration":
      return node.value === null ? `let ${node.name};` : `let ${node.name} = ${codeGen(node.value)};`;
    case "Print":
      return `__yaarlang_print(${codeGen(node.expression)});`;
    case "If": {
      const consequent = node.consequent.map(codeGen).join("\n");
      let code = `if (${codeGen(node.condition)}) {\n${consequent}\n}`;
      if (node.alternate) code += ` else {\n${node.alternate.map(codeGen).join("\n")}\n}`;
      return code;
    }
    case "While":
      return `while (${codeGen(node.condition)}) {\n${node.body.map(codeGen).join("\n")}\n}`;
    case "Push":
      return node.index === null
        ? `${codeGen(node.target)}.push(${codeGen(node.value)});`
        : `${codeGen(node.target)}.splice(${codeGen(node.index)}, 0, ${codeGen(node.value)});`;
    case "Remove":
      return node.index === null
        ? `${codeGen(node.target)}.pop();`
        : `${codeGen(node.target)}.splice(${codeGen(node.index)}, 1);`;
    case "Assignment":
      return `${codeGen(node.target)} = ${codeGen(node.value)};`;
    case "FunctionDeclaration":
      return `function ${node.name}(${node.params.join(", ")}) {\n${node.body.map(codeGen).join("\n")}\n}`;
    case "Return":
      return node.value === null ? `return;` : `return ${codeGen(node.value)};`;
    case "Throw":
      return `throw new Error(${codeGen(node.value)});`;
    case "CallExpression":
      return `${node.callee}(${node.args.map(codeGen).join(", ")})`;
    case "ExpressionStatement":
      return `${codeGen(node.expression)};`;
    case "BinaryExpression":
      return `(${codeGen(node.left)} ${node.operator} ${codeGen(node.right)})`;
    case "LogicalExpression":
      return `(${codeGen(node.left)} ${node.operator} ${codeGen(node.right)})`;
    case "UnaryExpression":
      return `(${node.operator}${codeGen(node.argument)})`;
    case "NumberLiteral":
      return `${node.value}`;
    case "StringLiteral":
      return JSON.stringify(node.value);
    case "Identifier":
      return node.name;
    case "Input":
      return node.prompt ? `__yaarlang_input(${codeGen(node.prompt)})` : `__yaarlang_input()`;
    case "ArrayLiteral":
      return `[${node.elements.map(codeGen).join(", ")}]`;
    case "IndexExpression":
      return `${codeGen(node.object)}[${codeGen(node.index)}]`;
    case "Length":
      return `${codeGen(node.target)}.length`;
    default:
      return "";
  }
}

export function compile(input: string): string {
  return codeGen(parser(lexer(input)));
}

export function runYaarLang(source: string): { output: string[]; error: string | null; ms: number } {
  const start = performance.now();
  // Declared outside the try so a mid-run throw (e.g. `galti`) still returns
  // whatever was printed before it, matching the real CLI instead of wiping it.
  const output: string[] = [];
  try {
    const jsCode = compile(source);
    const sandboxConsole = {
      log: (...args: unknown[]) => output.push(args.map((a) => String(a)).join(" ")),
    };
    const run = new Function("console", jsCode);
    run(sandboxConsole);
    return { output, error: null, ms: Math.max(1, Math.round(performance.now() - start)) };
  } catch (err) {
    return {
      output,
      error: err instanceof Error ? err.message : String(err),
      ms: Math.round(performance.now() - start),
    };
  }
}
