
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
               registerEvent(request.connection.remoteAddress, request.url, body);
            });
            response.writeHead(200,{"Access-Control-Allow-Origin":"*"});
            response.end("ok");
            return true; // request handled
        }
        return false;
    }

    function registerEvent(remoteAddress, eventType, data)
    {
        var message = "\r\n\r\nWS-EVENT-REGISTER" +
                      "\r\nRemote address : " + remoteAddress +
                      "\r\nEvent          : " + eventType +
                      "\r\nData           : " + data;
        console.log(message);
    }

    return { init      : init,
             onRequest : onRequest };
})();
