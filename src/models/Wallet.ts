import { Schema, model } from 'mongoose';

interface WalletSchema {
    customerID: string;
    accountName: string;
    currency: string;
    accountOpeningDate: string;
    lastTransactionDate: string;
    userName: { type: number; default: number; };
    purses: {type: string[], default: []};
    emailAddress: string;
}

const WalletSchema = new Schema<WalletSchema>({
    customerID: String,
    accountName: String,
    currency: String,
    accountOpeningDate: String,
    lastTransactionDate: String,
    userName: { type: Number, default: Date.now() },
    purses: {type: [String], default: []},
    emailAddress: String
});

const Wallet = model('Wallet', WalletSchema);

module.exports = Wallet;