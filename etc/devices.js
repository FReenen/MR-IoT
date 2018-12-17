
// TODO: get data from a database
devices = {
  simulation: {
    addr: "localhost:8081",
    name: "Test simulations",
    type: "recever",
    values: [
      {
        "name": "status",
        "type": "number",
        "max": 1
      }
    ]
  }
};

module.exports.get = function(deviceID){
  if(devices.hasOwnProperty(deviceID)){
    return devices[deviceID]
  }else {
    return false;
  }
}
