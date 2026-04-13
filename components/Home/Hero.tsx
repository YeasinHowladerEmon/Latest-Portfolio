'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { CSSThreeBackground } from './CSSThreeBackground';
import { Typewriter } from '../ui/Typewriter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current,
        { opacity: 0, x: -40, skewX: -5 },
        { opacity: 1, x: 0, skewX: 0, duration: 0.8 }
      )
        .fromTo(headingRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.4'
        )
        .fromTo(paraRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(btnsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(socialsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(rightRef.current,
          { opacity: 0, x: 60, scale: 0.92 },
          { opacity: 1, x: 0, scale: 1, duration: 1.1 },
          '-=1.0'
        );

      // Parallax blobs
      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          yPercent: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          yPercent: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Image Blob Morphing
      gsap.to('.hero-blob', {
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        repeat: -1,
        yoyo: true,
        duration: 5,
        ease: 'sine.inOut'
      });

      // Floating "shaking" animation
      gsap.to('.hero-blob-container', {
        y: -20,
        x: 10,
        rotation: 2,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: 'sine.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-dvh flex items-center justify-center relative overflow-hidden bg-black py-32 md:py-40 lg:py-48"
    >
      <CSSThreeBackground />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30" />


      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={blob1Ref}
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl"
        />
        <div
          ref={blob2Ref}
          className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div ref={badgeRef} className="relative inline-block mb-6 min-h-[40px]" style={{ opacity: 0 }}>
              <span className="text-lime-400 uppercase tracking-widest border-2 border-lime-400 px-4 py-2 text-md md:text-xl inline-block transform -rotate-2">
                <Typewriter
                  strings={[
                    'Full Stack Developer',
                    'Frontend Specialist',
                    'MERN Stack Expert',
                    'UI/UX Enthusiast',
                    'Software Engineer',
                  ]}
                  className="text-lime-400 font-bold"
                />
              </span>
            </div>

            <h1
              ref={headingRef}
              className="text-white mb-6 text-2xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight min-h-[140px] md:min-h-[160px]"
              style={{ opacity: 0 }}
            >
              <span className="block mb-4">I'M EMON,</span>
              <Typewriter
                strings={[
                  "I BUILD SCALABLE, RELIABLE WEB APPLICATIONS",
                  "CRAFTING MODERN, HIGH-PERFORMANCE DIGITAL EXPERIENCES",
                  "ENGINEERING ROBUST & SCALABLE FULL-STACK SOLUTIONS",
                  "BUILDING FAST, SECURE & USER-CENTRIC WEB APPS",
                  "TURNING IDEAS INTO SCALABLE SOFTWARE PRODUCTS"
                ]}
                className="block text-transparent bg-clip-text bg-linear-to-r from-lime-400 via-fuchsia-500 to-blue-500 font-bold"
                delay={40}
                deleteSpeed={25}
              />
            </h1>

            <p
              ref={paraRef}
              className="text-gray-400 mb-8 max-w-lg text-base md:text-xl"
              style={{ opacity: 0 }}
            >
              Engineering scalable full-stack systems with clean architecture, intuitive design, and powerful user experiences — turning complex ideas into high-impact digital products.
            </p>

            <div ref={btnsRef} className="flex flex-wrap gap-4 mb-8" style={{ opacity: 0 }}>
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
            </div>

            <div ref={socialsRef} className="flex gap-4" style={{ opacity: 0 }}>
              {[
                { icon: Github, href: 'https://github.com/YeasinHowladerEmon', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/yeasinhowladeremon/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:emonibnsalim@gmail.com', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-gray-700 text-gray-400 hover:border-lime-400 hover:text-lime-400 flex items-center justify-center transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div ref={rightRef} className="relative hidden md:flex items-center justify-center" style={{ opacity: 0 }}>
            <div className="hero-blob-container relative w-[350px] h-[350px] lg:w-[480px] lg:h-[480px]">
              {/* Glow layers */}
              <div className="absolute inset-0 bg-lime-400/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-0 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-700" />

              {/* Main Blob */}
              <div className="hero-blob relative w-full h-full overflow-hidden border border-white/20 bg-lime-400 shadow-[0_0_50px_rgba(163,230,53,0.3)] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src="/emon.jpeg"
                  alt="Emon"
                  className="w-full h-full object-cover object-[50%_20%] scale-110 grayscale hover:grayscale-0 transition-all duration-700 mask-[radial-gradient(circle_at_center,black_50%,transparent_100%)]"
                />
                {/* Focal vignette layered with lime to blend the image into the lime blob bg */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#a3e635_100%)] opacity-70 pointer-events-none" />





              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 border-2 border-lime-400/30 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-24 h-24 border-2 border-fuchsia-400/20 rounded-full"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}