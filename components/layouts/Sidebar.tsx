'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Home,
    User,
    Zap,
    Terminal,
    Mail,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Settings,
    LogOut,
    Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Experience', href: '/dashboard/experience', icon: Briefcase },
        { name: 'Skills', href: '/dashboard/skills', icon: Zap },
        { name: 'Projects', href: '/dashboard/projects', icon: Terminal },
        { name: 'Contact', href: '/dashboard/contact', icon: Mail },
    ];

    return (
        <motion.aside
            initial={{ width: 280 }}
            animate={{ width: collapsed ? 88 : 280 }}
            transition={{ duration: 0.4, ease: "anticipate" }}
            className="h-screen sticky top-0 left-0 bg-[#030213]/90 backdrop-blur-xl border-r border-white/10 flex flex-col shrink-0 z-50 selection:bg-fuchsia-500/30 selection:text-fuchsia-200"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-4 top-8 bg-[#030213] border border-white/10 rounded-full p-1.5 text-zinc-400 hover:text-lime-400 hover:border-lime-400/50 transition-all z-10 hidden md:block group"
            >
                <motion.div
                    animate={{ rotate: collapsed ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronLeft className="w-4 h-4" />
                </motion.div>
                {/* Glow behind the toggle button */}
                <div className="absolute inset-0 rounded-full bg-lime-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Logo Section */}
            <div className="h-24 flex items-center px-6 border-b border-white/5 relative overflow-hidden">
                <Link href="/" className="flex items-center gap-2 group relative z-10 w-full">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-lime-400/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-lime-400/50 transition-colors">
                        <span className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-fuchsia-500">
                            E
                        </span>
                    </div>

                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center whitespace-nowrap overflow-hidden"
                            >
                                <span className="text-lime-400 font-black tracking-tighter uppercase text-xl">
                                    EM<span className="text-fuchsia-500">ON</span>
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Link>
                {/* Subtle top background glow */}
                <div className="absolute -top-10 left-10 w-32 h-32 bg-lime-400/10 blur-[50px] pointer-events-none rounded-full" />
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname === '/' && item.href === '/');

                    return (
                        <Link key={item.name} href={item.href}>
                            <div className={`relative flex items-center px-3 py-3 rounded-xl cursor-pointer group transition-all duration-300 ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}`}>

                                {/* Active Indicator styling */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-sidebar-indicator"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-lime-400 rounded-r-md shadow-[0_0_10px_rgba(163,230,53,0.5)]"
                                    />
                                )}

                                {/* Icon */}
                                <div className={`shrink-0 transition-colors duration-300 ${isActive ? 'text-lime-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>

                                {/* Link Text */}
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="ml-4 whitespace-nowrap overflow-hidden"
                                        >
                                            <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                                                {item.name}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Chevron (Desktop Hover) */}
                                {!collapsed && !isActive && (
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                        <ChevronRight className="w-4 h-4 text-zinc-600" />
                                    </div>
                                )}
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Footer Section */}
            <div className="p-4 border-t border-white/5 mt-auto">
                <div className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/2 ${collapsed ? 'justify-center' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-linear-to-r from-lime-500 to-lime-600 shrink-0 flex items-center justify-center shadow-[0_0_15px_-5px_rgba(163,230,53,0.5)]">
                        <User className="w-4 h-4 text-black" />
                    </div>

                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="flex-1 whitespace-nowrap overflow-hidden"
                            >
                                <p className="text-sm font-semibold text-white">Operative</p>
                                <p className="text-xs text-zinc-500">Access Level: 3</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!collapsed && (
                        <button className="text-zinc-500 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-400/10">
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </motion.aside>
    );
}
