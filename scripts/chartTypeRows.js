
ChartTypeRows = function(name)
{
	ChartTypeSingle.call(this, name);
}


ChartTypeRows.prototype = new ChartTypeSingle();
ChartTypeRows.constructor = ChartTypeRows;

ChartTypeRows.DISPLAY_SINGLE 	= 0;
ChartTypeRows.DISPLAY_LINE 		= 1;
ChartTypeRows.DISPLAY_FIVELINE	= 2;
ChartTypeRows.DISPLAY_FIFTEEN 	= 3;


ChartTypeRows.prototype.displayType = ChartTypeRows.DISPLAY_SINGLE;

ChartTypeRows.prototype.SetDisplayType = function(displayType)
{
	this.displayType = displayType;
}


ChartTypeRows.prototype.GetRowElements = function(index)
{
	throw new Error("Override");
}


ChartTypeRows.prototype.Draw = function(displayElement, displayWidth, displayHeight, chartElement, scale) //Chart.prototype.Draw.call(this, el, width, height);
{
	var numRows = this.GetNumRows();
	
	var maxLines;
	switch(this.displayType) {
	case ChartTypeRows.DISPLAY_SINGLE: 		maxLines = 1; break;
	case ChartTypeRows.DISPLAY_LINE:		maxLines = 1; break;
	case ChartTypeRows.DISPLAY_FIVELINE: 	maxLines = Math.min(5,  numRows); break;
	case ChartTypeRows.DISPLAY_FIFTEEN:   	maxLines = Math.min(15, numRows); break;
	default: throw new Error("");
	}
	
	var rowStart = Math.max(0, Math.min( numRows - 1, this.rowStart)); 
	var rowLen   = 0; //if rowlen is 0, can quit.
	
	for(var i = 0 ; i < maxLines && rowStart + rowLen < numRows ; i++)
	{
		if( this.MeasureChart(scale, rowStart, rowLen+1) >= displayHeight ) 
			break;
			
		rowLen++;
	}
	
	while(rowLen < Math.min(numRows, maxLines) && rowStart > 0 )
	{
		if( this.MeasureChart(scale, rowStart-1, rowLen+1) >= displayHeight ) 
			break;
		
		rowStart--;
		rowLen++;
	}
	
	this.rowStart = rowStart; //Now update settings.snellenRowIndex.value,settings.otherRowIndex.value = rowStart; 
	
	for(var r = 0 ; r < rowLen ; r++)
	{
		var rowIndex = rowStart + r;
		
		var numCols = this.displayType == ChartTypeRows.DISPLAY_SINGLE? 1 : this.GetRowElements(rowIndex);
		
		Math.seedrandom(rowIndex + this.combinationCounter);
		
		var indexes = this.randomUniqueInts(numCols, 0, this.GetNumImages() );
		
		if( ! indexes ) break;
			
		var opacity = 1.0;
		var mirror = false;
		
		var rowElement = this.GenerateRow(indexes, scale, rowIndex, this.GetRowScale(rowIndex) );
		
		$(chartElement).append(rowElement);
		
		if( r < rowLen-1 ) 
			$(chartElement).append( this.createLineBreak() );
	}

	
	
	var topRowGap = this.MeasureRow(scale, this.GetRowScale(rowStart, true) ) / 2; 
	
	//var contentHeight = $(chartElement).height() - topRowGap;
	var contentHeight = this.MeasureChart(scale, rowStart, rowLen);
	
	var y =  ( displayHeight/2 - contentHeight/2);
	y -= topRowGap;
	
	$(chartElement).css("top", y);
}

ChartTypeRows.prototype.MeasureChart = function(scale, rowStart, rowLen)
{
	var totalHeight = 0;
	
	for(var i = 0 ; i < rowLen ; i++)
		totalHeight += this.MeasureRow(scale, this.GetRowScale(i + rowStart, true) );
	
	return totalHeight - this.MeasureRow(scale, this.GetRowScale(rowStart, true)) / 2;
}

ChartTypeRows.prototype.GetScaleFormatString = function(isNear) //%SM = SnellenMetre  %LM = LogMar  %NS = NSeries
{
	return "%SM (%LM)";
}

ChartTypeRows.prototype.createLineBreak = function()
{
	var i = document.createElement("br");
	
	return i;
}

