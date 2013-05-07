//debugger;

Graph.prototype.readLines = function readFiles(lines) {

	var line, cells, delimiter;// , prevX;

	// --------------------------------------------
	detectGraphType();
	function detectGraphType() {
		for ( var i = 0, size = lines.length; i < size; i++) {
			line = lines[i];
			if (line.length <= 1) // the line is empty
				continue;

			if (delimiter === undefined)
				// deal with different types of separation/delimiter between each axis value in text file
				cells = delimitLine(line);
			else
				cells = line.split(delimiter);

			if (cells.length == 2) {
				__graph.isBar = true;
				break;
			} else if (cells.length > 2) {
				__graph.isBar = false;
				break;
			} else {
				console.log("Unknown type graph");
				throw "Unknown type graph exception";
			}
		}
	}

	if (__graph.isBar) {
		generateBarsTypeGraph();
	} else {
		generateLinesTypeGraph();
	}

	// -----------------------------------------------------
	function generateBarsTypeGraph() {
		var hashT = [], x, xFloor;

		for ( var i = 0, size = lines.length; i < size; i++) {
			line = lines[i];
			if (line.length <= 1) // the line is empty
				continue;

			cells = line.split(":");
			x = +cells[0];

			// -----------

			xFloor = Math.floor(x);

			if (hashT[xFloor] === undefined) {
				hashT[xFloor] = [];
			}
			hashT[xFloor][Math.round((x - xFloor) * 100)] = +cells[1];
		}

		// __graph.realBarLength = 0;
		for ( var i = 0; i < hashT.length; i++) {
			__graph.dataArrays[i] = __graph.EntryLineGraphProps(i);
			// console.log(i + " " + hashT[i]);
			for ( var j = 0; j < hashT[i].length; j++) {
				// !!!!!!!!!
				__graph.dataArrays[i].data.push([ j, hashT[i][j] ]);
			}
		}
		__graph.calculateDisplayingBarsData();
	}

	// -----------------------------------------------------
	function generateLinesTypeGraph() {
		var x = 0, names = null;

		for ( var i = 0, size = lines.length; i < size; i++) {
			line = lines[i];
			if (line.length <= 1) // the line is empty
				continue;

			cells = line.split(delimiter);
			x = +cells[0];

			// -----------

			if (isNaN(x)) {
				names = cells;
				continue;
			}

			for ( var j = 0; j + 1 < cells.length; j++) { // for each unit

				if (__graph.dataArrays[j] === undefined) {

					__graph.dataArrays[j] = __graph.EntryLineGraphProps(j);
					if (names != null) {
						__graph.dataArrays[j].label = names[j + 1];
					}
				}
				__graph.dataArrays[j].data.push([ x, +cells[j + 1] ]);
			}
		}
	}

	// ------- delete lines from a memory ---------
	lines.splice(0, lines.length); // delete all lines

	// ------------ deal with different types of separation/delimiter between each axis value in text file ----------
	function delimitLine(line) {
		cells = line.split(",");
		delimiter = ",";
		if (cells.length <= 1) {
			cells = line.split(":");
			delimiter = ":";
			if (cells.length == 2) {
				cells = line.split(/\b[: ]/);
				delimiter = /\b[: ]/;
			}
			if (cells.length <= 1) {
				cells = line.split(/[\t]/); // split by a tab character
				delimiter = /[\t]/;
				if (cells.length <= 1) {
					cells = line.split(/[\v]/); // split by a vertical tab character
					delimiter = /[\v]/;
					if (cells.length <= 1) {
						cells = line.split("   "); // check for 3 times of SPACE key
						delimiter = "   ";
						if (cells.length <= 1) {
							cells = line.split("  "); // check for 2 times of SPACE key
							delimiter = "  ";
							if (cells.length <= 1) {
								cells = line.split(" "); // check for 1 times of SPACE key
								delimiter = " ";
							}
						}
					}
				}
			}
		}
		return cells;
	}
	__graph.renderWindowProps();
	__graph.plotAccordingToChoices();
};
