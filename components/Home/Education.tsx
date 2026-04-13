'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, Award, Calendar, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';

const EducationItem = ({ degree, institution, year, result, details, icon: Icon, delay, accent }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="relative group"
        >
            <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl group-hover:border-white/20 transition-all duration-300 backdrop-blur-sm" />
            <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl bg-${accent}-400 opacity-50 group-hover:opacity-100 transition-opacity`} />
            
            <div className="relative p-6 flex flex-col md:flex-row gap-6 items-start">
                <div className={`w-14 h-14 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-${accent}-400 shrink-0 shadow-[0_0_20px_-5px_rgba(163,230,53,0.3)] group-hover:scale-110 transition-transform`}>
                    <Icon size={28} />
                </div>
                
                <div className="space-y-2 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="text-xl font-bold text-white tracking-tight">{degree}</h3>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                            <Calendar size={12} className={`text-${accent}-400`} />
                            {year}
                        </div>
                    </div>
                    
                    <p className={`text-${accent}-400 font-medium tracking-wide uppercase text-xs`}>{institution}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">{details}</p>
                    
                    {result && (
                        <div className="flex items-center gap-2 mt-4 text-xs font-mono">
                            <span className="text-zinc-500 uppercase">Status:</span>
                            <span className="text-lime-400 flex items-center gap-1">
                                <CheckCircle2 size={12} />
                                {result}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export function Education() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const educationData = [
        {
            degree: "Higher Secondary Certificate (HSC)",
            institution: "Dhaka, Bangladesh",
            year: "2022",
            result: "Successfully Completed",
            details: "Specialized in Science department with a strong foundation in Mathematics and Physics, maintaining consistent academic excellence throughout the curriculum.",
            icon: GraduationCap,
            accent: "fuchsia",
            delay: 0.1
        },
        {
            degree: "Full Stack Web Development (Black Belt)",
            institution: "Programming Hero",
            year: "2021 - 2022",
            result: "Black Belt Achiever",
            details: "Completed intensive training in modern web technologies including React, Node.js, Express, and MongoDB. Earned the prestigious 'Black Belt' for exceptional performance and project delivery.",
            icon: Award,
            accent: "lime",
            delay: 0.2
        },
        {
            degree: "Secondary School Certificate (SSC)",
            institution: "Dhaka, Bangladesh",
            year: "2020",
            result: "Successfully Completed",
            details: "Focused on core science subjects and technology, building the primary technical and analytical skills required for advanced engineering studies.",
            icon: BookOpen,
            accent: "cyan",
            delay: 0.3
        }
    ];

    return (
        <section id="education" className="py-24 bg-[#030213] relative overflow-hidden" ref={ref}>
            {/* Background Decorators */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-360 mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-lime-400/30 rounded-full bg-lime-400/5 mb-6">
                        <Terminal className="text-lime-400" size={16} />
                        <span className="text-lime-400 text-sm uppercase tracking-widest font-medium">Academic Records</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        EDUCATIONAL <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-fuchsia-500">QUALIFICATIONS</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl text-lg">
                        A detailed timeline of my formal education and specialized technical certifications.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {educationData.map((item, index) => (
                        <EducationItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
