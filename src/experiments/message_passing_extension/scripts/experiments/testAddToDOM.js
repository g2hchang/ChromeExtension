
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
	var message = response.farewell;
  console.log(message);
$( "body" ).prepend( '<div id="infoheader">' + message + ' cookies in the cache</div>' );
});

chrome.runtime.sendMessage({greeting: "isThereANewCookie"}, function(response) {
	var message = response.updatedCookie;
  console.log(message);
$( "body" ).prepend( '<div id="infoheader">' + message + '</div>' );
});