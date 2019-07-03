

var parseString = require('xml2js').parseString;


module['exports'] = function helloWorld (hook) {
  // hook.req is a Node.js http.IncomingMessage
  var host = hook.req.host;
  
  var xml = hook.params.xml;
    parseString(xml, function (err, result) {
      console.dir(result);
    });
  // hook.res is a Node.js httpServer.ServerResponse
  // Respond to the request with a simple string
  hook.res.json(hook.params);
};
