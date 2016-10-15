/* REM: what is a MessagePack:
	var MessagePack = function(short, long, button ) {
	    this.short_message = short;
	    this.long_message = long;
	    this.button_message = button
	}
*/


var Lessons = {
	// Lesson about OS info being sent with every request: trigger is the OS message
	1: { 
		long_message: "Every time your browser visits a website, it downloads new data (i.e. the webpage itself) from a server that hosts said website. However, before downloading this data, your browser sends a request to the hosting server to view the contents of a webpage. This request includes a description of your machine's configuration. This information allows the server to customize the data it sends back to suit the needs of a particular machine/browser. Your machine configuration is noted by the server and contributes to your digital 'fingerprint'.", 
		button_message: "Learn about Fingerprinting 1/3"
	},
	// Lesson, more about fingerprinting: trigger is the OS message
	2: { 
		long_message: "Fingerprinting your machine is similar to getting your physical fingerprint. Websites collaborate with their 'partners' - third party advertisers - to gather browsing history to create a profile/fingerprint of you. Your machine's fingerprint is almost unique among billions of devices and can be used to identify your device when you are browsing the web at every 'touched' (visited) page.", 
		button_message: "Learn about Fingerprinting 2/3"
	},
	// Lesson, more about fingerprinting: trigger is the browser information request
	3: {// '[domain] has requested more detailed information about your browser and system configuration'
		long_message: "Your browser's request will provide further information to create a unique fingerprint of your machine. It will notify the host server/third parties the browser extensions, plug-ins, fonts installed, and versions of the aforementioned items. These objects, in conjunction with each other, present a combination that is unique to your machine. To see an example please visit Info tab under stats page",
		button_message: "Learn about Fingerprinting 3/3"
	},
	// Lesson about firt/third part cookie tracking
	//What are cookies? 
	4:{
		long_message: "Cookies are small files stored on your browser that are sent by the server/third party that hosts visited webpages. The purpose of cookies is to serve as a unique identifier for each visitor.",
		button_message: "Learn about Cookie tracking 1/4"
	},
	//Lesson, more about first/third party cookie tracking
	//How? (More technical)
	5:{
		long_message: "Cookies also allow for storing persistent information for a browser. Have you noticed that when you add an item to your online Amazon shopping cart and close the browser, the same item remains in your shopping cart when you visit Amazon again? When you add an item to the shopping cart, the cookie associated with Amazon is sent from your browser back to Amazon, notifiying them that you (i.e. your specific cookie) are adding an item to the shopping cart (Amazon remembers this!). When you visit Amazon at a later date, it looks for your Amazon cookie and retrieves the information associated with that cookie. This is also how websites remember your login information.",
		button_message: "Learn about Cookie tracking 2/4"
	},
	//Lesson, more about first/third party cookie tracking
	//How? (Easier to understand)
	6:{
		long_message: "When you attempt to load a webpage, a request is sent to the server hosting the webpage. The cookie is part of each request. The server looks for this cookie when it receives the request and loads up the webpage with the information associated with this cookie. When you visit a website for the first time, a new cookie is placed on your browser.",
		button_message: "Learn about Cookie tracking 3/4"
	},
	//Lesson, more about first/third party cookie tracking
	//Two different type of cookies
	7:{
		long_message: "There are two important types of cookies: first party cookies and third party cookies. Our previous discussion applied to First party cookies (i.e. Amazon): they belong to the website you visit. Third party cookies are stored on your browser and originate from websites you DO NOT directly visit. For example, have you noticed that when you visit a website, there is an advertisement banner for another website or product on the side? In order to actually view this advertisement, your browser sends a request to a server that hosts the third party advertisement element (as well as a request to the first party). Similar to the request made to the first party host, the third party will also store its own cookie on your browser via its advertisement element. In this sense, whenever you visit another website that has an advertisement from the same third party host, the third party knows which sites you have visited based on its stored cookie. This is how third party sites track you from first party sites. To see an example please visit Info tab under stats page",
		button_message: "Learn about Cookie Tracking 4/4"
	},
	//Lesson about Geo-Location tracking
	//What is it?
	8:{
		long_message: "Geo-Location tracking is the identification of the real geographic location of someone or something.",
		button_message: "Learn about Geo-Location 1/3"
	},
	//Lesson, more about Geo-Location tracking
	//How does it work and what are they know about the user?
	9:{
		long_message: "When a device is connected to the internet, it has an Internet Protocol(IP) address associated with it. Every internet enabled device has it's own IP address - it is like a phone number for your computer (e.g. 192.168.2.1). An IP address is known by every website you visit and can used to geo-locate you. From the IP address, one can infer information including your country, region/city, estimate of latitude and longtitude, domain name, ISP (Internet Service Provider: who is providing your Internet) etc.",
		button_message: "Learn about Geo-Location 2/3",
	},
	//Lesson, more about Geo-Location tracking
	//Why is it dangerous? Why do websites use this?
	10:{
		long_message: "Geo-location is potentially dangerous because a website can track your current locations and store your past locations. It is used because advertisers can use location-based services to target potential customers and to analyze data based on customer demographics. To see an example please visit Info tab under stats page",
		button_message: "Learn about Geo-Location 3/3"
	},
	//Lesson about social media tracking
	//What is it?
	11:{
		long_message: "Social media tracking is an active monitoring by social media channels such as Facebook, Twitter, wikis, blogs, media sharing, forums, message boards etc.",
		button_message: "Learn about social media tracking 1/4",
	},
	//How does it work?
	12:{
		long_message: "Have you ever noticed that 'innocent-looking' Facebook Like button on a news article website? When your browser loads the webpage, in order to actually load the Facebook Like button, a request is made to Facebook's servers. The Facebook server notes the request made by your browser and looks at the cookie it placed on your machine. Facebook can associate your visited websites to your actual Facebook account this way.",
		button_message: "Learn about social media tracking 2/4"
	},
	//What kind of data is being collected and what is it used for?
	13:{
		long_message: "Social media companies are interested in your browsing history. Much of your browsing history can identity what interests you have or who you are. The information collected is dependent on companies that utilize social media monitoring. Most of the media monitoring tools collect data by catching keywords that you have entered on the web. After analyzing the collected data, they send you targetted notifications and advertisements directly on the websites you visit.",
		button_message: "Learn about social media tracking 3/4"
	},
	//Why is it bothering?
	14:{
		long_message: "Social media companies that monitor you create a profile about you. They use and store sensitive information such as your picture, your visited location, your recent purchases, etc. To see an example please visit Info tab under stats page",
		button_message: "Learn about social media tracking 4/4"
	},
};