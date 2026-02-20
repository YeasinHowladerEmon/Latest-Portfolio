'use client'

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Zap, Target, Award } from 'lucide-react';

export function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const highlights = [
        {
            icon: Zap,
            title: 'Fast',
            description: 'Lightning-quick load times and optimized performance',
        },
        {
            icon: Target,
            title: 'Scalable Architecture',
            description: 'Designs that grow with your user base',
        },
        {
            icon: Award,
            title: 'Robust Security',
            description: 'Implementing best practices to protect data',
        },
    ];

    return (
        <section id="about" className="py-20 bg-black relative" ref={ref}>
            {/* Diagonal stripe background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent,_transparent_50px,_#a3e635_50px,_#a3e635_51px)]" />
            </div>

            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-gradient-to-r from-lime-400 to-fuchsia-500" />
                        <h2 className="text-lime-400 uppercase tracking-widest">About Me</h2>
                    </div>
                    <h3 className="text-white max-w-3xl">
                        Crafting the future of web experiences, one line of code at a time
                    </h3>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-lime-400/20 to-fuchsia-500/20 blur-2xl" />
                            <img
                                src="https://images.unsplash.com/photo-1638562437768-2b13e97649a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwbmlnaHR8ZW58MXx8fHwxNzY2NTg1NTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Neon atmosphere"
                                className="relative w-full h-96 object-cover border-4 border-white/10"
                            />
                            <div className="absolute top-4 right-4 w-32 h-32 border-4 border-lime-400 animate-pulse" />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {['2.5+', '10+', '4+'].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                    className="bg-white/5 border-2 border-white/10 p-4 text-center hover:border-lime-400 transition-colors"
                                >
                                    <div className="text-lime-400 mb-1">{stat}</div>
                                    <div className="text-gray-400 text-xs uppercase">
                                        {index === 0 ? 'Years' : index === 1 ? 'Projects' : 'Clients'}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div className="text-gray-300 space-y-4">
                            <p>
                                As a fullstack developer, I craft end‑to‑end web solutions that blend
                                seamless front‑end experiences with robust back‑end architecture.
                                My skill set spans UI/UX design, API development, database design,
                                and cloud deployment, ensuring scalable and maintainable products.
                            </p>
                            <p>
                                I prioritize performance, security, and clean code, continuously
                                learning the latest technologies to deliver high‑quality applications
                                that solve real business problems and delight users.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {highlights.map((highlight, index) => (
                                <motion.div
                                    key={highlight.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                    className="flex gap-4 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-lime-400 to-fuchsia-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <highlight.icon className="text-black" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white mb-1">{highlight.title}</h4>
                                        <p className="text-gray-400">{highlight.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="border-l-4 border-lime-400 pl-6 py-4 bg-white/5"
                        >
                            <p className="text-white italic">
                                "Good design makes products beautiful. Good engineering makes them reliable."
                            </p>
                            <p className="text-gray-500 mt-2">- Someone</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
