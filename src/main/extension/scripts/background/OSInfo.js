var message = "This page knows the operating system you are running: ";
var regexMatchBracket = /\(([^)]+)\)/;
var operatingSystem = navigator.userAgent.match(regexMatchBracket)[1];

var sendOSInfo = function() {
    sendMessagePack(message + operatingSystem, "displayBanner");
};
