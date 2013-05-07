// ---------------------------------------------------
Graph.prototype.updateLines = function() {
	var series = __graph.series;
	generateLinesTypeGraph(series);
	function generateLinesTypeGraph(series) {
		var x = 0;

		for ( var i = 0; i < series.data.length; i++) {
			for ( var j = 0; j < series.data[i].values.length; j++) {

				if (__graph.dataArrays[j] === undefined) {
					__graph.dataArrays[j] = __graph.EntryLineGraphProps(j);
				}
				if (__graph.dataArrays[j].data.length > 0
						&& __graph.dataArrays[j].data[__graph.dataArrays[j].data.length - 1][0] < +series.data[i].key
						|| __graph.dataArrays[j].data.length == 0)
					__graph.dataArrays[j].data.push([ +series.data[i].key, +series.data[i].values[j] ]);
			}
		}
	}
	__graph.isBar = false;
	
	__graph.renderWindowProps();
	__graph.plotAccordingToChoices();
};
