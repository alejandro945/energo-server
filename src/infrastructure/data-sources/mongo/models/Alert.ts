import { Alert } from "@/domain/entities/Alert";
import mongoose, { Schema } from "mongoose";

// Define a schema
const AlertSchema = new mongoose.Schema({
    site: {
        type: Schema.Types.ObjectId,
        ref: 'Site',
    },
    severity: {
        type: String,
        required: true,
    },
    metric: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    threshold: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }
}, { timestamps: true, versionKey: false });

// Define Model
const AlertModel = mongoose.model<Alert>('Alert', AlertSchema);

export { AlertModel, AlertSchema }