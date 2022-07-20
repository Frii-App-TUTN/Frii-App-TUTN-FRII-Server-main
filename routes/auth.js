const express = require('express');
const router = express.Router();


router.get('/signin', (res, req, next) => {
    return res.status(200).send('Everything fine here!')
})
router.get('/login', (req, res, next) => {
    return res.status(200).send('Everything fine here!')
})


module.exports = router;