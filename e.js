
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
                  onInputchanged(this);
              });
          }
      }

      function onInputchanged(input)
      {
          console.log("registred change: " + input.name + " : " + input.value);
      }

      function registerEvent(eventName, args)
      {

      }

      start();
      return { start : start };

    })();
}
