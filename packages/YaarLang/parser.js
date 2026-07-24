export default function parser(tokens) {
  let pos = 0;

  function peek() {
    return tokens[pos];
  }

  function next() {
    return tokens[pos++];
  }

  function isOp(...values) {
    const t = peek();
    return t && t.type === "operator" && values.includes(t.value);
  }

  function isBrace(value) {
    const t = peek();
    return t && t.type === "brace" && t.value === value;
  }

  function parseProgram() {
    const body = [];
    while (pos < tokens.length) {
      body.push(parseStatement());
    }
    return { type: "Program", body };
  }

  function parseStatement() {
    const token = peek();
    if (token.type === "keyword" && token.value === "maan_lo") {
      return parseDeclaration();
    }
    if (token.type === "keyword" && token.value === "bol") {
      return parsePrint();
    }
    if (token.type === "keyword" && token.value === "agar") {
      return parseIf();
    }
    throw new Error(`Unexpected token '${token.value}'`);
  }

  function parseBlock() {
    if (!isBrace("{")) {
      throw new Error("Expected '{' to start block");
    }
    next(); // consume '{'
    const body = [];
    while (pos < tokens.length && !isBrace("}")) {
      body.push(parseStatement());
    }
    if (!isBrace("}")) {
      throw new Error("Expected '}' to close block");
    }
    next(); // consume '}'
    return body;
  }

  function parseIf() {
    next(); // consume 'agar'
    const condition = parseExpression();
    const consequent = parseBlock();
    let alternate = null;
    if (peek() && peek().type === "keyword" && peek().value === "nahito") {
      next(); // consume 'nahito'
      alternate = parseBlock();
    }
    return { type: "If", condition, consequent, alternate };
  }

  function parseDeclaration() {
    next(); // consume 'maan_lo'
    const name = next().value;
    let value = null;
    if (isOp("=")) {
      next(); // consume '='
      value = parseExpression();
    }
    return { type: "Declaration", name, value };
  }

  function parsePrint() {
    next(); // consume 'bol'
    return { type: "Print", expression: parseExpression() };
  }

  function parseExpression() {
    return parseLogicalOr();
  }

  // logicalOr := logicalAnd ('||' logicalAnd)*
  function parseLogicalOr() {
    let left = parseLogicalAnd();
    while (isOp("||")) {
      const operator = next().value;
      left = { type: "LogicalExpression", operator, left, right: parseLogicalAnd() };
    }
    return left;
  }

  // logicalAnd := comparison ('&&' comparison)*
  function parseLogicalAnd() {
    let left = parseComparison();
    while (isOp("&&")) {
      const operator = next().value;
      left = { type: "LogicalExpression", operator, left, right: parseComparison() };
    }
    return left;
  }

  // comparison := additive (('==' | '!=' | '<' | '>' | '<=' | '>=') additive)*
  function parseComparison() {
    let left = parseAdditive();
    while (isOp("==", "!=", "<", ">", "<=", ">=")) {
      const operator = next().value;
      left = { type: "BinaryExpression", operator, left, right: parseAdditive() };
    }
    return left;
  }

  // additive := term (('+' | '-') term)*
  function parseAdditive() {
    let left = parseTerm();
    while (isOp("+", "-")) {
      const operator = next().value;
      left = { type: "BinaryExpression", operator, left, right: parseTerm() };
    }
    return left;
  }

  // term := unary (('*' | '/') unary)*
  function parseTerm() {
    let left = parseUnary();
    while (isOp("*", "/")) {
      const operator = next().value;
      left = { type: "BinaryExpression", operator, left, right: parseUnary() };
    }
    return left;
  }

  // unary := '-' unary | primary
  function parseUnary() {
    if (isOp("-")) {
      next();
      return { type: "UnaryExpression", operator: "-", argument: parseUnary() };
    }
    return parsePrimary();
  }

  // primary := number | string | identifier | '(' expression ')'
  function parsePrimary() {
    const token = next();
    if (!token) {
      throw new Error("Unexpected end of input while parsing expression");
    }
    if (token.type === "number") {
      return { type: "NumberLiteral", value: Number(token.value) };
    }
    if (token.type === "string") {
      return { type: "StringLiteral", value: token.value };
    }
    if (token.type === "identifier") {
      return { type: "Identifier", name: token.value };
    }
    if (token.type === "keyword" && token.value === "sun") {
      let prompt = null;
      if (peek() && peek().type === "paren" && peek().value === "(") {
        next(); // consume '('
        if (!(peek() && peek().type === "paren" && peek().value === ")")) {
          prompt = parseExpression();
        }
        if (!peek() || peek().type !== "paren" || peek().value !== ")") {
          throw new Error("Expected closing ')' after sun(...)");
        }
        next(); // consume ')'
      }
      return { type: "Input", prompt };
    }
    if (token.type === "paren" && token.value === "(") {
      const expr = parseExpression();
      if (!peek() || peek().type !== "paren" || peek().value !== ")") {
        throw new Error("Expected closing ')'");
      }
      next(); // consume ')'
      return expr;
    }
    throw new Error(`Unexpected token '${token.value}' in expression`);
  }

  return parseProgram();
}
