import { Schema, model } from 'mongoose';
export interface GroupSchema {
    id: number;
    name: string;
    members: string[];
    createdAt: String;
    disabled: boolean;
    Admin: string;
}
const GroupSchema = new Schema<GroupSchema>({
    id: Number,
    name: String,
    members: [String],
    createdAt: {
        type: String,
        default: Date.now(),
        required: false
    },
    Admin: String,
});
export const Group = model('Group', GroupSchema);