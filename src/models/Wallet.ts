import { Schema, model } from 'mongoose';

interface UserSchema{
    customerID: string;
    accountName: string;
    currency: string;
    accountOpeningDate: string;
    lastTransactionDate: string;
    userName: { type: string; default: string; };
}

const WalletSchema = new Schema({
    customerID: String,
    accountName: String,
    currency: String,
    accountOpeningDate: String,
    lastTransactionDate: String,
    userName: { type: String, default: Date.now() },
});

const Wallet = model('Wallet', WalletSchema);

module.exports = Wallet;