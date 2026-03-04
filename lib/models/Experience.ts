import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    period: { type: String, required: true }, // duration
    type: { type: String, required: true }, // Job type
    color: { type: String, default: 'lime' },
    achievements: [{ type: String }],
    workLocation: { type: String, enum: ['Remote', 'Onsite'], default: 'Onsite' },
    address: { type: String },
}, { timestamps: true });

// Force refresh schema in case of stale cache
if (mongoose.models && mongoose.models.Experience) {
    delete mongoose.models.Experience;
}

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
