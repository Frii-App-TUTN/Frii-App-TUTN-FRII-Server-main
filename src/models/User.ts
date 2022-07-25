import { Schema, model } from "mongoose";

export interface UserSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userName: string;
  otp: string;
  otpCreated: number;
  emailVerified: boolean;
  resetPasswordCreated: number;
  resetPasswordCode: string;
}

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  otp: String,
  otpCreated: Number,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordCreated: String,
  resetPasswordCode: String,
  password: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  userName: String,
});

export const User = model("User", UserSchema);
