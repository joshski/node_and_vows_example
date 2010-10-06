var http = require('http'),
    app = require('./app');

exports.server = http.createServer(app.respond);
exports.server.listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');