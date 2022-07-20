const mongoose = request('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: {
        type: String, required: true
    },
    phoneNumber: Number,
    userName: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;