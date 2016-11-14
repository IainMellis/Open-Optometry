

ChartMaddox = function()
{
	ChartTypeModify.call(this, "Maddox", []);
}


ChartMaddox.prototype = new ChartTypeModify();
ChartMaddox.constructor = ChartMaddox;

ChartMaddox.prototype.GetNumRows = function()
{
	return 1;
}

ChartMaddox.prototype.GetRowScale = function(index)
{
	//return index == 0? this.RowScaleFillWidth() /1: this.RowScaleFillHeight()/1;
	
	return (this.RowScaleInch() / 2.54) * 2; //2cm
}

ChartMaddox.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartMaddox.prototype.GetImage = function(index) 
{
	return "Maddox/blank";
}

ChartMaddox.prototype.GetNumOptotypes = function()
{
	return 2;
}

ChartMaddox.prototype.GetOptotypeName = function(index)
{
	return index == 0? "Horizontal" : "Vertical";
}

ChartMaddox.prototype.Modify = function(svg)
{
	var el= document.createElementNS('http://www.w3.org/2000/svg', "rect");
    
	var s = svg.firstChild;
	
	el.setAttribute("fill", "#ff0000");
	
	var span = 100;
	var len = span * 100;
	

	if( this.GetOptotypeIndex() == 0 )
	{
		el.setAttribute("y", "0");
		el.setAttribute("height", "" + span);
		
		el.setAttribute("x", "0");
		el.setAttribute("width", "" + len);
		
		s.setAttribute("viewBox", "0 0 " + len + " " + span);
	}
	
	else
	{
		el.setAttribute("y", "0");
		el.setAttribute("height", "" + len);
		
		el.setAttribute("x", "0");
		el.setAttribute("width", ""  + span);
		
		s.setAttribute("viewBox", "0 0 " + span + " " + len);
		
	}
	
	

	//s.setAttribute("preserveAspectRatio", "xMidYMid slice");
	
	//s.setAttribute("display", "block")
	//s.setAttribute("max-height", "100%")
	
	s.appendChild(el);
}

ChartMaddox.prototype.Draw = function(displayElement, displayWidth, displayHeight, chartElement, scale)
{
	ChartTypeSingle.prototype.Draw.call(this, displayElement, displayWidth, displayHeight, chartElement, scale);
}


ChartMaddox.prototype.GetRowElements = function(index)
{
	return 1;
}

/*ChartMaddox.prototype.Draw = function(displayElement, displayWidth, displayHeight, chartElement, scale) //Chart.prototype.Draw.call(this, el, width, height);
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
	
	y = 0;
	
	$(chartElement).css("top", y);
}*/

ChartMaddox.prototype.MeasureRow = function(scale, rowScale)
{
	var dimension = Math.round( scale * rowScale / 6);
	
	return this.GetOptotypeIndex() == 0 ? dimension * 2 : dimension * 2 * 10; //height of optotype + margin above
}

ChartMaddox.prototype.createImage = function(name, width, height, marginT, marginB, marginL, marginR, rowIndex, elementIndex)
{
	var i = this.createImageElement(name, rowIndex, elementIndex);
	
	if( this.GetOptotypeIndex() == 0 )
	{
		height *= this.heightFactor;	
	
		$(i).css("height", height);
		$(i).css("margin-top", marginT);
		$(i).css("margin-bottom", marginB);
		$(i).css("padding-left", marginL);
		$(i).css("padding-right", marginR);
	}
	
	else
	{
		width *= this.heightFactor;	
		
		$(i).css("width", width);
		$(i).css("margin-top", -marginT);
		$(i).css("margin-bottom", marginB);
		$(i).css("padding-left", 0);
		$(i).css("padding-right", 0);
	}
		
	return i;
}

/*ChartMaddox.prototype.SizedByRow = function()
{
	return this.GetOptotypeIndex() == 0;
}*/

ChartMaddox.prototype.GetBackgroundCol = function()
{
	return "#000000";
}


ChartType.Register(new ChartMaddox());

			
