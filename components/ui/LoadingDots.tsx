'use client';

import { useMemo } from 'react';
import { Lottie } from 'lottie-react';
import animationData from '@/animations/loading_3dots.optimized.json';
import { cn } from '@/lib/utils';

type LoadingDotsProps = {
  size?: 'sm' | 'md' | 'lg';
  tone?: 'brand' | 'light';
  label?: string;
  className?: string;
  fullScreen?: boolean;
};

const dimensions = {
  sm: { width: 40, height: 24 },
  md: { width: 150, height: 90 },
  lg: { width: 200, height: 120 },
};

export default function LoadingDots({
  size = 'md', tone = 'brand', label = 'Loading...', className, fullScreen = false,
}: LoadingDotsProps) {
  const light = fullScreen || tone === 'light';
  const animation = useMemo(() => {
    const data = structuredClone(animationData);
    if (light) {
      for (const layer of data.layers) {
        for (const group of layer.shapes) {
          for (const shape of group.it || []) {
            if (shape.ty === 'fl' && shape.c) shape.c.k = [1, 1, 1, 1];
          }
        }
      }
    }
    return data;
  }, [light]);
  const colors = light ? ['#FFFFFF', '#FFFFFF', '#FFFFFF'] : ['#00A1B1', '#003A77', '#00A1B1'];

  return (
    <span
      data-loading-dots={light ? 'light' : 'brand'}
      role={label ? 'status' : undefined}
      aria-live={label ? 'polite' : undefined}
      aria-atomic={label ? true : undefined}
      aria-hidden={label ? undefined : true}
      className={cn(
        'inline-flex shrink-0 items-center justify-center align-middle',
        fullScreen && 'fixed inset-0 z-[100] bg-[#003A77]',
        className,
      )}
    >
      {label && <span className="sr-only">{label}</span>}
      <span aria-hidden="true" className="loading-dots-visual relative block"
        style={dimensions[fullScreen ? 'lg' : size]}>
        <span className="loading-dots-placeholder pointer-events-none absolute inset-0">
          {colors.map((color, index) => (
            <span key={index} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: (30 + index * 20) + '%', top: '73.333%', width: '9.1376%', aspectRatio: '1', backgroundColor: color }} />
          ))}
        </span>
        <Lottie as="span" src={animation} loop autoplay
          className="loading-dots-player block h-full w-full" />
      </span>
    </span>
  );
}
