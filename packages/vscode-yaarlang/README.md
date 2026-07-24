# YaarLang for VS Code

Syntax highlighting for [YaarLang](https://www.npmjs.com/package/yaarlang) (`.yl`) files — a tiny toy programming language with Hinglish keywords.

## Features

Highlights the current YaarLang syntax:

- Keywords: `maan_lo`, `bol`, `agar`, `nahito`, `jabtak`, `kaam`, `wapis`, `sun`, `lambai`, `jodo`, `nikalo`, `galti`
- String literals (`"..."` and `'...'`)
- Numbers
- Operators: `=`, `+`, `-`, `*`, `/`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`

```
maan_lo x = 10
maan_lo y = 20
maan_lo sum = x + y

bol sum
bol "Namaste, Duniya!"

agar sum > 25 {
  bol "bada hai"
} nahito {
  bol "chhota hai"
}
```

## Installation

Not on the Marketplace — install the `.vsix` manually:

1. Download [`vscode-yaarlang-0.0.1.vsix`](https://github.com/Munishwar001/yaarlang-the-future-of-code/releases/download/vscode-yaarlang-v0.0.1/vscode-yaarlang-0.0.1.vsix) from the [latest release](https://github.com/Munishwar001/yaarlang-the-future-of-code/releases/tag/vscode-yaarlang-v0.0.1)
2. In VS Code, open the Extensions panel → `...` menu → **Install from VSIX...**
3. Select the downloaded file

Or from a terminal, once downloaded:

```bash
code --install-extension vscode-yaarlang-0.0.1.vsix
```

## License

MIT
