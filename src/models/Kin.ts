import { Schema, model } from 'mongoose';
interface KinSchema {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    Relationship: string;
}

const KinSchema = new Schema<KinSchema>({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    Relationship: String
});

const Kin = model('KYC', KinSchema);

module.exports = Kin;