Graph.prototype.getBarNamesForX = function() {
	if (!__graph.isBar)
		return;

	var minX, maxX, maxBarShowDotsNumber;

	if (__graph.minX == 0)
		minX = __graph.recalculatedBarsData[0].data[0][0];
	else
		minX = __graph.minX;

	if (__graph.maxX == 0) {
		var maxLength = __graph.recalculatedBarsData.length - 1;
		maxX = __graph.recalculatedBarsData[maxLength].data[__graph.recalculatedBarsData[maxLength].data.length - 1][0];
	} else
		maxX = __graph.maxX;

	maxBarShowDotsNumber = document.getElementById("placeholder").clientWidth / 43;

	if (maxX - minX <= maxBarShowDotsNumber) {
		__graph.minX = minX;
		__graph.maxX = maxX;
	}
	if (__graph.minX == 0 && __graph.maxX == 0) {
		var arr = [];
		for ( var val in __graph.recalculatedBarsData) {
			arr.push([ __graph.recalculatedBarsData[val].data[0][0], __graph.recalculatedBarsData[val].label ]);
		}
	} else {

		if (__graph.maxX - __graph.minX > maxBarShowDotsNumber)
			return;

		var arr = [];
		var indexX = -1, indexY;
		for ( var key in __graph.dataArrays) {
			indexX++;
			indexY = -1;
			for ( var j in __graph.dataArrays[key].data) {
				indexY++;
				if (__graph.minX > __graph.recalculatedBarsData[indexX].data[indexY][0])
					continue;
				if (__graph.recalculatedBarsData[indexX].data[indexY][0] > __graph.maxX)
					return arr;
				arr.push([ __graph.recalculatedBarsData[indexX].data[indexY][0], [ __graph.dataArrays[key].label, j ].join(",") ]);

			}
		}
	}
	return arr; // [ [ 1, "a" ], [ 10, "b" ], [ 20, "c" ], [ 30, "d" ] ];
};

Graph.prototype.calculateDisplayingBarsData = function() {

	var ind = 0, length = 0;
	for ( var l in __graph.dataArrays) {// a deep copy instead of $.extend(true, {}, __graph.dataArrays)

		__graph.recalculatedBarsData[ind] = $.extend(true, {}, __graph.dataArrays[l]); // a deep copy
		__graph.recalculatedBarsData[ind].data = [];
		__graph.recalculatedBarsData[ind].labels = [];

		for ( var j in __graph.dataArrays[l].data) {
			// j = +j;
			__graph.recalculatedBarsData[ind].data.push([ length++, __graph.dataArrays[l].data[j][1] ])
			__graph.recalculatedBarsData[ind].labels.push(__graph.dataArrays[l].data[j]);
		}
		ind++;
	}
};
