// The minimum difference in timestamps for an entry to be stored in the
// database, *in milliseconds*. Needs to be tuned.
const COOKIE_MIN_TIME_DIFF = 5000;
var lastFirstParty = "";
var lastTimeStamp = {};

// Cookies are stored in an IndexedDB
var DB_NAME = "CookieDB";
var DB_VERSION = 3;
var DB_STORE = "Cookies";

var cookieCounter = 0;
// var cookieQueue = [];
// var toSendArray = new Array();

// Background script opens the database on launch
var request = indexedDB.open(DB_NAME, DB_VERSION);

request.onerror = function(event) {
	console.error("Couldn't open IndexedDB.", event.error);
};

var db;

request.onsuccess = function(event) {
	db = event.target.result;
	// Specify a standard error handler for database.
	db.onerror = function(event) {
		console.log("Database error.", event.target.errorCode);
	};
};

request.onupgradeneeded = function(event) {
	console.log("Upgrading DB");
	db = event.target.result;

	// Everything breaks if we try to create an ObjectStore that already
	// exists.
	if (db.objectStoreNames.contains(DB_STORE)) {
		db.deleteObjectStore(DB_STORE);
	}

	var objectStore = db.createObjectStore(DB_STORE, 
		{ autoIncrement: true }); 
	console.log("Created ObjectStore");
	
	objectStore.createIndex("thirdParty", "thirdParty", { unique: false });
	objectStore.createIndex("firstParty", "firstParty", { unique: false });
	objectStore.createIndex("thirdPartySimple", "thirdPartySimple", { unique: false});
	objectStore.createIndex("date", "date", { unique: false });
};

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.type == "getCookieCount") {
			var cookieCount = cookieCounter;
			cookieCounter = 0;
			console.debug("sending response");
			sendResponse({cookieCount: cookieCount});
		} else if (request.type == "getCookieQueue") {
			sendResponse({cookieQueue: cookieQueue});
			cookieQueue = [];
		}
	});


chrome.webRequest.onCompleted.addListener(function(details){

	// Store timestamp for connection; not used yet.
	var d = new Date(details.timeStamp);
	var fullURL = details.url;
	var thirdPartyInfo = getHostnameAndPath(fullURL);
	var hostname = thirdPartyInfo["hostname"];

	var tabId = details.tabId;
	if (tabId <= 0) {
		// tabID -1 means request didn't come from an open tab.
		return;
	} 

	// Get the URL the user is actually visiting; if it is the same, we ignore
	// this request, since it is technically first party.
	chrome.tabs.get(tabId, function (tab) {

		// Since chrome uses the address bar as a search, typing in an empty
		// tab causes webRequests, but in this case tab appears to be undefined.
		if (chrome.runtime.lastError) {
			// This occurs frequently enough that I don't want to log it
			//right now.
//        	console.log(chrome.runtime.lastError.message);
    		return;
    	}
		// if (typeof tab == "undefined") {
		// 	return;
		// }

		var firstPartyURL = tab.url;
		var firstPartyInfo = getHostnameAndPath(firstPartyURL);
		var firstPartyHostname = firstPartyInfo["hostname"];
		var firstPartyPathname = firstPartyInfo["path"];
		
		// Fun fact: your browser connects to google servers if you refresh 
		// a new tab page with google on it. This looks silly in the database.
		if (firstPartyHostname == "newtab") {
			return;
		}

		// Check if last connection is from a third party. This matters because
		// we don't really care about connections to first parties.
		if (!compareHosts(hostname, firstPartyHostname)) {
//			console.log("\nFirst Party Connection: " + firstPartyHostname)
//			console.log("Third Party Connection: " + hostname);

			// Yet another asynchronous call, to see if the user's machine
			// has a cookie that matches the url of the current connection.
			var cookieDetails = {"url" : fullURL};
			chrome.cookies.getAll(cookieDetails, function (allCookies) {
				if (allCookies.length > 0) {
//					console.log("\t" + hostname + " has cookie");
					storeCookieData(d, hostname, firstPartyHostname,
									firstPartyPathname);
				}
			});
		}

		}
	);
},
{urls: [ "<all_urls>" ]},['responseHeaders']);


/*
 * Takes a full URL and returns the hostname and pathname it contains.
 * e.g. takes "http://www.test.com/sub1/sub2" and returns
 *            { hostname: "www.test.com", path: "/sub1/sub2" }
 *
 * @param {String} fullURL
 */
function getHostnameAndPath (fullURL) {
	var doc = document.createElement("a");
	doc.href = fullURL;
	return { hostname: doc.hostname, path: doc.pathname };
}

/*
 * Takes two hostname strings, and compares hostname. This function
 * needs to slice the url, since you might get "img.buzzfeed.com" when
 * visiting "www.buzzfeed.com". Returns true if host1 matches host2 as 
 * described above.
 *
 * @param {String} host1
 * @param {String} host2
 */
function compareHosts(host1, host2) {
	var name1 = host1.split(".").slice(-2,-1);
	var name2 = host2.split(".").slice(-2,-1);
	return (name1.toString() === name2.toString())
}


function getSimpleHost(hostname) {
	return hostname.split(".").slice(-2,-1)[0];
}


/* 
 * Stores given data in the database.
 * 
 * @param {Date} date - timestamp for request
 * @param {String} thirdParty - third party hostname
 * @param {String} firstParty - first party hostname
 */
function storeCookieData(date, thirdParty, firstParty, firstPartyPath) {

	var thirdPartySimple = getSimpleHost(thirdParty);
	var toAdd = {
		thirdParty:        thirdParty,
		thirdPartySimple:  thirdPartySimple,
		firstParty:        firstParty,
		firstPartyPath:    firstPartyPath,
		date:              date
	};


	// Multiple HTTP requests are made to the same site on every load;
	// If we recently stored this data, we skip it.
	if (lastFirstParty == firstParty) {
		if (typeof lastTimeStamp[thirdParty] != "undefined" &&
			date - lastTimeStamp[thirdParty] < COOKIE_MIN_TIME_DIFF ) {
//			console.log("Skipped: " + thirdParty);
			return;
		}
		console.debug(thirdParty + " " + JSON.stringify(date));
		// toSendArray.push(toAdd);
		enqueueMessage(toAdd, "InfoTab");	
	} else { 
		// If we're on a new page, then we clear the timestamps, since we 
		// want to catch all cookies. This still has issues if multiple
		// pages are loaded concurrently.
		lastTimeStamp = {};
		// send_to_UI(toSendArray);
		// toSendArray = [];
		resetUIQueue("InfoTab"); //!!!
	}

	cookieCounter += 1;
	// cookieQueue.push(toAdd);

	// Store the thirdparty name in LocalStorage.
	chrome.storage.local.get({"thirdparties": []}, function(items) {
		if (items["thirdparties"].includes(thirdPartySimple)) {
			return;
		} 
		items["thirdparties"].push(thirdPartySimple);
		chrome.storage.local.set({"thirdparties": items["thirdparties"]}, null);
	});

	lastFirstParty = firstParty;
	lastTimeStamp[thirdParty] = date;

	var store = db.transaction(DB_STORE, "readwrite").objectStore(DB_STORE);

	// Add record to the database.
	addRecord(toAdd, store);
}


/* 
 * Adds record to the database. Note that toAdd must contain correct keys.
 * 
 * @param {Object} toAdd - The object to be added.
 * @param {IDBObjectStore} store - the ObjectStore to put record in. 
 */
function addRecord(toAdd, store) {
	var reqAdd = store.put(toAdd);
	reqAdd.onsuccess = function (event) {
	};

	reqAdd.onerror = function (event) {
		console.error("Could not store.", event.target.error);
	};
}

// function send_to_UI(toSend) {
// 	if (toSend.length > 0) {
// 	//sendPopUpWhenTabIsUpdated(toSend, "bottomBanner");
// 	sendPopUpWhenTabIsUpdated(toSend.length + " 3rd party cookies have been stored by this website.", "bottomBanner");
// 	}
// }
