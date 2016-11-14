function Boot()
{
	if (window.console && typeof console.log === "function")
	{
		window.trace = function ()
		{
			console.log.apply(console, arguments);
		};
	} 
	
	else
	{
		window.trace = function(){ return; }
	}
	
	var self = this;
	$(window).on("hashchange", null, this, ReadURL );
	
	$("#lineSize").on("keyup paste input", function(e) { e.stopPropagation(); WriteURL(); } );
	$("#distanceSize").on("keyup paste input", function(e) { e.stopPropagation(); WriteURL(); } );
	
	$(document).on("keyup", OnKeyDown);
	
	var hammer = new Hammer( $("#displayFrame").get(0) );
	hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
	hammer.get("tap").set( {time:1000, threshold:10})
	hammer.on("swipeup", 	UserUp);
	hammer.on("swipedown",  UserDown);
	hammer.on("swipeleft",  UserLeft);
	hammer.on("swiperight", UserRight);
	hammer.on("tap", 		Refresh );
	hammer.on("press", 		ToggleSettings );
	
	for(var i = 0 ; i < ChartType.chartTypes.length ; i++)
	{
		var chart = ChartType.chartTypes[i];
				
		var op = document.createElement("option");
		$(op).attr("value", "" + i);
		
		var s = i < 10? "[F" + (i+1) + "] " + chart.GetName() : chart.GetName();
		
		$(op).text(s);
	
		$("#chartType").append(op);
	}
	
	
	
	window.ReadURL();
}



window.WriteURL = function()
{
	var settings = document.getElementById("settings");
	
	if( ! settings.lineSize.value || ! settings.distance.value ) 
		return;
	
	
	

	
	
	 var str = "" + "lineSize="  	 	+ settings.lineSize.value
		    + "&" + "lineUnits=" 	 	+ settings.lineUnits.value
		    + "&" + "distance="  	 	+ settings.distance.value
		    + "&" + "distanceUnits=" 	+ settings.distanceUnits.value
		    + "&" + "chartType="	 	+ settings.chartType.value
		    + "&" + "optoType="			+ settings.optoType.value
		    + "&" + "displayType="  	+ settings.displayType.value 
		    + "&" + "rowIndex="			+ settings.rowIndex.value
		    + "&" + "mirror="		 	+ $(settings.mirror).prop("checked")
		    + "&" + "animate="		 	+ $(settings.animate).prop("checked")
		    + "&" + "crowd="		 	+ $(settings.crowd).prop("checked")
		    + "&" + "nearFar="			+ settings.nearFar.value
		    + "&" + "col1="				+ settings.col1.value
		    + "&" + "col2="				+ settings.col2.value
		    + "&" + "col3="				+ settings.col3.value
		    + "&" + "col4="				+ settings.col4.value
		    + "&" + "mode3d="				+ settings.mode3d.value
		    
 			;
	
	location.hash = str;
}

window.ReadURL = function()
{
	var hash = location.hash.substring(1);
	var arrFields = hash.split("&");
	
	var settings = document.getElementById("settings");
	
	var obj = {}
	
	for(var i = 0 ; i < arrFields.length ; i++)
	{
		var arrField = arrFields[i].split("=");
		var key = arrField[0];
		var val = arrField[1];
		
		obj[key] = val;
	}
	
	$(settings["mirror"]).prop( "checked", obj.mirror  == "true");
	$(settings["animate"]).prop("checked", obj.animate == "true");
	$(settings["crowd"]).prop(  "checked", obj.crowd   == "true");
	
	$(settings.lineSize).val(parseFloat(obj.lineSize) || 2.5);
	$(settings.lineUnits).val(obj.lineUnits == "cm" || obj.lineUnits == "inches"? obj.lineUnits : "cm");
	$(settings.distance).val(parseFloat(obj.distance) || 6.0);
	$(settings.distanceUnits).val( obj.distanceUnits == "meters" || obj.distanceUnits == "meters"? obj.distanceUnits : "meters");
	
	$(settings.chartType).val( parseFloat(obj.chartType) || 0 );

	 //   nearFar="			+ settings.nearFar.value
	//  col1="				+ settings.col1.value
	//----
		 	
	var el = $("#displayFrame").get(0);
	
	var newChart = ChartType.chartTypes[parseInt(settings.chartType.value)];
	
	var ot = parseInt(settings.optoType.value) || 0;
	
	if( newChart != window.chart )
	{
		$(settings.optoType).empty();
		
		$(".setting").css("display", "none");
		$(".uiSettings").css("display", "none");
		
		if( window.chart )
		{
			window.chart.SetDisplayElement(null, 0, 0);
			window.chart.SetAnimate(false);
		}
		
		window.chart = newChart;
		
		if( window.chart )
		{
			window.chart.SetDisplayElement(el, $(el).width(), $(el).height() );
				
			for(var i = 0 ; i < chart.GetNumOptotypes() ; i++)
			{
				var op = document.createElement("option");
				$(op).attr("value", "" + i);
				$(op).text("[" + (i+1) + "] "  + chart.GetOptotypeName(i));
			
				$(settings.optoType).append(op);
			}
			
			if( window.chart.GetNumSettings )
			{
				for(var i = 0 ; i < window.chart.GetNumSettings() ; i++)
				{
					var setting = window.chart.GetSettingName(i);
					
					$("." + setting).css("display", "inline");
					
					$(".uiSettings").css("display", "block");
				}
				
				
			}
			
			
		}
	}
	
	if( window.chart )
	{
		window.chart.SetLine(parseFloat(settings.lineSize.value), settings.lineUnits.value);
		window.chart.SetDistance(parseFloat(settings.distance.value), settings.distanceUnits.value);
		
		window.chart.SetMirror( settings.mirror.checked );
		window.chart.SetAnimate( settings.animate.checked);
		window.chart.SetCrowd( settings.crowd.checked &&  window.chart.AllowCrowdBars());
		
		$("#checkCrowd").css("visibility", window.chart.AllowCrowdBars()? "visible" : "hidden");
		$("#uiCheckCrowd").css("visibility", window.chart.AllowCrowdBars()? "visible" : "hidden");
		
		
		if( window.chart.SetRowStart )
		{
			//var ri = parseFloat(obj.rowIndex) || 0;
			//ri = Math.min(ri, window.chart.GetNumRows()-1 );
			
			//$(settings.rowIndex).val( "" + ri);
			
			//window.chart.SetRowStart( ri);
		}
		
		if( window.chart.SetDisplayType )
		{
			var dt = parseFloat(obj.displayType) || 0;
			
			$(settings.displayType).val( "" + dt );
			
			window.chart.SetDisplayType( dt);
		}
		
		var ot = parseFloat(obj.optoType) || 0;
		
		ot = Math.min(ot, window.chart.GetNumOptotypes()-1 );
		
		$(settings.optoType).val( "" + ot );
		
		window.chart.SetOptotypeIndex(ot);
		
		$(".uiOptoType").css(	"display", window.chart.GetNumOptotypes() > 1? "block" : "none");
		$(".uiDisplayType").css("display", window.chart.SetDisplayType != undefined? "block" : "none")
		$(".uiMultipleRow").css("display", window.chart.GetNumRows() > 1? "inline-block" : "none");
		
		if( window.chart.GetNumSettings )
		{
			$(".setting").each( function(index)
				{
					var name = $(this).prop("name");
					var value = $(this).prop("value");
					
					window.chart.SetSettingValue(name, value);
				}
			)
		}
		
		window.chart.Render(settings.nearFar.value == "near");
	}
	

	
}

window.FullScreen = function(full)
{
	var el = undefined;
	var method = undefined;
	
	if( full )
	{
		el = document.documentElement;
		method = el.requestFullScreen || el.webkitRequestFullScreen ||el.mozRequestFullScreen || el.msRequestFullscreen;
	}
	
	else
	{
		el = document;
		method = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen||el.webkitExitFullscreen;
	}
	
	if( method )
		method.call(el);
}

window.ToggleSettings = function()
{
	var hidden = $("#console").css("display") == "none";
	
	if( hidden )
	{
		FullScreen(false);
		
		 $("#console").show();
	}
	
	else
	{
		FullScreen(true);
		
		$("#console").hide();
	}
	
}

window.Refresh = function()
{
	window.chart.combinationCounter++; 
	ReadURL();
}

window.chartOrderNear = [
{name:"Gradients"},
{name:"Greycards"},	
	{name:"Text"},
	{name:"Assoc"}, 
	{name:"Diagrams"},
	{name:"Misc"}
];
	
window.chartOrderFar  = [
	{name:"Cartoons"},
	{name:"Shapes"},	    
    {name:"Snellen", displayType:ChartTypeRows.DISPLAY_SINGLE},
    {name:"Snellen", displayType:ChartTypeRows.DISPLAY_LINE},
    {name:"Snellen", displayType:ChartTypeRows.DISPLAY_FIVELINE},
	{name:"Duochrome"},
	{name:"Astigmatism"},
	{name:"Assoc"},
	{name:"AssocSplit"},
	{name:"Number Plate"},
	{name:"Contrast"},
	{name:"Maddox"}
	
];

window.UserLeftRight = function(dir)
{
	var chartOrder =  settings.nearFar.value == "near"? window.chartOrderNear : window.chartOrderFar;

	var index;
	for(index = 0 ; index < chartOrder.length ; index++)
		if( chartOrder[index].name == window.chart.GetName() )
		{
			if( chartOrder[index].displayType != undefined )
			{
				if( "" + chartOrder[index].displayType == settings.displayType.value )
					break;
				
				else
					continue;
			}
			
			break;
		}
			
	
	if( index == chartOrder.length )
		index = 0;
	
	else
	{
		index += dir;
		
		if( index == -1 ) 				index = chartOrder.length-1;
		if( index == chartOrder.length) index = 0;
	}
	
	var a = chartOrder[index];
	
	if( a.name != undefined) 		settings.chartType.value   = ChartType.dictNameToIndex[ a.name ];
	if( a.displayType != undefined)  settings.displayType.value = "" + a.displayType;  
	
	WriteURL();
}

window.UserRight = function()
{
	UserLeftRight(1);	
}

window.UserLeft = function()
{
	UserLeftRight(-1);
}

window.UserUpDown = function(dir)
{
	if(! window.chart) return;
	
	switch(window.chart.UpDownMode()) {
	case "row": 
		var row = parseInt(settings.rowIndex.value);
		settings.rowIndex.value = "" + Math.max(0, Math.min(window.chart.GetNumRows()-1, row-dir));
		
		if( window.chart.SetRowStart) 
			window.chart.SetRowStart(window.chart.rowStart - dir);
		
		WriteURL();
		break;
		
	case "optotype":
		var oi = parseInt(settings.optoType.value);
		settings.optoType.value = "" + Math.max(0, Math.min(window.chart.GetNumOptotypes()-1, oi-dir));
		WriteURL();
		break;
	}
	
}

window.UserUp = function()
{
	UserUpDown(1);
}

window.UserDown = function()
{
	UserUpDown(-1);
}

window.OnKeyDown = function(e)
{	
	var settings = document.getElementById("settings");
	
	var change = true;
	
	var chartType = parseInt(settings.chartType.value);

	switch(e.keyCode) {
	/*up*/	  case 38:  UserUp(); 		break;
	/*down*/  case 40:  UserDown();		break;
	/*left*/  case 37:  UserLeft();	 	break;
	/*right*/ case 39:  UserRight(); 	break;
	/*enter*/ case 13:  Refresh();		break; 
	
	/* F1 */  case 112: settings.chartType.value = "0"; break;
	/* F2 */  case 113: settings.chartType.value = "1"; break;
	/* F3 */  case 114: settings.chartType.value = "2"; break;
	/* F4 */  case 115: settings.chartType.value = "3"; break;
	/* F5 */  case 116: settings.chartType.value = "4"; break;
	/* F6 */  case 118: settings.chartType.value = "5"; break;
	/* F7 */  case 117: settings.chartType.value = "6"; break;
	/* F8 */  case 119: settings.chartType.value = "7";	break;
	/* F9 */  case 120: settings.chartType.value = "8";	break;
	/* F10 */ case 121: settings.chartType.value = "9";	break;
	
	/* q */   case 81: settings.displayType.value = "0"; break;
	/* w */   case 87: settings.displayType.value = "1"; break;
	/* e */   case 69: settings.displayType.value = "2"; break;
	/* r */   case 82: settings.displayType.value = "3"; break;
	
	/* 1 */   case 49: settings.optoType.value = "0"; break;
	/* 2 */   case 50: settings.optoType.value = "1"; break;
	/* 3 */   case 51: settings.optoType.value = "2"; break;
	/* 4 */   case 52: settings.optoType.value = "3"; break;
	/* 5 */   case 53: settings.optoType.value = "4"; break;
	/* 6 */   case 54: settings.optoType.value = "5"; break;
	/* 7 */   case 55: settings.optoType.value = "6"; break;
	/* 8 */   case 56: settings.optoType.value = "7"; break;
	/* 9 */   case 57: settings.optoType.value = "8"; break;
	/* 0 */   case 48: settings.optoType.value = "9"; break;

	/* m */   case 77:  settings.mirror.checked  = ! settings.mirror.checked; 	break;
	/* a */   case 65:  settings.animate.checked = ! settings.animate.checked;	break;
	/* b */   case 66:  settings.crowd.checked   = ! settings.crowd.checked;  	break;
	default: change = false;
	}
	
	if( change )
	{
		e.preventDefault();
		
		WriteURL();
	}
}

