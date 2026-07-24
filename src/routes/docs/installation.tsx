import { createFileRoute } from "@tanstack/react-router";
import { DocsArticle, DocSection, InlineCode, CodeBlock, MistakeList } from "@/components/yaarlang/DocsContent";

export const Route = createFileRoute("/docs/installation")({
  head: () => ({
    meta: [
      { title: "Installation — YaarLang Docs" },
      { name: "description", content: "Install the YaarLang CLI globally or run it with npx." },
    ],
  }),
  component: InstallationPage,
});

function InstallationPage() {
  return (
    <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-12">
      <DocsArticle eyebrow="Getting Started" title="Installation" description="Requires Node.js with ES module support.">
        <DocSection id="installation" title="Install the CLI">
          <p>
            Install YaarLang globally with npm to get the <InlineCode>yaarlang</InlineCode> command anywhere on
            your machine:
          </p>
          <CodeBlock code="npm install -g yaarlang" />
          <p>Or run it without installing, via npx:</p>
          <CodeBlock code="npx yaarlang path/to/file.yl" />
        </DocSection>

        <DocSection
          id="vscode-extension"
          title={
            <>
              VS Code Extension <span className="font-normal text-muted-foreground">(Optional)</span>
            </>
          }
        >
          <p>
            YaarLang syntax highlighting for VS Code is distributed as a <InlineCode>.vsix</InlineCode> file — it
            isn't on the Marketplace, so install it directly. The fastest way is one command that downloads and
            installs it in one step, so there's no file path to get wrong:
          </p>
          <p className="text-sm font-medium text-foreground">Windows (PowerShell):</p>
          <CodeBlock
            code={`irm https://github.com/Munishwar001/yaarlang-the-future-of-code/releases/download/vscode-yaarlang-v0.0.1/vscode-yaarlang-0.0.1.vsix -OutFile "$env:TEMP\\vscode-yaarlang-0.0.1.vsix"; code --install-extension "$env:TEMP\\vscode-yaarlang-0.0.1.vsix"`}
          />
          <p className="text-sm font-medium text-foreground">macOS / Linux:</p>
          <CodeBlock
            code={`curl -L -o /tmp/vscode-yaarlang-0.0.1.vsix https://github.com/Munishwar001/yaarlang-the-future-of-code/releases/download/vscode-yaarlang-v0.0.1/vscode-yaarlang-0.0.1.vsix && code --install-extension /tmp/vscode-yaarlang-0.0.1.vsix`}
          />
          <p>
            Paste the whole line as-is — don't edit the path inside it, that's where the download is saved, not a
            placeholder to fill in.
          </p>
          <p className="text-sm font-medium text-foreground">Prefer downloading manually?</p>
          <a
            href="https://github.com/Munishwar001/yaarlang-the-future-of-code/releases/download/vscode-yaarlang-v0.0.1/vscode-yaarlang-0.0.1.vsix"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90"
          >
            Download vscode-yaarlang-0.0.1.vsix
          </a>
          <MistakeList
            items={[
              <>
                <span className="font-medium text-foreground">Don't double-click the downloaded file.</span> On
                Windows, <InlineCode>.vsix</InlineCode> is associated with the Visual Studio VSIX Installer, not VS
                Code — double-clicking opens that instead and fails with{" "}
                <InlineCode>"One or more extensions are for Visual Studio Code."</InlineCode>
              </>,
              <>
                <span className="font-medium text-foreground">
                  Don't copy an example command with a placeholder path.
                </span>{" "}
                Something like <InlineCode>C:\full\path\to\vscode-yaarlang-0.0.1.vsix</InlineCode> is a stand-in, not
                a real location — running it as-is gives{" "}
                <InlineCode>ENOENT: no such file or directory</InlineCode>. Use the exact command above, or the real
                path where you actually saved the file.
              </>,
            ]}
          />
          <p>After downloading manually, install it from a terminal:</p>
          <CodeBlock code="code --install-extension vscode-yaarlang-0.0.1.vsix" />
          <p>
            (only works if that's run from the same folder the file downloaded into — otherwise use the file's full
            path). Or from VS Code itself: open the Extensions panel, click the <InlineCode>...</InlineCode> menu at
            the top, choose <InlineCode>Install from VSIX...</InlineCode>, and select the downloaded file — this is
            the file-picker inside VS Code, not opening the file from your file explorer.
          </p>
        </DocSection>
      </DocsArticle>
    </main>
  );
}
