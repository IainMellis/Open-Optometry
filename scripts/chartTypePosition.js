
ChartTypePosition = function(name)
{
	ChartTypeSingle.call(this, name);
}


ChartTypePosition.prototype = new ChartTypeSingle();
ChartTypePosition.constructor = ChartTypePosition;



ChartTypePosition.prototype.ScopeHorizontalMinInches = function()
{
	return 3;
}

ChartTypePosition.prototype.ScopeHorizontalMaxInches = function()
{
	return 3;
}

ChartTypePosition.prototype.ScopeVerticalMinInches = function()
{
	return 2;
}

ChartTypePosition.prototype.ScopeVerticalMaxInches = function()
{
	return 2;
}

/*ChartTypePosition.prototype.ScopeHorizontal = function()
{
	return 300;
}

ChartTypePosition.prototype.ScopeVertical = function()
{
	return 300;
}*/

ChartTypePosition.prototype.lastLeft = NaN;
ChartTypePosition.prototype.lastTop = NaN;

ChartTypePosition.prototype.GenerateLettersElement = function()
{
	var el = ChartTypeSingle.prototype.GenerateLettersElement.call(this);
	
	while(true)
	{
		var hi = (Math.random() * ( this.ScopeHorizontalMaxInches() - this.ScopeHorizontalMinInches() )) + this.ScopeHorizontalMinInches();
		var vi = (Math.random() * ( this.ScopeVerticalMaxInches()   - this.ScopeVerticalMinInches()   )) + this.ScopeVerticalMinInches();
		
		if( Math.random() > 0.5 ) hi = -hi;
		if( Math.random() > 0.5 ) vi = -vi;
		
		var left = this.PixelsFromScale(this.RowScaleInch() * hi);
		var top  = this.PixelsFromScale(this.RowScaleInch() * vi);
		
		if( left != this.lastLeft || top != this.lastTop )
		{
			this.lastLeft = left;
			this.lastTop  = top;
			
			break;
		}
	}
	
	//var sh = this.ScopeHorizontal();
	//var sv = this.ScopeVertical();
		
	//var left = (Math.random() * sh) - (sh/2);
	//var top  = (Math.random() * sv) - (sv/2);
	
	$(el).css("left", this.lastLeft + "px");
	$(el).css("top",  this.lastTop  + "px");
		

	return el;
}