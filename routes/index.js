const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).send('Everything fine here!')
})


module.exports = router;