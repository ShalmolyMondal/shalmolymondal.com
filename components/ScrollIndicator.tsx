export default function ScrollIndicator() {
  return (
    <div className="animate-scroll-indicator">
      <svg className="w-7 h-7 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}
