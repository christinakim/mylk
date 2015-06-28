chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});

$("#btnAddProfile").html('Save');

/**
 * Code for our own injection.
 */
$(document).ready(function () {
	// first inject our banner in
	// $("body").prepend(
	// 	'<div class="mylk-banner">' +
	// 		'<a href="https://api.venmo.com/v1/oauth/authorize?client_id=2713&scope=make_payments"><button id="btn-donate">DONATE</button></a>' +
	// 		'<button id="btn-close">X</button>' +
	// 		'<button id="btn-toggle-size"><<</button>' +
	// 	'</div>'
	// );

	// var $mylkBanner = $(".mylk-banner");
	// var $toggleSizeButton = $(".mylk-banner #btn-toggle-size");
	// var $closeButton = $(".mylk-banner #btn-close");
	// var animationSpeed = "slow";
	// var isMinimized = false;

	// // add animations
	// $mylkBanner.slideDown(animationSpeed, function() {
	// 	// callback after animation finishes
	// });
	// $toggleSizeButton.click(function() {
	// 	if(isMinimized) {
	// 		$mylkBanner.animate({
	// 			width: "100vw"
	// 		}, animationSpeed, function() {
	// 			// callback after animation finishes
	// 		$toggleSizeButton.html('<<');

	// 		});
	// 	}
	// 	else {
	// 		$mylkBanner.animate({
	// 			width: "10vw"
	// 		}, animationSpeed, function() {
	// 			// callback after animation finishes
	// 		$toggleSizeButton.html('>>');
	// 		});
	// 	}

	// 	isMinimized = !isMinimized;
	// });
	// $closeButton.click(function() {
	// 	$mylkBanner.slideUp(animationSpeed, function() {
	// 		// callback after animation finishes
	// 	});
	// });
});
