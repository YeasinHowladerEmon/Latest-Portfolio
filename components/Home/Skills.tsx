'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Sparkles, Cpu, Code2, Database, PenTool, Layout } from 'lucide-react';
import { FloatingMatrix } from '../ui/Scene3D';
const masteryToValue: Record<string, number> = {
    'Beginner': 25,
    'Intermediate': 50,
    'Advanced': 75,
    'Expert': 100
};

const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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

    const getIcon = (name: string) => {
        if (name.includes('React') || name.includes('Next') || name.includes('Vue')) return <Code2 size={24} />;
        if (name.includes('Node') || name.includes('Python') || name.includes('Java')) return <Cpu size={24} />;
        if (name.includes('SQL') || name.includes('Mongo') || name.includes('Data')) return <Database size={24} />;
        if (name.includes('Figma') || name.includes('Adobe')) return <PenTool size={24} />;
        return <Layout size={24} />;
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative group h-full"
        >
            <div
                className={`relative h-full bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl overflow-hidden transition-colors duration-300 ${skill.color === 'lime' ? 'group-hover:border-lime-400/50' :
                    skill.color === 'fuchsia' ? 'group-hover:border-fuchsia-500/50' :
                        'group-hover:border-cyan-400/50'
                    }`}
                style={{ transform: "translateZ(20px)" }}
            >
                {/* Background Grid Pattern inside card */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[14px_14px]" />

                {/* Glowing Corner Accents */}
                <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-colors duration-300 ${isHovered ? (skill.color === 'lime' ? 'border-lime-400' : skill.color === 'fuchsia' ? 'border-fuchsia-500' : 'border-cyan-400') : 'border-white/20'
                    }`} />
                <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-colors duration-300 ${isHovered ? (skill.color === 'lime' ? 'border-lime-400' : skill.color === 'fuchsia' ? 'border-fuchsia-500' : 'border-cyan-400') : 'border-white/20'
                    }`} />

                <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-lg ${skill.color === 'lime' ? 'bg-lime-400/10 text-lime-400' :
                            skill.color === 'fuchsia' ? 'bg-fuchsia-500/10 text-fuchsia-500' :
                                'bg-cyan-400/10 text-cyan-400'
                            }`}>
                            {getIcon(skill.name)}
                        </div>
                        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                            {skill.mastery}
                        </div>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 tracking-wide group-hover:text-white transition-colors">
                        {skill.name}
                    </h4>

                    <div className="mt-auto">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Proficiency</span>
                            <span className="text-xs font-bold font-mono text-zinc-300 group-hover:text-white transition-colors">{masteryToValue[skill.mastery]}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full ${skill.color === 'lime' ? 'bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]' :
                                    skill.color === 'fuchsia' ? 'bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]' :
                                        'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                                    }`}
                                initial={{ width: 0 }}
                                animate={{ width: isHovered ? `${masteryToValue[skill.mastery]}%` : `${masteryToValue[skill.mastery] - 15}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Scanline Effect */}
                <motion.div
                    className={`absolute inset-0 bg-linear-to-b from-transparent ${skill.color === 'lime' ? 'via-lime-400/10' :
                        skill.color === 'fuchsia' ? 'via-fuchsia-500/10' :
                            'via-cyan-400/10'
                        } to-transparent opacity-0 group-hover:opacity-100 pointer-events-none`}
                    animate={{
                        y: ['-100%', '100%'],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>
        </motion.div>
    );
};

export function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSkills = async () => {
        try {
            const res = await fetch('/api/skills');
            const data = await res.json();
            if (res.ok) {
                setSkills(data);
            }
        } catch (error) {
            console.error('Error fetching skills:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    // Group skills by category
    const skillGroups = skills.reduce((acc: any[], skill: any) => {
        const category = skill.category || 'Other';
        const group = acc.find(g => g.title === category);
        if (group) {
            group.skills.push(skill);
        } else {
            acc.push({ title: category, skills: [skill] });
        }
        return acc;
    }, []);

    return (
        <section id="skills" className="py-24 bg-zinc-950 relative overflow-hidden" ref={ref}>
            {/* 3D Grid Background */}
            <FloatingMatrix />

            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-lime-400/30 rounded-full bg-lime-400/5 mb-6">
                        <Sparkles className="text-lime-400" size={16} />
                        <span className="text-lime-400 text-sm uppercase tracking-widest font-medium">Technical Arsenal</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        FORGED IN <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-fuchsia-500">CODE</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A comprehensive suite of technologies I use to build scalable, high-performance applications.
                    </p>
                </motion.div>

                <div className="space-y-20">
                    {skillGroups.map((group, groupIndex) => (
                        <div key={group.title} className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, delay: groupIndex * 0.2 }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{group.title}</h3>
                                <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 perspective-[1000px]">
                                {group.skills.map((skill: any, skillIndex: number) => (
                                    <SkillCard key={skill.name} skill={skill} index={skillIndex + (groupIndex * 5)} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
