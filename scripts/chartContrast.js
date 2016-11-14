
ChartContrast = function()
{
	ChartSnellen.call(this, "Contrast");
}

ChartContrast.prototype = new ChartSnellen();
ChartContrast.constructor = ChartContrast;

ChartContrast.prototype.AllowCrowdBars = function()
{
	return false;
}


ChartContrast.prototype.GetNumRows = function()
{
	return 20;
}

ChartContrast.prototype.GetRowScale = function(index)
{
	return 24;
}

ChartContrast.prototype.GetRowElements = function(index)
{
	return 5;
}

/*ChartContrast.prototype.createContrast = function(opacity)
{
	var i = document.createElement("span");
	
	$(i).html("" + Math.round(opacity * 100) + "%");
	
	return i;
}*/

ChartContrast.prototype.GenerateRow = function(indexes, scale, rowIndex, rowScale, crowd,  mirror)
{
	var rowElement = ChartSnellen.prototype.GenerateRow.call(this, indexes, scale, rowIndex, rowScale, crowd, mirror)
	
	var opacity = 1 - (rowIndex * 0.05);
		
	$(rowElement).find(".letters").css("opacity", opacity);
	
	return rowElement;
}

ChartContrast.prototype.GetScaleFormatString = function(isNear, rowIndex)
{
	var opacity = 1 - (rowIndex * 0.05);
	
	return "" + Math.round(opacity * 100) + "%";
}

ChartType.Register(new ChartContrast());





