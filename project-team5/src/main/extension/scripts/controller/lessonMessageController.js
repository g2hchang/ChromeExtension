var getLessonMessage = function() {

// calls background scripts to retrieve the relevant data for
// each level.
    chrome.storage.sync.get({"lessonPlan": 1}, function (obj) {
	switch(obj.lessonPlan) {
	   case 1: 
	   case 2: 
		sendOSInfo();
		break;

	   case 3:
        sendPlaceHolderFingerPrintingMessage();
		getFingerPrtingInfo();
		break;

	   case 4: 
	   showChromePrivacyInformationMessagePack(); 
	   break;      

	   case 5:       
	   case 6:       
	   case 7:
		sendCookieCacheInfo();
		break;
	  
        // these are for geolocation
	   case 8:    
	   case 9: 
	   getMapFromIP();
	   break;  

	   case 10:
	   getLocationFromIP();
		break; 

	   case 11:
	   case 12:
        sendPlaceHolderTrackingPixelMessage();
		getTrackingPixelInfo();
		break;

	   case 13:
	   case 14:
        sendPlaceHolderSocialMediaButtonMessage();
		getSocialMediaButtonInfo();
		break;
	}
    });
};

getLessonMessage();

var sendPlaceHolderFingerPrintingMessage = function() {
    sendButtonLessMessagePack("No Fingerprinting has occured.", "displayBanner");				
};

var sendPlaceHolderTrackingPixelMessage = function() {
    sendButtonLessMessagePack("No social media tracking pixels are present.", "displayBanner");				
};

var sendPlaceHolderSocialMediaButtonMessage = function() {
    sendButtonLessMessagePack("No social media buttons originating from Facebook or Twitter are present.", "displayBanner");				
}

var getTrackingPixelInfo = function()
{
    chrome.runtime.onConnect.addListener(function(port) { 
		if (port.name == "trackingPixels") {
      port.onMessage.addListener(function(msg) {
            if (msg.trackingPixelInfo != undefined) {
                sendMessagePack(msg.trackingPixelInfo, "displayBanner");				
            }
      });
	}
    });
};

var getSocialMediaButtonInfo = function()
{
    chrome.runtime.onConnect.addListener(function(port) { 
		if (port.name == "socialMediaButtons") {
      port.onMessage.addListener(function(msg) {
            if (msg.socialMediaButtonInfo != undefined) {
                sendMessagePack(msg.socialMediaButtonInfo, "displayBanner");				
            }
      });
      }
    });
};

var getFingerPrtingInfo = function()
{
	chrome.runtime.onConnect.addListener(function(port) {
		if (port.name == "fingerprint") {
		port.onMessage.addListener(function (msg) {
			if (msg.fingerPrintingInfo != undefined) {
				sendMessagePack(msg.fingerPrintingInfo, "displayBanner");
			}
		});
		}
	});
};
