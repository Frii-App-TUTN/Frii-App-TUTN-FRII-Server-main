import { Schema, model } from 'mongoose';
export interface GroupSchema {
    id: number;
    name: string;
    members: string[];
    createdAt: number;
    disabled: boolean;
    Admin: string;
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
    }
});
export interface AddUserSchema {
    code: number;
    groupName: string;
    createdAt: number;
    expired: boolean;
    userEmail: String;
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