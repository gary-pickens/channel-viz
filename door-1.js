
function get_xively_data()
{

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
		xively.setKey('ybwPH9462XIyemXo3ayvPSAzeJlOYlPMZihn1We3dybvRn73')

		
		var os = navigator.platform;
		if (os == "iPhone") 
			{
				$("*").css({"font-size":"110%"})			
				$("#status").html(os)
			}
			
		var feedID = 64451
			datastreamID = 0
			selector = "door"
	
		xively.datastream.get(feedID, datastreamID, function(datastream){
		    value = datastream["current_value"]
		    display_door_state(value)
		    
		    xively.datastream.subscribe( feedID, datastreamID, function ( event , datastream_updated ) { 
				    value = datastream_updated["current_value"] 
				    display_door_state(value)
		    })
		})
	})
}