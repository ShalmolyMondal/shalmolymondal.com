export default function SiteLoading() {
  return (
    <main
      className="min-h-screen bg-[#0B0C14] pt-24 text-[#C9D3EE]"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="fixed inset-x-0 top-0 z-40 h-0.5 overflow-hidden bg-[#6366F1]/10">
        <div className="route-progress h-full w-1/3 bg-gradient-to-r from-transparent via-[#818CF8] to-transparent" />
      </div>
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#6366F1]/20 bg-[#171926] px-4 py-2 text-sm text-[#C9D3EE]">
          <span className="h-3 w-3 animate-spin rounded-full border border-[#818CF8]/35 border-t-[#C7D2FE]" aria-hidden="true" />
          Loading page
        </div>
      </div>
    </main>
  );
}
