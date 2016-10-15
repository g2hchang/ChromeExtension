

// // console.log(chrome.cookies.get());
// var APImessage, cookieMessage = "too soon";

// var loadCookiesAPI = function() {
// 	if (!chrome.cookies) {
// 		APImessage = "chrome.cookies NOT loaded";
// 	}
// 	else {
// 		APImessage = "chrome.cookies IS available";	

// 	}
// };

// loadCookiesAPI();

// var loadCookies = function(sendResponse) {
//   chrome.cookies.getAll({}, function(cookies, sendResponse) {
//   	cookieMessage = cookies.length;
//     sendResponse({farewell: cookieMessage});
//   });
// };

// // loadCookies();

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting == "hello") {
//       loadCookies(sendResponse);
//     }
//   });
var newCookieMessage = "";

chrome.cookies.onChanged.addListener(function(info) {
 	console.log("onChanged" + JSON.stringify(info));
 	if (!info.cookie.hostOnly && (info.cause === "explicit" || info.cause === "overwrite")) {
 		newCookieMessage = "Foreign website " + info.cookie.domain + 
 		" stored, removed or updated a cookie on your machine.";	
 		console.log(newCookieMessage);
 	}
});

//console.log(chrome.cookies.get());
var APImessage, cookieMessage = "too soon";

var loadCookiesAPI = function() {
  if (!chrome.cookies) {
    message = "chrome.cookies NOT loaded";
  }
  else {
    message = "chrome.cookies IS available";  

  }
};


var loadCookies = function() {
  chrome.cookies.getAll({"storeId": "0"}, function(cookies) {
    cookieMessage = cookies.length;
  // chrome.cookies.getAllCookieStores( function(cookies) {
    // cookieMessage = cookies;
  });
};

loadCookies();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello") {
      sendResponse({farewell: cookieMessage});
    }
    
    else if (request.greeting === "isThereANewCookie") {
        sendResponse({updatedCookie: newCookieMessage});
    }
  });
