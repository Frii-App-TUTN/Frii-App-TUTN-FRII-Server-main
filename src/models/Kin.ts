<<<<<<< HEAD
import { Schema, model, Types } from "mongoose";
=======
import { Schema, model } from "mongoose";

>>>>>>> f8236c40ae72b92882f63b1f097118918494db55
export interface KinSchema {
  createdBy: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  relationship: string;
}

const KinSchema = new Schema({
  createdBy: {
    type: [Types.ObjectId],
    ref: "User",
    required: true,
  },
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: Number,
  relationship: String,
});

export const Kin = model("Kin", KinSchema);
