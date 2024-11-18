'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ParallaxBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
}

export default function ParallaxBackground({ imageUrl, children }: ParallaxBackgroundProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parallaxElement = parallaxRef.current;
    if (!parallaxElement) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3; // Adjust this value to control parallax speed
      parallaxElement.style.setProperty('--scroll', `${rate}px`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] transform translate-y-0 transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: 'translate3d(0, var(--scroll), 0)' }}
      >
        <Image
          src={imageUrl}
          alt="Parallax Background"
          fill
          className="object-cover scale-110"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
