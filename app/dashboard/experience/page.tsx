'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    X,
    Save,
    Briefcase,
    AlertCircle,
    Calendar,
    TerminalSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Mock initial data based on the public Experience component
const initialExperiences = [
    {
        id: 1,
        role: 'Full Stack Developer',
        company: 'XYZ Company',
        period: 'Jan 2024 – Dec 2024',
        type: 'Full-time',
        color: 'lime',
        achievements: [
            'Contributed to multiple internal and client-facing applications',
            'Fixed critical bugs in production systems',
            'Implemented new feature modules',
            'Refactored legacy code for better performance',
            'Collaborated with cross-functional teams',
            'Worked across 4+ active projects simultaneously'
        ]
    },
    {
        id: 2,
        role: 'Frontend Engineer',
        company: 'Tech Solutions Inc.',
        period: 'Mar 2022 – Dec 2023',
        type: 'Contract',
        color: 'cyan',
        achievements: [
            'Architected scalable frontend solutions using React and Next.js',
            'Optimized application load times by 40% through code splitting',
            'Mentored junior developers and conducted code reviews',
            'Integrated complex third-party APIs and payment gateways'
        ]
    },
    {
        id: 3,
        role: 'Junior Web Developer',
        company: 'Digital Nexus',
        period: 'Jun 2021 – Feb 2022',
        type: 'Full-time',
        color: 'fuchsia',
        achievements: [
            'Developed responsive landing pages using modern CSS frameworks',
            'Assisted in migrating legacy applications to React',
            'Participated in daily stand-ups and agile workflows',
            'Resolved UI/UX inconsistencies across multiple browsers'
        ]
    }
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
const workLocations = ['Remote', 'Onsite'];

const colors = [
    { name: 'lime', class: 'bg-lime-400 text-black' },
    { name: 'fuchsia', class: 'bg-fuchsia-500 text-white' },
    { name: 'cyan', class: 'bg-cyan-400 text-black' }
];

export default function DashboardExperiencePage() {
    const [experiences, setExperiences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        period: '',
        type: jobTypes[0],
        workLocation: workLocations[0],
        address: '',
        color: colors[0].name,
        achievementsText: '' // We use text area split by newlines for achievements
    });

    const fetchExperiences = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/experience');
            const data = await res.json();
            if (res.ok) setExperiences(data);
        } catch (error) {
            console.error('Fetch experience error:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchExperiences();
    }, []);

    const filteredExperiences = experiences.filter(exp =>
        exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = (exp: any = null) => {
        if (exp) {
            setEditingExp(exp);
            setFormData({
                role: exp.role,
                company: exp.company,
                period: exp.period,
                type: exp.type,
                workLocation: exp.workLocation || workLocations[0],
                address: exp.address || '',
                color: exp.color,
                achievementsText: exp.achievements.join('\n')
            });
        } else {
            setEditingExp(null);
            setFormData({
                role: '',
                company: '',
                period: '',
                type: jobTypes[0],
                workLocation: workLocations[0],
                address: '',
                color: colors[0].name,
                achievementsText: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingExp(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Parse achievements text into array
        const achievementsArr = formData.achievementsText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const recordToSave = {
            role: formData.role,
            company: formData.company,
            period: formData.period,
            type: formData.type,
            workLocation: formData.workLocation,
            address: formData.workLocation === 'Onsite' ? formData.address : '',
            color: formData.color,
            achievements: achievementsArr
        };

        try {
            const url = editingExp ? `/api/experience/${editingExp._id}` : '/api/experience';
            const method = editingExp ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recordToSave),
            });

            if (res.ok) {
                toast.success(editingExp ? 'Career log updated' : 'Mission logged successfully');
                fetchExperiences();
                handleCloseModal();
            } else {
                const errorData = await res.json();
                toast.error(`Operation failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error: any) {
            console.error('Submit experience error:', error);
            toast.error(`System error: ${error.message}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this career log entry?')) {
            try {
                const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
                if (res.ok) fetchExperiences();
            } catch (error) {
                console.error('Delete experience error:', error);
            }
        }
    };

    return (
        <main className="min-h-screen bg-[#030213] text-white p-8 md:p-14">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-fuchsia-500">
                        Career Logs
                    </h1>
                    <p className="text-zinc-400 mt-2 text-lg">Manage and configure your operational history.</p>
                </div>

                <Button
                    onClick={() => handleOpenModal()}
                    className="h-14 px-6 text-lg bg-lime-400 hover:bg-lime-500 text-black font-semibold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_-3px_rgba(163,230,53,0.4)]"
                >
                    <Plus className="w-5 h-5" />
                    Deploy Log
                </Button>
            </div>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 flex flex-col md:flex-row gap-5 items-center justify-between backdrop-blur-xl">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors" />
                    <Input
                        placeholder="Search coordinates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-14 pl-12 text-base bg-black/40 border-white/10 focus:border-fuchsia-500/50 text-white w-full rounded-xl"
                    />
                </div>

                <div className="text-base border border-white/10 bg-black/40 px-5 py-3 rounded-xl text-zinc-400 w-full md:w-auto text-center md:text-left">
                    Total Deployments: <span className="text-fuchsia-400 font-mono text-lg">{filteredExperiences.length}</span>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5 text-sm uppercase tracking-widest text-zinc-400">
                                <th className="p-5 font-bold">Designation</th>
                                <th className="p-5 font-bold">Corporation</th>
                                <th className="p-5 font-bold">Timeline Status</th>
                                <th className="p-5 font-bold">Identity</th>
                                <th className="p-5 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-base">
                            {filteredExperiences.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-zinc-500">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <AlertCircle className="w-10 h-10 text-white/20" />
                                            <p className="text-lg">No career logs documented.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredExperiences.map((exp) => (
                                    <tr key={exp._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-white text-lg group-hover:text-fuchsia-400 transition-colors">
                                                    {exp.role}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 capitalize">
                                                    <TerminalSquare className="w-4 h-4" />
                                                    {exp.type} • {exp.workLocation}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-zinc-300 font-medium text-lg">
                                            {exp.company}
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg w-fit text-zinc-300">
                                                <Calendar className="w-4 h-4 text-zinc-500" />
                                                <span className="text-sm font-mono uppercase tracking-widest">{exp.period}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full ${colors.find(c => c.name === exp.color)?.class.split(' ')[0]} shadow-[0_0_10px_currentColor] opacity-80`} />
                                                <span className="text-zinc-500 text-sm uppercase tracking-wider font-semibold">{exp.color}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(exp)}
                                                    className="p-3 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                                >
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(exp._id)}
                                                    className="p-3 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors"
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

            {/* Action Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center px-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md"
                            onClick={handleCloseModal}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl my-8"
                        >
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-fuchsia-500 to-cyan-400" />

                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-bold text-white tracking-tighter">
                                        {editingExp ? 'Modify Log' : 'Deploy New Log'}
                                    </h2>
                                    <button
                                        onClick={handleCloseModal}
                                        className="p-2 rounded-lg bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Designation (Role)</Label>
                                            <Input
                                                required
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                placeholder="e.g. Full Stack Developer"
                                                className="h-14 font-medium text-lg bg-white/5 border-white/10 text-white focus:border-fuchsia-500/50"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Corporation</Label>
                                            <Input
                                                required
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                placeholder="e.g. XYZ Company"
                                                className="h-14 font-medium text-lg bg-white/5 border-white/10 text-white focus:border-fuchsia-500/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Timeline (Period)</Label>
                                            <Input
                                                required
                                                value={formData.period}
                                                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                                placeholder="e.g. Jan 2024 – Dec 2024"
                                                className="h-14 font-medium text-lg bg-white/5 border-white/10 text-white focus:border-fuchsia-500/50"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Job Type</Label>
                                                <select
                                                    value={formData.type}
                                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg h-14 px-4 text-white text-lg font-medium focus:outline-none focus:border-fuchsia-500/50 appearance-none transition-colors"
                                                >
                                                    {jobTypes.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                                                </select>
                                            </div>

                                            <div className="space-y-3">
                                                <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Work Location</Label>
                                                <select
                                                    value={formData.workLocation}
                                                    onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg h-14 px-4 text-white text-lg font-medium focus:outline-none focus:border-fuchsia-500/50 appearance-none transition-colors"
                                                >
                                                    {workLocations.map(l => <option key={l} value={l} className="bg-zinc-900">{l}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {formData.workLocation === 'Onsite' && (
                                        <div className="space-y-3">
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Office Address</Label>
                                            <Input
                                                required
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                placeholder="e.g. 123 Tech Avenue, Silicon Valley"
                                                className="h-14 font-medium text-lg bg-white/5 border-white/10 text-white focus:border-fuchsia-500/50"
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">What I Did (One per line)</Label>
                                        <textarea
                                            required
                                            value={formData.achievementsText}
                                            onChange={(e) => setFormData({ ...formData, achievementsText: e.target.value })}
                                            placeholder="Implemented new feature modules&#10;Refactored legacy code"
                                            className="w-full h-40 bg-white/5 border border-white/10 rounded-lg p-4 text-white text-lg font-medium focus:outline-none focus:border-fuchsia-500/50 transition-colors resize-none"
                                        />
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Aura Color</Label>
                                        <div className="flex gap-4">
                                            {colors.map(c => (
                                                <button
                                                    key={c.name}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, color: c.name })}
                                                    className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center ${formData.color === c.name
                                                        ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                                                        : 'border-transparent opacity-50 hover:opacity-100 hover:scale-110'
                                                        } ${c.class.split(' ')[0]}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-8 flex gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleCloseModal}
                                            className="flex-1 h-16 rounded-xl text-lg font-bold border-white/10 hover:text-white text-black hover:bg-white/10 transition-colors"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="flex-1 h-16 rounded-xl text-lg bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(217,70,239,0.4)]"
                                        >
                                            <Save className="w-6 h-6" />
                                            {editingExp ? 'Update Log' : 'Deploy'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
