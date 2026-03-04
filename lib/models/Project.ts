import mongoose from 'mongoose';

export const TEAM_ROLES = [
    'Lead Developer',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
    'UI/UX Designer',
    'DevOps Engineer',
    'Project Manager',
    'QA Specialist',
    'Contributor'
] as const;

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: { type: String, required: true }, // comma separated or array
    accent: { type: String, default: 'lime' },
    status: { type: String, enum: ['Published', 'Draft', 'Archived'], default: 'Draft' },
    link: { type: String },
    github: { type: String },
    team: [{
        name: { type: String, required: true },
        role: { type: String, enum: TEAM_ROLES, default: 'Contributor' }
    }],
}, { timestamps: true });

// Force refresh schema in case of stale cache
if (mongoose.models && mongoose.models.Project) {
    delete mongoose.models.Project;
}

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
