

ChartAstigmatism = function()
{
	ChartTypeSingle.call(this, "Astigmatism");
}


ChartAstigmatism.prototype = new ChartTypeSingle();
ChartAstigmatism.constructor = ChartAstigmatism;

ChartAstigmatism.prototype.GetNumRows = function()
{
	return 4;
}

ChartAstigmatism.prototype.GetRowScale = function(index)
{
	switch(index) {
	case 0: return 32;
	case 1: return 38;
	case 2: return 48;
	case 3: return 60;
	}
}

ChartAstigmatism.prototype.UpDownMode = function()
{
	return "row";
}

ChartAstigmatism.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartAstigmatism.prototype.GetImage = function(index) //it's the only image, for the currently selected bank of images, which roughly corresponds to optotype.
{
	if( this.optotypeIndex == 0 ) return "Astigmatism/crosscyl-dots"; 
	else 					 return "Astigmatism/crosscyl-rings";
}

ChartAstigmatism.prototype.GetNumOptotypes = function()
{
	return 2;
}

ChartAstigmatism.prototype.GetOptotypeName = function(index)
{
	switch(index) {
	case 0: return "dots";
	case 1: return "rings";
	}
}

ChartType.Register(new ChartAstigmatism());


			
