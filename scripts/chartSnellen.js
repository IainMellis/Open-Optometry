
ChartSnellen = function(name)
{
	ChartTypeRows.call(this, name || "Snellen");
}

ChartSnellen.prototype = new ChartTypeRows();
ChartSnellen.constructor = ChartSnellen;

ChartSnellen.prototype.UpDownMode = function()
{
	return "row";
}

ChartSnellen.prototype.AllowCrowdBars = function()
{
	return true;
}

ChartSnellen.ROW_SCALES 	= [ 120,100,80,60,48,38,30,24,19,15,12,9.5,7.5,6,4.8,3.8,3,2];
//ChartSnellen.ROW_ELEMENTS 	= [ 1,  1, 2, 2, 2, 3, 4, 5, 5, 5, 5, 5,  5,  5, 5,  5,  5, 5];

ChartSnellen.prototype.GetNumRows = function()
{
	return ChartSnellen.ROW_SCALES.length;
}

ChartSnellen.prototype.GetRowScale = function(index)
{
	return ChartSnellen.ROW_SCALES[index];
	
	//return this.RowScaleInch();
}

ChartSnellen.prototype.GetRowElements = function(index)
{
	return 5;
}

ChartSnellen.prototype.GetNumImages = function()
{
	return this.images.length;
}

ChartSnellen.prototype.GetImage = function(index, row)
{
	return this.images[index];
}

ChartSnellen.OPTO_LETTER 	 = 0;
ChartSnellen.OPTO_HTOV       = 1;
ChartSnellen.OPTO_PICS 	     = 2;
ChartSnellen.OPTO_NUMBERS    = 3;
ChartSnellen.OPTO_TUMBLINGES = 4;
ChartSnellen.OPTO_LANDOLTC   = 5;
ChartSnellen.OPTO_LEA	     = 6;

ChartSnellen.IMAGES_LETTER 		= ["Snellen/d","Snellen/h","Snellen/k","Snellen/n","Snellen/o","Snellen/r","Snellen/s","Snellen/t","Snellen/u","Snellen/v","Snellen/x","Snellen/z"];
ChartSnellen.IMAGES_HOTV 		= ["Snellen/h","Snellen/o","Snellen/t","Snellen/v"];
ChartSnellen.IMAGES_PICS 		= ["Pictures/1","Pictures/2","Pictures/3","Pictures/4","Pictures/5","Pictures/6","Pictures/7","Pictures/8","Pictures/9","Pictures/10","Pictures/11","Pictures/12","Pictures/13","Pictures/14"];
ChartSnellen.IMAGES_NUMBERS		= ["Numbers/1","Numbers/2","Numbers/3","Numbers/4","Numbers/5","Numbers/6","Numbers/7","Numbers/8","Numbers/9","Numbers/0"];
ChartSnellen.IMAGES_TUMBLINGES	= ["TumblingEs/1","TumblingEs/2","TumblingEs/3","TumblingEs/4"];
ChartSnellen.IMAGES_LANDOLTC	= ["LandoltC/1","LandoltC/2","LandoltC/3","LandoltC/4"];
ChartSnellen.IMAGES_LEA	  		= ["Lea/1","Lea/2","Lea/3","Lea/4"];

ChartSnellen.prototype.images = ChartSnellen.IMAGES_LETTER;

ChartSnellen.prototype.SetOptotypeIndex = function(index)
{
	ChartTypeRows.prototype.SetOptotypeIndex.call(this, index);
	
	switch(index) {
	case ChartSnellen.OPTO_LETTER: 		this.images = ChartSnellen.IMAGES_LETTER;	 break;
	case ChartSnellen.OPTO_HTOV:   		this.images = ChartSnellen.IMAGES_HOTV;		 break;
	case ChartSnellen.OPTO_PICS:   		this.images = ChartSnellen.IMAGES_PICS;		 break;
	case ChartSnellen.OPTO_NUMBERS:    	this.images = ChartSnellen.IMAGES_NUMBERS; 	 break;
	case ChartSnellen.OPTO_TUMBLINGES: 	this.images = ChartSnellen.IMAGES_TUMBLINGES; break;
	case ChartSnellen.OPTO_LANDOLTC: 	this.images = ChartSnellen.IMAGES_LANDOLTC; 	 break;
	case ChartSnellen.OPTO_LEA: 		this.images = ChartSnellen.IMAGES_LEA; 	 	 break;
	default: throw new Error("");
	}
}

ChartSnellen.prototype.GetNumOptotypes = function()
{
	return 7;
}

ChartSnellen.prototype.GetOptotypeName = function(index)
{
	switch(index) {
	case ChartSnellen.OPTO_LETTER:		return "Letter";
	case ChartSnellen.OPTO_HTOV:  		return "HTOV";
	case ChartSnellen.OPTO_PICS: 		return "Pics";
	case ChartSnellen.OPTO_NUMBERS:  	return "Numbers";
	case ChartSnellen.OPTO_TUMBLINGES:  return "Tumbling E's";
	case ChartSnellen.OPTO_LANDOLTC:	return "Landolt C";
	case ChartSnellen.OPTO_LEA:			return "Lea";
	}
}

ChartSnellen.prototype.GetScaleFormatString = function(isNear) //%SM = SnellenMetre  %LM = LogMar  %NS = NSeries
{
	if( isNear ) return "%NS, %SM (%LM)";
	else 		 return "%SM (%LM)";
}

ChartType.Register(new ChartSnellen());



