'use client';

import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';

// --- Shared Components ---

const Glow = ({ color = 'lime' }: { color?: 'lime' | 'fuchsia' | 'cyan' }) => {
  const bg =
    color === 'lime' ? 'bg-lime-400' :
      color === 'fuchsia' ? 'bg-fuchsia-500' : 'bg-cyan-400';

  return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 shadow-[0_0_100px_40px] ${color === 'lime' ? 'shadow-lime-400/20' : color === 'fuchsia' ? 'shadow-fuchsia-500/20' : 'shadow-cyan-400/20'}`} />
  );
};

// --- Effect 1: The Core (Rotating Gyroscope) ---
export function CyberSphere() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" style={{ transformStyle: 'preserve-3d' }}>

        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 border border-lime-400/20 rounded-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: 360, rotateY: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-lime-400 rounded-full shadow-[0_0_10px_#a3e635]" />
        </motion.div>

        {/* Middle Ring */}
        <motion.div
          className="absolute inset-16 border border-fuchsia-500/20 rounded-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: -360, rotateZ: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_10px_#d946ef]" />
        </motion.div>

        {/* Inner Ring */}
        <motion.div
          className="absolute inset-32 border border-cyan-400/20 rounded-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: -360, rotateZ: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
        </motion.div>

        {/* Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg"
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Glow color="lime" />
        </div>
      </div>
    </div>
  );
}

// --- Effect 2: Floating Cubes (Matrix) ---
const Cube = ({ size = 60, x, y, delay, color = 'lime' }: any) => {
  const borderClass = color === 'lime' ? 'border-lime-400/30' : color === 'fuchsia' ? 'border-fuchsia-500/30' : 'border-cyan-400/30';
  const bgClass = color === 'lime' ? 'bg-lime-400/5' : color === 'fuchsia' ? 'bg-fuchsia-500/5' : 'bg-cyan-400/5';

  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, perspective: '600px' }}
      animate={{ y: [0, -30, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay: delay, ease: 'easeInOut' }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }}
      >
        <div className={`absolute inset-0 ${borderClass} ${bgClass}`} style={{ transform: `translateZ(${size / 2}px)` }} />
        <div className={`absolute inset-0 ${borderClass} ${bgClass}`} style={{ transform: `rotateY(180deg) translateZ(${size / 2}px)` }} />
        <div className={`absolute inset-0 ${borderClass} ${bgClass}`} style={{ transform: `rotateY(90deg) translateZ(${size / 2}px)` }} />
        <div className={`absolute inset-0 ${borderClass} ${bgClass}`} style={{ transform: `rotateY(-90deg) translateZ(${size / 2}px)` }} />
        <div className={`absolute inset-0 ${borderClass} ${bgClass}`} style={{ transform: `rotateX(90deg) translateZ(${size / 2}px)` }} />
        <div className={`absolute inset-0 ${borderClass} ${bgClass}`} style={{ transform: `rotateX(-90deg) translateZ(${size / 2}px)` }} />
      </motion.div>
    </motion.div>
  );
};

export function FloatingMatrix() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Cube x="10%" y="20%" size={40} delay={0} color="lime" />
      <Cube x="80%" y="15%" size={60} delay={1} color="fuchsia" />
      <Cube x="25%" y="60%" size={30} delay={2} color="cyan" />
      <Cube x="70%" y="70%" size={50} delay={1.5} color="lime" />
      <Cube x="5%" y="80%" size={40} delay={3} color="fuchsia" />
      <Cube x="90%" y="40%" size={35} delay={2.5} color="cyan" />

      {/* Background Grid */}
      <div className="absolute inset-0 bg-linear-to-r from-zinc-800 to-transparent bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
    </div>
  );
}

// --- Effect 3: Infinite Tunnel (Grid Terrain) ---
export function InfiniteGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-normal">
      {/* Floor */}
      <motion.div
        className="absolute inset-0 h-[200%] w-full -top-[50%]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-lime-400 to-transparent bg-size-[4rem_4rem]"
          style={{
            transform: 'rotateX(75deg)',
            opacity: 0.15,
            transformOrigin: 'center center',
          }}
          animate={{ backgroundPosition: ['0px 0px', '0px 64px'] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Ceiling (Mirrored Floor) */}
      <motion.div
        className="absolute inset-0 h-[200%] w-full -top-[50%]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-fuchsia-500 to-transparent bg-size-[4rem_4rem]"
          style={{
            transform: 'rotateX(-75deg) translateY(-100px)', // Inverted rotation for ceiling effect
            opacity: 0.1,
            transformOrigin: 'center center',
          }}
          animate={{ backgroundPosition: ['0px 0px', '0px 64px'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Glowing Horizon */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-white to-transparent shadow-[0_0_20px_white]" />
    </div>
  );
}

// --- Effect 4: Holographic Contact (Rotating Dodecahedron) ---
export function HolographicContact() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1200px' }}>
      <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-[500px] h-[500px]" style={{ transformStyle: 'preserve-3d' }}>

        {/* Main Rotating Structure */}
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: 360, rotateY: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {/* Faces of a conceptual 3D shape (e.g. Dodecahedron approximation) */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border-2 border-lime-400/20 bg-lime-400/5 backdrop-blur-[1px]"
              style={{
                transform: `rotateY(${i * 60}deg) translateZ(250px)`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <div
              key={`inner-${i}`}
              className="absolute inset-16 border border-fuchsia-500/30 bg-fuchsia-500/5"
              style={{
                transform: `rotateX(${i * 60}deg) translateZ(150px)`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            />
          ))}

          {/* Center Core */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div
              className="w-32 h-32 bg-linear-to-br from-lime-400 to-fuchsia-500 rounded-full blur-xl opacity-20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="absolute w-20 h-20 border-2 border-white/50 rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Orbital Rings */}
        <motion.div
          className="absolute inset-[-20%] border border-white/10 rounded-full"
          style={{ transform: 'rotateX(70deg)' }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white]" />
        </motion.div>

      </div>

      {/* Floating Particles in Background */}
      {mounted && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-lime-400 rounded-full"
          initial={{
            x: Math.random() * 1000 - 500,
            y: Math.random() * 1000 - 500,
            z: -1000
          }}
          animate={{
            z: [null, 500]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      ))}
    </div>
  );
}
