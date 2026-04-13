'use client';

import { motion } from 'motion/react';
import { useRef, useEffect } from 'react';
import { Trophy, BookOpen, Plane, Cpu, MapPin, Calendar, Rocket, Sparkles, Gamepad2, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InterestCard = ({ icon: Icon, title, description, colorClass }: any) => {
  const colorMap: Record<string, any> = {
    lime: {
      border: 'hover:border-lime-400/30',
      bgBlur: 'bg-lime-400/5',
      bgHover: 'group-hover:bg-lime-400/10',
      iconBorder: 'group-hover:border-lime-400',
      iconText: 'group-hover:text-lime-400'
    },
    fuchsia: {
      border: 'hover:border-fuchsia-400/30',
      bgBlur: 'bg-fuchsia-400/5',
      bgHover: 'group-hover:bg-fuchsia-400/10',
      iconBorder: 'group-hover:border-fuchsia-400',
      iconText: 'group-hover:text-fuchsia-400'
    },
    blue: {
      border: 'hover:border-blue-400/30',
      bgBlur: 'bg-blue-400/5',
      bgHover: 'group-hover:bg-blue-400/10',
      iconBorder: 'group-hover:border-blue-400',
      iconText: 'group-hover:text-blue-400'
    },
    orange: {
      border: 'hover:border-orange-400/30',
      bgBlur: 'bg-orange-400/5',
      bgHover: 'group-hover:bg-orange-400/10',
      iconBorder: 'group-hover:border-orange-400',
      iconText: 'group-hover:text-orange-400'
    }
  };

  const colors = colorMap[colorClass] || colorMap.lime;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`group relative p-6 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 ${colors.border} shadow-2xl`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 ${colors.bgBlur} blur-3xl rounded-full -mr-12 -mt-12 ${colors.bgHover} transition-colors`} />

      <div className="flex flex-col gap-4 relative z-10">
        <div className={`w-12 h-12 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center ${colors.iconBorder} group-hover:scale-110 transition-all duration-300`}>
          <Icon className={`text-zinc-400 ${colors.iconText} transition-colors`} size={24} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-white/90">{title}</h4>
          <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Heading
      gsap.fromTo('.about-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        }
      );

      // Left Image
      gsap.fromTo('.about-image-card',
        { opacity: 0, scale: 0.9, x: -50 },
        {
          opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      );

      // Intro Paragraphs
      gsap.fromTo('.about-intro-text',
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-intro-text', start: 'top 85%', once: true }
        }
      );

      // Interest Cards
      gsap.fromTo('.interest-card-item',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: '.interests-grid', start: 'top 85%', once: true }
        }
      );

      // Stats/Pillars
      gsap.fromTo('.about-pillar',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-pillars', start: 'top 90%', once: true }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const interests = [
    {
      icon: Trophy,
      title: 'Footballer',
      description: 'Competitive spirit forged on the pitch. I thrive in team environments and high-pressure situations.',
      colorClass: 'lime'
    },
    {
      icon: BookOpen,
      title: 'Islamic Researcher',
      description: 'Dedicated to studying Quran and Hadith, finding balance and deep wisdom for daily life and ethics.',
      colorClass: 'fuchsia'
    },
    {
      icon: Plane,
      title: 'Global Traveler',
      description: 'Exploring diverse cultures and landscapes—broadening perspectives and finding inspiration across the world.',
      colorClass: 'blue'
    },
    {
      icon: Gamepad2,
      title: 'Strategic Gamer',
      description: 'Analyzing systems and mechanics in virtual worlds. Gaming helps me sharpen my problem-solving reflexes.',
      colorClass: 'orange'
    }
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden" ref={sectionRef}>
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-400/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/5 blur-[120px] rounded-full -ml-64 -mb-64" />

      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="about-title mb-20 text-center md:text-left" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-lime-400/30 rounded-full bg-lime-400/5 mb-6">
            <Cpu className="text-lime-400" size={16} />
            <span className="text-lime-400 text-sm uppercase tracking-widest font-medium">Identity Module</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            DECODING THE <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-fuchsia-500">ENGINEER</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Profile Context */}
          <div className="lg:col-span-5 space-y-12">
            <div className="about-image-card relative group" style={{ opacity: 0 }}>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl aspect-4/5 sm:aspect-square">
                <img
                  src="/emon_cartoon.png"
                  alt="Yeasin Emon"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />

                {/* Floating Meta Data */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-lime-400 uppercase tracking-widest">EST. 2021</p>
                    <p className="text-xl font-bold text-white uppercase">Yeasin Emon</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-2 border border-white/10 rounded-lg">
                    <MapPin className="text-fuchsia-500" size={18} />
                  </div>
                </div>
              </div>

              {/* Decorative corners */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-lime-400/50" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-fuchsia-400/50" />
            </div>

            <div className="about-pillars grid grid-cols-2 gap-6">
              {[
                { label: 'Professional Exp.', val: '2.3 Years', icon: Calendar },
                { label: 'Programming Journey', val: '5+ Years', icon: Sparkles },
                { label: 'Project Deployments', val: '50+', icon: Rocket },
                { label: 'Technical Accuracy', val: '99%', icon: Sparkles },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="about-pillar group p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-lime-400/30 transition-all duration-300 pointer-events-auto"
                  style={{ opacity: 0 }}
                >
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">{p.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white">{p.val}</span>
                    <p.icon className="text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative & Interests */}
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-8">
              <h3 className="about-intro-text text-2xl md:text-3xl font-bold text-white leading-tight" style={{ opacity: 0 }}>
                Full Stack Developer focused on building <span className="text-lime-400">scalable web applications</span> and evolving into a software engineer with strong system design and architecture skills.
              </h3>
              <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
                <p className="about-intro-text" style={{ opacity: 0 }}>
                  Started my journey in 2021 at Programming Hero, now working with modern technologies while exploring distributed systems and AI-driven solutions. I enjoy the complexity of building end-to-end systems that don't just work, but excel under load.
                </p>
                <p className="about-intro-text" style={{ opacity: 0 }}>
                  My development philosophy is centered around <span className="text-white font-semibold italic">Efficiency, Scalability, and Clean Architecture.</span> I believe great software is a blend of precision engineering and intuitive human-centric design.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h4 className="text-xl font-black text-white uppercase tracking-widest">Lifestyle & Pillars</h4>
                <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
              </div>

              <div className="interests-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                {interests.map((item, i) => (
                  <div key={i} className="interest-card-item" style={{ opacity: 0 }}>
                    <InterestCard {...item} />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-linear-to-br from-lime-400/10 via-zinc-900 to-fuchsia-500/10 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={80} className="text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 relative z-10">Current Objective</h4>
              <p className="text-zinc-400 relative z-10">
                Researching <span className="text-lime-400">Distributed Microservices</span> and refining <span className="text-fuchsia-500">Autonomous AI Agents</span> to push the boundaries of what modern web stacks can achieve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
