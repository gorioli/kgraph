var __graph = new Graph();

$(function() {

	// ----------- support selection and zooming ---------------
	__graph.placeholder.bind("plotselected", __graph.plotselected);

	// ------------ double click event on the graph ----------
	__graph.placeholder.bind("dblclick", __graph.dblclick); // $('#placeholder:not(.dblclick_bound)').addClass('dblclick_bound').bind("dblclick",
	// dblclick);

	// -----------------------------------------------------
	$('#startUpdate').bind("click", __graph.setDynamicUpdate);

	$('#startDynamicUpdate').bind("click", __graph.setDynamicUpdate);

	$("#placeholder").bind("plotclick", __graph.plotclick);
	$("#placeholder").bind("plothover", __graph.plothover);

	window.onresize = function() {
		// var w = window.outerWidth;

		$('#placeholder').css('height', (Math.floor(0.4 * window.outerHeight)) + 'px');
		__graph.plotAccordingToChoices();
	};

	var isOnKeyPress = false;
	var isGraphWithdrown = false;

	document.onkeydown = function(evt) {
		evt = evt || window.event;

		if (evt.keyCode == __graph.ySelectionKey) { // if (evt.shiftKey)//
			__graph.yScale = true;
			if (!isGraphWithdrown) {
				__graph.plotAccordingToChoices();
				isGraphWithdrown = true;
				// console.log("y selection");
			}
		}
	};

	document.onkeyup = function(evt) {
		evt = evt || window.event;
		if (evt.keyCode == __graph.ySelectionKey) // if (evt.shiftKey)//
			__graph.yScale = false;
		isGraphWithdrown = false;
		// console.log("x selection");
	};

	$("#choices").hide();

	document.getElementById("placeholder").onmouseout = function() {
		__graph.overviewBarsTotal.innerHTML = "";
	};
});