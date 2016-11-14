
ChartShapes = function()
{
	ChartTypeSingle.call(this, "Shapes");
}


ChartShapes.prototype = new ChartTypeSingle();
ChartShapes.constructor = ChartShapes;

ChartShapes.prototype.GetNumRows = function()
{
	return 1;
}

ChartShapes.prototype.GetRowScale = function(index)
{
	return 100;
}

ChartShapes.prototype.GetNumImages = function() //in optotype.
{
	return 15;
}

ChartShapes.prototype.GetImage = function(index, row) //it's the only image, for the currently selected bank of images, which roughly corresponds to optotype.
{
	
	
	return "Shapes/" + (index+1);
}

ChartShapes.prototype.GetBackgroundCol = function()
{
	return "#000000";
}

ChartType.Register(new ChartShapes());


		

