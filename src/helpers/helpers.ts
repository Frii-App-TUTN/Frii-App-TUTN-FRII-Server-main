require('dotenv').config();
import {createHmac} from 'crypto';

interface Helpers  {
    hash?: (str:string|undefined) => string|boolean;
}
const secretKey: string|undefined = process.env.SECRET_HASH;
const helpers: Helpers = {}
helpers.hash = (str:string|undefined):string|boolean => {
    if (typeof (str) == 'string' && str.length > 0) {
        var hash = createHmac('sha256', String(secretKey)).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

module.exports = helpers;

