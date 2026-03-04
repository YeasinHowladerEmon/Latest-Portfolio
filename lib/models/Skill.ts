import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Frontend', 'Backend', 'Tools'], required: true },
    mastery: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
    color: { type: String, default: 'lime' },
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
