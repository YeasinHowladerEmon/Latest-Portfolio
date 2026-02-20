'use client'
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Sparkles, Star } from 'lucide-react';
// import { SkillVortex3D } from '@/components/3D/SkillVortex3D';

export function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const skillGroups = [
        {
            title: 'Frontend Mastery',
            skills: [
                { name: 'React', mastery: 'expert', color: 'lime' },
                { name: 'Next.js', mastery: 'expert', color: 'lime' },
                { name: 'TypeScript', mastery: 'advanced', color: 'fuchsia' },
                { name: 'Tailwind CSS', mastery: 'expert', color: 'lime' },
                { name: 'Motion/Framer', mastery: 'advanced', color: 'fuchsia' },
            ],
        },
        {
            title: 'Backend & Database',
            skills: [
                { name: 'Node.js', mastery: 'advanced', color: 'fuchsia' },
                { name: 'Python', mastery: 'intermediate', color: 'cyan' },
                { name: 'PostgreSQL', mastery: 'advanced', color: 'fuchsia' },
                { name: 'MongoDB', mastery: 'intermediate', color: 'cyan' },
            ],
        },
        {
            title: 'Creative & Tools',
            skills: [
                { name: 'Three.js', mastery: 'intermediate', color: 'cyan' },
                { name: 'Figma', mastery: 'advanced', color: 'fuchsia' },
                { name: 'Git', mastery: 'expert', color: 'lime' },
                { name: 'Docker', mastery: 'intermediate', color: 'cyan' },
                { name: 'AWS', mastery: 'intermediate', color: 'cyan' },
            ],
        },
    ];

    const getMasteryStars = (mastery: string) => {
        switch (mastery) {
            case 'expert':
                return 5;
            case 'advanced':
                return 4;
            case 'intermediate':
                return 3;
            default:
                return 2;
        }
    };

    const getMasteryLabel = (mastery: string) => {
        switch (mastery) {
            case 'expert':
                return 'Expert';
            case 'advanced':
                return 'Advanced';
            case 'intermediate':
                return 'Intermediate';
            default:
                return 'Learning';
        }
    };

    return (
        <section id="skills" className="py-20 bg-zinc-950 relative overflow-hidden" ref={ref}>
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-10">
                <motion.div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#a3e635_1px,transparent_1px),linear-gradient(to_bottom,#a3e635_1px,transparent_1px)] bg-[size:3rem_3rem]"
                    animate={{
                        backgroundPosition: ['0px 0px', '48px 48px'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <Sparkles className="text-lime-400" size={32} />
                        <h2 className="text-fuchsia-500 uppercase tracking-widest">My Arsenal</h2>
                    </div>
                    <h3 className="text-white max-w-3xl">
                        Technologies I wield to build exceptional digital products
                    </h3>
                </motion.div>

                {/* 3D Skills Visualization removed */}
                {/* <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-16"
                >
                    <SkillVortex3D />
                </motion.div> */}

                <div className="space-y-12">
                    {skillGroups.map((group, groupIndex) => (
                        <motion.div
                            key={group.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
                        >
                            {/* Group Title */}
                            <div className="mb-6">
                                <h4 className="text-white mb-2">{group.title}</h4>
                                <div className="w-24 h-0.5 bg-gradient-to-r from-lime-400 to-fuchsia-500" />
                            </div>

                            {/* Skills Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: groupIndex * 0.2 + skillIndex * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="group relative bg-black border-2 border-white/10 p-6 hover:border-lime-400 transition-all duration-300"
                                    >
                                        {/* Corner decorations */}
                                        <div className={`absolute top-0 right-0 w-3 h-3 ${skill.color === 'lime' ? 'bg-lime-400' : skill.color === 'fuchsia' ? 'bg-fuchsia-500' : 'bg-cyan-400'
                                            }`} />
                                        <div className={`absolute bottom-0 left-0 w-3 h-3 ${skill.color === 'lime' ? 'bg-lime-400' : skill.color === 'fuchsia' ? 'bg-fuchsia-500' : 'bg-cyan-400'
                                            }`} />

                                        <div className="relative z-10">
                                            {/* Skill Name */}
                                            <h5 className="text-white mb-3 uppercase tracking-wide">
                                                {skill.name}
                                            </h5>

                                            {/* Mastery Level with Stars */}
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-xs uppercase tracking-widest ${skill.color === 'lime' ? 'text-lime-400' : skill.color === 'fuchsia' ? 'text-fuchsia-500' : 'text-cyan-400'
                                                    }`}>
                                                    {getMasteryLabel(skill.mastery)}
                                                </span>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={`${i < getMasteryStars(skill.mastery)
                                                                ? skill.color === 'lime'
                                                                    ? 'text-lime-400 fill-lime-400'
                                                                    : skill.color === 'fuchsia'
                                                                        ? 'text-fuchsia-500 fill-fuchsia-500'
                                                                        : 'text-cyan-400 fill-cyan-400'
                                                                : 'text-white/10'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Mastery indicator line */}
                                            <div className="h-1 bg-white/5 relative overflow-hidden">
                                                <motion.div
                                                    className={`absolute inset-y-0 left-0 ${skill.color === 'lime'
                                                        ? 'bg-gradient-to-r from-lime-400 to-lime-500'
                                                        : skill.color === 'fuchsia'
                                                            ? 'bg-gradient-to-r from-fuchsia-500 to-fuchsia-600'
                                                            : 'bg-gradient-to-r from-cyan-400 to-cyan-500'
                                                        }`}
                                                    initial={{ width: 0 }}
                                                    animate={
                                                        isInView
                                                            ? {
                                                                width: `${(getMasteryStars(skill.mastery) / 5) * 100}%`,
                                                            }
                                                            : { width: 0 }
                                                    }
                                                    transition={{
                                                        duration: 1,
                                                        delay: groupIndex * 0.2 + skillIndex * 0.05 + 0.3,
                                                        ease: "easeOut",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom accent */}
                <motion.div
                    className="mt-16 flex justify-center gap-8 flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className="text-center">
                        <div className="text-3xl text-lime-400 mb-2">15+</div>
                        <div className="text-gray-400 uppercase text-xs tracking-wider">Technologies</div>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                        <div className="text-3xl text-fuchsia-500 mb-2">5+</div>
                        <div className="text-gray-400 uppercase text-xs tracking-wider">Years Experience</div>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                        <div className="text-3xl text-cyan-400 mb-2">∞</div>
                        <div className="text-gray-400 uppercase text-xs tracking-wider">Learning</div>
                    </div>
                </motion.div>
            </div >
        </section >
    );
}
