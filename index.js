

var parseString = require('xml2js').parseString;
var request = require('request');

module['exports'] = function helloWorld (hook) {
  // hook.req is a Node.js http.IncomingMessage
  var host = hook.req.host;
  
  var url = hook.params.url;
  
  request(url, function (error, response, body) {
  
  parseString(body, function (err, result) {
      
      hook.res.json(result);
    });
  
});
    
  
  
  
};
