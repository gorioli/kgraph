// ---------------------------------------------------
Graph.prototype.updateBar = function() {
	var series = __graph.series;
	generateBarsTypeGraph(series);
	function generateBarsTypeGraph(series) {
		var x, xFloor, yFloor;

		for ( var i = 0, size = series.data.length; i < size; i++) {

			x = +series.data[i][0];
			xFloor = Math.floor(x);
			yFloor = Math.round((x - xFloor) * 100);

			if (__graph.dataArrays[xFloor] == undefined) {
				__graph.dataArrays[xFloor] = __graph.EntryLineGraphProps(xFloor);
			}
			__graph.dataArrays[xFloor].data[yFloor] = [ yFloor, +series.data[i][1] ];
		}
	}
	__graph.calculateDisplayingBarsData();
	__graph.isBar = true;

	__graph.renderWindowProps();
	__graph.plotAccordingToChoices();
};
