
ChartCartoons = function()
{
	ChartTypeSingle.call(this, "Cartoons");
}


ChartCartoons.prototype = new ChartTypeSingle();
ChartCartoons.constructor = ChartCartoons;

ChartCartoons.prototype.GetNumRows = function()
{
	return 1;
}

ChartCartoons.prototype.GetRowScale = function(index)
{
	return 100;
}

ChartCartoons.prototype.GetNumImages = function() //in optotype.
{
	return 7;
}

ChartCartoons.prototype.GetImage = function(index, row) //it's the only image, for the currently selected bank of images, which roughly corresponds to optotype.
{
	if( row != 0 ) throw new Error("");
	
	return "Cartoons/" + (index+1);
}

ChartType.Register(new ChartCartoons());

		



		