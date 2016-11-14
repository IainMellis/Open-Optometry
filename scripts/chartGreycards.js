
ChartGreycards = function()
{
	ChartTypePosition.call(this, "Greycards");
}


ChartGreycards.prototype = new ChartTypePosition();
ChartGreycards.constructor = ChartGreycards;


ChartGreycards.prototype.GetNumRows = function()
{
	return 4;
}

ChartGreycards.prototype.GetRowScale = function(index)
{
	return 500;
}

ChartGreycards.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartGreycards.prototype.UpDownMode = function()
{
	return "row";
}

ChartGreycards.prototype.GetImage = function(index, row) //it's the only image, for the currently selected bank of images, which roughly corresponds to optotype.
{
	return "Greycards/" + (row + 1);
}

ChartGreycards.prototype.GetBackgroundCol = function()
{
	return "#4d4d4d";
}

ChartGreycards.prototype.GetScaleFormatString = function(isNear, rowIndex)
{
	var scaleNames = [ "va1", "va2", "va3", "va4" ];
	
	return scaleNames[rowIndex];
}

/*ChartGreycards.prototype.ScopeVertical = function()
{
	return 0;
}*/

ChartType.Register(new ChartGreycards());


//only one item, just appears in a random place each time.