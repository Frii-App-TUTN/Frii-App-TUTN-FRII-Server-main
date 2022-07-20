require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const server = {};

const express = require("express");
const app = express();
const { log } = console;
app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Define routes
app.use('/', require('../routes/index'))
app.use('/auth', require('../routes/auth'))



const PORT = 3000 || process.env.PORT;
server.init = () => {
    // mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    // .then(() => app.listen(PORT, () => log(`port started on Port ${PORT}`)))
    app.listen(PORT, () => log(`port started on Port ${PORT}`))
}
module.exports = server;