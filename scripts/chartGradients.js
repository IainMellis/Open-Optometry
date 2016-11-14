
ChartGradients = function()
{
	ChartTypePosition.call(this, "Gradients");
}


ChartGradients.prototype = new ChartTypePosition();
ChartGradients.constructor = ChartGradients;


ChartGradients.prototype.GetNumRows = function()
{
	return 15;
}

ChartGradients.prototype.GetRowScale = function(index)
{
	return 500;
}

ChartGradients.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartGradients.prototype.UpDownMode = function()
{
	return "row";
}

ChartGradients.prototype.GetImage = function(index, row) //it's the only image, for the currently selected bank of images, which roughly corresponds to optotype.
{
	return "Gradients/g" + (row+1);
}

ChartGradients.prototype.GetBackgroundCol = function()
{
	return "#4d4d4d";
}

ChartGradients.prototype.GetScaleFormatString = function(isNear, rowIndex)
{
	var scaleNames = [ "cpcm1", "cpcm2", "cpcm3", "cpcm4", "cpcm5", "cpcm6", "cpcm7", "cpcm8", "cpcm9", "cpcm10", "cpcm11", "cpcm12", "cpcm13", "cpcm14", "cpcm15"];
	
	return scaleNames[rowIndex];
}

ChartType.Register(new ChartGradients());



