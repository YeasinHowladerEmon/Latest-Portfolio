'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Code, Database, Server, Cpu, Globe, Lock } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { CyberSphere } from '../ui/Scene3D';


const FeatureCard = ({ icon: Icon, title, description, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group flex gap-6 p-4 rounded-xl border border-transparent hover:border-lime-400/30 hover:bg-lime-400/5 transition-all duration-300"
    >
      <div className="flex-shrink-0 relative">
        <div className="absolute inset-0 bg-lime-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-14 h-14 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-lime-400 group-hover:scale-110 transition-all duration-300">
          <Icon className="text-gray-400 group-hover:text-lime-400 transition-colors" size={24} />
        </div>
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-2 font-mono group-hover:text-lime-400 transition-colors">{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
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
  };
  const highlights = [
    {
      icon: Code,
      title: 'Frontend Architecture',
      description: 'Crafting responsive, high-performance UIs with React, Next.js, and modern CSS.',
    },
    {
      icon: Server,
      title: 'Backend Systems',
      description: 'Building scalable microservices and RESTful APIs with Node.js and Python.',
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Designing efficient database schemas with PostgreSQL, MongoDB, and Redis.',
    },
    {
      icon: Lock,
      title: 'Security First',
      description: 'Implementing robust authentication and authorization protocols.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden" ref={ref}>
      {/* 3D Background */}
      <CyberSphere />

      {/* Circuit Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_49px,#a3e635_49px,#a3e635_50px)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_49px,#a3e635_49px,#a3e635_50px)]" />
      </div>

      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-lime-400/30 rounded-full bg-lime-400/5 mb-6">
            <Cpu className="text-lime-400" size={16} />
            <span className="text-lime-400 text-sm uppercase tracking-widest font-medium">System Profile</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            ENGINEERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-fuchsia-500">EXCELLENCE</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: 3D Image Card */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative perspective-[1000px] group"
          >
            <div
              className="relative rounded-2xl p-2 bg-linear-to-br from-lime-400/20 via-black to-fuchsia-500/20 border border-white/10 backdrop-blur-sm transform-gpu transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(163,230,53,0.15)]"
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="relative rounded-xl overflow-hidden aspect-4/5 lg:aspect-square bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-fuchsia-500/10 via-zinc-900 to-black">
                <ImageWithFallback
                  src="/emon-profile.png"
                  alt="Developer Profile"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />

                {/* HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none border-[10px] border-black/0 group-hover:border-black/0 transition-all duration-500">
                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    <div className="bg-black/80 backdrop-blur text-lime-400 text-xs font-mono px-2 py-1 border border-lime-400/30">
                      STATUS: ONLINE
                    </div>
                    <div className="bg-black/80 backdrop-blur text-fuchsia-500 text-xs font-mono px-2 py-1 border border-fuchsia-500/30">
                      LOC: EARTH-616
                    </div>
                  </div>

                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-lime-400 opacity-50" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-fuchsia-500 opacity-50" />
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-lime-400/10 to-fuchsia-500/10 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>

          {/* Right Column: Content */}
          <div className="space-y-10">
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-lime-400 font-mono text-xl mr-2">&gt;</span>
                I'm a Fullstack Developer with a passion for building robust, scalable solutions.
                My approach combines clean code architecture with immersive user experiences.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-fuchsia-500 font-mono text-xl mr-2">&gt;</span>
                Specializing in the React ecosystem and cloud-native technologies, I help startups
                and enterprises turn complex requirements into elegant, production-ready applications.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <FeatureCard key={item.title} {...item} delay={0.2 + index * 0.1} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-8 pt-8 border-t border-white/10"
            >
              <div>
                <div className="text-3xl font-black text-white mb-1">5+</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Years Exp.</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">50+</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">100%</div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Commitment</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
