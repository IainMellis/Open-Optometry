

ChartDuochrome = function()
{
	ChartTypeSingle.call(this, "Duochrome");
}


ChartDuochrome.prototype = new ChartTypeSingle();
ChartDuochrome.constructor = ChartDuochrome;

ChartDuochrome.prototype.UpDownMode = function()
{
	return "row";
}

ChartDuochrome.prototype.GetNumRows = function()
{
	return 2;
}

ChartDuochrome.prototype.GetRowScale = function(index)
{
	return index == 0? 60 : 100;
}

ChartDuochrome.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartDuochrome.prototype.GetImage = function(index) //it's the only image, for the currently selected bank of images, which roughly corresponds to optotype.
{
	return "Duochrome/duochrome";
}


ChartType.Register(new ChartDuochrome());

			