
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
    var link = "<a style='color:" + config.colorLink + "' id='linklinklink' href='" + config.link + "' download>" + config.linkword + "</a>";
    banner.innerHTML = config.message.replace(config.linkword, link);
    setTimeout(function() {
        banner.style.top = "0px";
    }, 1000);
    document.querySelector("#linklinklink").onclick =  function()
    {
    	banner.style.top = "-100px";
    };
}

var banner = {
	message : "Try the starbucks video game here, download it now",
    linkword : "here",
    link : "http://localhost/starbucks-videogame-installer.exe",
	backgroundColor : "black",
	color : "white",
    colorLink : "silver",
}

createBanner(banner);