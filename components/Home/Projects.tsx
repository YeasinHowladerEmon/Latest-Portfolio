'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { InfiniteGrid } from '../ui/Scene3D';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            className="relative group w-full mb-24 last:mb-0 perspective-[1000px]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
        >
            <div className="relative grid lg:grid-cols-2 gap-8 items-center bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 lg:p-8 overflow-hidden">
                {/* Neon Glow Background */}
                <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl ${project.accent === 'lime' ? 'bg-lime-400' : 'bg-fuchsia-500'
                        }`}
                />

                {/* Project Image Area */}
                <div
                    className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <div className={`absolute inset-0 bg-linear-to-tr from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Floating UI Elements on Image */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-white flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${project.accent === 'lime' ? 'bg-lime-400 animate-pulse' : 'bg-fuchsia-500 animate-pulse'}`} />
                            LIVE
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative z-20 lg:pl-8" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex items-center gap-4 mb-4">
                        <span className={`text-5xl font-black text-transparent bg-clip-text stroke-text opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${project.accent === 'lime' ? 'bg-linear-to-br from-lime-400 to-transparent' : 'bg-linear-to-br from-fuchsia-500 to-transparent'
                            }`}>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className={`h-px flex-1 ${project.accent === 'lime' ? 'bg-lime-400/30' : 'bg-fuchsia-500/30'}`} />
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                        {project.title}
                    </h3>

                    <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project?.tags?.split(',').map((tag: string) => (
                            <span
                                key={tag.trim()}
                                className={`px-3 py-1 rounded-md text-sm font-mono border ${project.accent === 'lime'
                                    ? 'border-lime-400/20 text-lime-400 bg-lime-400/5'
                                    : 'border-fuchsia-500/20 text-fuchsia-500 bg-fuchsia-500/5'
                                    }`}
                            >
                                {tag.trim()}
                            </span>
                        ))}
                    </div>

                    {project?.team && project.team.length > 0 && (
                        <div className="mb-8 group/team">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className={`w-4 h-4 ${project.accent === 'lime' ? 'text-lime-400' : 'text-fuchsia-500'}`} />
                                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Execution Team</span>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {project.team.map((member: any, i: number) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[10px] font-bold text-zinc-400 group-hover/team:border-${project.accent}-400/30 transition-colors`}>
                                            {member.name.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-300 leading-none mb-1">{member.name}</p>
                                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <motion.a
                            href={project.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black transition-all shadow-lg shadow-lime-400/20 ${project.accent === 'lime' ? 'bg-lime-400 hover:bg-lime-300' : 'bg-fuchsia-500 hover:bg-fuchsia-400'
                                }`}
                        >
                            <ExternalLink size={18} />
                            <span>View Project</span>
                        </motion.a>
                        {project.github ? (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all"
                            >
                                <Github size={18} />
                                <span>Source Code</span>
                            </motion.a>
                        ) : null}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (res.ok) {
                setProjects(data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Animate cards after data is loaded
    useEffect(() => {
        if (loading || projects.length === 0) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.proj-heading',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
                }
            );
            gsap.fromTo('.proj-card',
                { opacity: 0, y: 80, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.25, ease: 'power3.out',
                    scrollTrigger: { trigger: '.proj-card-list', start: 'top 80%', once: true },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, [loading, projects]);

    return (
        <section id="projects" className="py-32 bg-black relative overflow-hidden" ref={sectionRef}>
            {/* 3D Infinite Grid Background */}
            <InfiniteGrid />

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-transparent via-black/80 to-black" />
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-lime-400/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-fuchsia-500/50 to-transparent" />

            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="proj-heading text-center mb-24" style={{ opacity: 0 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-fuchsia-500/30 rounded-full bg-fuchsia-500/5 mb-6">
                        <Layers className="text-fuchsia-500" size={16} />
                        <span className="text-fuchsia-500 text-sm uppercase tracking-widest font-medium">Selected Works</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        DIGITAL <span className="text-transparent bg-clip-text bg-linear-to-r from-fuchsia-500 to-purple-600">REALITY</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-xl">
                        A curation of projects that blend technical precision with artistic vision.
                    </p>
                </div>

                <div className="proj-card-list relative">
                    {/* Vertical connection line */}
                    <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

                    {projects.map((project: any, index: number) => (
                        <div key={project.title} className="proj-card" style={{ opacity: 0 }}>
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 border border-white/10 rounded-full text-white hover:border-lime-400 hover:text-lime-400 transition-colors group"
                    >
                        <span className="uppercase tracking-widest font-bold">View All Projects</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
