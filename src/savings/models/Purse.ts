import { Double } from 'mongodb';
import { Schema, model } from 'mongoose';

export interface PurseSchema{
    name: string;
    amount: number;
    expectedAmount: number,
    currentAmount: number,
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
        default: 0,
    },
    currentAmount: {
        type: Number,
        default: 0
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
}, {timestamps: true});

module.exports = model('Purse', PurseSchema);