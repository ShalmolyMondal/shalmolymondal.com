'use client';

import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Use View Transitions API natively (no extra animation layer)
  // This provides smooth transitions without animation overhead
  return <>{children}</>;
}
