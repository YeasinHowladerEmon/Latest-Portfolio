'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
    Briefcase,
    Code2,
    Database,
    MessageSquare,
    ArrowRight,
    Loader2,
    Calendar,
    Mail,
    User
} from 'lucide-react';
import Link from 'next/link';

const StatCard = ({ title, value, icon: Icon, colorClass, index, href }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative bg-black/40 border border-white/10 rounded-2xl p-6 overflow-hidden backdrop-blur-xl group hover:border-white/20 transition-all"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${colorClass.bg}`} />

        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${colorClass.bgLight} ${colorClass.text}`}>
                <Icon className="w-6 h-6" />
            </div>
            <Link href={href} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowRight className="w-4 h-4 text-zinc-500" />
            </Link>
        </div>

        <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-1">{title}</h3>
        <p className="text-4xl font-black text-white tracking-tight">{value}</p>
    </motion.div>
);

export default function DashboardOverview() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/stats');
                const data = await res.json();
                if (res.ok) {
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030213] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-lime-400 animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#030213] text-white p-6 md:p-10 lg:p-14">
            {/* Header Content */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-fuchsia-500">
                    System Overview
                </h1>
                <p className="text-zinc-400 mt-2 text-lg">Real-time content metrics and recent activity.</p>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    title="Total Projects"
                    value={stats?.projects || 0}
                    icon={Briefcase}
                    colorClass={{ bg: 'bg-lime-400', bgLight: 'bg-lime-400/10', text: 'text-lime-400' }}
                    index={0}
                    href="/dashboard/projects"
                />
                <StatCard
                    title="Skill Matrix"
                    value={stats?.skills || 0}
                    icon={Code2}
                    colorClass={{ bg: 'bg-cyan-400', bgLight: 'bg-cyan-400/10', text: 'text-cyan-400' }}
                    index={1}
                    href="/dashboard/skills"
                />
                <StatCard
                    title="Key Exp."
                    value={stats?.experience || 0}
                    icon={Database}
                    colorClass={{ bg: 'bg-fuchsia-500', bgLight: 'bg-fuchsia-500/10', text: 'text-fuchsia-500' }}
                    index={2}
                    href="/dashboard/experience"
                />
                <StatCard
                    title="User Feedback"
                    value={stats?.contacts || 0}
                    icon={MessageSquare}
                    colorClass={{ bg: 'bg-lime-400', bgLight: 'bg-lime-400/10', text: 'text-lime-400' }}
                    index={3}
                    href="/dashboard/contact"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Recent Inbound Signal</h2>
                            <p className="text-base text-zinc-400 font-medium">Latest contact messages</p>
                        </div>
                        <Link href="/dashboard/contact" className="text-lime-400 text-sm font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {stats?.recentContacts?.length > 0 ? (
                            stats.recentContacts.map((contact: any, i: number) => (
                                <motion.div
                                    key={contact._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-4 hover:border-white/10 transition-colors"
                                >
                                    <div className="p-2 rounded-lg bg-white/5">
                                        <Mail className="w-5 h-5 text-zinc-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-white font-bold truncate">{contact.name}</h4>
                                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 text-sm truncate uppercase tracking-tighter">
                                            {contact.subject || '// NO_SUBJECT'}
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-zinc-500 font-mono tracking-widest uppercase border border-dashed border-white/10 py-8 rounded-xl">
                                    // NO_DATA_DETECTED
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* System Status / Quick Links */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-6"
                >
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                        <h2 className="text-2xl font-bold text-white tracking-tight mb-4">Core Manifest</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/dashboard/projects" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-lime-400/30 group transition-all">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">Projects</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-black text-xl">Manage</span>
                                    <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-lime-400 transition-colors" />
                                </div>
                            </Link>
                            <Link href="/dashboard/skills" className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 group transition-all">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">Capabilities</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-black text-xl">Update</span>
                                    <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-cyan-400 transition-colors" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-linear-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">System Integrity</h3>
                                <p className="text-zinc-400 text-sm">All nodes active and operational</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                                    <span className="text-[10px] font-black text-lime-400 uppercase tracking-widest">Database Stable</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-lime-400/10 border border-lime-400/20">
                                <Database className="w-10 h-10 text-lime-400" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
