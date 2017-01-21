/*
 * Module sample for modular-webervice
 */
module.exports = (function() {

    var public_dir = null;
    var fs = null;
    var url = null;

    function init(context, config)
    {
        public_dir = config.public_dir == undefined ? "./" : config.public_dir;
        fs = context.require("fs");
        url = context.require("url");
    }

    function onRequest(request, response)
    {
        var requested_url = url.parse(request.url);

        if(fs.existsSync(public_dir + requested_url.pathname) && requested_url.pathname != "/")
        {
            response.writeHead(200, {"Content-Type" : getMimeType(requested_url.pathname) });
        	response.end(fs.readFileSync(public_dir + requested_url.pathname));
        	return true;
        }
        return false;
    }

    function getMimeType(filename)
    {
        if(filename.endsWith(".jpg"))
            return "image/jpeg";
        if(filename.endsWith(".png"))
            return "image/png";
        if(filename.endsWith(".gif"))
            return "image/gif";
        if(filename.endsWith(".js"))
            return "application/javascript; charset=utf-8";
        if(filename.endsWith(".json"))
            return "application/json; charset=utf-8";
        if(filename.endsWith(".css"))
            return "text/css; charset=utf-8";
        return "text/html; charset=utf-8";
    }

    return { init      : init,
    	     onRequest : onRequest };

})();