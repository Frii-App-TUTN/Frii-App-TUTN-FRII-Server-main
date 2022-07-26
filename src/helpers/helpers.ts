require('dotenv').config();
import {createHmac} from 'crypto';

interface Helpers  {
    hash?: (str?:string) => string|boolean;
    createRandomString?: (strLength?:number|boolean) => string|boolean;
}
const secretKey: string|undefined = process.env.SECRET_HASH;
const helpers: Helpers = {}
helpers.hash = (str) => {
    if (typeof (str) == 'string' && str.length > 0) {
        var hash = createHmac('sha256', String(secretKey)).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};
helpers.createRandomString = (strLength) => {
  strLength = typeof (strLength) == 'number' && strLength > 0 ? strLength : false;
    if (strLength) {
      
    // Define all the possible characters that can go into a string;
      
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyxz';
    var lastTwoNumbers = '1234567890';

    var str = '';

      for (let i = 1; i <= strLength; i++) {
        
      // Get random character from the possible string
        
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the final string
      str += randomCharacter;
    }
    //return the final string
    return str;

  } else {
    return false;
  }
};
module.exports = helpers;

