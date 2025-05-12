import mongoose, { Schema, Document } from 'mongoose';
import { Zone } from '../../../../domain/entities/Zone';

const ZoneSchema: Schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    description: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ZoneModel = mongoose.model<Zone & Document>('Zone', ZoneSchema);

export default ZoneModel;
