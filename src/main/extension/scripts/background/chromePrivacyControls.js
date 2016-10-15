// uses the chrome.privacy API to show the user what Chrome allows
// to be sent to websites under the hood. User-friendly messages
// are sent.
var showChromePrivacyInformation = function()
{
   var message = '';
   chrome.privacy.websites.thirdPartyCookiesAllowed.get({}, function(details) {
	if (details.value) {
	   message += "Chrome is allowing foreign websites to store cookies on your machine. "

	   chrome.privacy.websites.thirdPartyCookiesAllowed.get({}, function(details) {
		if (details.value) {
		   message += "<br /> Chrome is also allowing foreign websites to identify where are you are visiting from, allowing them to log this data."
		}
	   
	        enqueueMessage(message, "InfoTab");
	   });
	}	
   }); 
};

showChromePrivacyInformation();


// the only difference is that this is called on demand by the lesson message controller
// (as opposed to the function above, which sends the information to the InfoTab whenever its available)
var showChromePrivacyInformationMessagePack = function()
{
   var message = '';
   chrome.privacy.websites.thirdPartyCookiesAllowed.get({}, function(details) {
        if (details.value) {
           message += "Chrome is allowing foreign websites to store cookies on your machine. "

           chrome.privacy.websites.thirdPartyCookiesAllowed.get({}, function(details) {
                if (details.value) {
                   message += "<br /> Chrome is also allowing foreign websites to identify where are you are visiting from, allowing them to log this data."
                }

	   sendMessagePack(message, "displayBanner");
           });
        } 
   });
};

