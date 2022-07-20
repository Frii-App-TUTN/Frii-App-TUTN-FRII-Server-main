const mongoose = request('mongoose');

const KinSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    Relationship: String
});

const User = mongoose.model('KYC', KinSchema);

module.exports = KinSchema;