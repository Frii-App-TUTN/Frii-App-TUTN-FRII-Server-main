var server = require('./lib/server');
var workers = require('./lib/workers');

// Declare application

var app = {}

// Init function

app.init = () => {
    // start the server;
    server.init();
    workers.init();
};

// Execute server
app.init();

// Export the app
module.exports = app;