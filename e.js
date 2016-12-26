
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
          for(int i = 0; i < inputs.length; i++)
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

    })();

    __e.start();
    return { start : start };
}
