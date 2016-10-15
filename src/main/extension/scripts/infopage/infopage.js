var lastData;
var weekdayFlag = 0;

// Populate the dropdown menu from list of third parties encountered.
function init() {
	chrome.storage.local.get({"thirdparties": []}, function(items) {
		var thirdParties = items['thirdparties'];
		var dropdown = $("#select-third-party");
		for (var p in thirdParties) {
			dropdown.append(
				"\n<option>" + thirdParties[p] + "</option>"
				);
		}
	});
};

// Main interactive listeners.
function main() {
	init();

	// When a user clicks a tab, we show the appropriate <divs> and hide 
	// the others.
	$('.tabs li').click(function() {
		$(this).addClass('active');
		$(this).siblings('li').each(function() {
			$(this).removeClass('active');
		});

		var id = $(this).attr('id');
		if (id === "history") {
			$('.history-view').show();
			$('.graph-view').hide();
			$('.info-view').hide();
			$('.dropdown').show();
		} else if (id === "graphs") {
			$('.history-view').hide();
			$('.graph-view').show();
			$('.info-view').hide();
			$('.dropdown').show();
		} else if (id === "info") {
			$('.history-view').hide();
			$('.graph-view').hide();
			$('.info-view').show();
			$('.dropdown').hide();
		}
	});

	$(".entry").click( function() {
		$(this).children("div").slideToggle('fast');
	})

	// Get a new dataset when the user chooses a new thirdparty from the dropdown.
	$('#select-third-party').change(function() {
	    var selection = this.value;
		getHistory("thirdPartySimple", selection, useHistoryData);
	});

	$('.hist li').click(function() {
		$(this).addClass('active');
		$(this).siblings('li').each(function() {
			$(this).removeClass('active');
		});
		if ($(this).attr('id') === "by-day-of-week") {
			weekdayFlag = 1;
		} else { 
			weekdayFlag = 0;
		}
		histogramHelper(lastData);
	});
};


// Callback function for results of IDB request -- since call is async.
// we all functions that use this data have to go here.
function useHistoryData(data) {
	lastData = data;
	makeHistoryTable(data);
	histogramHelper(data);
	makeThirdPartyGraph(data);
}


// Make an html table that contains the history as captured by this 
// third party
//
// data is a list of objects to add.
function makeHistoryTable(data) {
	$('#history-table tr').remove();
	var table = $('#history-table');
	var firstParty, thirdParty;
	var date;
	var lastDate = moment().date(0);
	var tableString = "";

	for (var i = data.length - 1; i >= 0; i--) {
		firstParty = data[i].firstParty + data[i].firstPartyPath;
		date = data[i].date;
		thirdParty = data[i].thirdParty;

		if (date.date() != lastDate.date()) {
			tableString += "<tr class=day-header><td colspan=3>" + 
							date.format("MMMM Do") + "</td></tr>";
			lastDate = moment(date);
		}
		// JQuery append is messed up if href ends in a '/'
		if (firstParty.endsWith("/")) {
			firstParty = firstParty.slice(0,-1);
		}

		var linkString ="<a href=http://" + firstParty + ">" + firstParty + "</a>";
		tableString += "<tr>" + 
							"<td>" + date.format("h:mm a") + "</td>" + 
							"<td>" + linkString + "</td>" +
							"<td>" + thirdParty + "</td>" + 
						"</tr>";
		console.debug(tableString);
	}
	console.debug(tableString);
	table.append(tableString);
}


function histogramHelper(data) {
	var histData = [];
	var i;
	if (weekdayFlag === 1) {
		var procData = parseIntoWeekdays(data);
		for (i = 0; i < 7; i++) {
			histData.push(getHistogramData(procData[i], 60));
		}		
	} else { 
		histData.push(getHistogramData(data, 60));
	}

	makeHistogram(histData);
}


// Take xData and yData and make a chart out of it using Chart.js
function makeHistogram(histData) {
	var numSets = histData.length;
	var datasets = [];
	var xData = histData[0][0];
	var yData;

	var labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var borderColors = [
		"rgba(86,86,86,1)",
		"rgba(0,0,192,1)",
		"rgba(0,86,86,1)",
		"rgba(0,192,0,1)",
		"rgba(86,86,0,1)",
		"rgba(192,0,0,1)",
		"rgba(86,0,86,1)"
	];

	var bgColors = [
		"rgba(86,86,86,0.2)",
		"rgba(0,0,192,0.2)",
		"rgba(0,86,86,0.2)",
		"rgba(0,192,0,0.2)",
		"rgba(86,86,0,0.2)",
		"rgba(192,0,0,0.2)",
		"rgba(86,0,86,0.2)"
	];

	for (var i = 0; i < numSets; i++) {
		yData = histData[i][1]
		datasets.push(
			{
	            label: labels[i],
	            fill: true,
				backgroundColor: bgColors[i],
	            borderColor: borderColors[i],
	            borderWidth: 1,
				pointBorderColor: "rgba(220,220,220,0)",
				pointBackgroundColor: "rgba(0,0,0,0)",
	            hoverBorderColor: "rgba(34,85,102,1)",
				pointHoverBackgroundColor: "rgba(34,85,102,0.8)",
	            tension: 0.3,
	            data: yData
			}
		);
	}

	if (numSets == 1) {
		datasets[0].label = "Total"
	}

	var data = {
	    labels: xData,
	    datasets: datasets
	};	

	if (typeof currHistogram == 'undefined') {
		var ctx = $('#histogram').get(0).getContext('2d');
		currHistogram = new Chart(ctx, {
			type: 'line',
			data: data,
			// If you're thinking this is hideous, you're correct.
			// Sets the 'suggested' max y-value to 10. 
		    options: {scales: {yAxes: [{ticks: {suggestedMax: 10}}]}}
		});
	} else {
		currHistogram.data.datasets = data.datasets;
		currHistogram.update();
	}
}
function makeThirdPartyGraph(data){
	var links = [];
	for (var i in data){
		firstParty = data[i].firstParty;
		thirdParty = data[i].thirdParty.split('.').slice(-2,-1);
		var thirdToFirstConnection = {
			source: thirdParty,
			target: firstParty,
			type: "licensing"
		};
		links.push(thirdToFirstConnection);
	}
	var nodes = {};

	// Compute the distinct nodes from the links.
	links.forEach(function(link) {
	  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
	  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
	});

	var width = 1060,
	    height = 560;

	var force = d3.layout.force()
	    .nodes(d3.values(nodes))
	    .links(links)
	    .size([width, height])
	    .linkDistance(60)
	    .charge(-300)
	    .on("tick", tick)
	    .start();

	var svg = d3.select("#svg-graph")
	svg.selectAll("*").remove();

	// Per-type markers, as they don't inherit styles.
	svg.append("defs").selectAll("marker")
	    .data(["suit", "licensing", "resolved"])
	  .enter().append("marker")
	    .attr("id", function(d) { return d; })
	    .attr("viewBox", "0 -5 10 10")
	    .attr("refX", 15)
	    .attr("refY", -1.5)
	    .attr("markerWidth", 6)
	    .attr("markerHeight", 6)
	    .attr("orient", "auto")
	  .append("path")
	    .attr("d", "M0,-5L10,0L0,5");

	var path = svg.append("g").selectAll("path")
	    .data(force.links())
	  .enter().append("path")
	    .attr("class", function(d) { return "link " + d.type; })
	    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

	var circle = svg.append("g").selectAll("circle")
	    .data(force.nodes())
	  .enter().append("circle")
	    .attr("r", 6)
	    .call(force.drag);

	var text = svg.append("g").selectAll("text")
	    .data(force.nodes())
	  .enter().append("text")
	    .attr("x", 8)
	    .attr("y", ".31em")
	    .text(function(d) { return d.name; });

	// Use elliptical arc path segments to doubly-encode directionality.
	function tick() {
	  path.attr("d", linkArc);
	  circle.attr("transform", transform);
	  text.attr("transform", transform);
	}

	function linkArc(d) {
	  var dx = d.target.x - d.source.x,
	      dy = d.target.y - d.source.y,
	      dr = Math.sqrt(dx * dx + dy * dy);
	  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
	}

	function transform(d) {
	  return "translate(" + d.x + "," + d.y + ")";
	}

}


$(document).ready(main);