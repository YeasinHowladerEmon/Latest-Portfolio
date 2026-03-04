'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Trash2,
    Search,
    X,
    AlertCircle,
    Mail,
    Eye,
    CheckCircle2,
    Clock,
    Reply
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialMessages = [
    {
        id: 1,
        name: 'Alex Mercer',
        email: 'alex.mercer@cyber-corp.net',
        subject: 'Collaboration on Web3 Project',
        message: 'Hello, I saw your recent work on the Neon Marketplace and was blown away. We are currently looking for a lead frontend architect for an upcoming DeFi platform. Would love to discuss this further.',
        status: 'Unread',
        date: '2026-02-21T10:30:00Z',
    },
    {
        id: 2,
        name: 'Sarah Chen',
        email: 'schen.design@creative.io',
        subject: 'UI/UX Consultation',
        message: 'Hi there! Your Synthwave Studio project perfectly captures the aesthetic we want for our new game launcher. Are you available for freelance consulting next month?',
        status: 'Read',
        date: '2026-02-20T14:15:00Z',
    },
    {
        id: 3,
        name: 'Marcus Johnson',
        email: 'mjohnson@data-systems.org',
        subject: 'Dashboard Implementation Question',
        message: 'Could you share some insights on how you handled the real-time data streaming in the Cyber Data Dash project? We are struggling with performance issues in a similar stack.',
        status: 'Replied',
        date: '2026-02-18T09:45:00Z',
    },
];

export default function DashboardContactPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingMessage, setViewingMessage] = useState<any>(null);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/contact');
            const data = await res.json();
            if (res.ok) setMessages(data);
        } catch (error) {
            console.error('Fetch messages error:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchMessages();
    }, []);

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = async (message: any) => {
        setViewingMessage(message);
        setIsModalOpen(true);

        // Auto mark as read if it was unread
        if (message.status === 'Unread') {
            try {
                const res = await fetch(`/api/contact/${message._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'Read' }),
                });
                if (res.ok) {
                    setMessages(messages.map(m =>
                        m._id === message._id ? { ...m, status: 'Read' } : m
                    ));
                    setViewingMessage({ ...message, status: 'Read' });
                }
            } catch (error) {
                console.error('Update status error:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setViewingMessage(null), 300);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this transmission?')) {
            try {
                const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setMessages(messages.filter(m => m._id !== id));
                    if (viewingMessage?._id === id) {
                        handleCloseModal();
                    }
                }
            } catch (error) {
                console.error('Delete error:', error);
            }
        }
    };

    const handleMarkAsReplied = async (id: string) => {
        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Replied' }),
            });
            if (res.ok) {
                setMessages(messages.map(m =>
                    m._id === id ? { ...m, status: 'Replied' } : m
                ));
                if (viewingMessage?._id === id) {
                    setViewingMessage({ ...viewingMessage, status: 'Replied' });
                }
            }
        } catch (error) {
            console.error('Mark as replied error:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Unread': return 'text-lime-400 bg-lime-400/10 border-lime-400/30';
            case 'Read': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30';
            case 'Replied': return 'text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/30';
            default: return 'text-zinc-400 bg-white/5 border-white/10';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Unread': return <Mail className="w-4 h-4" />;
            case 'Read': return <Eye className="w-4 h-4" />;
            case 'Replied': return <CheckCircle2 className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const unreadCount = messages.filter(m => m.status === 'Unread').length;

    return (
        <main className="min-h-screen bg-[#030213] text-white p-8 md:p-14">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-fuchsia-500">
                        Comms Grid
                    </h1>
                    <p className="text-zinc-400 mt-2 text-lg">Incoming transmissions and structural feedback.</p>
                </div>

                <div className="flex bg-black/40 border border-white/10 rounded-xl p-2 backdrop-blur-xl">
                    <div className="px-6 py-3 rounded-lg flex flex-col items-center justify-center border-r border-white/5">
                        <span className="text-2xl font-black text-lime-400">{unreadCount}</span>
                        <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mt-1">Unread</span>
                    </div>
                    <div className="px-6 py-3 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-white">{messages.length}</span>
                        <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mt-1">Total</span>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 flex flex-col md:flex-row gap-5 items-center justify-between backdrop-blur-xl">
                <div className="relative w-full md:w-[500px] group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-lime-400 transition-colors" />
                    <Input
                        placeholder="Search transmissions by sender, email, or subject..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-14 pl-12 text-base bg-black/40 border-white/10 focus:border-lime-400/50 text-white w-full rounded-xl"
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5 text-sm uppercase tracking-widest text-zinc-400">
                                <th className="p-5 font-bold">Sender Source</th>
                                <th className="p-5 font-bold">Subject / Preview</th>
                                <th className="p-5 font-bold">Status</th>
                                <th className="p-5 font-bold">Timestamp</th>
                                <th className="p-5 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-base">
                            {filteredMessages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-zinc-500">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <AlertCircle className="w-10 h-10 text-white/20" />
                                            <p className="text-lg">No transmissions matching the current scan.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredMessages.map((msg) => (
                                    <tr key={msg.id} className={`hover:bg-white/2 transition-colors group ${msg.status === 'Unread' ? 'bg-lime-400/2' : ''}`}>
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${msg.status === 'Unread' ? 'bg-lime-400/10 border-lime-400/20 text-lime-400' : 'bg-white/5 border-white/10 text-zinc-400'
                                                    }`}>
                                                    <span className="font-bold text-lg">{msg.name.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <span className={`font-bold text-lg block ${msg.status === 'Unread' ? 'text-white' : 'text-zinc-300'}`}>
                                                        {msg.name}
                                                    </span>
                                                    <span className="text-zinc-500 text-sm block">
                                                        {msg.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5 max-w-[400px]">
                                            <div className="pr-4">
                                                <span className={`block font-semibold mb-1 truncate ${msg.status === 'Unread' ? 'text-white' : 'text-zinc-300'}`}>
                                                    {msg.subject}
                                                </span>
                                                <span className="text-zinc-500 text-sm truncate block">
                                                    {msg.message}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-4 py-1.5 border rounded-full text-sm font-mono font-medium inline-flex items-center gap-2 ${getStatusColor(msg.status)}`}>
                                                {getStatusIcon(msg.status)}
                                                {msg.status}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="text-sm font-mono text-zinc-400">
                                                {formatDate(msg.date)}
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            <div className="flex flex-row items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(msg)}
                                                    className="p-3 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                                    title="View Message"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                {msg.status !== 'Replied' && (
                                                    <button
                                                        onClick={() => handleMarkAsReplied(msg.id)}
                                                        className="p-3 rounded-lg hover:bg-fuchsia-500/10 text-zinc-400 hover:text-fuchsia-400 transition-colors"
                                                        title="Mark as Replied"
                                                    >
                                                        <Reply className="w-5 h-5" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="p-3 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Message View Modal */}
            <AnimatePresence>
                {isModalOpen && viewingMessage && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center px-4 py-8 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={handleCloseModal}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
                        >
                            {/* Accent line */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-400 to-lime-400`} />

                            <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
                                <h2 className="text-2xl font-bold text-white tracking-tighter flex items-center gap-3">
                                    <Mail className="w-6 h-6 text-lime-400" />
                                    Transmission Details
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 rounded-lg bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                                <div className="space-y-8">
                                    {/* Header Info */}
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 bg-white/5 p-6 rounded-xl border border-white/5">
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-lime-400/10 border border-lime-400/20 text-lime-400 flex items-center justify-center text-xl font-bold shrink-0">
                                                {viewingMessage.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{viewingMessage.name}</h3>
                                                <a href={`mailto:${viewingMessage.email}`} className="text-lime-400 hover:underline text-sm block mt-1">
                                                    {viewingMessage.email}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                            <span className={`px-3 py-1 border rounded-full text-xs font-mono font-medium inline-flex items-center gap-1.5 ${getStatusColor(viewingMessage.status)}`}>
                                                {getStatusIcon(viewingMessage.status)}
                                                {viewingMessage.status}
                                            </span>
                                            <span className="text-zinc-500 text-sm font-mono">
                                                {formatDate(viewingMessage.date)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <h4 className="text-sm uppercase tracking-wider text-zinc-500 font-semibold mb-2">Subject</h4>
                                        <div className="text-xl font-bold text-white bg-black/40 border border-white/10 p-4 rounded-lg">
                                            {viewingMessage.subject}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h4 className="text-sm uppercase tracking-wider text-zinc-500 font-semibold mb-2">Message Content</h4>
                                        <div className="text-lg text-zinc-300 bg-black/40 border border-white/10 p-6 rounded-lg whitespace-pre-wrap leading-relaxed min-h-[150px]">
                                            {viewingMessage.message}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-white/10 bg-black/40 flex justify-between shrink-0">
                                <Button
                                    variant="outline"
                                    onClick={() => handleDelete(viewingMessage.id)}
                                    className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>

                                <div className="flex gap-4">
                                    {viewingMessage.status !== 'Replied' && (
                                        <Button
                                            onClick={() => handleMarkAsReplied(viewingMessage.id)}
                                            className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white border-none"
                                        >
                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                            Mark as Replied
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => window.location.href = `mailto:${viewingMessage.email}?subject=Re: ${viewingMessage.subject}`}
                                        className="bg-lime-400 hover:bg-lime-500 text-black font-semibold"
                                    >
                                        <Reply className="w-4 h-4 mr-2" />
                                        Reply via Email
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
