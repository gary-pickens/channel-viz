
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
		var garage_count = 0
		xively.datastream.get(feedID, 0, function(datastream){
		    value = datastream["current_value"]
		    display_door_state(value)
		    
		    xively.datastream.subscribe( feedID, 0, function ( event , datastream_updated ) { 
				    value = datastream_updated["current_value"] 
				    display_door_state(value)
				    garage_count = garage_count + 1
					$("#status").html("Received data packet from garage door sensor  "+garage_count+" "+value)				    
		    })
		})

		/* Garage temp */
		var garage_temperature = 0
		xively.datastream.get(feedID, 1, function(datastream){
			var location = "#garage_temp"
			var time_change = "garage_temp_time_change"
		    value = datastream["current_value"]
		    display_temp(value, location, time_change)
		    
		    xively.datastream.subscribe( feedID, 1, function ( event , datastream_updated ) { 
	    		var location = "#garage_temp"
				var time_change = "garage_temp_time_change"
			    value = datastream_updated["current_value"] 
			    display_temp(value, location, time_change)
	    		garage_temperature = garage_temperature + 1
				$("#status").html("Received data packet from Garage temperature  " + garage_temperature)				    
		    })
		})

		/* Sunroom temp */
		var sunroom_temperature = 0
		xively.datastream.get(feedID, 2, function(datastream){
			var location = "#sunroom_temp"
			var time_change = "sunroom_temp_time_change"
		    value = datastream["current_value"]
		    display_temp(value, location, time_change)
		    
		    xively.datastream.subscribe( feedID, 2, function ( event , datastream_updated ) { 
	    		var location = "#sunroom_temp"
				var time_change = "sunroom_temp_time_change"
			    value = datastream_updated["current_value"] 
			    display_temp(value, location, time_change)
				sunroom_temperature = sunroom_temperature + 1
	    		$("#status").html("Received data packet from Sunroom  "+sunroom_temperature)				    
		    })
		})

		/* Backroom temp */
		var kitchen_temperature = 0
		xively.datastream.get(feedID, 4, function(datastream){
		    value = datastream["current_value"]
			var location = "#kitchen_temp"
			var time_change = "kitchen_temp_time_change"
		    display_temp(value, location, time_change)
		    
		    xively.datastream.subscribe( feedID, 4, function ( event , datastream_updated ) { 
	    		var location = "#kitchen_temp"
				var time_change = "kitchen_temp_time_change"
			    value = datastream_updated["current_value"] 
			    display_temp(value, location, time_change)
	    		kitchen_temperature = kitchen_temperature +1
				$("#status").html("Received data packet from Kitchen  "+kitchen_temperature)				    
		    })
		})

		/* Outdoor temp */
		var outdoor_temperature = 0
		xively.datastream.get(feedID, 5, function(datastream){
		    value = datastream["current_value"]
			var location = "#outdoor_temp"
			var time_change = "outdoor_temp_time_change"
		    display_temp(value, location, time_change)
		    
		    xively.datastream.subscribe( feedID, 5, function ( event , datastream_updated ) { 
	    		var location = "#outdoor_temp"
				var time_change = "outdoor_temp_time_change"
			    value = datastream_updated["current_value"] 
			    display_temp(value, location, time_change)
	    		outdoor_temperature = outdoor_temperature +1
				$("#status").html("Received data packet for Outdoor  "+outdoor_temperature)				    
		    })
		})
	})
}
