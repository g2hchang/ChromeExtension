var messageQueue;

var enqueueMessage = function(message, UIElement)
{
    var newMessage = message;
//    if (typeof newMessage === "object") {
  //      newMessage = parseThirdPartyCookie(message);	
   // }

    messageQueue[UIElement].push(newMessage);
};

var dequeueMessage = function(UIElement)
{
    if (messageQueue[UIElement].length == 0) {
        throw { name: 'QueueEmpty', message: 'Message queue for ' + UIElement + ' is empty' };
    }

    // shift = dequeue in JS
    var nextInLine = messageQueue[UIElement].shift();
    sendPopUpWhenTabIsUpdated(nextInLine, UIElement);		
};

var dequeueMessages = function(UIElement)
{
    // make a single string with all messages, seperated by newlines
    var joinedMessage = messageQueue[UIElement].join(" \n");
    sendPopUpWhenTabIsUpdated(joinedMessage, UIElement);		
    messageQueue[UIElement] = []; 
};

var resetQueue = function()
{
    messageQueue = {"displayBanner" : [], "bottomBanner": [], "InfoTab": []};
};

resetQueue();

var resetUIQueue = function(UIElement)
{
    messageQueue[UIElement] = [];
};

var parseThirdPartyCookie = function (cookie)
{
    var message = '';

    message += cookie['thirdParty'] + " is storing a cookie on your machine via ";
    message += cookie['firstParty'] + ".";

    return message;
};

// listen for incoming messages from the content scripts
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name == "get_queue") {
        port.onMessage.addListener(function(msg) {
            if (msg.UIElementName != undefined) {
                port.postMessage(messageQueue[msg.UIElementName]);
            }
        });
    }
});
