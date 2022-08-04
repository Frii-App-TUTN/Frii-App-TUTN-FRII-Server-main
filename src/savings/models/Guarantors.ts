import { builtinModules } from 'module';
import { Schema, model } from 'mongoose';

export interface GuarantorSchema{
    shareAmount: number,
    user_id: any,
    loan_id: any,
    dateAccepted: Date,
    extensionDate: Date
}

const GuarantorSchema = new Schema<GuarantorSchema>({
    shareAmount: Number, 
    dateAccepted: {
        type: Date,
        default: null
    },
    extensionDate: {
        type: Date,
        default: null
    },
    loan_id: {
        type: Schema.Types.ObjectId,
        ref: 'Loan'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true});
export const Guarantor = model('Guarantor', GuarantorSchema);