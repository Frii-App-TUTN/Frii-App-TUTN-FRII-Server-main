import express, { Application } from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import path from "path";
require("dotenv").config();
require("../savings/models/seeds/wallet").seedWallets();
const cors = require("cors");

interface Server {
  init?: () => void;
}
const server: Server = {};
type Options = {
  limit: string;
  extended: boolean;
};
const Options = { limit: "10mb", extended: true };

const app: Application = express();

const { log } = console;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'..', 'assets'));
app.use(cors());
app.use(bodyParser.json(Options));
app.use(bodyParser.urlencoded(Options));
app.use(cors());

// Define routes
app.use("/", require("../routes/index"));
app.use("/auth", require("../routes/auth"));
app.use("/account", require("../routes/account"));
app.use("/kin", require("../routes/kin"));
app.use("/group", require("../routes/group"));
app.use('/savings', require('../savings/routes/purse'));
app.use('/savings', require('../savings/routes/loans'));

const PORT = 3000 || process.env.PORT;
const uri = process.env.MONGODB_LINK;

type options = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};
const options: options = { useNewUrlParser: true, useUnifiedTopology: true };
if (!uri) {
  throw new Error("uri missing");
}
server.init = () => {
  connect(uri).then(() =>
    app.listen(PORT, () => log(`port started on Port ${PORT}`))
  );
};
module.exports = server;
