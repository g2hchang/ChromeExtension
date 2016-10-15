"use strict"

/*
	The Info_tab is a persistent UI element.
	It contains a copy of the extension's logo to help identify it's source and purpose.
	It provides a notification to the user that additional detailed messsges are waiting to be viewed.
	It waits to be clicked to display the additional detailed messages.
*/

var InfoTab = function() {
	this.queue_count = 0;	

	/*
		Add to the Info_tab.queue_count property.
		Triggers a notification to the user of how many messages are waiting in the queue for display to the tab content.
		Implement for Phase 3.
	*/
	this.addQueueCount = function(num) {
		this.queue_count += num;
		tab_update.text(this.queue_count + " new");
	}

	/*
		Receives a set of cookie messages, gets them parsed, and displays them to a larger drop-down banner.
	*/
	this.showMessage = function(messages) {
		console.log("received messages of length " + messages.length);

		if (this.isCookie(messages, 0)) {
         	    tab_content.html(parseThirdPartyCookies(messages));
		    this.prependStrings(messages);
		}

		else {
		    tab_content.append(messages);
		}
	}

	/*
		Helper function to add strings to the end of a cookie message
	*/
	this.prependStrings = function(messages) {
		for (var i = 0; i < messages.length; i++) {
		    if (!this.isCookie(messages, i)) {
		        tab_content.prepend("<p>" +  messages[i] + "</p>");
		    }
		}
	}

	/*
		Returns true iff the object at the given index is a cookie object from the database.
	*/
	this.isCookie = function(objList, index) {
		return objList[index]['firstParty'] != undefined;
	}

	var icon_url = chrome.extension.getURL("/img/warning.png");
	$( "body" ).prepend( "<div id='tab_notifier' class='allbanner'><img id='tab_icon' src=" + icon_url + "><div id='tab_update'></div></div>" );
	$( "body" ).prepend( "<div id='tab_content' class='allbanner'></div>" );

	var tab_notifier = $( "#tab_notifier");

	var tab_update = $( "#tab_update");

	// only to test the count display:
	// tab_update.text(this.queue_count + " new");

	var tab_content = $( "#tab_content");


	tab_notifier.on("click", function() {
		var content_height = tab_content.css("height");
		// console.log("clicked tab_notifier, content_height = " + content_height);
		if (content_height != "0px") {
			tab_content.css("height","0px");
			tab_content.css("padding-top","0px");
		}
		else {
			// console.log("clicked tab_notifier ... else");
			tab_content.html("<p>No new cookie information to display</p>");
			getQueue("InfoTab");
			tab_content.css("height","300px");
			tab_content.css("padding-top","40px");
		}
	});



};
