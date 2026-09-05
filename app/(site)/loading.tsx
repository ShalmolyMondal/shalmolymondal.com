export default function SiteLoading() {
  return (
    <main
      className="min-h-screen bg-(--s-bg) pt-24 text-(--s-text-2)"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="fixed inset-x-0 top-0 z-40 h-0.5 overflow-hidden bg-[#6366F1]/10">
        <div className="route-progress h-full w-1/3 bg-gradient-to-r from-transparent via-(color:--s-accent-2) to-transparent" />
      </div>
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#6366F1]/20 bg-(--s-card) px-4 py-2 text-sm text-(--s-text-2)">
          <span className="h-3 w-3 animate-spin rounded-full border border-(color:--s-accent-2)/35 border-t-(color:--s-accent-4)" aria-hidden="true" />
          Loading page
        </div>
      </div>
    </main>
  );
}
