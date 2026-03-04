'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal } from 'lucide-react';

const steps = [
    "INITIALIZING CORE SYSTEMS...",
    "LOADING NEURAL NETWORKS...",
    "SYNCING OPERATIONAL DATA...",
    "ESTABLISHING SECURE CONNECTION...",
    "FINALIZING DEPLOYMENT..."
];

export function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const duration = 2500; // 2.5 seconds total
        const interval = 30; // update every 30ms
        const increment = (100 / (duration / interval));

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Change text step based on progress
        const stepIndex = Math.min(
            Math.floor((progress / 100) * steps.length),
            steps.length - 1
        );
        setCurrentStep(stepIndex);
    }, [progress]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-9999 bg-[#030213] flex flex-col items-center justify-center p-6 overflow-hidden"
                >
                    {/* Background Grid Accent */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030213_70%)]" />

                    <div className="relative w-full max-w-md">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-lime-400/10 border border-lime-400/20 rounded-lg">
                                <Terminal className="w-5 h-5 text-lime-400" />
                            </div>
                            <div>
                                <h2 className="text-white font-mono text-sm tracking-tighter uppercase opacity-50">System Loader v2.0</h2>
                                <div className="h-0.5 w-full bg-linear-to-r from-lime-400 to-transparent" />
                            </div>
                        </div>

                        {/* Step Text */}
                        <div className="mb-4 h-8">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="font-mono text-lime-400 text-sm tracking-widest"
                            >
                                <span className="mr-2 opacity-50">{">"}</span>
                                {steps[currentStep]}
                            </motion.div>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="relative h-1 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden mb-4">
                            {/* Glow Track */}
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.8)]"
                                style={{ width: `${progress}%` }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            />
                        </div>

                        {/* Percentage and Bytes Info */}
                        <div className="flex justify-between items-end font-mono">
                            <div className="text-[10px] text-zinc-500 flex flex-col gap-1">
                                <span>STATUS: OPERATIONAL</span>
                                <span>BUFFER: {Math.floor(progress * 4.2)}MB / 420MB</span>
                            </div>
                            <div className="text-4xl font-black text-white tracking-tighter italic">
                                {Math.round(progress)}<span className="text-lime-400 text-xl ml-1">%</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorators */}
                    <div className="absolute bottom-12 left-12 font-mono text-[10px] text-zinc-600 hidden md:block space-y-1">
                        <p>COORD_X: 42.1283</p>
                        <p>COORD_Y: -71.1092</p>
                        <p>ENTROPY: 0.98421</p>
                    </div>

                    <div className="absolute top-12 right-12 font-mono text-[10px] text-zinc-600 hidden md:block text-right space-y-1">
                        <p>SYSTEM_RESOURCES: STABLE</p>
                        <p>UPTIME: 0.0003S</p>
                        <p>REGION: GLOBAL_EDGE</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
