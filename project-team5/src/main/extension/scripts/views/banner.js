"use strict";


/*
	getDisplayTime() is a helper function that calculates how long to display timed messages.
*/
var getDisplayTime = function(message) {
	var WORDS_PER_MINUTE = 150;
	var num_words = message.split(" ").length;
	return num_words * (60/WORDS_PER_MINUTE) * 1000;	// final unit is milliseconds for message
};

/*
	The TopBanner is a persistent UI element; it is viewable when messages are passed to it.
	It resides at the top of the browser window and expands downwards.
*/
var TopBanner = function() {
	$( "body" ).prepend( "<div id='temp_banner' class='allbanner'></div>" );
	var banner = $("#temp_banner");

	var short_text = "";
	var long_text = $("<p></p>");
	var button = $( "<button type='button' class='banner_button'>GO!</button>" );
	
	var banner_timeout;

	/*
		The showMessage() method preserves the original functionality, allowing the display of a simple single-line message.
		It is displayed for a period of time baed on the length of the text and the global WORDS_PER_MINUTE.
	*/
	this.showMessage = function(message) {
		console.log("showMessage was called");
		// for debugging only
		if (message === undefined) {
			short_text = "--text placeholder--";
		}
		else {
			short_text = message;
		}

		banner.css("height","50px");
		banner.css("padding-top","20px");
		banner.css("padding-bottom","20px");
		banner.html(short_text);

        if (banner_timeout === undefined) {
            banner_timeout = setTimeout(function(){
                banner.text("");
                banner.css("padding-top","0px");
                banner.css("padding-bottom","0px");
                banner.css("height","0px");
            }, Math.max(3000, getDisplayTime(short_text)));
        }
	};

	/*
		The showMessagePack() method accepts a three-field object such as this one:

			var MessagePack = function(short, long, button ) {
				this.short_message = short;
				this.long_message = long;
				this.button_message = button;
			}

		It parses the object to initially display the short message and a button that is customized with this.button_message.
		The button offers the user the option to access the longer text by expanding the drop-down banner. This extended banner 
		is not limited to a set duration. The user is presented with a "close" button to close the whole banner.
	*/
	this.showMessagePack = function(full_message) {
		// for debugging only
		if (full_message.short_message === undefined) {
			short_text = "--text placeholder--";
		}
		else {
			short_text = full_message.short_message;
		}

		if (full_message.long_message !== undefined) {
			long_text.html(full_message.long_message);
		}

		banner.css("height","50px");
		banner.css("padding-top","20px");
		banner.css("padding-bottom","20px");
		banner.html(short_text);

		if (full_message.button_message !== undefined) {
			button.text(full_message.button_message);
			button.appendTo("#temp_banner");

				button.on("click", function() {
					console.log("click");
					var banner_height = banner.css("height");
					if (banner_height != "50px") {
						banner.text("");
						banner.css("height","0px");
						banner.css("padding-top","0px");
						banner.css("padding-bottom","0px");
						button.detach();
					}
					else {
						banner.prepend(long_text);
						banner.css("height","350px");
						banner.css("padding-top","60px");
						banner.css("padding-bottom","40px");
						banner.css("padding-left","100px");
						long_text.css("padding-right","200px");
						button.text("close");
						console.log("banner_timeout before clear " + banner_timeout);
						clearTimeout(banner_timeout);
						console.log("banner_timeout after clear " + banner_timeout);
						var port = chrome.runtime.connect({name: "incrementer"});
						port.postMessage({increment: "increment"});
					}
				});
		}

        if (banner_timeout === undefined) {
            banner_timeout = setTimeout(function(){
                banner.text("");
                banner.css("padding-top","0px");
                banner.css("padding-bottom","0px");
                banner.css("height","0px");
            }, Math.max(3000, getDisplayTime(short_text)));
        }
	};

};


/*
	The BottomBanner is a persistent UI element; it is viewable when messages are passed to it.
	It resides at the bottom of the browser window and expands upwards.
*/
var BottomBanner = function() {
	$( "body" ).prepend( "<div id='bottom_banner' class='allbanner'></div>" );
	var banner = $("#bottom_banner");

	this.short_text = "";

	this.showMessage = function(short_message) {
		// for debugging only
		if (short_message == undefined) {
			this.short_text = "--text placeholder--";
		}
		else {
			this.short_text = short_message;
		}

		banner.css("height","50px");
		banner.css("padding-top","20px");
		banner.css("padding-bottom","20px");
		banner.text(this.short_text);

		setTimeout(function(){
			banner.text("");
			banner.css("padding-top","0px");
			banner.css("padding-bottom","0px");
			banner.css("height","0px");
		}, Math.max(3000, getDisplayTime(this.short_text)));
	};
};
