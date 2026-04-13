'use client'
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp, MapPin, Terminal, Activity, Globe } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10 relative overflow-hidden font-sans">
            {/* --- Futuristic Background Elements --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Holographic Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[3rem_3rem] opacity-20" />

                {/* Moving Scanline */}
                <motion.div
                    className="absolute inset-0 bg-linear-to-b from-transparent via-lime-400/5 to-transparent h-40 w-full"
                    animate={{ top: ['-10%', '110%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Ambient Glows */}
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-lime-400/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-360 mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Brand & System Status */}
                    <div className="space-y-6">
                        <motion.div
                            className="relative inline-block"
                            whileHover={{ scale: 1.05 }}
                        >
                            <a href="/" className="flex items-center gap-1 group">
                                <span className="text-3xl font-black text-lime-400 uppercase tracking-tighter">E</span>
                                <span className="text-2xl font-black text-fuchsia-500 uppercase tracking-tighter">M</span>
                                <span className="text-3xl font-black text-lime-400 uppercase tracking-tighter">O</span>
                                <span className="text-2xl font-black text-fuchsia-500 uppercase tracking-tighter">N</span>
                            </a>
                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-lime-400 via-fuchsia-500 to-transparent" />
                        </motion.div>

                        <p className="text-zinc-400 max-w-xs leading-relaxed text-sm">
                            Engineering digital excellence at the intersection of performance and aesthetics. Signal verified.
                        </p>

                        {/* System Status Indicator */}
                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl w-fit backdrop-blur-sm">
                            <div className="relative">
                                <div className="w-2 h-2 bg-lime-400 rounded-full" />
                                <div className="absolute inset-0 w-2 h-2 bg-lime-400 rounded-full animate-ping" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Status</span>
                                <span className="text-xs font-mono text-lime-400 uppercase tracking-tighter">Node_Active // 200 OK</span>
                            </div>
                        </div>
                    </div>

                    {/* Data Channels (Navigation) */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2">
                            <Terminal size={14} className="text-lime-400" />
                            Data Channels
                        </h4>
                        <ul className="space-y-3">
                            {['Home', 'About', 'Skills', 'Education', 'Projects', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-zinc-400 hover:text-white transition-all text-sm uppercase tracking-widest font-medium flex items-center gap-2 group"
                                    >
                                        <div className="w-1 h-1 bg-zinc-800 transition-all group-hover:bg-lime-400 group-hover:w-3" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Base of Operations */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2">
                            <Globe size={14} className="text-fuchsia-500" />
                            Nexus Point
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-fuchsia-500 mt-0.5 shrink-0" />
                                <div className="text-sm">
                                    <p className="text-white font-bold mb-1 uppercase tracking-tight">Main Sector</p>
                                    <p className="text-zinc-500 font-mono text-xs">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Activity size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                                <div className="text-sm">
                                    <p className="text-white font-bold mb-1 uppercase tracking-tight">Global Signal</p>
                                    <p className="text-zinc-500 font-mono text-xs">Available for Worldwide Remote Operations</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Uplink (Social) */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2">
                            <Mail size={14} className="text-cyan-400" />
                            Satellite Uplink
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: Github, href: 'https://github.com/YeasinHowladerEmon', label: 'GitHub', color: 'hover:text-white hover:border-white' },
                                { icon: Linkedin, href: 'https://www.linkedin.com/in/yeasinhowladeremon/', label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400' },
                                { icon: Mail, href: 'mailto:emonibnsalim@gmail.com', label: 'Email', color: 'hover:text-lime-400 hover:border-lime-400' },
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`h-11 border border-white/10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 transition-all duration-300 ${social.color}`}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon size={18} />
                                    <span className="sr-only">{social.label}</span>
                                </motion.a>
                            ))}
                        </div>
                        <p className="mt-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest leading-relaxed">
                            Encrypted connection established. Send message to initiate secure handshake.
                        </p>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                        <span suppressHydrationWarning className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">
                            &copy; {new Date().getFullYear()} Yeasin Howlader Emon
                        </span>
                        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-zinc-800" />
                        <span className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">
                            Built with Next.js / TypeScript / CyberCode
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.a
                            href="#home"
                            className="p-3 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-lime-400 hover:border-lime-400/50 transition-all group relative overflow-hidden"
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="absolute inset-0 bg-lime-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ArrowUp size={20} className="relative z-10" />
                            <span className="sr-only">Vertical Jump to Origin</span>
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
