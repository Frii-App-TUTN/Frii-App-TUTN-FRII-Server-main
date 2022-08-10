import { Schema, model } from 'mongoose';
export interface GroupSchema {
    id: number;
    name: string;
    members: string[];
    createdAt: number;
    disabled: boolean;
    Admin: string;
    groupType: string;
    threshold: number;
    duration: number;
    friiPeriod: number;
    reason: string;
    description: string;
    status: string;
};
const GroupSchema = new Schema<GroupSchema>({
    id: Number,
    name: String,
    members: [String],
    createdAt: {
        type: Number,
        default: Date.now(),
        required: false
    },
    Admin: String,
    disabled: {
        type: Boolean,
        default: false,
        required: false
    },
    groupType: String,
    threshold: {
        type: Number,
        default: 0
    },
    duration: Number,
    friiPeriod: Number,
    reason: String,
    description: String,
    status: String
});
export interface AddUserSchema {
    code: number;
    groupName: string;
    createdAt: number;
    expired: boolean;
    userEmail: string;
}
const AddUserSchema = new Schema<AddUserSchema>({
    code: Number,
    groupName: String,
    createdAt: {
        type: Number,
        default: Date.now(),
        required: true,
    },
    expired: {
        type: Boolean,
        default: false,
        required: false
    },
    userEmail: String
})
export const AddUser = model('groupInvite', AddUserSchema);
export const Group = model('Group', GroupSchema);