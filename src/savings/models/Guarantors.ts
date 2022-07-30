import { builtinModules } from 'module';
import { Schema, model } from 'mongoose';

export interface GuarantorSchema{
    amount: number,
    user_id: string[],
    status: boolean,
    dateAccepted: Date,
    extensionDate: Date
}

const GuarantorSchema = new Schema({
    loanShareAmount: Number,
    accepted: {
        type: Boolean,
        default: 0 
    },
    dateAccepted: {
        type: Date,
        default: null
    },
    extensionAcceptedDate: {
        type: Date,
        default: null
    },
    loan: {
        type: Schema.Types.ObjectId,
        ref: 'Loan'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true});

module.exports = model('Guarantor', GuarantorSchema);