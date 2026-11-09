'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function CursorFlashlight() {
  const [isMounted, setIsMounted] = useState(false);
  
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  // Super fast spring for slight delay (gives weight to the light)
  const springX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  const xStr = useTransform(springX, (v) => `${v}px`);
  const yStr = useTransform(springY, (v) => `${v}px`);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen"
      style={{
        background: "radial-gradient(800px circle at var(--x) var(--y), rgba(255,255,255,0.04), transparent 40%)",
        // @ts-ignore
        "--x": xStr,
        // @ts-ignore
        "--y": yStr,
      }}
    />
  );
}
