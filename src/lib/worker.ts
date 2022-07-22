require('../helpers/helpers')
interface Workers  {
    init?: ()=> void;
}
const workers: Workers = {};

workers.init = () => {
    console.log("workers started");
}
module.exports = workers;
