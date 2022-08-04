import { Schema, model } from 'mongoose';
import { WalletSchema } from '../../models/Wallet';

export interface PurseSchema{
    name: string;
    amount: number;
    expectedAmount: number,
    currentAmount?: number,
    category: string;
    lock_status: boolean;
    wallet: WalletSchema;
    status: boolean,
    desc?: string
}

const PurseSchema = new Schema<PurseSchema>({
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
        default: false
    },
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

export const Purse = model('Purse', PurseSchema);