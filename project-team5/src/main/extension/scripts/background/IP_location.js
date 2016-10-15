var getLocationFromIP = function(){
	$.getJSON('http://ipinfo.io', function(data){

		var message = "The server knows your IP address as: " + data.ip + " and your ISP as: " + data.org; 

		sendMessagePack(message, "displayBanner");
		return data;
	});	
};

var getMapFromIP = function() {
	$.getJSON('http://ipinfo.io', function(data){

		var link = "<a target='_blank' href='https://www.google.ca/maps/@" + data.loc + ",14z/data=!4m2!3m1!1s0x0:0x0'>"

		var message = "The server knows your IP address as: " + data.ip + " and your map location " + link + "here</a>"; 

		sendMessagePack(message, "displayBanner");
		return data;
	});	
	
};