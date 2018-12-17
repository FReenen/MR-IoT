var net = require('net');

module.exports = function(query){
  var client = new net.Socket();

  var addr = query.device.addr.split(':')

  if(query.device.type != "recever"){
    return 1 // ERROR 1: devices isn't a recever
  }

  var data = {}
  for (var i = 0; i < query.device.values.length; i++) {
    // TODO: error on not given required value(s) for devices
    if(query.hasOwnProperty(query.device.values[i].name)){
      var value = query[query.device.values[i].name]

      switch (query.device.values[i].type) {
        case "number":
          if(value > query.device.values[i].max){
            return 3 // ERROR 3: invalid value
          }
          break;
        default:
          return 2 // ERROR 2: invalid device value type
      }

      data[query.device.values[i].name] = value
    }
  }

  client.connect(addr[1], addr[0], function() {
    for (var key in value) {
      if (!value.hasOwnProperty(key)) continue;

      client.write(key)
      client.write("=")
      client.write(value.key)
    }
    client.end()
  });

  client.on('data', function(data) {
    if(data.toString() != "OK"){
      console.log("set query failt");
    }else{
  	  console.log("send sucesfull");
    }
  	client.destroy();
  });
}
