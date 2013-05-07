Graph.prototype.EntryLineGraphProps = function(j, name) {
	var color, x, y, z, choose, i = 0;

	if (j < __graph_colors.length)
		color = __graph_colors[j];
	else {
		choose = j % 3;
		do {
			x = Math.floor(Math.random() * 255);
			y = Math.floor(Math.random() * 255);
			z = Math.floor(Math.random() * 255);
			i++;
		} while (i > 2 && (x + y + z >= 700 || x + y + z < 230))

		color = 'rgb(' + x + ',' + y + ',' + z + ')';
	}
	return {

		label : typeof name == 'undefined' ? j : name,
		color : color,
		// color : j,
		data : []
	// ,
	// shadowSize : 2//,
	// highlightColor : 1
	};
};

var PlotOptions = function() {
	return {
		series : {
			lines : {
				show : true
			},
			points : {
				show : false
			},
			bars : {
				show : false
			},
			shadowSize : 0
		},
		legend : {
			show : false
		// noColumns : 1,
		// container : document.getElementById("legendContainer")
		},
		xaxis : {
			tickDecimals : 0
		// ,tickSize : 1
		},
		grid : {
			// aboveData : true,
			// backgroundColor : "#555555",
			borderColor : "#E0E0E0",
			clickable : false,
			hoverable : true,
			autoHighlight : true
		},

	};
};