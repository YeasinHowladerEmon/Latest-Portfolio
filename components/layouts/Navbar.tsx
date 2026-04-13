'use client'

import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Education', href: '#education' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                : 'bg-black/10 backdrop-blur-sm border-b border-white/5'
                }`}
        >
            {/* Glass shimmer line at top */}
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-lime-400/60 to-transparent" />

            {/* Subtle inner glow on scroll */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: scrolled ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-lime-400/[0.03] to-transparent" />
                <div className="absolute inset-0 bg-linear-to-b from-fuchsia-500/[0.02] to-transparent" />
            </motion.div>

            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <a href="/" className="text-lime-400 font-black tracking-tighter uppercase relative group flex items-center gap-2">
                            <span className="relative z-10 flex items-center">
                                <span className="text-4xl">E</span>
                                <span className="text-fuchsia-500 text-3xl">M</span>
                                <span className="text-lime-400 text-4xl">O</span>
                                <span className="text-fuchsia-500 text-3xl">N</span>
                            </span>
                            <motion.div
                                className="absolute -inset-2 bg-lime-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div
                        className="hidden lg:flex items-center space-x-1"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Glass pill container */}
                        <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="relative px-4 py-1.5 text-sm text-white/70 hover:text-white uppercase tracking-wider font-semibold rounded-full transition-colors duration-200 group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {/* Hover glass highlight */}
                                    <motion.span
                                        className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    />
                                    <span className="relative z-10 group-hover:text-lime-400 transition-colors">{item.name}</span>
                                    {/* Active/hover underline dot */}
                                    <motion.span
                                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lime-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Download CV Button */}
                    <motion.div
                        className="hidden lg:block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <motion.a
                            href="/resume/Yeasin_Emon_FullStack_Developer_Resume.pdf"
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex items-center gap-2 px-5 py-2.5 text-black font-black uppercase tracking-widest text-sm rounded-xl overflow-hidden group"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(163,230,53,0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Glass button background */}
                            <span className="absolute inset-0 bg-lime-400 transition-colors duration-300 group-hover:bg-lime-300" />
                            <span className="absolute inset-0 bg-linear-to-tr from-lime-300/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Download size={16} className="relative z-10" />
                            <span className="relative z-10">Download CV</span>
                        </motion.a>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-lime-400 hover:bg-white/10 hover:text-fuchsia-400 transition-colors backdrop-blur-sm"
                        onClick={() => setIsOpen(!isOpen)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={isOpen ? 'close' : 'open'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                {isOpen ? <X size={22} /> : <Menu size={22} />}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Navigation — glass dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="lg:hidden overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className="py-4 space-y-1 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl mb-4 px-3 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
                                {/* Glass shimmer inside mobile menu */}
                                <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-lime-400/30 to-transparent" />

                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center gap-3 py-3 px-4 text-white/70 text-base hover:text-lime-400 uppercase tracking-wide font-semibold rounded-xl hover:bg-white/5 transition-all duration-200"
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.06 }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-lime-400/50" />
                                        {item.name}
                                    </motion.a>
                                ))}

                                <motion.a
                                    href="/resume/Yeasin_Emon_FullStack_Developer_Resume.pdf"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3.5 mt-2 bg-lime-400 text-black font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:bg-lime-300 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.35 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Download size={18} />
                                    Download CV
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}