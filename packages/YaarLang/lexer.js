export default function lexer(input) {
  const tokens = [];
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
      if (word === "maan_lo" || word === "bol" || word === "agar" || word === "nahito" || word === "sun" || word === "jabtak" || word === "kaam" || word === "wapis") {
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

    const twoChar = char + (input[cursor + 1] || "");
    if (twoChar === "==" || twoChar === "!=" || twoChar === "<=" || twoChar === ">=" || twoChar === "&&" || twoChar === "||") {
      tokens.push({ type: "operator", value: twoChar });
      cursor += 2;
      continue;
    }

    if (char === "=" || char === "+" || char === "-" || char === "*" || char === "/" || char === "<" || char === ">") {
      tokens.push({ type: "operator", value: char });
      cursor++;
      continue;
    }

    if (char === "(" || char === ")") {
      tokens.push({ type: "paren", value: char });
      cursor++;
      continue;
    }

    if (char === "{" || char === "}") {
      tokens.push({ type: "brace", value: char });
      cursor++;
      continue;
    }

    if (char === "[" || char === "]") {
      tokens.push({ type: "bracket", value: char });
      cursor++;
      continue;
    }

    if (char === ",") {
      tokens.push({ type: "comma", value: char });
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
      cursor++; // skip closing quote
      tokens.push({ type: "string", value: str });
      continue;
    }

    throw new Error(`Unexpected character '${char}' at position ${cursor}`);
  }
  return tokens;
}