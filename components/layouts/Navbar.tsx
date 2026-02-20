'use client'

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-lime-400">
            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <a href="#home" className="text-lime-400 font-black tracking-tighter uppercase relative group flex items-center gap-2">
                            <span className="relative z-10 flex items-center">
                                <span className="text-4xl">E</span>
                                <span className="text-fuchsia-500 text-3xl">M</span>
                                <span className="text-lime-400 text-4xl">O</span>
                                <span className="text-fuchsia-500 text-3xl">N</span>
                            </span>
                            <motion.div
                                className="absolute -inset-2 bg-lime-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            />
                        </a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div
                        className="hidden lg:flex space-x-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="text-white hover:text-lime-400 text-lg transition-colors duration-200 uppercase tracking-wide relative group"
                                whileHover={{ scale: 1.05 }}
                            >
                                {item.name}
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-lime-400 to-fuchsia-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                                />
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="lg:hidden text-lime-400 hover:text-fuchsia-500"
                        onClick={() => setIsOpen(!isOpen)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </motion.button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.div
                        className="lg:hidden pb-4 space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="block py-2 text-white text-xl hover:text-lime-400 transition-colors duration-200 uppercase tracking-wide"
                                onClick={() => setIsOpen(false)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </div>
        </nav>
    );
}