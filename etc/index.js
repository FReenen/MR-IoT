
var DEBUG = true;

var http = require('http'),
    devices = require('./devices.js'),
    config = require('./config.js'),
    action = require('./actions');

var server = http.createServer(function (req, res) {

  var dir, query, queryTmp;

  if(DEBUG){
    console.log("New request ======================")
    console.log("url: " + req.url);
  }

  // split dirrectory and query from url
  // TODO: accept GET and POST.
  [dir, queryTmp] = req.url.split(/\?(.+)/)
  if(!queryTmp){
    queryTmp = req.read();
  }

  // read query values
  if(queryTmp){
    queryTmp = queryTmp.split('&');
    query = {};
    for (var i = 0; i < queryTmp.length; i++) {
      queryTmp[i] = queryTmp[i].split('=')
      query[queryTmp[i][0]] = queryTmp[i][1]
    }
  }else{
    error(404, "No query data given")
    return
  }
  delete queryTmp

  // check for a divice
  if(query.hasOwnProperty("device")){
    var device;
    if(device = devices.get(query.device)){
      query.device = device;
    }else{
      error(404,"Device not found");
      if(DEBUG)
        console.log("ERROR: (device: "+query.device+")");
      return
    }
  }

  if(DEBUG)
    console.log(query)

  // start the action
  switch (dir) {
    case "/set":
      action.set(query);
      break;
    default:
      error(404,"Invalid directory");
      if(DEBUG)
        console.log("ERROR: (dir: "+dir+")")
      return;
  }

  res.end('{\r\n\t"errno":"0"\r\n}');

  function error(code, msg){
    res.end('{\r\n\t"errno":"'+code+'",\r\n\t"error":"'+msg+'"\r\n}');
    if(DEBUG)
      console.log("ERROR: " + code + " " + msg)
  }
})

server.listen(config.listen);
