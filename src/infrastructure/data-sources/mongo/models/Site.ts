import { Site } from '@/domain/entities/Site';
import mongoose from 'mongoose';

// Define a schema
const SiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    savings: {
        type: String,
        required: false,
    },
    uptime: {
        type: String,
        required: false,
    },
    power: {
        type: String,
        required: false,
    }
}, { timestamps: true, versionKey: false });

// Define Model
const SiteModel = mongoose.model<Site>('Site', SiteSchema);

export { SiteModel, SiteSchema }