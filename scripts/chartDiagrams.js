
ChartDiagrams = function()
{
	ChartTypeSingle.call(this, "Diagrams");
}


ChartDiagrams.prototype = new ChartTypeSingle();
ChartDiagrams.constructor = ChartDiagrams;

ChartDiagrams.prototype.UpDownMode = function()
{
	return "optotype";
}

ChartDiagrams.prototype.GetNumRows = function()
{
	return 1;
}

ChartDiagrams.prototype.GetRowScale = function(index)
{
	return this.RowScaleFillHeight() * 0.8;
}

ChartDiagrams.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartDiagrams.prototype.GetImage = function(index) //it's the only image, for the currently selected bank of images, which roughly corresponds to optotype.
{
	if( index != 0 ) throw new Error("");
	
	return "Diagrams/" + (this.optotypeIndex+1);
}

ChartDiagrams.prototype.GetNumOptotypes = function()
{
	return 11;
}

ChartDiagrams.prototype.GetOptotypeName = function(index)
{
	return "" + (index + 1);
}

ChartType.Register(new ChartDiagrams());

		