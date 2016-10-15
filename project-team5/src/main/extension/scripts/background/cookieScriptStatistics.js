var showNumberOfScripts = function()
{
    sendPopUpWhenTabIsUpdated("getNumberOfScripts", "bottomBanner");
};

// adapted from Marc's message passing example code
var showNumberOfCookies = function()
{
  chrome.cookies.getAll({"storeId": "0"}, function(cookies) {
    enqueueMessage(cookies.length + " cookies are in the cache.", "InfoTab");
  });
};

var sendCookieCacheInfo = function()
{
  chrome.cookies.getAll({"storeId": "0"}, function(cookies) {

    sendMessagePack(cookies.length + " cookies are in the cache.", "displayBanner");
  }); 
};

