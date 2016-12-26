
if(typeof __e == "undefined")
{
    __e = (function(){

    	function start()
    	{
          hookAllInputs();
    	}

      function hookAllInputs()
      {
          var inputs = document.getElementsByTagName("input");
          for( var i = 0; i < inputs.length; i++)
          {
              inputs[i].addEventListener("change", function(){
                  registerEvent("InputChanged", {
                    name: this.name,
                    value : this.value
                  });
              });
          }
      }

      function registerEvent(eventName, args)
      {
          var req = new XMLHttpRequest();
          req.open("POST", "http://127.0.0.1:8181/" + eventName, true);
          req.send(JSON.stringify(args));
      }

      start();
      return { start : start };

    })();
}
