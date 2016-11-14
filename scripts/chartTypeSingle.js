
ChartTypeSingle = function(name)
{
	ChartType.call(this, name);
}


ChartTypeSingle.prototype = new ChartType();
ChartTypeSingle.constructor = ChartTypeSingle;

ChartTypeSingle.prototype.rowStart = 0;

ChartTypeSingle.prototype.SetRowStart = function(rowStart)
{
	rowStart = Math.max(0, Math.min(rowStart, this.GetNumRows()-1));
	
	this.rowStart = rowStart;
}

ChartTypeSingle.prototype.GetNumRows = function()
{
	throw new Error("Override");
}

ChartTypeSingle.prototype.GetRowScale = function(index)
{
	throw new Error("Override");
}

ChartTypeSingle.prototype.GetRowElements = function(index)
{
	return 1;
}

ChartTypeSingle.prototype.GetNumImages = function()
{
	throw new Error("Override");
}

ChartTypeSingle.prototype.GetImage = function(index, row)
{
	throw new Error("Override");
}

ChartTypeSingle.prototype.Draw = function(displayElement, displayWidth, displayHeight, chartElement, scale) //Chart.prototype.Draw.call(this, el, width, height);
{
	var numRows = this.GetNumRows();
		
	var maxLines =1;

	var rowStart = Math.max(0, Math.min( numRows - 1, this.rowStart)); 
	var rowLen   = 1;
	
	var rowIndex = rowStart;
		
	var numCols = this.GetRowElements(rowIndex);
		
	var indexes = this.randomUniqueInts(numCols, 0, this.GetNumImages() );
		
	if( ! indexes ) return;
			
	var rowElement = this.GenerateRow(indexes, scale, rowIndex, this.GetRowScale(rowIndex));
		
	$(chartElement).append(rowElement);
		
	
	var topRowGap = this.MeasureRow(scale, this.GetRowScale(rowStart, true) ) / 2; //superclass?

	//var contentHeight = $(chartElement).height()
	var contentHeight = this.MeasureRow(scale, this.GetRowScale(rowStart, true)) / 2;
	
	var y =  ( displayHeight/2 - contentHeight/2);
	y -= topRowGap;
	
	$(chartElement).css("top", y);
}

//consider measure chart function for single, which removes margin.
ChartTypeSingle.prototype.MeasureRow = function(scale, rowScale)
{
	var dimension = Math.round( scale * rowScale / 6);
	
	return dimension * 2; //height of optotype + margin above
}

ChartTypeSingle.prototype.GenerateLettersElement = function()
{
	var lettersElement = document.createElement("div");
	$(lettersElement).addClass("letters");
	
	return lettersElement;
}

ChartTypeSingle.prototype.GenerateRow = function(indexes, scale, rowIndex, rowScale)
{
	var rowElement = document.createElement("div");
	$(rowElement).addClass("row");
	
	$(rowElement).css("margin-right", "-100%"); //part of the fix for centering divs wider than parent
	
	var dimension = Math.round( scale * rowScale / 6);
	
	var lettersElement = this.GenerateLettersElement()
	
	for(var i = 0 ; i < indexes.length ; i++)
	{
		$(lettersElement).append( 
				this.createImage( 
						this.GetImage(indexes[i], rowIndex),
						dimension,
						dimension,
						dimension,
						0,
						dimension/2,
						dimension/2,
						rowIndex,
						i
						) );	
	}
	
	$(rowElement).append(lettersElement);
	
	$(rowElement).append( this.createScale(rowScale, rowIndex) );
	
	if( this.crowd )
	{
		var bb = indexes.length;
		//if( bb > 1 ) bb += indexes.length-1;
		//if( bb > 1 ) bb += 1;
		
		var cb = this.MakeCrowdBars(dimension, bb);
		
		$(lettersElement).append(cb);
		
		//$(cb).offset({left:-(dimension*bb)*1.5, top:-dimension });
	}
	
	return rowElement;
}

ChartTypeSingle.prototype.MakeCrowdBars = function(dimension, len)
{
	//if( bb > 1 ) bb += 1;
	len += Math.max(len, 0);
	
	var span = dimension * len;
	var thick = dimension / 7;

	var cbL = this.MakeCrowdBar(thick, dimension);
	var cbR = this.MakeCrowdBar(thick, dimension);
	var cbT = this.MakeCrowdBar(span, thick);
	var cbB = this.MakeCrowdBar(span, thick);

	$(cbL).offset({left:-thick*2, 			top:0 });
	$(cbR).offset({left:span+thick, 			top:0})
	
	$(cbT).offset({left:0, 			top:-thick*3 });
	$(cbB).offset({left:0, 	top:dimension+thick*2})
	
	var bars = document.createElement("div");
	$(bars).addClass("crowdBars");
	
	$(bars).css("width", "" + span + "px");
	$(bars).css("height", "" + dimension + "px");
	
	$(bars).css("top", "" + dimension + "px");
	
	$(bars).append(cbL);
	$(bars).append(cbR);
	$(bars).append(cbT);
	$(bars).append(cbB);
	
	return bars;
}

ChartTypeSingle.prototype.MakeCrowdBar = function(w, h)
{
	var ct = document.createElement("div");
	$(ct).addClass("crowdBar");
	
	$(ct).css("width",  "" + w + "px");
	$(ct).css("height", "" + h + "px");
	return ct;
}

ChartTypeSingle.prototype.ScaleStringLogMar = function(rowScale)
{
	var logMar = -Math.log(  6 / rowScale ) / Math.LN10;
	
	logMar = logMar.toFixed(1);
	
	return "" + logMar;
}

ChartTypeSingle.prototype.ScaleStringSnellenMetre = function(rowScale)
{
	return "6/" + rowScale;
}

ChartTypeSingle.prototype.ScaleStringNSeries = function(rowScale)
{
	var i = this.RowScaleInch();
	
	i /= 72;
	
	var n = rowScale / i;
	
	//return "N" + Math.round( this.scale * rowScale / 6);
	
	return "N" + Math.round(n);
}

ChartTypeSingle.prototype.ScaleStringVA = function(rowIndex)
{
	return 0.23 * (3 * (rowIndex+1));
}

//i /= 72;

//i *= this.pointScales[index];

//return i * this.lines.length



ChartTypeSingle.prototype.createScale = function(rowScale, rowIndex)
{	
	var i = document.createElement("span");
	
	var s = this.GetScaleFormatString(this.isNear, rowIndex);
	
	s = s.replace("%SM", this.ScaleStringSnellenMetre(rowScale) );
	s = s.replace("%LM", this.ScaleStringLogMar(rowScale) );
	s = s.replace("%NS", this.ScaleStringNSeries(rowScale) );
	
	s = s.replace("%VA", this.ScaleStringVA(rowIndex));
	
	$(i).addClass("scale");
	$(i).html(s);
	
	return i;
}





ChartTypeSingle.prototype.randomUniqueInts = function(numElements, min, max)
{
	min = Math.floor(min);
	max = Math.floor(max);
	
	var range = max - min;
	
	//if(range < numElements ) return null; //can't do a line of 5 HOTV
	
	var arr = [];
	
	for(var i = 0 ; i < numElements ; i++)
	{
		var x = Math.floor(Math.random() * range) + min;
		
		var unique = true;
		for(var j = 0 ; j < i ; j++)
			if( arr[j] == x )
			{
				unique = false;
				break;
			}
			
		if( unique || range < numElements ) 
			arr.push(x);
		
		else
			i--;
	}
	
	return arr;
	
}