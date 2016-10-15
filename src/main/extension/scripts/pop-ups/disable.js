chrome.storage.sync.get("disabledExt", function (obj) {
    if (obj != undefined && obj.disabledExt == "false") {
    	$('#disable_ext')[0].checked = true;
    	hideCheckboxes();
    }

    else {
		$('#disable_ext')[0].checked = false;
		showCheckboxes();    }
});


chrome.storage.sync.get("disabled", function (obj) {
    if (obj != undefined && obj.disabled == "false") {
	$('#disable_pops')[0].checked = false;
    }

    else {
	$('#disable_pops')[0].checked = true;
    }
});

chrome.storage.sync.get("disableSocialMedia", function (obj) {
    if (obj != undefined && obj.disableSocialMedia == "false") {
	$('#disable_socialMedia')[0].checked = false;
    }

    else {
	$('#disable_socialMedia')[0].checked = true;
    }
});

function hideCheckboxes() {
	$("#disable_pops").hide();
	$("#disable_socialMedia").hide();
	$('label[for=disable_pops]').hide();
	$('label[for=disable_socialMedia]').hide();
	$('label[for="disable_ext"]').html("Enable Extension");
	$('#disable_ext')[0].checked = false;	
	$('#logo').attr("src","../../img/warningOff.png")
}

function showCheckboxes() {
	$("#disable_pops").show();
	$("#disable_socialMedia").show();
	$('label[for=disable_pops]').show();
	$('label[for=disable_socialMedia]').show();
	$('label[for="disable_ext"]').html("Disable Extension");
	$('#logo').attr("src","../../img/warning.png")
}

function setExtensionEnabled(value){
chrome.storage.sync.set({'disabledExt': value}, function() {
});
}


function setPopUpDisabled(value) {
chrome.storage.sync.set({'disabled': value}, function() {
        });
};
function setSocialMediaDisabled(value) {
chrome.storage.sync.set({'disableSocialMedia': value}, function() {
        });
};

$(document).ready(function(){
	$('#disable_ext').click(function() {
		chrome.storage.sync.get("disabledExt", function (obj) {
		    if (obj != undefined && obj.disabledExt == "true") {
				    	$('#disable_ext')[0].checked = true;
				    	hideCheckboxes();
				    	setExtensionEnabled("false");
				    	setSocialMediaDisabled("true");
				    	setPopUpDisabled("true");
				    	chrome.runtime.reload();
				    }

			else {
				    	$('#disable_ext')[0].checked = false;
				       	showCheckboxes();
				       	setExtensionEnabled("true");
				       	setSocialMediaDisabled("false");
				       	setPopUpDisabled("false");
				       	chrome.runtime.reload();

			}
		});
	});


	$('#disable_pops').click(function() {
	    chrome.storage.sync.get("disabled", function (obj) {
		    if (obj.disabled == "false") {
			setPopUpDisabled("true");
			chrome.runtime.reload();
		    }

		    else {
		        setPopUpDisabled("false");
				chrome.runtime.reload();
		    }   
		});

	});
	$('#disable_socialMedia').click(function(){
		chrome.storage.sync.get("disableSocialMedia", function (obj) {
		    if (obj.disableSocialMedia == "false") {
			setSocialMediaDisabled("true");
			chrome.runtime.reload();
		    }

		    else {
		        setSocialMediaDisabled("false");
				chrome.runtime.reload();
		    }   
		});
	})

	$('#view_stats').click(function() {
		chrome.tabs.create({url: "./infopage.html"})
	})

});