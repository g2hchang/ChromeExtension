// we need this in the background side as well
var MessagePack = function(short, long, button ) {
    this.short_message = short;
    this.long_message = long;
    this.button_message = button;
};

// another queue-like object which stores the backlog of
// messages for each level
var levelQueue = {
    1: [],
    2: [],
    3: []
};

chrome.runtime.onConnect.addListener(function(port) { 
  port.onMessage.addListener(function(msg) {
        if (msg.increment != undefined) {
           incrementLessonPlan();
        }                                              
  });                             
});

var incrementLessonPlan = function()
{
    chrome.storage.sync.get({"lessonPlan": 1}, function (obj) {
	setLessonPlan(obj.lessonPlan + 1);
    });
};  

// set the lesson plan to a new value in the Chrome storage
var setLessonPlan = function(value)
{
    chrome.storage.sync.set({'lessonPlan': value}, function() {});
    getLessonMessage();
//    chrome.runtime.reload();
};

// reset the lesson plan to 1 (useful for testing)
var resetLessonPlan = function()
{
    setLessonPlan(1);
    chrome.runtime.reload();
};

// this is the method that should be used for passing messages to banners (not the InfoTab, which uses the queue)
var sendMessagePack = function(message, UIElementName)
{
    chrome.storage.sync.get({"lessonPlan" : 1}, function (obj) {
	    sendPopUpWhenTabIsUpdated(new MessagePack(message, Lessons[obj.lessonPlan]['long_message'], Lessons[obj.lessonPlan]['button_message']), UIElementName);
    });
};  

// has no button text. This is for temporary messages (e.g. for fingerprinting when none has occured).
var sendButtonLessMessagePack = function(message, UIElementName)
{
    chrome.storage.sync.get({"lessonPlan" : 1}, function (obj) {
	    sendPopUpWhenTabIsUpdated(new MessagePack(message, Lessons[obj.lessonPlan]['long_message'], undefined), UIElementName);
    });
};  

// use this method and the one below to send messages to the queue (i.e. the InfoTab)
// enqueue a message to a certain UI element from the stock messages 
// for each level
var enqueueStockBasedOnLessonPlan = function(UIElement)
{
    chrome.storage.sync.get({"lessonPlan": 1}, function (obj) {
	    enqueueMessage(Lessons[obj.lessonPlan], UIElement);
    });
};

// enqueue the messages in the level queue to a certain UI element
// for the current level
var enqueueStockBasedOnLessonPlan = function(UIElement)
{
    chrome.storage.sync.get({"lessonPlan": 1}, function (obj) {
	    for (var i = 0; i < levelQueue[obj.lessonPlan].length; i++) {
		var currentMessage = levelQueue[obj.lessonPlan].shift();
	        enqueueMessage(currentMessage, UIElement);
	    }
    });
};

// add a message to the level queue for a certain level
var addToLevelQueue = function(message, level)
{
    levelQueue[level].push(message);
};
