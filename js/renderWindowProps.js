Graph.prototype.renderWindowProps = function() {

	// -----------------------------------------------------
	updatePlotOptions();
	function updatePlotOptions() {
		__graph.plotOptions = PlotOptions();
		if (__graph.isBar) {
			__graph.plotOptions.series.lines.show = false;
			__graph.plotOptions.series.bars.show = true;

			__graph.plotOptions.xaxis = {
				ticks : __graph.getBarNamesForX()
			// , show : __graph.isBar ? true : true
			};

			$("#choices").hide();
			$("#overviewTotal").hide();
			$(__graph.overviewBarsTotal).show();
		} else {
			__graph.plotOptions.series.lines.show = true;
			__graph.plotOptions.series.bars.show = false;
			$("#choices").show();
			$("#overviewTotal").show();
			$(__graph.overviewBarsTotal).hide();
		}
	}

	// -----------------------------------------------------
	setChoices();
	function setChoices() {
		var arr = [ '<table><tr>' ];
		for ( var key in __graph.dataArrays) {

			arr.push('<td>');
			arr.push('<div class="cell" data-id="');
			arr.push(key);
			arr.push('" ');
			if (__graph.choices[key] === undefined) {
				__graph.choices[key] = key;

			} else {
				if (__graph.choices[key] == null)
					arr.push('style="background-color: #F5FFFF; border: 1px solid #F9FFFF;"');
			}
			arr.push('>');
			arr.push('<label for="id');
			arr.push(key);
			arr.push('">');
			arr.push(__graph.dataArrays[key].label);
			arr.push('</label>');
			arr.push('<div style="border: 5px solid ');
			arr.push(__graph.dataArrays[key].color);
			arr.push('"></div>');
			arr.push('</div></td>');
		}
		arr.push('</tr></table>');
		$("#choices").html(arr.join(""));

	}

	setMouseEventsOnChoices();
	function setMouseEventsOnChoices() {
		if (!__graph.isBar) {
			$(".cell").mouseover(function(evt) {
				var tag = evt.srcElement;
				while (tag.className != "cell")
					tag = tag.parentElement;

				tag.style.backgroundColor = "#D0DADE";
				tag.style.border = "1px inset";

			});
			$(".cell").mouseout(function(evt) {
				var tag = evt.srcElement;
				while (tag.className != "cell")
					tag = tag.parentElement;

				if (__graph.choices[tag.dataset.id] != null) {
					tag.style.backgroundColor = "";
					tag.style.border = "";
				} else {
					tag.style.backgroundColor = "#F5FFFF";
					tag.style.border = "1px dotted #F0D000";
				}

			});
			// -------------------------------------------------------#F4D7F5
			$(".cell").mousedown(function(evt) {
				var tag = evt.srcElement;
				while (tag.className != "cell")
					tag = tag.parentElement;

				if (__graph.choices[tag.dataset.id] != null) {
					__graph.choices[tag.dataset.id] = null;

				} else {
					__graph.choices[+tag.dataset.id] = +tag.dataset.id;
					// tag.style.backgroundColor = "";
					// tag.style.border = "";
				}
				tag.style.backgroundColor = "#A3A0E8";
				tag.style.border = "1px dotted #999999";

				__graph.plotAccordingToChoices();
			});

			$(".cell").mouseup(function(evt) {
				var tag = evt.srcElement;
				while (tag.className != "cell")
					tag = tag.parentElement;

				tag.style.backgroundColor = "#D0DADE";
				tag.style.border = "1px inset";

				__graph.plotAccordingToChoices();
			});
		}
	}

	__graph.sparcedDataArray = __graph.sparceData();
	$('#placeholder').css('height', (Math.floor(0.4 * window.outerHeight)) + 'px');
};