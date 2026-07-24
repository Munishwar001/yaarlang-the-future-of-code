# YaarLang 🇮🇳

A toy programming language with Hinglish keywords, built from scratch in JavaScript. YaarLang source is lexed, parsed into an AST, compiled down to plain JavaScript, and executed on Node.

```
maan_lo x = 10
maan_lo y = 20

maan_lo sum = x + y
bol sum
```

## Requirements

- [Node.js](https://nodejs.org/) (with ES module support)

## Install

```bash
npm install -g yaarlang
```

This gives you the `yaarlang` command anywhere on your machine.

You can also run it without installing globally:

```bash
npx yaarlang path/to/file.yl
```

## Quick Start

```bash
yaarlang path/to/file.yl
```

If you cloned the repo instead of installing from npm, run:

```bash
npm start
```

which executes `node index.js examples/hello.yl`.

## Language Guide

| Keyword    | Meaning                        | Example                              |
|------------|---------------------------------|----------------------------------------|
| `maan_lo`  | Declare a variable              | `maan_lo x = 10`                       |
| `bol`      | Print a value                   | `bol x`                                |
| `sun`      | Read input from the user        | `maan_lo name = sun("Naam? ")`         |
| `agar`     | `if`                             | `agar x > 5 { bol "bada" }`            |
| `nahito`   | `else`                           | `nahito { bol "chhota" }`              |
| `jabtak`   | `while` loop                    | `jabtak i <= 5 { bol i }`              |
| `kaam`     | Declare a function              | `kaam add(a, b) { wapis a + b }`       |
| `wapis`    | `return`                         | `wapis a + b`                          |
| `jodo`     | Push into an array               | `jodo(nums, 5)` / `jodo(nums, 5, 0)`   |
| `nikalo`   | Remove from an array             | `nikalo(nums)` / `nikalo(nums, 0)`     |
| `lambai`   | Length of an array               | `bol lambai(nums)`                     |
| `galti`    | Throw an error                   | `galti "Age cannot be negative"`       |

### Operators

- Arithmetic: `+`, `-`, `*`, `/`, unary `-`
- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`
- Assignment: `=`

### Arrays

```
maan_lo nums = [10, 20, 30]
bol nums[0]
nums[1] = 99
bol nums
bol lambai(nums)
```

### Comments

```
// this is a comment
maan_lo x = 10 // inline comment
```

### Everything together

```
maan_lo age = 20

agar age >= 18 {
  bol 'Bada ho gaya'
} nahito {
  bol 'Abhi chhota hai'
}

maan_lo i = 1
jabtak i <= 5 {
  bol i
  i = i + 1
}

kaam add(a, b) {
  wapis a + b
}
bol add(3, 4)

maan_lo nums = [10, 20, 30]
jodo(nums, 40)
nikalo(nums, 0)
bol nums
```

Booleans produced by comparisons (`agar x == y`) print as `sach` (true) / `jhoot` (false).

## How It Works

Source code flows through a small compiler pipeline:

1. **[lexer.js](lexer.js)** — turns raw source text into a stream of tokens (keywords, identifiers, numbers, strings, operators).
2. **[parser.js](parser.js)** — turns tokens into an AST (declarations, if/while, functions, arrays, etc.).
3. **[codegen.js](codegen.js)** — walks the AST and emits equivalent JavaScript source.
4. **[compiler.js](compiler.js)** — wires the lexer, parser, and codegen together.
5. **[runtime.js](runtime.js)** — executes the generated JavaScript via `eval`.
6. **[index.js](index.js)** — CLI entry point: reads a `.yl` file, compiles it, and runs it.

## Project Structure

```
YaarLang/
├── index.js        # CLI entry point
├── compiler.js      # Pipes lexer -> parser -> codegen
├── lexer.js         # Source text -> tokens
├── parser.js        # Tokens -> AST
├── codegen.js        # AST -> JavaScript source
├── runtime.js         # Executes generated JavaScript
└── examples/
    ├── hello.yl        # Minimal sample program
    └── test.yl         # Larger sample covering most language features
```

## Status

This is an early, minimal implementation intended for learning how compilers/interpreters work. Currently supported: variable declarations, printing, input, string/number literals, arithmetic/comparison/logical expressions, `if`/`else`, `while` loops, functions with `return`, arrays (literals, indexing, push/remove, length), `throw`-style errors, and `//` comments.

## Contributing

Issues and pull requests are welcome at the [GitHub repo](https://github.com/Munishwar001/yaarlang-the-future-of-code).

## License

MIT
