Graph.prototype.setDynamicUpdate = function(event) {

	event.preventDefault();

	if (__graph.isBar == undefined) {
		ajaxUpdate();
		return;
	}
	if (__graph.isDynamicUpdate == false) {
		startDynamicUpdate();

	} else {
		__graph.stopDynamicUpdate();

	}
	function ajaxUpdate() {

		var frame, isInterval = false;

		frame = __graph.series == undefined ? 0 : __graph.series.frame != undefined ? __graph.series.frame : 0;

		$.ajax({
			url : __graph.queryString.feed, // var url = "http://localhost:8001/getstring?seqNum=" + frame;
			type : 'GET',
			// method: sending_type,
			// contentType : "application/xml",
			dataType : 'json',
			cache : false,
			data : 'frame=' + frame,
			// processData : false,
			// crossDomain : true,
			// jsonp:
			// jsonpCallback:
			success : function(series) {
				// $("#fileName").val(" ");
				__graph.series = series;
				if (__graph.isBar == undefined)
					isInterval = true;

				if (!__graph.isDynamicUpdate && !isInterval)
					onOffButton.setAttribute('style', '');
				else if (series.mode == "kv_1")
					__graph.updateLines();
				else if (series.mode == "vector_2")
					__graph.updateBar();
				else if (series.mode == "bpch")
					__graph.updateBar2();
				else {
					onOffButton.setAttribute('style', 'background-position: 1px -71px !important;');
					console.log("Wrong feed in the query string");
					__graph.stopDynamicUpdate();
					// onOffButton.setAttribute('style', '');
					return;
				}

				if (isInterval)
					$('#startDynamicUpdate').click();

				if (__graph.series.data != undefined)
					__graph.series.data = undefined; // delete the data array because we don't need it anymore
			},
			error : function(err) {
				console.log("Error with request: " + err);
				onOffButton.setAttribute('style', 'background-position: 1px -71px !important;');
				console.log("Wrong feed in the query string");
				__graph.stopDynamicUpdate();
				// onOffButton.setAttribute('style', '');
			},
		});
	}

	function startDynamicUpdate() {

		var realLength;

		setUpdateInterval();

		function setUpdateInterval() {
			if (__graph.isBar) {
				realLength = getRealLength();

				function getRealLength() {
					var len = 0;
					for ( var i in __graph.dataArrays) {
						for ( var j in __graph.dataArrays[i].data) {
							len++;
						}
					}
					return len;
				}
				__graph.intervalDinamicUpdate = setInterval(updateBars, __graph.updateInterval);
			} else {
				__graph.intervalDinamicUpdate = setInterval(updateLines, __graph.updateInterval);

			}
		}

		var switchButton = true;
		function switchButtonColor() {
			var onOffButton = document.getElementById("onOffButton");
			if (!switchButton) {
				onOffButton.setAttribute('style', '');
			} else {
				onOffButton.setAttribute('style', 'background-position: 1px -22px !important');
			}
			switchButton = !switchButton;
		}

		function updateLines() {
			switchButtonColor();

			if (__graph.queryString.random == 'true')
				getRandomLineData();
			else
				ajaxUpdate();

			minMaxDetect();
			function minMaxDetect() {
				if (__graph.dataArrays[0] == undefined)
					return;

				if (__graph.minX != 0 || __graph.maxX != 0)
					__graph.minX += 1;
				if (__graph.maxX != 0)
					__graph.maxX += 1;

				var min = __graph.minX == 0 ? __graph.dataArrays[0].data[0][0] : Math.ceil(__graph.minX);
				var max = __graph.maxX == 0 ? __graph.dataArrays[0].data[__graph.dataArrays[0].data.length - 1][0] : Math
						.ceil(__graph.maxX);

				var zoomRel = document.getElementById("placeholder").clientWidth / 20;

				if (max - min < zoomRel)
					__graph.plotOptions.series.points.show = true;
				else
					__graph.plotOptions.series.points.show = false;

				document.getElementById("overviewTotal").innerHTML = [ "Entries:<b>", max - min, "</b>of<b>",
						__graph.dataArrays[0].data.length, "</b>" ].join(" ");
			}

			__graph.plotAccordingToChoices();
		}

		function updateBars() {
			switchButtonColor();

			if (__graph.queryString.random == 'true')
				getRandomBarsData();
			else
				ajaxUpdate();

			__graph.plotAccordingToChoices();
		}

		var y, i, j;
		function getRandomBarsData() {

			y = Math.floor(Math.random() * realLength);// prev + Math.random() * 10 - 5;
			i = Math.floor(y / 16);
			j = y % 16;

			try {
				__graph.dataArrays[i].data[j][1] = __graph.dataArrays[i].data[j][1] + 2;
				__graph.calculateDisplayingBarsData();
			} catch (ex) {
				console.log("Error:", i + " : " + j + " / " + ex);
			}

		}

		var sparsedArrayIndex = 0;
		function getRandomLineData() {
			var lastX, lastY, pre_lastY, y, diff;

			for ( var i = 0; i < __graph.dataArrays.length; i++) {

				lastX = __graph.dataArrays[i].data[__graph.dataArrays[i].data.length - 1][0];
				lastY = __graph.dataArrays[i].data[__graph.dataArrays[i].data.length - 1][1];

				pre_lastY = __graph.dataArrays[i].data[__graph.dataArrays[i].data.length - 2][1];
				diff = Math.abs(lastY - pre_lastY);

				y = lastY + diff * (Math.random() > 0.5 ? 1 : -1);

				__graph.dataArrays[i].data.push([ lastX + 1, y ]);

				if (sparsedArrayIndex < 50) {
					__graph.sparcedDataArray[i].data.push([ lastX + 1, y ]);
					sparsedArrayIndex++;
				} else {
					__graph.sparceData();
					sparsedArrayIndex = 0;
				}
			}
		}

		__graph.plotAccordingToChoices();

		$("#startUpdate").val("Stop Update");
		__graph.isDynamicUpdate = true;
	}

};
// ----------- stop dynamic update ---------------
Graph.prototype.stopDynamicUpdate = function() {
	if (!__graph.isDynamicUpdate)
		return;
	window.clearInterval(__graph.intervalDinamicUpdate);
	__graph.isDynamicUpdate = false;
	$("#startUpdate").val("Start Update");
	onOffButton.setAttribute('style', '');
};