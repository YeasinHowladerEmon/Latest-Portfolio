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
    Cpu,
    Code2,
    Database,
    PenTool,
    Layout,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock initial data based on the public Skills component
const initialSkills = [
    { id: 1, name: 'React', category: 'Frontend Architecture', mastery: 'Expert', color: 'lime' },
    { id: 2, name: 'Next.js', category: 'Frontend Architecture', mastery: 'Expert', color: 'lime' },
    { id: 3, name: 'TypeScript', category: 'Frontend Architecture', mastery: 'Advanced', color: 'fuchsia' },
    { id: 4, name: 'Tailwind CSS', category: 'Frontend Architecture', mastery: 'Expert', color: 'lime' },
    { id: 5, name: 'Motion', category: 'Frontend Architecture', mastery: 'Advanced', color: 'fuchsia' },
    { id: 6, name: 'Node.js', category: 'Backend Systems', mastery: 'Advanced', color: 'fuchsia' },
    { id: 7, name: 'Python', category: 'Backend Systems', mastery: 'Intermediate', color: 'cyan' },
    { id: 8, name: 'PostgreSQL', category: 'Backend Systems', mastery: 'Advanced', color: 'fuchsia' },
    { id: 9, name: 'MongoDB', category: 'Backend Systems', mastery: 'Intermediate', color: 'cyan' },
    { id: 10, name: 'Docker', category: 'DevOps & Tools', mastery: 'Intermediate', color: 'cyan' },
    { id: 11, name: 'AWS', category: 'DevOps & Tools', mastery: 'Intermediate', color: 'cyan' },
    { id: 12, name: 'Git', category: 'DevOps & Tools', mastery: 'Expert', color: 'lime' },
    { id: 13, name: 'Figma', category: 'DevOps & Tools', mastery: 'Advanced', color: 'fuchsia' },
];

const categories = ['Frontend', 'Backend', 'Tools'];
const masteries = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const masteryToValue: Record<string, number> = {
    'Beginner': 25,
    'Intermediate': 50,
    'Advanced': 75,
    'Expert': 100
};

const valueToMastery = (val: number) => {
    if (val <= 25) return 'Beginner';
    if (val <= 50) return 'Intermediate';
    if (val <= 75) return 'Advanced';
    return 'Expert';
};

const colors = [
    { name: 'lime', class: 'bg-lime-400 text-black' },
    { name: 'fuchsia', class: 'bg-fuchsia-500 text-white' },
    { name: 'cyan', class: 'bg-cyan-400 text-black' }
];

export default function DashboardSkillsPage() {
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: categories[0],
        mastery: masteries[1],
        color: colors[0].name
    });

    const fetchSkills = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/skills');
            const data = await res.json();
            if (res.ok) setSkills(data);
        } catch (error) {
            console.error('Fetch skills error:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchSkills();
    }, []);

    const filteredSkills = skills.filter(skill =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = (skill: any = null) => {
        if (skill) {
            setEditingSkill(skill);
            setFormData({
                name: skill.name,
                category: skill.category,
                mastery: skill.mastery,
                color: skill.color
            });
        } else {
            setEditingSkill(null);
            setFormData({
                name: '',
                category: categories[0],
                mastery: masteries[1],
                color: colors[0].name
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSkill(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingSkill ? `/api/skills/${editingSkill._id}` : '/api/skills';
            const method = editingSkill ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                fetchSkills();
                handleCloseModal();
            }
        } catch (error) {
            console.error('Submit skill error:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            try {
                const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
                if (res.ok) fetchSkills();
            } catch (error) {
                console.error('Delete skill error:', error);
            }
        }
    };

    const getIcon = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('react') || lowerName.includes('next') || lowerName.includes('vue') || lowerName.includes('js') || lowerName.includes('ts')) return <Code2 size={16} />;
        if (lowerName.includes('node') || lowerName.includes('python') || lowerName.includes('java') || lowerName.includes('c++')) return <Cpu size={16} />;
        if (lowerName.includes('sql') || lowerName.includes('mongo') || lowerName.includes('db') || lowerName.includes('data') || lowerName.includes('postgre')) return <Database size={16} />;
        if (lowerName.includes('figma') || lowerName.includes('adobe') || lowerName.includes('design') || lowerName.includes('pen')) return <PenTool size={16} />;
        return <Layout size={16} />;
    };

    return (
        <main className="min-h-screen bg-[#030213] text-white p-8 md:p-14">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-fuchsia-500">
                        Skills Protocol
                    </h1>
                    <p className="text-zinc-400 mt-2 text-lg">Manage and configure your technical arsenal.</p>
                </div>

                <Button
                    onClick={() => handleOpenModal()}
                    className="h-14 px-6 text-lg bg-lime-400 hover:bg-lime-500 text-black font-semibold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_-3px_rgba(163,230,53,0.4)]"
                >
                    <Plus className="w-5 h-5" />
                    Add Node
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
                    Total Nodes: <span className="text-lime-400 font-mono text-lg">{filteredSkills.length}</span>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5 text-sm uppercase tracking-widest text-zinc-400">
                                <th className="p-5 font-bold">Skill Node</th>
                                <th className="p-5 font-bold">Category</th>
                                <th className="p-5 font-bold">Mastery Level</th>
                                <th className="p-5 font-bold">Color Identity</th>
                                <th className="p-5 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-base">
                            {filteredSkills.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-zinc-500">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <AlertCircle className="w-10 h-10 text-white/20" />
                                            <p className="text-lg">No skill nodes found in the current sector.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredSkills.map((skill) => (
                                    <tr key={skill._id} className="hover:bg-white/2 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${skill.color}-400/10 text-${skill.color}-400 border border-${skill.color}-400/20`}>
                                                    {getIcon(skill.name)}
                                                </div>
                                                <span className="font-bold text-white text-lg group-hover:text-lime-400 transition-colors">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-zinc-400 font-medium">
                                            {skill.category}
                                        </td>
                                        <td className="p-5">
                                            <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-zinc-300 font-medium">
                                                {skill.mastery}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full ${colors.find(c => c.name === skill.color)?.class.split(' ')[0]} shadow-[0_0_10px_currentColor] opacity-80`} />
                                                <span className="text-zinc-500 text-sm uppercase tracking-wider font-semibold">{skill.color}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(skill)}
                                                    className="p-3 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                                >
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(skill._id)}
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
                    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={handleCloseModal}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-lime-400 to-fuchsia-500" />

                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-bold text-white tracking-tighter">
                                        {editingSkill ? 'Edit Skill Node' : 'Initialize New Node'}
                                    </h2>
                                    <button
                                        onClick={handleCloseModal}
                                        className="p-2 rounded-lg bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Node Name</Label>
                                        <Input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. React, Docker, Python..."
                                            className="h-14 font-medium text-lg bg-white/5 border-white/10 text-white focus:border-lime-400/50"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Classification</Label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg h-14 px-4 text-white text-lg font-medium focus:outline-none focus:border-lime-400/50 appearance-none transition-colors"
                                        >
                                            {categories.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Mastery Level</Label>
                                            <span className={`text-sm font-bold px-3 py-1 rounded-full bg-white/10 border border-white/20 ${formData.mastery === 'Expert' ? 'text-fuchsia-400 border-fuchsia-500/30' : formData.mastery === 'Advanced' ? 'text-lime-400 border-lime-400/30' : 'text-cyan-400 border-cyan-400/30'}`}>
                                                {formData.mastery} ({masteryToValue[formData.mastery]}%)
                                            </span>
                                        </div>

                                        <div className="relative pt-3 pb-8">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                value={masteryToValue[formData.mastery]}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    setFormData({ ...formData, mastery: valueToMastery(val) });
                                                }}
                                                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-lime-400 hover:accent-lime-300 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)]"
                                            />
                                            <div className="absolute w-full flex justify-between text-sm text-zinc-500 font-mono mt-3 -bottom-4 font-medium">
                                                <span>0%</span>
                                                <span>25%</span>
                                                <span>50%</span>
                                                <span>75%</span>
                                                <span>100%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <Label className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">Color Identity</Label>
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
                                            className="flex-1 h-16 rounded-xl text-lg bg-lime-400 hover:bg-lime-500 text-black font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(163,230,53,0.4)]"
                                        >
                                            <Save className="w-6 h-6" />
                                            {editingSkill ? 'Update Node' : 'Initialize'}
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
