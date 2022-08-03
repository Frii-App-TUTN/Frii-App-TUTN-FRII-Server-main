import { Schema, model } from 'mongoose';
import { UserSchema } from '../../models/User';

export interface loanSchema{
    amount: string,
    due_date: Date,
    reason: string,
    desc: string,
    status: string,
    guarantors: UserSchema,
    borrower: UserSchema,
    dateAccepted: Date,
    extensionDate: Date
}

const loanSchema = new Schema<loanSchema>({
    amount: Number,
    due_date: Date,
    reason: String,
    desc: String,
    guarantors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Guarantor'
        }
    ],
    borrower: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'declined', 'accepted', 'paid', 'unpaid'],
        default: 'pending'
    },
    dateAccepted: {
        type: Date,
        default: null
    },
    extensionDate: {
        type: Date,
        default: null
    }

}, {timestamps: true});

module.exports = model('Loan', loanSchema);