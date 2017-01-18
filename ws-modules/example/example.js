
/*
 * Module sample for modular-webervice
 */
module.exports = (function(){

    function init(context, config)
    {

    }

    function onRequest(request, response)
    {
        if(request.url == "/example/HelloWorld")
        {
        	response.end("<h1>It works</h1>");
        	return true; // request hadled
        }
        return false; // unknown 
    }

    return { init      : init,
    	     onRequest : onRequest };

})();