import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    phone: { type: String, required: false },
    status: { type: String, enum: ['Unread', 'Read', 'Replied'], default: 'Unread' },
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
