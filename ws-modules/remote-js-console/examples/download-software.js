

function createBanner(config)
{
    var height = 50;
    var banner = document.createElement("div");
    banner.id = "banner-download-blah";
    banner.style.backgroundColor = config.backgroundColor;
    banner.style.color = config.color;
    banner.style.width = "100%";
    banner.style.height = height + "px";
    banner.style.position = "fixed";
    banner.style.top = "-50px";
    banner.style.textAlign = "center";
    banner.style.lineHeight = height + "px";
    banner.style.fontWeight = "bold";
    banner.style.zIndex = "999";
    banner.style.transition = "all 1s linear";
    document.body.appendChild(banner);
    banner.innerHTML = config.innerHTML;
    setTimeout(function() {
        banner.style.top = "0px";
    }, 1000);
    document.querySelector("#linklinklink").onclick =  function()
    {
    	banner.style.top = "-100px";
    };
}

var banner = {
	innerHTML : "Try a new github plugin for chrome <a id='linklinklink' href='http://localhost/github-installer.exe' download> here !</a>&nbsp;&nbsp;&nbsp;&nbsp;",
	backgroundColor : "#e5e5e5",
	color : "black",
}

createBanner(banner);