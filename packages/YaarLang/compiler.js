import lexer from './lexer.js';
import parser from './parser.js';
import codeGen from './codegen.js';

export default function compiler(input) {
  const tokens = lexer(input);
  const ast = parser(tokens);
  const executableCode = codeGen(ast);
  return executableCode;
}
