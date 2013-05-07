function Graph() {

	// ======== config values =========

	this.updateInterval = 300;

	// keyCode 65 is 'A'
	this.ySelectionKey = 65;

	// ============ read the query string ======================
	this.queryString = {};

	var ps = window.location.search.split(/\?|&/);
	for ( var i = 0; i < ps.length; i++) {
		if (ps[i]) {
			var p = ps[i].split(/=/);
			this.queryString[p[0]] = p[1];
		}
	}
	// ==================================
	this.minX = 0;
	this.maxX = 0;
	this.minY = 0;
	this.maxY = 0;
	this.sparcedDataArray;
	this.data = [];
	this.plot = null;
	this.plotOptions;

	this.dataArrays = [];
	this.recalculatedBarsData = [];

	this.intervalDinamicUpdate = null;
	this.placeholder = $("#placeholder");

	this.isDynamicUpdate = false;
	this.choices = [];

	this.isBar = null;

	this.yScale = false;

	this.series;

	this.overviewBarsTotal = document.getElementById("overviewBarsTotal");
};

Graph.prototype.plotAccordingToChoices = function() {

	var plotOptions = $.extend(true, {}, __graph.plotOptions, {

		selection : __graph.yScale == true ? {
			mode : "y"
		} : {
			mode : "x"
		},
	});

	if (__graph.minX != 0 || __graph.maxX != 0) {

		plotOptions = $.extend(true, {}, plotOptions, {
			xaxis : {
				min : __graph.minX,
				max : __graph.maxX,
				ticks : __graph.getBarNamesForX()
			}
		});
	}
	if (__graph.minY != 0 || __graph.maxY != 0) {

		plotOptions = $.extend(true, {}, plotOptions, {
			yaxis : {
				min : __graph.minY,
				max : __graph.maxY
			}
		});
	}

	if (__graph.isBar) {
		__graph.plot = $.plot(__graph.placeholder, __graph.recalculatedBarsData, plotOptions);
	} else {

		__graph.data = [];

		for ( var key in __graph.choices) {
			if (__graph.choices[key] != null)
				__graph.data.push(__graph.sparcedDataArray[key]);
		}

		if (__graph.data.length == 0)
			return;

		__graph.plot = $.plot(__graph.placeholder, __graph.data, plotOptions);
	}
};

Graph.prototype.plotselected = function(event, ranges) {
	event.preventDefault();
	__graph.minX = ranges.xaxis.from;
	__graph.maxX = ranges.xaxis.to;
	__graph.minY = ranges.yaxis.from;
	__graph.maxY = ranges.yaxis.to;

	__graph.sparcedDataArray = __graph.sparceData();

	__graph.data = [];

	var i = 0;
	var dataArray = __graph.isBar ? __graph.recalculatedBarsData : __graph.sparcedDataArray;
	for ( var key in __graph.choices) {
		if (__graph.choices[key] != null)
			__graph.data.push(dataArray[i]);
		i++;
	}

	// $("#selection").text(__graph.minX.toFixed(1) + " to " + __graph.maxX.toFixed(1));

	var plotOptions = $.extend(true, {}, __graph.plotOptions, {
		xaxis : {
			min : __graph.minX,
			max : __graph.maxX,
			ticks : __graph.getBarNamesForX()
		},
		yaxis : {
			min : __graph.minY,
			max : __graph.maxY
		},
		selection : {
			mode : "x"
		},
	});

	__graph.plot = $.plot(__graph.placeholder, __graph.data, plotOptions);
};

Graph.prototype.dblclick = function(event) {
	event.preventDefault();

	document.getElementById("placeholder").innerHTML = "";
	__graph.minX = 0;
	__graph.maxX = 0;
	__graph.minY = 0;
	__graph.maxY = 0;

	__graph.sparcedDataArray = __graph.sparceData();
	__graph.plotAccordingToChoices();
};

Graph.prototype.plotclick = function(event, pos, item) {
	return;
	console.log("You clicked at " + pos.x + ", " + pos.y);
	// axis coordinates for other axes, if present, are in pos.x2, pos.x3, ...
	// if you need global screen coordinates, they are pos.pageX, pos.pageY

	if (item) {
		// highlight(item.series, item.datapoint);
		console.log("You clicked a point!", item.series, item.datapoint);
	}
};
Graph.prototype.plothover = function(event, pos, item) {
	// console.log("You hovered at " + pos.x + ", " + pos.y);

	if (item) {
		// console.log("You hovered a point!", getName(item.datapoint[0]));
		__graph.overviewBarsTotal.innerHTML = getName(item.datapoint[0]);
	}

	function getName(x) {
		var labels;
		for ( var i in __graph.recalculatedBarsData) {
			for ( var j in __graph.recalculatedBarsData[i].data) {
				if (__graph.recalculatedBarsData[i].data[j][0] != x)
					continue;
				labels = __graph.recalculatedBarsData[i].labels[j];
				return [ __graph.recalculatedBarsData[i].label, labels[0], ].join(",");
			}
		}
	}
};
