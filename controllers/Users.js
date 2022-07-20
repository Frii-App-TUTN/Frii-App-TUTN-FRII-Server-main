const Users = require('../models/User');

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    try {
        let User = await Users.findOne({ email });

        if (!User) {
            User = new User({ firstName, lastName, email, password, phoneNumber })
            await User.save()
            res.status(200).son(User);
        } else {
            res.status(409).json({ error: 'User Already exists' });
        }

    }   
    catch (err) {
        res.status(404).json({error: err})
    }
}

export const getUser = async (req, res) => {
    const { password, email } = req.body;
    try {
        const User = await Users.findOne({ email });

        res.status(200).son(User);

    }   
    catch (err) {
        res.status(404).json({Error: err})
    }
}
export const updateUser = async (req, res) => {
    const { password, email } = req.body;
    try {
        const User = await Users.updateOne({ email }, {
            $set: {
            // data to be updated
        }});
        res.status(200).json(User);

    }   
    catch (err) {
        res.status(404).json({Error: err})
    }
}
export const deleteUser = async (req, res) => {
    const { password, email } = req.body;
    try {
        const User = await Users.deleteOne({ email });
        res.status(200).json(User);

    }   
    catch (err) {
        res.status(404).json({Error: err})
    }
}