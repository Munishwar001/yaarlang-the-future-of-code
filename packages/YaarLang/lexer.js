function lineColAt(input, pos) {
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

export default function lexer(input) {
  const tokens = [];
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
      if (word === "maan_lo" || word === "bol" || word === "agar" || word === "nahito" || word === "sun" || word === "jabtak" || word === "kaam" || word === "wapis" || word === "lambai" || word === "jodo" || word === "nikalo" || word === "galti") {
        tokens.push({ type: "keyword", value: word, line, col });
      } else {
        tokens.push({ type: "identifier", value: word, line, col });
      }
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
    if (twoChar === "==" || twoChar === "!=" || twoChar === "<=" || twoChar === ">=" || twoChar === "&&" || twoChar === "||") {
      tokens.push({ type: "operator", value: twoChar, line, col });
      cursor += 2;
      continue;
    }

    if (char === "=" || char === "+" || char === "-" || char === "*" || char === "/" || char === "<" || char === ">") {
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
