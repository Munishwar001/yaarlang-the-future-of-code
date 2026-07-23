# YaarLang 🇮🇳

A tiny toy programming language with Hinglish keywords, built from scratch in JavaScript. YaarLang source is lexed, parsed into an AST, compiled down to plain JavaScript, and executed.

```
maan_lo x = 10
maan_lo y = 20

maan_lo sum = x + y
bol sum
```

## Requirements

- [Node.js](https://nodejs.org/) (with ES module support)

## Getting Started

Run the sample program:

```bash
npm start
```

This executes `node index.js examples/hello.yl`.

To run any `.yl` file:

```bash
node index.js path/to/file.yl
```

## Language Guide

| Keyword    | Meaning              | Example              |
|------------|-----------------------|-----------------------|
| `maan_lo`  | Declare a variable     | `maan_lo x = 10`      |
| `bol`      | Print a value          | `bol x`                |

Supported operators: `=`, `+`, `-`, `*`, `/`

Variables are declared with `maan_lo <name> = <expression>` and can be referenced in later expressions or printed with `bol <name>`.

## How It Works

Source code flows through a small compiler pipeline:

1. **[lexer.js](lexer.js)** — turns raw source text into a stream of tokens (keywords, identifiers, numbers, operators).
2. **[parser.js](parser.js)** — turns tokens into an AST (`Program` → `Declaration` / `print` nodes).
3. **[codegen.js](codegen.js)** — walks the AST and emits equivalent JavaScript source.
4. **[compiler.js](compiler.js)** — wires the lexer, parser, and codegen together.
5. **[runtime.js](runtime.js)** — executes the generated JavaScript via `eval`.
6. **[index.js](index.js)** — CLI entry point: reads a `.yl` file, compiles it, and runs it.

## Project Structure

```
YaarLang/
├── index.js       # CLI entry point
├── compiler.js     # Pipes lexer -> parser -> codegen
├── lexer.js        # Source text -> tokens
├── parser.js        # Tokens -> AST
├── codegen.js       # AST -> JavaScript source
├── runtime.js        # Executes generated JavaScript
└── examples/
    └── hello.yl       # Sample YaarLang program
```

## Status

This is an early, minimal implementation intended for learning how compilers/interpreters work. Currently supported: variable declarations and printing. There is no support yet for conditionals, loops, functions, or string literals.

## License

MIT
