
function get_xively_data()
{
	$(document).ready(function() {
		xively.setKey('ybwPH9462XIyemXo3ayvPSAzeJlOYlPMZihn1We3dybvRn73')
	
		
		var feedID = 64451
			datastreamID = 0
			selector = "door"
	
		xively.datastream.get(feedID, datastreamID, function(datastream){
		    value = datastream["current_value"]
		    if (value == 1)
		    	{
		    	value = "The door is closed"
		    	}
		    else
		    	{
		    	value = "The door is open"
		    	}		
		    	
		    document.getElementById("door").innerHTML = value;
		})
		    
		xively.datastream.subscribe( feedID, datastreamID, function ( event , datastream_updated ) { 
		    value = datastream_updated["current_value"] 
		    if (value == 1)
		    	{
		    	value = "The door is closed"
		    	}
		    else
		    	{
		    	value = "The door is open"
		    	}		
		    	
		    document.getElementById("door").innerHTML = value;
		})
	})
}