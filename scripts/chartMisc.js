
ChartMisc = function()
{
	ChartTypeSingle.call(this, "Misc");
}


ChartMisc.prototype = new ChartTypeSingle();
ChartMisc.constructor = ChartMisc;

ChartMisc.prototype.UpDownMode = function()
{
	return "optotype";
}

ChartMisc.prototype.GetNumRows = function()
{
	return 1;
}

ChartMisc.prototype.GetRowScale = function(index)
{
	return this.RowScaleFillHeight() * 0.8;
}

ChartMisc.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartMisc.prototype.GetImage = function(index) //it's the only image, for the currently selected bank of images, which roughly corresponds to optotype.
{
	if( index != 0 ) throw new Error("");
	
	return "Misc/" + (this.optotypeIndex+1);
}

ChartMisc.prototype.GetNumOptotypes = function()
{
	return 2;
}

ChartMisc.prototype.GetOptotypeName = function(index)
{
	return "" + (index + 1);
}

ChartType.Register(new ChartMisc());

		