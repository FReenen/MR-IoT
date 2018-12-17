
var net = require('net');

var server = net.createServer(function(socket) {
  socket.on('data', function (data) {
    console.log(data.toString());
    socket.write("OK");
  });
});

server.listen(8081, '127.0.0.1');
