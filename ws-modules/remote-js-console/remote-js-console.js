/*
 * Remote console
 */
module.exports = (function(){

    // modules and classes
    var LOG_TAG = "REMOTE-JS-CONSOLE";
    var URL = null;
    var WebSocketServer = null;
    var Zombie = null;
    var Master = null;

    // private properties
    var zombies = [];
    var wsserver =  null;

    /*
     *  Initialize everything
     *  Called at the beginning of the program by server.js
     */
    function init(context, config)
    {
        URL = context.require("url");
        Zombie = require("./zombie.js");
        Master = require("./master.js");
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
            array.push(zombies[i].toJson());
        }
        setHeaders(response);
        response.end(JSON.stringify(array));
    }

    function onConnect(websocket)
    {
        if(websocket.protocol == "zombie")
        {
            var zomb = new Zombie(websocket);
            zomb.on("ready", function() {
                addZombie(zomb);
            });
            zomb.on("destroy", function() {
                removeZombie(zomb);
            });
        }

        else if(websocket.protocol == "master")
        {
            master = new Master(websocket);
            master.on("command", function(zomb_id, payload){
                var dest = getZombieById(zomb_id);
                if(dest != null)
                    dest.exec(payload);
            });
        }
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

    function getZombieById(id)
    {
        var id = id;
        var i, l = zombies.length;
        for(i = 0; i < l; i++)
        {
            console.log(zombies[i].getZombieId() + " vs " + id);
            if(zombies[i].getZombieId() == id)
            {
                return zombies[i];
            }
        }
        return null;
    }

    function addZombie(zombie)
    {
        zombies.push(zombie);
    }

    function removeZombie(zombie)
    {
        var id = zombie.getZombieId();
        var i, l = zombies.length;
        for(i = 0; i < l; i++)
        {
            if(zombies[i].getZombieId() == id)
            {
                zombies.splice(i,1);
                return;
            }
        }
    }

    /*
     *  It returns the public interface
     *  for this module
     */
    return { init      : init,
             onRequest : onRequest };
})();
