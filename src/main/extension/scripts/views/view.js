"use strict";

/* NOTE that this script relies on other UI scripts being loaded before this one.
   This is easily managed by making this script the last in the order of "content scripts" in the manifest.json.
*/

// Set up the persistent tab, if the popups are enabled
var info_tab, top_banner, bottom_banner;

top_banner = new TopBanner();
bottom_banner = new BottomBanner();

/*
    NOTE: this call to storage is asynchronous, so that the page objects may not be instantiated soon enough!
*/
chrome.storage.sync.get("disabled", function (obj) {                            
    if (obj.disabled == "false") {
        console.log("not disabled");
        info_tab = new InfoTab();
    }
    else{
        console.log("disabled");
    }
});



// Set up the hidden banners, for use in the page when there is a message to display for a short time
$( "body" ).append( "<div id='bottom_banner' class='banner'></div>" );

var MessagePack = function(short, long, button ) {
    this.short_message = short;
    this.long_message = long;
    this.button_message = button;
}


// for passing messages to the UI

$(document).ready(function() {
chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
	var message = msg.data;
	var UIElementName = msg.elementToSendTo;

        if (message === "getNumberOfScripts") {
	    message = $("script").length + " scripts are running on this page.";
        }

	if (message === "disabled") {
	    return;
	}
        chrome.runtime.sendMessage({type: "getCookieCount"}, function(response) {
                displayOnUIElement(response.cookieCount + " 3rd party cookies have been stored by this website.", "bottomBanner");
        });
        displayOnUIElement(message, UIElementName);
  });
});
});
var displayOnUIElement = function (message, UIElementName)
{
    var newMessage = message;
    if (typeof(message) == "array" || typeof message === "object" && message['firstParty'] != undefined) {
        //newMessage = parseThirdPartyCookies(message);
	newMessage = message.length + " 3rd party cookies have been stored by this website.";
	console.log("does this actually ever happen?" + newMessage);
    }

$(document).ready(function() {
    switch (UIElementName) {
        case "bottomBanner":
                bottom_banner.showMessage(newMessage);
                break;  
        case "displayBanner":
                // top_banner.showMessage(newMessage);

                // To test the new button:
                //var message_pack = new MessagePack(newMessage, "This is a LOOOOOOOOOOONNNNNG message!", "click me for nonsense");
                top_banner.showMessagePack(message);
                break; 
        case "InfoTab":
                info_tab.showMessage(message);
                break;
    }
});
};


var parseThirdPartyCookies = function (cookieList)
{
    var message = '';

    for (var i = 0; i < cookieList.length; i++) {	
	var currentCookie = cookieList[i];

	if (currentCookie['firstParty'] === undefined) {
	    continue;
	}

        message += "<p><strong>";
	message += currentCookie["thirdParty"] + "</strong> is storing a cookie on your machine via <strong>";
	message += currentCookie["firstParty"] + "</strong></p>";
    }

    return message;
};

var getQueue = function(UIElementName)
{
    var port = chrome.runtime.connect({name: "get_queue"});
    port.postMessage({UIElementName: UIElementName});
    port.onMessage.addListener(function(msg) {
	if (msg != undefined) {
	    displayOnUIElement(msg, UIElementName); 
	}
    });
};

