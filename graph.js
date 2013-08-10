xivelyKey = "ybwPH9462XIyemXo3ayvPSAzeJlOYlPMZihn1We3dybvRn73"
xivelyFeedID = "64451"
xivelyChannel = "0"

xivelyFeedID = GetURLParameter("id")
xivelyChannel = GetURLParameter("channel")

if ("0" == xivelyChannel) {
	$("#Sensor").html("Garage Door")
	min = -0.125
	max = 1.125
	units = 'Count'
} else if ("1" == xivelyChannel) {
	$("#Sensor").html("Garage Temperature")
	min = 0
	max = 130
	units = 'F'
} else if ("2" == xivelyChannel) {
	$("#Sensor").html("Sunroom Temperature")
	min = 0
	max = 130
	units = 'F'
} else if ("4" == xivelyChannel) {
	$("#Sensor").html("Kitchen Temperature")
	min = 75
	max = 95
	units = 'F'
} else if ("5" == xivelyChannel) {
	$("#Sensor").html("Outdoor Temperature")
	min = 0
	max = 130
	units = 'F'
}

function GetURLParameter(sParam)
{
	var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}


screen_width = $(document).width();
screen_height = $(document).height();

graph_width = 500;
graph_height = 300;

xively.setKey(xivelyKey);

var graph_end = moment.utc();
var graph_start = moment.utc()
	graph_start.subtract('hours', 6)
 
var query = {
	start: graph_start.toJSON(),
	stop: graph_end.toJSON(),
	interval: 900,
	limit: 1000
};

$("#current").click(function(){
	var graph_end = moment.utc();
	var graph_start = moment.utc();

	graph_start.subtract('hours', 5);
	query.end = graph_start.toJSON();
	query.start = graph_start.toJSON();
	query.start = graph_start.toJSON();
	query.end = graph_end.toJSON();

	query.interval = 30;
//	$("#status").html("#current " + graph_start.format("dddd, MMMM Do YYYY, h:mm:ss a") + " -- " + graph_end.format("dddd, MMMM Do YYYY, h:mm:ss a"));
	$("#graph").empty();
	xively.datastream.history( xivelyFeedID, xivelyChannel, query, loadData);
})

$("#today").click(function(){
	var graph_end = moment.utc().endOf('day');
	var graph_start = moment.utc().startOf('day');

	query.end = graph_end.toJSON();
	query.start = graph_start.toJSON();
	query.interval = 60;

//	$("#status").html("#today " + graph_start.format("dddd, MMMM Do YYYY, h:mm:ss a") + " -- " + graph_end.format("dddd, MMMM Do YYYY, h:mm:ss a"));
	$("#graph").empty();
	xively.datastream.history( xivelyFeedID, xivelyChannel, query, loadData);
})

$("#week").click(function(){
	var graph_end = moment.utc();
	var graph_start = moment.utc();
	graph_start.subtract('weeks', 1);
	query.end = graph_end.toJSON();
	query.start = graph_start.toJSON();
	query.interval = 900;
//	$("#status").html("#week " + graph_start.format("dddd, MMMM Do YYYY, h:mm:ss a") + " -- " + graph_end.format("dddd, MMMM Do YYYY, h:mm:ss a"));
	$("#graph").empty();

	xively.datastream.history( xivelyFeedID, xivelyChannel, query, loadData);
})


$("#month").click(function(){
	var graph_end = moment.utc();
	var graph_start = moment.utc();

	graph_start.subtract('months', 1);
	query.end = graph_end.toJSON();
	query.start = graph_start.toJSON();
	query.interval = 3600;
	$("#graph").empty();

//	$("#status").html("month " + query.start.format("dddd, MMMM Do YYYY, h:mm:ss a) + " -- " + query.end.format("dddd, MMMM Do YYYY, h:mm:ss a));
	xively.datastream.history( xivelyFeedID, xivelyChannel, query, loadData);
})

xively.datastream.history( xivelyFeedID, xivelyChannel, query, loadData);
 
function loadData(data) {
	var unit = units;
	var series = [];
	var filtedData = data.datapoints.filter(function(x) { return (x.value < 1000); });
	for (var i=0; i < filtedData.length; i++ ) {
		var utc = moment.utc(filtedData[i].at);
		utc.local()
		var date = utc
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
		min: min,
		max: max,
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
		formatter: function(series_data, x, y) {
			var swatch = '<span class="detail_swatch" style="background-color: ' + series_data.color + ' padding: 4px;"></span>';
			var content = swatch + "&nbsp;&nbsp;" + parseFloat(y) + '&nbsp;&nbsp;<br>';
			return content;
		}
	});

//	$("#slider").css("width: " + graph_width + "px");
	var slider = new Rickshaw.Graph.RangeSlider({
			graph: graph,
			element: document.querySelector("#slider")
		});
}
