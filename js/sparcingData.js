Graph.prototype.sparceData = function() {
	if (__graph.isBar)
		return __graph.dataArrays;

	var sparcedDataArrays = [];

	var minI = getMinIndex();
	var maxI = getMaxIndex(minI);
	var placeholderWidth = document.getElementById("placeholder").clientWidth;

	document.getElementById("overviewTotal").innerHTML = [ "Entries:<b>", maxI - minI, "</b>of<b>", __graph.dataArrays[0].data.length,
			"</b>" ].join(" ");

	// console.log(document.getElementsByTagName("body")[0].clientHeight, " X
	// ",document.getElementsByTagName("body")[0].clientWidth);

	var maxLineShowDotsNumber = placeholderWidth / 15;

	if (!__graph.isBar && maxI - minI < maxLineShowDotsNumber)
		__graph.plotOptions.series.points.show = true;
	else
		__graph.plotOptions.series.points.show = false;

	var step = Math.round((maxI - minI) / placeholderWidth * 1.6);
	if (step < 1)
		step = 1;

	for ( var i = 0; i < __graph.dataArrays.length; i++) {

		sparcedDataArrays[i] = __graph.EntryLineGraphProps(i);
		sparcedDataArrays[i].color = __graph.dataArrays[i].color;

		for ( var j = 0; j < __graph.dataArrays[i].data.length; j += step) {
			sparcedDataArrays[i].data.push(__graph.dataArrays[i].data[j]);
		}
	}
	return sparcedDataArrays;

	function getMinIndex() {

		if (__graph.minX == 0)
			return 0;

		for ( var i = 0; i < __graph.dataArrays[0].data.length; i++) {
			if (__graph.minX >= __graph.dataArrays[0].data[i][0])
				continue;
			return i;
		}
		return 0;
	}

	function getMaxIndex(minI) {

		if (__graph.maxX == 0)
			return __graph.dataArrays[0].data.length;

		for ( var i = minI; i < __graph.dataArrays[0].data.length; i++) {
			if (__graph.maxX > __graph.dataArrays[0].data[i][0])
				continue;
			return i;
		}

		return __graph.dataArrays[0].data.length;
	}
}