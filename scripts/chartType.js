
ChartType = function(name)
{
	this.name = name;
}

ChartType.prototype.crowd = false;

ChartType.prototype.UpDownMode = function()
{
	return "none";
}

ChartType.prototype.AllowCrowdBars = function()
{
	return false;
}

ChartType.prototype.SetCrowd = function(crowd)
{
	this.crowd = crowd;
}

ChartType.prototype.mirror = false;

ChartType.prototype.SetMirror = function(mirror)
{
	this.mirror = mirror;
}

ChartType.dictNameToIndex = {};
ChartType.chartTypes = [];

ChartType.Register = function(c)
{
	ChartType.dictNameToIndex[c.GetName()] = ChartType.chartTypes.length;
	ChartType.chartTypes.push(c);
}

ChartType.prototype.name = null;

ChartType.prototype.GetName = function()
{
	return this.name;
}

ChartType.prototype.animate = false;

ChartType.prototype.SetAnimate = function(animate)
{
	if( this.animate != animate )
	{
		this.animate = animate;
	
		if( this.animate )
		{
			this.combinationCounter++;
			
			//displayType = DISPLAY_SINGLE;
			
			var self = this;
			
			window.idTimeout = setInterval(function()
			{ 
				self.combinationCounter++;
				self.Render();
			}, 2000);
		}
		
		else 
		{
			clearInterval(window.idTimeout);
			window.idTimeout = undefined;
		}
	}
}

ChartType.prototype.size = 2.9;

ChartType.prototype.SetLine = function(lineSize, lineUnits)
{
	this.size = lineUnits == "inches"? lineSize
			   						 : lineSize / 2.54;
}

ChartType.prototype.distance = 0.5;

ChartType.prototype.SetDistance = function(distanceSize, distanceUnits)
{
	this.distance = distanceUnits == "feet"? distanceSize
										//   : distanceSize / 0.3048;
				:distanceSize * 3.28084;
}


ChartType.prototype.GetScaleFormatString = function(isNear) //%SM = SnellenMetre  %LM = LogMar  %NS = NSeries
{
	return "";
}



//this.size = settings.lineUnits.value == "inches"? parseFloat(settings.lineSize.value)
//		   : parseFloat(settings.lineSize.value) / 2.54;
//var distance = settings.distanceUnits.value == "feet"? parseFloat(settings.distance.value)
//													 : parseFloat(settings.distance.value) / 0.3048;

/*
var chartType = parseInt(settings.chartType.value);

if( chartType != CHART_SNELLEN )
{
	if( chartType == CHART_CONTRAST ) settings.displayType.value = "" + DISPLAY_FIFTHTEEN; 
	else							  settings.displayType.value = "" + DISPLAY_SINGLE;
}*/

//var hide    = settings.hide.value == "true";


//ChartType.prototype.lastSeed = new Date().getTime();

ChartType.prototype.combinationCounter = 0; //AdvanceCombinationCounter



ChartType.prototype.displayElement = null;

ChartType.prototype.SetDisplayElement = function(el)
{
	this.displayElement = el;
}

/*
ChartType.prototype.lastSeed = 0;

ChartType.prototype.SetSeed = function(seed)
{
	Math.seedrandom(seed);
	lastSeed = seed;
}*/

//

ChartType.prototype.RowScaleInch = function()
{
	var lineLengthPixels = 100;
	
	var top    = 6 * 20  * lineLengthPixels * this.size;
	var bottom = 35.4 * this.distance;
	
	var scaleLineLength = top / bottom;
	
	return scaleLineLength / this.size;
}

ChartType.prototype.PixelsFromScale = function(rowScale)
{
	return Math.round( this.scale * rowScale / 6);
}

ChartType.prototype.RowScaleFillWidth = function()
{
	return (6 * $(this.displayElement).width() ) / this.CalculateScale();
}

ChartType.prototype.RowScaleFillHeight = function()
{
	return (6 * $(this.displayElement).height() ) / this.CalculateScale();
}

ChartType.prototype.CalculateScale = function()
{
	return  (this.distance / 20) * (1 / this.size) * 35.4;
}

ChartType.prototype.GetHeightFactor = function()
{
	return 1.0;
}

ChartType.prototype.Render = function(isNear)
{
	this.heightFactor = this.GetHeightFactor();
	
	this.isNear = isNear;
	
	if( ! this.displayElement ) return;
	
	$(this.displayElement).empty();
	
	var displayWidth  = $(this.displayElement).width();
	var displayHeight = $(this.displayElement).height();
	
	var scale = this.CalculateScale(); 
	
	this.scale = scale;
	
	//if( settings.hide.value == "false" ) displayFramHeight -= $("#console").height();
	
	//if we could mirror here, then all local entrys have a use
	
	//just the optotypes though, nothing else.
	
	//if( mirror ) $(chart).addClass("mirror");
//	else		 $(chart).removeClass("mirror");
	
	
	var chartElement = document.createElement("div");
	$(chartElement).attr("class", "chart");
	
	$(chartElement).css("right", "50%"); //part of the fix for centering divs wider than parent
	
	$(this.displayElement).append(chartElement);
	
	$(this.displayElement).css("background", this.GetBackgroundCol() );
	
	Math.seedrandom(this.combinationCounter);
	
	this.Draw(this.displayElement, displayWidth, displayHeight, chartElement, scale);
}

ChartType.prototype.Draw = function(displayElement, displayWidth, displayHeight, chartElement, scale)
{
	throw new Error("Override");
}

ChartType.prototype.createImageElement = function(fileName, rowIndex, elementIndex)
{
	var i = document.createElement("img");
	
	$(i).attr("src", "assets/" + fileName + ".svg?cache=" + (Math.random() * 99999));
	
	return i;
}



ChartType.prototype.createImage = function(name, width, height, marginT, marginB, marginL, marginR, rowIndex, elementIndex)
{
	var i = this.createImageElement(name, rowIndex, elementIndex);
	
	//if( this.SizedByRow()  )
	//{
		height *= this.heightFactor;	
	
		$(i).css("height", height);
		$(i).css("margin-top", marginT);
		$(i).css("margin-bottom", marginB);
		$(i).css("padding-left", marginL);
		$(i).css("padding-right", marginR);
	/*}
	
	else
	{
		width *= this.heightFactor;	
		
		$(i).css("width", width);
		$(i).css("margin-top", 0);
		$(i).css("margin-bottom", 0);
		$(i).css("padding-left", 0);
		$(i).css("padding-right", 0);
	}*/
		
	if( this.mirror )
	{
		$(i).addClass("mirror");
	}	
		
	
	return i;
}

ChartType.prototype.optotypeIndex = 0;

ChartType.prototype.GetOptotypeIndex = function()
{
	return this.optotypeIndex;
}

ChartType.prototype.SetOptotypeIndex = function(index)
{
	index = Math.max(0, Math.min(index, this.GetNumOptotypes()));
	
	this.optotypeIndex = index;
}

ChartType.prototype.GetNumOptotypes = function()
{
	return 0;
}

ChartType.prototype.GetOptotypeName = function(index)
{
	throw new Error("Override");
}

ChartType.prototype.SizedByRow = function()
{
	return true;
}

ChartType.prototype.GetBackgroundCol = function()
{
	return "#ffffff";
}



