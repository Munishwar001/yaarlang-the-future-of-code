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

Not on the Marketplace — install the `.vsix` directly. Easiest way is one command that downloads and installs it in one step (no path to type or get wrong):

**Windows (PowerShell):**

```powershell
irm https://github.com/Munishwar001/yaarlang-the-future-of-code/releases/download/vscode-yaarlang-v0.0.1/vscode-yaarlang-0.0.1.vsix -OutFile "$env:TEMP\vscode-yaarlang-0.0.1.vsix"; code --install-extension "$env:TEMP\vscode-yaarlang-0.0.1.vsix"
```

**macOS / Linux:**

```bash
curl -L -o /tmp/vscode-yaarlang-0.0.1.vsix https://github.com/Munishwar001/yaarlang-the-future-of-code/releases/download/vscode-yaarlang-v0.0.1/vscode-yaarlang-0.0.1.vsix && code --install-extension /tmp/vscode-yaarlang-0.0.1.vsix
```

Paste the whole command as-is — the path inside it is where the file gets saved, not a placeholder to replace.

<details>
<summary>Prefer downloading manually?</summary>

1. Download [`vscode-yaarlang-0.0.1.vsix`](https://github.com/Munishwar001/yaarlang-the-future-of-code/releases/download/vscode-yaarlang-v0.0.1/vscode-yaarlang-0.0.1.vsix) from the [latest release](https://github.com/Munishwar001/yaarlang-the-future-of-code/releases/tag/vscode-yaarlang-v0.0.1)
2. **Don't double-click it** — on Windows this opens the Visual Studio VSIX Installer instead of VS Code and fails.
3. In VS Code, open the Extensions panel → `...` menu → **Install from VSIX...** → select the downloaded file

Or from a terminal, from the same folder the file downloaded into:

```bash
code --install-extension vscode-yaarlang-0.0.1.vsix
```

</details>

## License

MIT
