var net = require('net'),
    config = require('./../etc/config.js');

var responce, test = 0;

var server = net.createServer(function(socket) {
  socket.on('data', function (data) {
    data = data.toString();
    socket.end("OK");
    if(data == responce){
      responce = '';
      nextTest();
    }else{
      console.error("test " + test + " faild")
      console.log("data: " + data)
    }
  });
});

var client = new net.Socket();
client.on('data', function(data){
  client.destroy();
});

function nextTest(){
  switch (test) {
    case 0:
      client.connect(config.listen, 'localhost', function() {
        client.end("GET /set?device=simulation&msg=test\r\nhost: localhost\r\naccept: */*\r\n\r\n");
        responce = 'test'
      });
      break;
    default:
      console.log("All test succeeded")
  }
  test+=1;
}


server.listen(8081, '127.0.0.1');
nextTest();
