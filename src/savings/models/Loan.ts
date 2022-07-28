import { builtinModules } from 'module';
import { Schema, model } from 'mongoose';

interface LoanSchema{
    amount: string,
    due_date: Date,
    reason: string,
    desc: string,
    paid_status: string,
    guarantors: string[],
    borrower: string,
    dateAccepted: Date,
    extensionDate: string
}

const LoanSchema = new Schema({
    amount: Number,
    due_date: Date,
    reason: String,
    desc: String,
    guarantors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    borrower: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    paid_status: {
        type: String,
        enum: ['pending', 'declined', 'accepted', 'paid', 'unpaid'],
        default: 'pending'
    },
    dateAccepted: {
        type: Date,
        default: Date
    },
    extensionDate: {
        type: Date,
        default: null
    }

}, {timestamps: true});

module.exports = model('Loan', LoanSchema);