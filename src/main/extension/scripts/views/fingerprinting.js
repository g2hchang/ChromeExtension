"use strict";

/*
	The FingerPrintingFinder looks for JavaScript code that would deliver information useful to fingerprinting the user's computer.
	Note that the it is initialized at the end of this page.

	Overview of its data generating function:
	1. get all <script> tags with jQuery
	2. a) iterate through the scripts, issuing AJAX requests for downloaded scripts
	   b) then parse the inline scripts
	3. as each AJAX request is satisfied, parse the incoming script
	4. return ASAP when any REGEX is matched
	5. report domain of fingerprinting script
	6. TODO: .abort() other open XHR
*/
var FingerPrintingFinder = function() {

	// This holding array is used to facilitate the .abort() of outstanding jqXHR after the first message is sent to background scripts.
	var downloadedScripts = [];

	// pattern for pulling a domain name out of a URL
	var domainPattern = /http(s)*\:\/\/((\w*\.)*\w*)/;
	
	// pattern for recognizing calls to 'navigator' object in scripts
	// var pattern = /(navigator.)(userAgent|plugins)/g;
	var pattern = /(navigator.)(plugins)/g;

	var scripts;


	this.findFingerPrintingScripts = function() {
		scripts = $("script");
		scripts.each(function(index) {
			if (scripts[index].innerText === "") {
				// create AJAX request
				var xhr = getScript(scripts[index].src);
				// augment the request object/promise with the source URL
				xhr.src = scripts[index].src;
				// push jqXHR object to holding array
				downloadedScripts.push(xhr);

			}
			else {
				// get the first party URL
				var first_url = window.location.host;
				// parse the inline script
				parseScripts(scripts[index].innerText, first_url);
			}
		});
	};


	var getScript = function(src) {
		console.log("fetching " + src);
		var options = {
			type: "GET",
			url: src,
			success: processXHR
		};
		return $.ajax(options);
	};

	var parseScripts = function(script, domain) {
		var results = script.match(pattern);
		if (results !== null) {
			sendFingerPrintingInfo(domain);
		}
	};

	var processXHR = function(result, status, jqXHR) {
		var src = jqXHR.src;
		// Third element in the 'match' array holds the inner group which represents the URL domain
		var domain = src.match(domainPattern)[2];
		console.log("AJAX success with " + domain);
		parseScripts(result, domain);

	};

	var sendFingerPrintingInfo = function(domain)
	{
		console.log("sending FPG message");
	    var port = chrome.runtime.connect({name: "fingerprint"});
	    port.postMessage({fingerPrintingInfo: "A script from " + domain + " has attempted to fingerprint your computer."});

	    // TODO: uncomment and check behaviour
	    for (var i = 0; i < downloadedScripts.length; i++) {
	    	downloadedScripts[i].abort();
	    } 
	};

};

chrome.storage.sync.get({"lessonPlan": 1}, function (obj) {
	if (obj.lessonPlan === 3) {
		var fingerPrintingFinder = new FingerPrintingFinder();
		fingerPrintingFinder.findFingerPrintingScripts();		
	}
});
