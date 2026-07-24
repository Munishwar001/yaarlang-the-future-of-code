export default function parser(tokens) {
  let pos = 0;

  function peek() {
    return tokens[pos];
  }

  function next() {
    return tokens[pos++];
  }

  function peekAt(offset) {
    return tokens[pos + offset];
  }

  function isOp(...values) {
    const t = peek();
    return t && t.type === "operator" && values.includes(t.value);
  }

  function isBrace(value) {
    const t = peek();
    return t && t.type === "brace" && t.value === value;
  }

  function errorAt(token, message) {
    if (token) {
      return new Error(`${message} (line ${token.line}, column ${token.col})`);
    }
    return new Error(`${message} (at end of input)`);
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
    if (token.type === "keyword" && token.value === "jabtak") {
      return parseWhile();
    }
    if (token.type === "keyword" && token.value === "kaam") {
      return parseFunctionDeclaration();
    }
    if (token.type === "keyword" && token.value === "wapis") {
      return parseReturn();
    }
    if (token.type === "keyword" && token.value === "jodo") {
      return parsePush();
    }
    if (token.type === "keyword" && token.value === "nikalo") {
      return parseRemove();
    }
    if (token.type === "keyword" && token.value === "galti") {
      return parseThrow();
    }
    if (token.type === "identifier") {
      const expr = parseExpression();
      if (isOp("=")) {
        next(); // consume '='
        const value = parseExpression();
        return { type: "Assignment", target: expr, value };
      }
      return { type: "ExpressionStatement", expression: expr };
    }
    throw errorAt(token, `Unexpected token '${token.value}'`);
  }

  function parseFunctionDeclaration() {
    next(); // consume 'kaam'
    const name = next().value; // function name
    if (!(peek() && peek().type === "paren" && peek().value === "(")) {
      throw errorAt(peek(), "Expected '(' after function name");
    }
    next(); // consume '('
    const params = [];
    if (!(peek() && peek().type === "paren" && peek().value === ")")) {
      params.push(next().value);
      while (peek() && peek().type === "comma") {
        next(); // consume ','
        params.push(next().value);
      }
    }
    if (!(peek() && peek().type === "paren" && peek().value === ")")) {
      throw errorAt(peek(), "Expected ')' after parameters");
    }
    next(); // consume ')'
    const body = parseBlock();
    return { type: "FunctionDeclaration", name, params, body };
  }

  function parseReturn() {
    next(); // consume 'wapis'
    let value = null;
    if (peek() && !isBrace("}")) {
      value = parseExpression();
    }
    return { type: "Return", value };
  }

  function parseThrow() {
    next(); // consume 'galti'
    const value = parseExpression();
    return { type: "Throw", value };
  }

  function parsePush() {
    next(); // consume 'jodo'
    if (!(peek() && peek().type === "paren" && peek().value === "(")) {
      throw errorAt(peek(), "Expected '(' after jodo");
    }
    next(); // consume '('
    const target = parseExpression();
    if (!(peek() && peek().type === "comma")) {
      throw errorAt(peek(), "Expected ',' after array in jodo(...)");
    }
    next(); // consume ','
    const value = parseExpression();
    let index = null;
    if (peek() && peek().type === "comma") {
      next(); // consume ','
      index = parseExpression();
    }
    if (!(peek() && peek().type === "paren" && peek().value === ")")) {
      throw errorAt(peek(), "Expected ')' after jodo(...)");
    }
    next(); // consume ')'
    return { type: "Push", target, value, index };
  }

  function parseRemove() {
    next(); // consume 'nikalo'
    if (!(peek() && peek().type === "paren" && peek().value === "(")) {
      throw errorAt(peek(), "Expected '(' after nikalo");
    }
    next(); // consume '('
    const target = parseExpression();
    let index = null;
    if (peek() && peek().type === "comma") {
      next(); // consume ','
      index = parseExpression();
    }
    if (!(peek() && peek().type === "paren" && peek().value === ")")) {
      throw errorAt(peek(), "Expected ')' after nikalo(...)");
    }
    next(); // consume ')'
    return { type: "Remove", target, index };
  }

  function parseWhile() {
    next(); // consume 'jabtak'
    const condition = parseExpression();
    const body = parseBlock();
    return { type: "While", condition, body };
  }

  function parseBlock() {
    if (!isBrace("{")) {
      throw errorAt(peek(), "Expected '{' to start block");
    }
    next(); // consume '{'
    const body = [];
    while (pos < tokens.length && !isBrace("}")) {
      body.push(parseStatement());
    }
    if (!isBrace("}")) {
      throw errorAt(peek(), "Expected '}' to close block");
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

  // primary := atom ('[' expression ']')*
  function parsePrimary() {
    let expr = parseAtom();
    while (peek() && peek().type === "bracket" && peek().value === "[") {
      next(); // consume '['
      const index = parseExpression();
      if (!(peek() && peek().type === "bracket" && peek().value === "]")) {
        throw errorAt(peek(), "Expected ']' after index");
      }
      next(); // consume ']'
      expr = { type: "IndexExpression", object: expr, index };
    }
    return expr;
  }

  // atom := number | string | identifier | sun(...) | lambai(...) | galti | '(' expression ')' | '[' elements ']'
  function parseAtom() {
    const token = next();
    if (!token) {
      throw errorAt(null, "Unexpected end of input while parsing expression");
    }
    if (token.type === "number") {
      return { type: "NumberLiteral", value: Number(token.value) };
    }
    if (token.type === "string") {
      return { type: "StringLiteral", value: token.value };
    }
    if (token.type === "identifier") {
      if (peek() && peek().type === "paren" && peek().value === "(") {
        next(); // consume '('
        const args = [];
        if (!(peek() && peek().type === "paren" && peek().value === ")")) {
          args.push(parseExpression());
          while (peek() && peek().type === "comma") {
            next(); // consume ','
            args.push(parseExpression());
          }
        }
        if (!(peek() && peek().type === "paren" && peek().value === ")")) {
          throw errorAt(peek(), "Expected ')' after arguments");
        }
        next(); // consume ')'
        return { type: "CallExpression", callee: token.value, args };
      }
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
          throw errorAt(peek(), "Expected closing ')' after sun(...)");
        }
        next(); // consume ')'
      }
      return { type: "Input", prompt };
    }
    if (token.type === "keyword" && token.value === "lambai") {
      if (!(peek() && peek().type === "paren" && peek().value === "(")) {
        throw errorAt(peek(), "Expected '(' after lambai");
      }
      next(); // consume '('
      const target = parseExpression();
      if (!(peek() && peek().type === "paren" && peek().value === ")")) {
        throw errorAt(peek(), "Expected ')' after lambai(...)");
      }
      next(); // consume ')'
      return { type: "Length", target };
    }
    if (token.type === "paren" && token.value === "(") {
      const expr = parseExpression();
      if (!peek() || peek().type !== "paren" || peek().value !== ")") {
        throw errorAt(peek(), "Expected closing ')'");
      }
      next(); // consume ')'
      return expr;
    }
    if (token.type === "bracket" && token.value === "[") {
      const elements = [];
      if (!(peek() && peek().type === "bracket" && peek().value === "]")) {
        elements.push(parseExpression());
        while (peek() && peek().type === "comma") {
          next(); // consume ','
          elements.push(parseExpression());
        }
      }
      if (!(peek() && peek().type === "bracket" && peek().value === "]")) {
        throw errorAt(peek(), "Expected ']' to close array literal");
      }
      next(); // consume ']'
      return { type: "ArrayLiteral", elements };
    }
    throw errorAt(token, `Unexpected token '${token.value}' in expression`);
  }

  return parseProgram();
}
