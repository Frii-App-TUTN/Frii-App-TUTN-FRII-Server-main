import { Double } from 'mongodb';
import { Schema, model } from 'mongoose';

interface PurseSchema{
    name: string;
    amount: number;
    category: string;
    lock_status: boolean;
    wallet: string;
    status: boolean
}

const PurseSchema = new Schema({
    name: String,
    desc: String,
    expectedAmount: {
        type: Number,
        default: 0.00,
    },
    currentAmount: {
        type: Number,
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
    },
    status: {
        type: Boolean,
        default: 1
    }
});

module.exports = model('Purse', PurseSchema);