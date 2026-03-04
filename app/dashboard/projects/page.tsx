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
    Layout,
    AlertCircle,
    ExternalLink,
    Layers,
    Image as ImageIcon,
    Upload,
    Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialProjects = [
    {
        id: 1,
        title: 'NEON MARKETPLACE',
        category: 'Web3',
        description: 'A decentralized e-commerce platform featuring immersive 3D product visualization and crypto payments. Built for the Web3 generation.',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop',
        tags: 'React, WebGL, Solidity, Tailwind',
        accent: 'lime',
        status: 'Published'
    },
    {
        id: 2,
        title: 'SYNTHWAVE STUDIO',
        category: 'Fullstack',
        description: 'An interactive portfolio platform for digital artists, featuring real-time collaboration tools and generative art capabilities.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        tags: 'Next.js, Socket.io, Canvas API, Prisma',
        accent: 'fuchsia',
        status: 'Published'
    },
    {
        id: 3,
        title: 'CYBER DATA DASH',
        category: 'Data Science',
        description: 'High-performance analytics dashboard processing real-time data streams with predictive AI modeling and visualization.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        tags: 'Vue, D3.js, Python, FastAPI',
        accent: 'cyan',
        status: 'Draft'
    },
];

const categories = ['Frontend', 'Backend', 'Fullstack', 'Web3', 'Data Science', 'Mobile'];
const statuses = ['Published', 'Draft', 'Archived'];

const colors = [
    { name: 'lime', class: 'bg-lime-400 text-black' },
    { name: 'fuchsia', class: 'bg-fuchsia-500 text-white' },
    { name: 'cyan', class: 'bg-cyan-400 text-black' }
];

export default function DashboardProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: categories[0],
        description: '',
        image: '',
        tags: '',
        accent: colors[0].name,
        status: statuses[0],
        github: '',
        link: '',
        team: [] as { name: string, role: string }[]
    });

    // Fetch projects
    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (res.ok) {
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = (project: any = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                category: project.category,
                description: project.description,
                image: project.image || '',
                tags: project.tags,
                accent: project.accent,
                status: project.status,
                github: project.github || '',
                link: project.link || '',
                team: project.team || []
            });
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                category: categories[0],
                description: '',
                image: '',
                tags: '',
                accent: colors[0].name,
                status: statuses[0],
                github: '',
                link: '',
                team: []
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects';
            const method = editingProject ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                fetchProjects();
                handleCloseModal();
            }
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });

            const result = await res.json();
            if (res.ok) {
                setFormData({ ...formData, image: result.url });
            } else {
                alert(result.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    fetchProjects();
                }
            } catch (error) {
                console.error('Delete error:', error);
            }
        }
    };

    return (
        <main className="min-h-screen bg-[#030213] text-white p-8 md:p-14">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-fuchsia-500">
                        Projects Matrix
                    </h1>
                    <p className="text-zinc-400 mt-2 text-lg">Manage and deploy your digital manifestations.</p>
                </div>

                <Button
                    onClick={() => handleOpenModal()}
                    className="h-14 px-6 text-lg bg-lime-400 hover:bg-lime-500 text-black font-semibold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_-3px_rgba(163,230,53,0.4)]"
                >
                    <Plus className="w-5 h-5" />
                    Deploy Project
                </Button>
            </div>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 flex flex-col md:flex-row gap-5 items-center justify-between backdrop-blur-xl">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-lime-400 transition-colors" />
                    <Input
                        placeholder="Search matrix..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-14 pl-12 text-base bg-black/40 border-white/10 focus:border-lime-400/50 text-white w-full rounded-xl"
                    />
                </div>

                <div className="text-base border border-white/10 bg-black/40 px-5 py-3 rounded-xl text-zinc-400 w-full md:w-auto text-center md:text-left">
                    Total Deployments: <span className="text-lime-400 font-mono text-lg">{filteredProjects.length}</span>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5 text-sm uppercase tracking-widest text-zinc-400">
                                <th className="p-5 font-bold">Project Identity</th>
                                <th className="p-5 font-bold">Category</th>
                                <th className="p-5 font-bold">Status</th>
                                <th className="p-5 font-bold">Crew</th>
                                <th className="p-5 font-bold">Tech Stack</th>
                                <th className="p-5 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-base">
                            {filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-zinc-500">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <AlertCircle className="w-10 h-10 text-white/20" />
                                            <p className="text-lg">No deployments found in the current sector.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProjects.map((project) => (
                                    <tr key={project._id} className="hover:bg-white/2 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden border border-${project.accent}-400/20 bg-zinc-900 shrink-0`}>
                                                    {project.image ? (
                                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className={`text-${project.accent}-400 w-6 h-6`} />
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-white text-lg group-hover:text-lime-400 transition-colors block">
                                                        {project.title}
                                                    </span>
                                                    <span className="text-zinc-500 text-sm truncate max-w-[200px] block">
                                                        {project.description}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5 text-zinc-400 font-medium">
                                            {project.category}
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-4 py-1.5 bg-white/5 border rounded-full text-sm font-mono font-medium ${project.status === 'Published' ? 'border-lime-400/30 text-lime-400' : 'border-zinc-500/30 text-zinc-400'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs bg-white/5 border border-white/10 w-fit px-2 py-1 rounded-md">
                                                <Layers className="w-3 h-3 text-fuchsia-400" />
                                                {project.team?.length || 0}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-wrap gap-2 max-w-[250px]">
                                                {project.tags.split(',').map((tag: string, i: number) => (
                                                    <span key={i} className={`px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-zinc-300`}>
                                                        {tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            <div className="flex flex-row items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    title="Open Link"
                                                    className="p-3 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModal(project)}
                                                    className="p-3 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                                >
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project._id)}
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
                            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto"
                        >
                            {/* Accent line */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-${formData.accent}-500`} />

                            <div className="p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-bold text-white tracking-tighter">
                                        {editingProject ? 'Edit Deployment' : 'Initialize New Deployment'}
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
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Project Title</Label>
                                            <Input
                                                required
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                placeholder="e.g. NEON MARKETPLACE"
                                                className="h-14 font-medium text-lg bg-white/5 border-white/10 text-white focus:border-lime-400/50"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Category</Label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg h-14 px-4 text-white text-lg font-medium focus:outline-none focus:border-lime-400/50 appearance-none transition-colors"
                                            >
                                                {categories.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Description</Label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="A brief overview of the project..."
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white text-lg font-medium focus:outline-none focus:border-lime-400/50 transition-colors resize-none"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Project Image</Label>
                                        <div className="flex flex-col gap-4">
                                            {formData.image && (
                                                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10 group">
                                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, image: '' })}
                                                            className="text-red-400 font-bold uppercase tracking-widest text-xs hover:underline"
                                                        >
                                                            Remove Image
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="relative group/upload">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    disabled={uploading}
                                                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                                                />
                                                <div className={`h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${uploading ? 'bg-white/5 border-lime-400/50' : 'bg-white/5 border-white/10 group-hover/upload:border-lime-400/50 group-hover/upload:bg-white/10'
                                                    }`}>
                                                    {uploading ? (
                                                        <>
                                                            <Loader2 className="w-6 h-6 text-lime-400 animate-spin" />
                                                            <span className="text-sm text-zinc-400 uppercase tracking-widest font-bold animate-pulse">Processing...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Upload className="w-6 h-6 text-zinc-500 group-hover/upload:text-lime-400 transition-colors" />
                                                            <span className="text-sm text-zinc-400 uppercase tracking-widest font-bold">
                                                                {formData.image ? 'Change Image Asset' : 'Manifest Image Asset'}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Tech Stack (comma-separated)</Label>
                                        <Input
                                            required
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            placeholder="React, Node.js, Tailwind..."
                                            className="h-14 font-medium text-lg bg-white/5 border-white/10 text-white focus:border-lime-400/50"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Github Repository (Link)</Label>
                                            <Input
                                                value={formData.github}
                                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                placeholder="e.g. https://github.com/user/repo"
                                                className="h-14 font-medium text-lg bg-white/5 border-white/10 text-white focus:border-lime-400/50"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Live Deployment (Link)</Label>
                                            <Input
                                                value={formData.link}
                                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                placeholder="e.g. https://project.vercel.app"
                                                className="h-14 font-medium text-lg bg-white/5 border-white/10 text-white focus:border-lime-400/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-sm uppercase tracking-wider font-semibold text-lime-400/80">Support Crew (Team Members)</Label>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setFormData({ ...formData, team: [...formData.team, { name: '', role: '' }] })}
                                                className="h-8 px-3 text-xs border-white/10 hover:bg-white/5 text-zinc-400"
                                            >
                                                <Plus className="w-3 h-3 mr-1" /> Add Member
                                            </Button>
                                        </div>

                                        <div className="space-y-3">
                                            {formData.team.map((member, idx) => (
                                                <div key={idx} className="flex gap-3 items-center">
                                                    <Input
                                                        placeholder="Name"
                                                        value={member.name}
                                                        onChange={(e) => {
                                                            const newTeam = [...formData.team];
                                                            newTeam[idx].name = e.target.value;
                                                            setFormData({ ...formData, team: newTeam });
                                                        }}
                                                        className="h-12 bg-white/5 border-white/10 text-white flex-1"
                                                    />
                                                    <select
                                                        value={member.role}
                                                        onChange={(e) => {
                                                            const newTeam = [...formData.team];
                                                            newTeam[idx].role = e.target.value;
                                                            setFormData({ ...formData, team: newTeam });
                                                        }}
                                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg h-12 px-3 text-white text-sm focus:outline-none focus:border-lime-400/50 appearance-none transition-colors"
                                                    >
                                                        <option value="" disabled className="bg-zinc-900">Select Role</option>
                                                        {['Lead Developer', 'Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'UI/UX Designer', 'DevOps Engineer', 'Project Manager', 'QA Specialist', 'Contributor'].map(role => (
                                                            <option key={role} value={role} className="bg-zinc-900">{role}</option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newTeam = formData.team.filter((_, i) => i !== idx);
                                                            setFormData({ ...formData, team: newTeam });
                                                        }}
                                                        className="p-2 text-zinc-500 hover:text-red-400"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))}
                                            {formData.team.length === 0 && (
                                                <div className="p-4 rounded-xl border border-dashed border-white/5 text-center text-zinc-600 text-sm">
                                                    Solo Mission. No crew members registered.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Deployment Status</Label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg h-14 px-4 text-white text-lg font-medium focus:outline-none focus:border-lime-400/50 appearance-none transition-colors"
                                            >
                                                {statuses.map(s => <option key={s} value={s} className="bg-zinc-900">{s}</option>)}
                                            </select>
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Color Identity</Label>
                                            <div className="flex gap-4 items-center h-14">
                                                {colors.map(c => (
                                                    <button
                                                        key={c.name}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, accent: c.name })}
                                                        className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${formData.accent === c.name
                                                            ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                                                            : 'border-transparent opacity-50 hover:opacity-100 hover:scale-110'
                                                            } ${c.class.split(' ')[0]}`}
                                                    />
                                                ))}
                                            </div>
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
                                            className="flex-1 h-16 rounded-xl text-lg bg-lime-400 hover:bg-lime-500 text-black font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(163,230,53,0.4)]"
                                        >
                                            <Save className="w-6 h-6" />
                                            {editingProject ? 'Update Deployment' : 'Initialize'}
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
