
xivelyKey = "ybwPH9462XIyemXo3ayvPSAzeJlOYlPMZihn1We3dybvRn73"
xivelyChannel = "5"

xively.setKey(xivelyKey);

 
var startOfYesterday = moment().subtract("day", 1).startOf('day');
var endOfYesterday = moment().startOf('day');
 
console.log(startOfYesterday);
console.log(endOfYesterday);
 
var query = {
	start: startOfYesterday.toJSON(),
	end: endOfYesterday.toJSON(),
	interval: 60,
	limit: 1000
};
 
xively.datastream.history( "64451", "1", query, loadData);
 
function loadData(data) {
	var unit = data.unit.label;
	var series = [];
	var filtedData = data.datapoints.filter(function(x) { return (x.value < 1000); });
	for (var i=0; i < filtedData.length; i++ ) {
		var date = moment(filtedData[i].at);
		var value = parseInt(filtedData[i].value);
		series[i] = {x: date.unix(), y: value};
	}
	drawGraph(series, unit);
}
 
function drawGraph(series_data, unit) {
	// Build Graph
	var graph = new Rickshaw.Graph( {
		element: document.querySelector("#graph"),
		width: 600,
		height: 400,
		renderer: 'line',
		min: 0,
		max: 120,
		padding: {
			top: 0.02,
			right: 0.02,
			bottom: 0.02,
			left: 0.02
		},
	    series:  [{
			data:  series_data,
					color: 'steelblue'
				}]

	});
	graph.render();

	var ticksTreatment = 'glow';
	var xAxis = new Rickshaw.Graph.Axis.Time( {
		graph: graph,
		ticksTreatment: ticksTreatment
	});
	xAxis.render();

	var yAxis = new Rickshaw.Graph.Axis.Y( {
		graph: graph,
		tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
		ticksTreatment: ticksTreatment
	});
	yAxis.render();

	// Enable Datapoint Hover Values
	var hoverDetail = new Rickshaw.Graph.HoverDetail({
		graph: graph,
		formatter: function(series, x, y) {
			var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + ' padding: 4px;"></span>';
			var content = swatch + "&nbsp;&nbsp;" + parseFloat(y) + '&nbsp;&nbsp;<br>';
			return content;
		}
	});

	var slider = new Rickshaw.Graph.RangeSlider({
			graph: graph,
			element: document.querySelector("#slider")
		});
}