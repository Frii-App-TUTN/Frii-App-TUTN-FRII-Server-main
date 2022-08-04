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

// export interface loanPaymentSchema{
//     loan_id: any,
//     paid_amount: number,
//     actual_amount: number,
//     amount_remaining: number
// }

// const loanPaymentSchema = new Schema<loanPaymentSchema>({
//     paid_amount: Number,
//     actual_amount: Number,
//     amount_remaining: Number,
//     loan_id: {
//         type: Schema.Types.ObjectId,
//         ref: 'Loan'
//     }
// });
module.exports = model('Loan', loanSchema);
// module.exports = model('loanPayment', loanPaymentSchema);
