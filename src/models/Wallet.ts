import { Schema, model } from 'mongoose';

interface WalletSchema{
    customerID: string;
    accountName: string;
    currency: string;
    accountOpeningDate: string;
    lastTransactionDate: string;
    userName: { type: string; default: string; };
}

const WalletSchema = new Schema<WalletSchema>({
    customerID: String,
    accountName: String,
    currency: String,
    accountOpeningDate: String,
    lastTransactionDate: String,
    userName: { type: String, default: Date.now() },
});

const Wallet = model('Wallet', WalletSchema);

module.exports = Wallet;