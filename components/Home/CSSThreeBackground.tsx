'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function CSSThreeBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* 3D Geometric Shapes with CSS transforms */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64"
                style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                }}
                animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    rotateZ: [0, 180],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                <div className="absolute inset-0 border-2 border-lime-400/30 rounded-lg transform rotate-45" />
                <div className="absolute inset-4 border-2 border-fuchsia-500/30 rounded-lg transform -rotate-45" />
                <div className="absolute inset-8 border-2 border-cyan-400/30 rounded-lg transform rotate-90" />
            </motion.div>

            <motion.div
                className="absolute top-2/3 right-1/4 w-48 h-48"
                style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                }}
                animate={{
                    rotateX: [360, 0],
                    rotateY: [0, -360],
                    rotateZ: [180, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                <div className="absolute inset-0 border-2 border-fuchsia-500/30 transform rotate-12" />
                <div className="absolute inset-6 border-2 border-lime-400/30 transform -rotate-12" />
            </motion.div>

            {/* Floating Particles */}
            {mounted && [...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        backgroundColor: i % 2 === 0 ? '#a3e635' : '#d946ef',
                        boxShadow: `0 0 10px ${i % 2 === 0 ? '#a3e635' : '#d946ef'}`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Rotating Rings */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
                style={{
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    rotateY: [0, 360],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                <div className="absolute inset-0 border-2 border-lime-400/20 rounded-full" />
            </motion.div>

            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-md h-112"
                style={{
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    rotateX: [0, 360],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                <div className="absolute inset-0 border-2 border-fuchsia-500/20 rounded-full" />
            </motion.div>
        </div>
    );
}