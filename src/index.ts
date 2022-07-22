var server = require('./lib/server');
var worker = require('./lib/worker');

// Declare application

interface App {
    init?: () => void;
}
var app:App = {};

// Init function

app.init = ():void => {
    // start the server;
    server.init();
    worker.init();
};

// Execute server
app.init();

// Export the app
module.exports = app;