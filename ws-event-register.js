
/*
 * Simple webservice to regist events
 */
modules.exports = (function(){

    function init(config)
    {
        // nothing to do here
    }

    function onRequest(request, response)
    {
        if(request.method == "POST" && request.url.indexOf("/ws-event-register/") == 0) {
            var body = "";
            request.on("data", function(data)
            {
              body += data.toString();
            });
            request.on("end", function(data)
            {
               console.log("WS-EVENT-REGISTER \r\n [" + request.connection.remoteAddress + "] event detected: " + request.url + ": " + body + "\r\n\r\n");
            });
            response.writeHead(200,{"Access-Control-Allow-Origin":"*"});
            response.end("ok");
            return true; // request handled
        }
        return false;
    }

    return { init      : init,
             onRequest : onRequest };
})();
