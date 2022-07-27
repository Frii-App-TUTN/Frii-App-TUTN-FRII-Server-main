import { Schema, model } from 'mongoose';

export interface UserSchema{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    userName: string;
}

const UserSchema = new Schema<UserSchema>({
    firstName: String,
    lastName: String,
    email: String,
    password: {
        type: String, required: true
    },
    phoneNumber: String,
    userName: String
});

export const User = model('User', UserSchema);
