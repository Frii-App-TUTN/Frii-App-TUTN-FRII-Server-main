import { Schema, model } from 'mongoose';


export interface customerSchema {
    id: number;
    firstName: string;
    lastName: string;
    customerCode: string;
    phoneNumber: string;
    riskAction: string | "default" ;
}

const customerSchema = new Schema<customerSchema>({
    id: Number,
    firstName: String,
    lastName: String,
    customerCode: String,
    phoneNumber: String,
    riskAction: { type:String, default:"default"},
})
export interface WalletSchema {
    accountId: number;
    accountName: string;
    accountNumber: string;
    amount?: number,
    currency: string;
    createdAt: string;
    updatedAt: string;
    pin?: number;
    emailAddress: string;
    customer: customerSchema;
}
const WalletSchema = new Schema<WalletSchema>({
    accountId: Number,
    accountName: String,
    accountNumber: String,
    currency: String,
    amount: {
       type: Number,
       default: 0
    },
    createdAt: String,
    updatedAt: String,
    emailAddress: String,
    pin: Number,
    customer: {
        type: customerSchema,
        default: {}
    }
});
export const Customer = model('customer', customerSchema);
export const Wallet = model('Wallet', WalletSchema);