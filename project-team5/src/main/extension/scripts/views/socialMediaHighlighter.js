var facebook = "facebook";
var twitter = "twitter";

var socialMediaHighlightingRegex = /.*(\.)*twitter(\.)+.*|.*(\.)*facebook(\.)+.*/g;
var twitterButtonHighlightRegex = /twitter-widget-\d/g;

var numberOfFacebookTrackers = 0;
var numberOfTwitterTrackers = 0;

var numberOfButtons = 0;

// this adds a popover element to the DOM
// thank you to Matthew Skiles, who made this (http://www.cssflow.com/snippets/animated-profile-popover)
// (code reused legally due to the MIT license, which the code is released under)
// (we did make some modifications to the appearance in the style.css file)

var socialMediaInfoPopover = "  <span id=\"socialMediaInfoPopover\" class=\"container-popup\">\r\n    <span class=\"user\">\r\n      <h5>View More Information about Social Media Buttons<\/h5>\r\n      <ul>\r\n  <li class=\"sep\">Social media buttons can be used to track you and link your profile to other websites, allowing advertising companies and others to obtain your browsing habits.<\/li>\r\n      <\/ul>\r\n    <\/span>\r\n  <\/span>";

var highlightSocialMedia = function()
{
    $(document).ready(function(){
        findTrackingPixels();
        highlightFacebookButtons();
        highlightTwitterButtons();
	highlightSocialMediaIFrames();
        displayTrackingPixelInfo();
	sendButtonInfo();
    });
};

var highlightSocialMediaIFrames = function()
{
    $( "iframe" ).each(function( index ) {
        var src = $(this).attr("src");
	// Twitter's URL format was not being cooperative, had to use a simple "contains" check here
        if (isSocialMedia(src) || (src != undefined && src.indexOf("twitter") > -1)) {
            $(this).css("border", "5px solid red");
            $(this).children().css("border", "5px solid red");
            $(this).attr("title", "This social media element can be used to track you.");
            $(this).children().attr("title", "This social media element can be used to track you.");
	    addSocialMediaInfoPopover($(this));
	    numberOfButtons++;
        }
    });
};

var highlightFacebookButtons = function()
{
    $( "div" ).each(function( index ) {
        var data = $(this).attr("data-href");
        var nestedLinkRefs = $(this).find('a').attr('href');
        if (isSocialMedia(data) || isSocialMedia(nestedLinkRefs)) {
            $(this).css("border", "5px solid red");
            $(this).children().css("border", "5px solid red");
            $(this).attr("title", "This social media element can be used to track you.");
            $(this).children().attr("title", "This social media element can be used to track you.");
	    addSocialMediaInfoPopover($(this));
        }
    });
};

var highlightTwitterButtons = function()
{
    $('body *').each(function( index ) {
	var id = $(this).attr('id');
	if (twitterButtonHighlightRegex.test(id)) {
	    console.log(id);
	    highlightTwitterButton($(this));
	}
    });
};

var highlightTwitterButton = function (name)
{
    $( name ).each(function( index ) {
	var href = $(this).attr("src");
	if (isSocialMedia(href)) {
	    console.log(href);
	    $(this).css("border", "5px solid red");
	    $(this).children().css("border", "5px solid red");
	    $(this).attr("title", "This social media element can be used to track you.");
	    $(this).children().attr("title", "This social media element can be used to track you.");
	    addSocialMediaInfoPopover($(this));
	}
    });
};

var addSocialMediaInfoPopover = function (elem) {
    if (!$('#socialMediaInfoPopover').length) {
        elem.parent().parent().prepend(socialMediaInfoPopover);
    }
};

var findTrackingPixels = function()
{
    $( "img" ).each(function( index ) {
        var src = $( this ).attr('src');
        var display = $( this ).css('display');
	var height = $(this).attr("height");
	var width = $(this).attr("width");

        if (isSocialMedia(src) && isTrackingPixel(src, height, width)) {
            console.log( index + ": " + src);
            socialMediaSites(src);
        }
    });
};

var displayTrackingPixelInfo = function()
{
    var facebookMessage = '';
    var twitterMessage = '';
    if (numberOfFacebookTrackers == 1) {
	facebookMessage = "This site is using a hidden social media element from Facebook to track you.";
    }

    else if (numberOfFacebookTrackers > 1) {
	facebookMessage = "This site is using " + numberOfFacebookTrackers + " hidden social media elements from Facebook to track you.";
    }
        
    if (numberOfTwitterTrackers == 1) {
	twitterMessage = "This site is using a hidden social media element from Twitter to track you.";
    }

    else if (numberOfTwitterTrackers > 1) {
	twitterMessage = "This site is using " + numberOfTwitterTrackers + " hidden social media elements from Twitter to track you.";
    }

    if (facebookMessage != '') {
        $("body").prepend("<h1></h1>", "<h1>" + facebookMessage +  "<h1>");
    }

    if (twitterMessage != '') {
        $("body").prepend("<h1></h1>", "<h1>" + twitterMessage +"<h1>");
    }

    $("h1").css("padding-top", "20px");

    if (facebookMessage != '' || twitterMessage != '') {        
        // send the info to the controller for processing
        var port = chrome.runtime.connect({name: "trackingPixels"});
        port.postMessage({trackingPixelInfo: facebookMessage + " " + twitterMessage});
    } 
};

// sending info back to the background side
var sendButtonInfo = function()
{
    var port = chrome.runtime.connect({name: "socialMediaButtons"});
    port.postMessage({socialMediaButtonInfo: "This site has " + numberOfButtons + " social media buttons (some of which may be hidden) which can be used to track you."});    
};

var socialMediaSites = function(src)
{
    // switch-case was causing problems here, for whatever reason
    if (src.indexOf(twitter) > -1) {
	    numberOfTwitterTrackers++;
    }

    if (src.indexOf(facebook) > -1) {
	    numberOfFacebookTrackers++;
    }
};

var isSocialMedia = function(src)
{
    return src != undefined && (socialMediaHighlightingRegex.test(src));
};

var isTrackingPixel = function(element, height, width)
{
    return isHidden(element) || isPixel(height, width);
};

var isHidden = function(element)
{
    return element == "none";
};

var isPixel = function(height, width) {
    return (height == 1 && width == 1) || (height == 0 && width == 0);
};

chrome.storage.sync.get("disableSocialMedia", function (obj) {
            var urlFacebook = "https://www.facebook.com/";
            var urlTwitter = "https://twitter.com/";
            var url = window.location.href;   
            console.log(typeof window.location.href);

            if (obj.disableSocialMedia == "false" && (!url.startsWith(urlFacebook) && !url.startsWith(urlTwitter))) {
                highlightSocialMedia();
            }

        });
