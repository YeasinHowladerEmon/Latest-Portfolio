'use client'
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-black border-t-2 border-lime-400 py-12 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,_transparent,_transparent_50px,_#a3e635_50px,_#a3e635_51px)]" />
            </div>

            <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <motion.div
                            className="text-lime-400 mb-4 uppercase tracking-widest flex items-center gap-1"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-2xl">E</span>
                            <span className="text-fuchsia-500 text-xl">M</span>
                            <span className="text-lime-400 text-2xl">O</span>
                            <span className="text-fuchsia-500 text-xl">N</span>
                        </motion.div>
                        <p className="text-gray-400">
                            Creating exceptional digital experiences that leave a lasting impact.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h4>
                        <div className="space-y-2">
                            {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className="block text-gray-400 hover:text-lime-400 transition-colors uppercase text-sm tracking-wide"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white uppercase tracking-wider mb-4">
                            Connect
                        </h4>
                        <div className="flex gap-3">
                            {[
                                { icon: Github, href: '#', label: 'GitHub' },
                                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                                { icon: Mail, href: '#contact', label: 'Email' },
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 border-2 border-white/20 hover:border-lime-400 text-gray-400 hover:text-lime-400 flex items-center justify-center transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon size={18} />
                                    <span className="sr-only">{social.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Emon. All rights reserved.
                    </div>

                    <motion.a
                        href="#home"
                        className="w-12 h-12 border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black flex items-center justify-center transition-colors"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowUp size={20} />
                        <span className="sr-only">Back to top</span>
                    </motion.a>
                </div>
            </div>
        </footer>
    );
}