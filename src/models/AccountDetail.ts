import { Schema, model, Types } from "mongoose";

export interface AccountDetailSchema {
  createdBy: string;
  type: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
  cardNumber: Number;
  cardBrand: string;
  accountName: string;
  created: string;
}

const AccountDetailSchema = new Schema({
  createdBy: {
    type: [Types.ObjectId],
    ref: "User",
    required: true,
  },
  type: String,
  accountNumber: String,
  bankName: String,
  bankCode: String,
  cardNumber: Number,
  accountName: String,
  cardBrand: String,
  created: {
    type: String,
    required: false,
    default: Date.now(),
  },
});

export const AccountDetail = model("AccountDetail", AccountDetailSchema);
