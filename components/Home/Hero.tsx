'use client'
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
// import { DigitalWave3D } from '@/components/3D/DigitalWave3D';

export function Hero() {
    return (
        <section
            id="home"
            className="min-h-dvh flex items-center justify-center relative overflow-hidden bg-black py-32 md:py-40 lg:py-48"
        >
            {/* 3D Background removed */}
            {/* <DigitalWave3D /> */}

            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

            {/* Animated neon blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                        scale: [1.3, 1, 1.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative inline-block mb-6"
                        >
                            <span className="text-lime-400 uppercase tracking-widest border-2 border-lime-400 px-4 py-2 text-md md:text-xl inline-block transform -rotate-2">
                                Full-Stack Engineer
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-white mb-6 text-4xl sm:text-2xl md:text-4xl lg:text-[40px] font-bold leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <span className="block ">I'M EMON,</span>
                            <span className="block text-lime-400 font-semibold">I BUILD SCALABLE</span>
                            <span className="block text-fuchsia-500  font-semibold">CRAFTING MODERN,
                            </span>
                            <span className="block text-blue-500 font-semibold">
                                RELIABLE WEB APPLICATIONS
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-gray-400 mb-8 max-w-lg text-base md:text-xl"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Engineering scalable full-stack systems with clean architecture, intuitive design, and powerful user experiences — turning complex ideas into high-impact digital products.

                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <motion.a
                                href="#projects"
                                className="group relative px-8 py-4 md:px-10 md:py-6 bg-lime-400 text-black uppercase tracking-wider overflow-hidden text-sm md:text-base font-bold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    View Work
                                    <ArrowRight size={20} />
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-fuchsia-500"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="px-8 py-4 md:px-10 md:py-6 bg-transparent border-2 border-white text-white uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300 text-sm md:text-base font-bold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </motion.a>
                        </motion.div>

                        <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            {[
                                { icon: Github, href: 'https://github.com/YeasinHowladerEmon', label: 'GitHub' },
                                { icon: Linkedin, href: 'https://www.linkedin.com/in/yeasinhowladeremon/', label: 'LinkedIn' },
                                { icon: Mail, href: 'mailto:emonibnsalim@gmail.com', label: 'Email' },
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    className="w-12 h-12 border-2 border-gray-700 text-gray-400 hover:border-lime-400 hover:text-lime-400 flex items-center justify-center transition-colors duration-300"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon size={20} />
                                    <span className="sr-only">{social.label}</span>
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right side - Visual element */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative block mt-12 md:mt-0"
                    >
                        <div className="relative">
                            {/* Geometric shapes */}
                            <motion.div
                                className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 border-4 border-lime-400"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 border-4 border-fuchsia-500"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="relative z-10 w-full h-64 md:h-96 bg-linear-to-br from-lime-400/10 to-fuchsia-500/10 backdrop-blur-sm border-2 border-white/10 flex items-center justify-center"
                                animate={{
                                    boxShadow: [
                                        '0 0 20px rgba(163, 230, 53, 0.3)',
                                        '0 0 60px rgba(217, 70, 239, 0.3)',
                                        '0 0 20px rgba(163, 230, 53, 0.3)',
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <div className="text-white/10 text-7xl md:text-9xl font-black">DEV</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}