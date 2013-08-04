
function get_xively_data()
{

	function display_temp(value, name, time_change)
	{
		$(name).html(value);
	    $(name).css("color", "green")
		date_time_2(time_change)
	}

	
	function display_door_state(value)
	{
	    if (value == 1)
		{
		$("#door").html("<b>Closed</b>");
	    $("#door").css("color", "green")
		}
	else
		{
		$("#door").html("<b>Open</b>");
	    $("#door").css("color", "red")
		}		
		date_time_2("change time")
	}
	
	$(document).ready(function() {
		var feedID = 64451
		var selector = "door"
			
		xively.setKey('ybwPH9462XIyemXo3ayvPSAzeJlOYlPMZihn1We3dybvRn73')

		var os = navigator.platform;
		if (os == "iPhone") 
			{
				$("*").css({"font-size":"110%"})
				$("#status").html(os)
			}

		/* Garage door */
		var datastreamID = 0
		var garage_count = 0
		xively.datastream.get(feedID, datastreamID, function(datastream){
		    value = datastream["current_value"]
		    display_door_state(value)
		    
		    xively.datastream.subscribe( feedID, datastreamID, function ( event , datastream_updated ) { 
				    value = datastream_updated["current_value"] 
				    display_door_state(value)
				    garage_count = garage_count + 1
					$("#status").html("Received data packet from garage door sensor  "+garage_count)				    
		    })
		})

		/* Garage temp */
		var datastreamID = 1
		var garage_temperature = 0
		xively.datastream.get(feedID, datastreamID, function(datastream){
			var location = "#garage_temp"
			var time_change = "garage_temp_time_change"
		    value = datastream["current_value"]
		    display_temp(value, location, time_change)
		    
		    xively.datastream.subscribe( feedID, datastreamID, function ( event , datastream_updated ) { 
	    		var location = "#garage_temp"
				var time_change = "garage_temp_time_change"
			    value = datastream_updated["current_value"] 
			    display_temp(value, location, time_change)
	    		garaage_temperature = garage_temperature + 1
				$("#status").html("Received data packet from Garage  " + garage_temperature)				    
		    })
		})

		/* Sunroom temp */
		var datastreamID = 2
		var sunroom_temperature = 0
		xively.datastream.get(feedID, datastreamID, function(datastream){
			var location = "#sunroom_temp"
			var time_change = "sunroom_temp_time_change"
		    value = datastream["current_value"]
		    display_temp(value, location, time_change)
		    
		    xively.datastream.subscribe( feedID, datastreamID, function ( event , datastream_updated ) { 
	    		var location = "#sunroom_temp"
				var time_change = "sunroom_temp_time_change"
			    value = datastream_updated["current_value"] 
			    display_temp(value, location, time_change)
				sunroom_temperature = sunroom_temperature + 1
	    		$("#status").html("Received data packet from Sunroom  "+sunroom_temperature)				    
		    })
		})

		/* Backroom temp */
		var datastreamID = 4
		var backroom_temp = 0
		xively.datastream.get(feedID, datastreamID, function(datastream){
		    value = datastream["current_value"]
			var location = "#backroom_temp"
			var time_change = "backroom_temp_time_change"
		    display_temp(value, location, time_change)
		    
		    xively.datastream.subscribe( feedID, datastreamID, function ( event , datastream_updated ) { 
	    		var location = "#backroom_temp"
				var time_change = "backroom_temp_time_change"
			    value = datastream_updated["current_value"] 
			    display_temp(value, location, time_change)
	    		backroom_temperature = backroom_temperure +1
				$("#status").html("Received data packet from Backroom  "+backroom_temperature)				    
		    })
		})


	})
}