import { Schema, model } from "mongoose";
interface KinSchema {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  relationship: string;
}

const KinSchema = new Schema<KinSchema>({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: Number,
  relationship: String,
});

export const Kin = model("Kin", KinSchema);
