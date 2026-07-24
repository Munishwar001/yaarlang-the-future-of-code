import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DocsNav } from "@/components/yaarlang/DocsNav";
import { DocsSidebar } from "@/components/yaarlang/DocsSidebar";
import { StarRepoPopup } from "@/components/yaarlang/StarRepoPopup";
import { docsGroups } from "@/lib/docs-nav";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DocsNav groups={docsGroups} />
      <div className="mx-auto flex max-w-350">
        <DocsSidebar groups={docsGroups} />
        <Outlet />
      </div>
      <StarRepoPopup />
    </div>
  );
}
