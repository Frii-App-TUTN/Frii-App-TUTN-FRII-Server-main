require('dotenv').config();
const crypto = require('crypto');

const helpers = {}
helpers.hash = (str) => {
    if (typeof (str) == 'string' && str.length > 0) {
        var hash = crypto.createHmac('sha256', process.env.SECRET_HASH).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

module.exports = helpers;

