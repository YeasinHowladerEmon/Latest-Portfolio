'use client'
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Card3DEffect } from '@/components/3D/Card3D';

export function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const projects = [
        {
            title: 'NEON MARKETPLACE',
            description: 'A next-gen e-commerce platform with Web3 integration and immersive 3D product views.',
            image: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5fGVufDF8fHx8MTc2NjU2Mjg1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            tags: ['React', 'Three.js', 'Web3', 'Node.js'],
            accent: 'lime',
        },
        {
            title: 'CREATIVE STUDIO',
            description: 'Portfolio platform for digital artists with real-time collaboration and NFT minting.',
            image: 'https://images.unsplash.com/photo-1743965127369-6e28d86e2460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFydHxlbnwxfHx8fDE3NjY1NzU1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            tags: ['Next.js', 'WebGL', 'TypeScript', 'IPFS'],
            accent: 'fuchsia',
        },
        {
            title: 'PULSE ANALYTICS',
            description: 'Real-time data visualization dashboard with AI-powered insights and predictions.',
            image: 'https://images.unsplash.com/photo-1638562437768-2b13e97649a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwbmlnaHR8ZW58MXx8fHwxNzY2NTg1NTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            tags: ['React', 'D3.js', 'Python', 'PostgreSQL'],
            accent: 'lime',
        },
    ];

    return (
        <section id="projects" className="py-20 bg-black relative" ref={ref}>
            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-1 bg-gradient-to-r from-fuchsia-500 to-lime-400" />
                                <h2 className="text-fuchsia-500 uppercase tracking-widest">Featured Work</h2>
                            </div>
                            <h3 className="text-white">
                                Projects that push boundaries
                            </h3>
                        </div>
                        <motion.a
                            href="#contact"
                            className="flex items-center gap-2 text-lime-400 hover:text-white group"
                            whileHover={{ x: 5 }}
                        >
                            <span className="uppercase tracking-wider">See all projects</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                    </div>
                </motion.div>

                <div className="space-y-24">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Image */}
                            <Card3DEffect intensity={10}>
                                <motion.div
                                    className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="relative overflow-hidden">
                                        <motion.img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-96 object-cover"
                                            animate={{
                                                scale: hoveredIndex === index ? 1.1 : 1,
                                            }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent" />

                                        {/* Animated corner brackets */}
                                        <motion.div
                                            className={`absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 ${project.accent === 'lime' ? 'border-lime-400' : 'border-fuchsia-500'
                                                }`}
                                            animate={{
                                                scale: hoveredIndex === index ? 1.2 : 1,
                                            }}
                                        />
                                        <motion.div
                                            className={`absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 ${project.accent === 'lime' ? 'border-lime-400' : 'border-fuchsia-500'
                                                }`}
                                            animate={{
                                                scale: hoveredIndex === index ? 1.2 : 1,
                                            }}
                                        />
                                    </div>

                                    {/* Glitch effect overlay */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-r ${project.accent === 'lime'
                                            ? 'from-lime-400/20 to-transparent'
                                            : 'from-fuchsia-500/20 to-transparent'
                                            } opacity-0`}
                                        animate={{
                                            opacity: hoveredIndex === index ? [0, 0.5, 0] : 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            repeat: hoveredIndex === index ? Infinity : 0,
                                            repeatDelay: 1,
                                        }}
                                    />
                                </motion.div>
                            </Card3DEffect>

                            {/* Content */}
                            <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                <motion.div
                                    className="space-y-6"
                                    animate={{
                                        x: hoveredIndex === index ? (index % 2 === 1 ? 20 : -20) : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div>
                                        <div className={`inline-block px-4 py-1 mb-4 border-2 ${project.accent === 'lime' ? 'border-lime-400 text-lime-400' : 'border-fuchsia-500 text-fuchsia-500'
                                            } text-xs uppercase tracking-widest`}>
                                            Project {String(index + 1).padStart(2, '0')}
                                        </div>
                                        <h3 className="text-white mb-4">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-1 bg-white/5 border border-white/10 text-gray-300 text-sm uppercase tracking-wider"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <motion.a
                                            href="#"
                                            className={`flex items-center gap-2 px-6 py-3 border-2 ${project.accent === 'lime'
                                                ? 'border-lime-400 text-lime-400 hover:bg-lime-400'
                                                : 'border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500'
                                                } hover:text-black uppercase tracking-wider transition-colors`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <ExternalLink size={18} />
                                            <span>View Live</span>
                                        </motion.a>
                                        <motion.a
                                            href="#"
                                            className="flex items-center gap-2 px-6 py-3 border-2 border-white/20 text-white hover:border-white hover:bg-white hover:text-black uppercase tracking-wider transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Github size={18} />
                                            <span>Code</span>
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
