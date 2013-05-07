// ---------------------------------------------------
Graph.prototype.updateBar2 = function() {
	var series = __graph.series;
	generateBarsTypeGraph(series);
	function generateBarsTypeGraph(series) {
		var p, board, indexP, color = -1, name, y;

		for ( var b = 0; true; b++) {

			board = series.data['b' + b];

			if (board == undefined)
				break;

			indexP = -1;
			for ( var x = 0; x < board.length; x++) {
				indexP++;
				p = board[x]['p' + indexP];
				while (p == undefined && indexP < 100) {
					indexP++;
					p = board[x]['p' + indexP];
				}
				if (p == undefined)
					break;

				name = series.data.b1 == undefined ? 'p' + indexP : 'b' + b + ':' + 'p' + indexP;

				for ( var i = 0; i < p.length; i++) {

					if (__graph.dataArrays[name] === undefined) {
						color++;
						__graph.dataArrays[name] = __graph.EntryLineGraphProps(color, name);
					}
					y = +p[i][0];
					__graph.dataArrays[name].data[y] = [ y, +p[i][1] ];
				}
			}
		}
	}
	__graph.isBar = true;
	__graph.calculateDisplayingBarsData();

	__graph.renderWindowProps();
	__graph.plotAccordingToChoices();
};
