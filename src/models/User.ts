import { Schema, model } from "mongoose";

export interface UserSchema {
  _id: string;
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
  pin: string;
}

const UserSchema = new Schema({
  // _id: String,
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
  pin: String,
  created: {
    type: String,
    required: false,
    default: Date.now(),
  },
});

export const User = model("User", UserSchema);