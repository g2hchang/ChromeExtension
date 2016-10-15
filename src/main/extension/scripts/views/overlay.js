"use strict"

var elementOverlayById = function(id) {
	var target = $(id);
	var target_height = target.css("height");
	var target_width = target.css("width");
	console.log("target dims: " + target_height + " x " + target_width);
	target.prepend("<div class='funky'></div>");
	var funky = $(".funky");
	funky.css("height", target_height);
	funky.css("width", target_width);
}