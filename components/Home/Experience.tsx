'use client';

import { useRef, useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { Briefcase, Calendar, TerminalSquare, ChevronRight, CheckCircle2 } from 'lucide-react';
import { FloatingMatrix } from '../ui/Scene3D';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const [experiences, setExperiences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchExperiences = async () => {
        try {
            const res = await fetch('/api/experience');
            const data = await res.json();
            if (res.ok) {
                setExperiences(data);
            }
        } catch (error) {
            console.error('Error fetching experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    // Animate after data loads
    useEffect(() => {
        if (loading || experiences.length === 0) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.exp-heading',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
                }
            );
            gsap.fromTo('.exp-item',
                { opacity: 0, x: -60 },
                {
                    opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, [loading, experiences]);

    return (
        <section id="experience" className="py-24 bg-[#030213] relative overflow-hidden" ref={sectionRef}>
            <FloatingMatrix />

            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="exp-heading mb-20 text-center md:text-left" style={{ opacity: 0 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-fuchsia-500/30 rounded-full bg-fuchsia-500/5 mb-6">
                        <Briefcase className="text-fuchsia-400" size={16} />
                        <span className="text-fuchsia-400 text-sm uppercase tracking-widest font-medium">Career Log</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
                            PROFESSIONAL <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-fuchsia-500 to-cyan-400">EXPERIENCE</span>
                        </h2>
                        <p className="text-zinc-400 max-w-md text-lg md:text-right">
                            A chronological log of my operational history, deployments, and objective executions across the industry.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    {/* Main Timeline Line */}
                    <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-white/10" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp._id || index}
                                className="exp-item relative pl-8 md:pl-24 group"
                                style={{ opacity: 0 }}
                            >
                                {/* Timeline Node */}
                                <div className="absolute left-[-4px] md:left-[28px] top-6 w-2.5 h-2.5 rounded-full bg-white/20 border-2 border-[#030213] group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all z-10" />

                                {/* Timeline Connector Line to Card */}
                                <div className="absolute left-0 md:left-8 top-7 w-8 md:w-16 h-px bg-white/10 group-hover:bg-white/30 transition-colors" />

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl hover:bg-white/[0.07] transition-all hover:border-white/20 group-hover:-translate-y-1">
                                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                                                {exp.role}
                                            </h3>
                                            <div className="flex items-center gap-3 text-lg font-medium">
                                                <span className={`text-${exp.color}-400`}>{exp.company}</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                <span className="text-zinc-400 flex items-center gap-1.5 capitalize">
                                                    <TerminalSquare className="w-4 h-4" />
                                                    {exp.type} • {exp.workLocation}
                                                    {exp.workLocation === 'Onsite' && exp.address && (
                                                        <> • {exp.address}</>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-white/5 w-fit">
                                            <Calendar className="w-4 h-4 text-zinc-500" />
                                            <span className="text-sm font-mono text-zinc-300 uppercase tracking-wider">{exp.period}</span>
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent mb-6" />

                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {exp?.achievements?.map((achievement: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                                            <li key={i} className="flex items-start gap-3 text-zinc-400 group/item">
                                                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 opacity-50 text-${exp.color}-400 group-hover/item:opacity-100 transition-opacity`} />
                                                <span className="leading-relaxed group-hover/item:text-zinc-200 transition-colors">{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
