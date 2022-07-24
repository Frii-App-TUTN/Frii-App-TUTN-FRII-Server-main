import { builtinModules } from 'module';
import { Schema, model } from 'mongoose';

interface LoanSchema{
    amount: string,
    due_date: Date,
    reason: string,
    guarantors: []
}

const LoanSchema = new Schema({
    amount: {
        type: String,
        due_date: Date,
        reason: String,
        guarantors: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
});

module.exports = model('Loans', LoanSchema);