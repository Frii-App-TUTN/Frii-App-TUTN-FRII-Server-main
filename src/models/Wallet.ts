import { Schema, model } from 'mongoose';

interface WalletSchema{
    customerID: string;
    accountName: string;
    currency: string;
    accountOpeningDate: string;
    lastTransactionDate: string;
    userName: { type: number; default: number; };
    purses: string[];
}

const WalletSchema = new Schema<WalletSchema>({
    customerID: String,
    accountName: String,
    currency: String,
    accountOpeningDate: String,
    lastTransactionDate: String,
    userName: { type: Number, default: Date.now() },
    purses: [String]
});

const Wallet = model('Wallet', WalletSchema);

module.exports = Wallet;