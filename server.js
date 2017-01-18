
/*
 * Modular Webservice
 */

var http   = require("http");
var fs     = require("fs");
var config = require("./config/config.js");
var server = http.createServer(onRequest);

/*
 * Add web services as modules here
 * Each module must have at least the following functions
 *  - Init([global_configuration_object])
 *  - OnRequest(request, response)
 */
var ws_modules = [];
ws_modules.push(require("./ws-modules/e-service/e-service.js"));
ws_modules.push(require("./ws-modules/remote-js-console/remote-js-console.js"));

/*
 *  Initialize all ws-modules
 *  Called at the beginning of the program
 */
function initializeModules()
{
    var i = 0;
    var len = ws_modules.length;
    var context =
    {
        server  : server,
        require : require
    };
    for(i = 0; i < len; i++)
    {
    	ws_modules[i].init(context, config);
    }
}

/*
 * Main callback of the program
 * called when an HTTP request arrives to the server
 */
function onRequest(request, response)
{
    var i;
    var len = ws_modules.length;
    for(i = 0; i < len; i++)
    {
    	if(ws_modules[i].onRequest(request, response))
    	{
    		return;
    	}
    }
    response.writeHead(404);
    response.end("Not found");
}

// Start service
initializeModules();
server.listen(config.port);