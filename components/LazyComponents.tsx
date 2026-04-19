'use client';

import dynamic from 'next/dynamic';

// Dynamically import heavy Motion/animation components
export const LazyCard3DTilt = dynamic(() => import('./Card3DTilt'), {
  loading: () => <div className="opacity-0" />,
  ssr: false,
});

export const LazySpotlightCard = dynamic(() => import('./SpotlightCard'), {
  loading: () => <div className="opacity-0" />,
  ssr: false,
});

export const LazyAnimatedSkillsOrb = dynamic(() => import('./AnimatedSkillsOrb'), {
  ssr: false,
  loading: () => <div className="w-full h-32 opacity-0" />,
});

export const LazyAnimatedGridBackground = dynamic(() => import('./AnimatedGridBackground'), {
  ssr: false,
  loading: () => <div className="w-full h-full opacity-0" />,
});

export const LazyShootingStarsBackground = dynamic(() => import('./ShootingStarsBackground'), {
  ssr: false,
  loading: () => <div className="w-full h-full opacity-0" />,
});

export const LazyCard3DTiltComponent = dynamic(() => import('./Card3DTilt'), {
  ssr: false,
});

export const LazyTextGenerateEffect = dynamic(() => import('./TextGenerateEffect'), {
  ssr: false,
});
