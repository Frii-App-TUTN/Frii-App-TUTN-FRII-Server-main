import { Schema, model } from 'mongoose';

interface PurseSchema{
    name: string;
    amount: string;
    category: string;
    lock_status: string;
    wallet: string;
    userName: string;
}

const PurseSchema = new Schema({
    name: String,
    amount: {
        type: String,
        default: 0.00
    },
    category: {
        type: String,
        default: null
    },
    lock_status: {
        type: Boolean,
        default: 0
    },
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet'
    }
});

module.exports = model('Purse', PurseSchema);