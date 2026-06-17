export default function Template({ children }: { children: React.ReactNode }) {
  // Use View Transitions API natively (no extra animation layer)
  // This provides smooth transitions without animation overhead
  return <>{children}</>;
}
