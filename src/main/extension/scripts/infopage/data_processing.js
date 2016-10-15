// Get reference to database from background page.
var bg = chrome.extension.getBackgroundPage();
var db = bg.db;


// Search through an index (field) on the IDB and get entries 
// that match (value). Eg. field may be "ThirdPartySimple", 
// and value may be "facebook". 
//
// Only accepts indices in the IDB. Namely, "thirdParty", "thirdPartySimple",
// "firstParty", and "date". 
//
// Call callback with results list of objects as parameter.
function getHistory(field, value, callback) {
	var transaction = db.transaction([bg.DB_STORE], "readonly");
	var objectStore = transaction.objectStore(bg.DB_STORE);
	var index = objectStore.index(field);
	var history = [];
	
	index.openCursor(value).onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			history.push({
				"firstParty" :     cursor.value.firstParty,
				"firstPartyPath" : cursor.value.firstPartyPath,
				"date" :           moment(cursor.value.date),
				"thirdParty" :     cursor.value.thirdParty
			});
			cursor.continue();

		} else {
			callback(history);
		}
	};
} 


function parseIntoWeekdays(data) {
	var i;
	var result = [ [], [], [], [], [], [], [] ]
	for (i = 0; i < data.length; i++) {
		result[data[i].date.day()].push(data[i]);
	}
	return result;
}


// Process data into buckets for a historgram. 'data' is data as returned by
// getHistory, timeDiff is the length -- in minutes -- of a bucket.
//
// Returns a list [X, Y] where X is a set of intervals over 24 hours, and Y
// is the count of websites visited in each corresponding interval.
function getHistogramData(data, timeDiff) {
	var xLabels = [];
	// The number of bins we will need is the number of minutes in a day 
	// divided by the width of each interval.
	var numBins = 24*60 / timeDiff;
	// Initialize 0 array to store counts.
	var yValues = new Array(numBins+1).fill(0);
	var minuteInDay, numDays;
	var days = [];
	var idx, i;
	var fullFirstParty;
	var lastDate = moment(0);
	var lastSiteTimestamp = {};
	var maxY = 0

	// Initialize the x-range array, starting at 4:00 am and incrementing
	// by timeDiff.
	var tempDate = moment().hour(4).minute(0).second(0).millisecond(0);
	for (i = 0; i < numBins+1; i++) {
		xLabels.push(tempDate.format("hh:mm a"));
		tempDate.add(timeDiff, 'minutes');
	}

	// For each element in data, get which bin it falls in and increment the
	// count in Y for that bin.
	for (i = 0; i < data.length; i++) {
		// Since we're using simplified third party names, but storing entries
		// for longer names, we have change how we count sites.
		// This is what I mean by "not worth it"
		fullFirstParty = data[i].firstParty + data[i].firstPartyPath;
		if (typeof lastSiteTimestamp[fullFirstParty] !== 'undefined' &&
			lastSiteTimestamp[fullFirstParty].hour() == data[i].date.hour() &&
			lastSiteTimestamp[fullFirstParty].minute() == data[i].date.minute()) {
			continue;
		}

		// Get the minute in the day, starting from 4:00 am. Basic formula
		// is (hour)*60 + (minute). To shift the hour, we add 20 and modulo it
		// by 24 (this avoids negative numbers).
		minuteInDay = ((data[i].date.hour() + 20) % 24)*60 + data[i].date.minute();
		// Get which bucket this minuteInDay corresponds to.
		idx = Math.floor(minuteInDay / timeDiff);
		yValues[idx] += 1;
		if (!days.includes(data[i].date.dayOfYear())) {
			days.push(data[i].date.dayOfYear());
		}
		lastSiteTimestamp[fullFirstParty] = data[i].date;
	}

	numDays = days.length;
	for (i = 0; i < yValues.length; i++) {
		yValues[i] = yValues[i]/numDays;
	}
	return [xLabels, yValues];
}