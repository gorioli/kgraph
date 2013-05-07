/**
 * Reads a file from a local drive using HTML5
 */
var data = [];
function readBlob() {

	var files = document.getElementById('files').files;
	if (!files.length) {
		alert('Please select a file!');
		return;
	}

	var file = files[0];

	var reader = new FileReader();

	var names = document.getElementById('files').value.split("\\");
	document.getElementById('fileName').value = names[names.length - 1];

	reader.onloadend = function(evt) { // If we use onloadend, we need to check the readyState.
		if (evt.target.readyState == FileReader.DONE) {
			__graph.readLines(evt.target.result.split("\n"));
			document.getElementById('files').value = ""; // be able to reload the same file
		}
	};
	reader.readAsBinaryString(file);
}

document.getElementById("files").addEventListener('change', function(evt) {
	if (typeof intervalDinamicUpdate !== 'undefined')
		clearInterval(__graph.intervalDinamicUpdate);
	document.getElementById("placeholder").innerHTML = "";
	document.getElementById("choices").innerHTML = "";
	document.getElementById("overviewTotal").innerHTML = "";

	__graph.stopDynamicUpdate();
	__graph = new Graph();

	readBlob();

}, false);
