// this is like a private helper function. Don't actually use it for passing messages, use the one below.
// each UI element needs to send a message w/ its name for it to communicate w/ the controller

var popUpPortSender = function (message, UIElementName, tabNumber) {
	var port = chrome.tabs.connect(tabNumber);
	port.postMessage({data: message, elementToSendTo: UIElementName});
};

// this reads the extension's data and sends either the message or a 
// placeholder ("disabled"), and then the UI element has to deal with it
// this is also like a helper function. But you can use it if you like,
// the only limitation is that you need to know the current tab ID.

var popUpSenderBasedOnDisabled = function (message, UIElementName, tabNumber) { 
    chrome.storage.sync.get("disabled", function (obj) {                            
        if (obj.disabled == "true") {
            popUpPortSender("disabled", UIElementName, tabNumber); 
        }   
        
        else {                                                                      
            popUpPortSender(message, UIElementName, tabNumber);
        }   
})  
};

// this is better than the function above, you can just pass your messge in and
// when the tab has changed it will be updated

var sendPopUpWhenTabIsUpdated = function(message, UIElementName) {
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        popUpSenderBasedOnDisabled(message, UIElementName, tabId);
        
    }
})};

