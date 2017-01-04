
/*
 * Simple web service that logs events
 */
module.exports = (function(){

    /*
     *  private variables
     */
    var LOG_TAG = "WS-EVENT-REGISTER";
    var MongoClient = require('mongodb').MongoClient;
    var initialized = false;
    var database = null;


    /*
     *  Initialize everything
     *  Called at the beginning of the program by server.js
     */
    function init(config)
    {
        MongoClient.connect(config.mongodb_server + "/jsproxy", function(err, db){
            if(!error) {
                database = db;
                initialized = true;
            }
            else {
                LOG("Error connecting to mongodb:" + JSON.stringify(err));
            }
        });
    }

    /*
     * Main callback of the module
     * called when an HTTP request arrives to the server
     *  - returns true if the request was handled by this module
     *    or false otherwise.
     */
    function onRequest(request, response)
    {
        if(!initialized)
            return false;

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
        try {
            var doc = {
                remote_addr : remoteAddress,
                event_name  : eventType,
                data        : JSON.parse(data)
            };
            var events = database.collection("events");
            events.insert(doc, function(err){
                if(err) {
                    LOG("Error saving event: " + JSON.stringify(err));
                }
                else {
                    LOG("Event saved: " + eventType);
                }
            });
        }
        catch(err){
            LOG("Error saving event: " + JSON.stringify(err));
        }
    }

    /*
     * Each module must use a tag in its logs
     * Use this function instead of console.log(...)
     */
    function LOG(msg)
    {
        var i;
        var lines = msg.split("\r\n");
        var len = lines.length;
        for(i = 0; i < len; i++)
        {
            console.log(LOG_TAG + " - " + lines[i]);
        }
    }

    /*
     *  It returns the public interface
     *  for this module
     */
    return { init      : init,
             onRequest : onRequest };
})();
