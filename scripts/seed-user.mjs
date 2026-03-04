import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Missing environment variables in .env.local');
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(ADMIN_PASSWORD, salt);

        await User.findOneAndUpdate(
            { email: ADMIN_EMAIL },
            { email: ADMIN_EMAIL, password: hashedPassword },
            { upsert: true, new: true }
        );

        console.log(`Admin user ${ADMIN_EMAIL} seeded successfully!`);
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seed();
