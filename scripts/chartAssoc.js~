

ChartAssoc = function()
{
	ChartTypeModify.call(this, "Assoc", ["col1", "col2", "col3", "col4"]);
}


ChartAssoc.prototype = new ChartTypeModify();
ChartAssoc.constructor = ChartAssoc;

ChartAssoc.prototype.GetNumRows = function()
{
	return 1;
}

ChartAssoc.prototype.GetRowScale = function(index)
{
	return 120;
}

ChartAssoc.prototype.GetRowElements = function(index)
{
	return 1;
}

ChartAssoc.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartAssoc.prototype.GetImage = function(index) 
{
	switch(this.optotypeIndex) {
	case 0: return "Assocphoria/4dot";
	case 1: return "Assocphoria/assocphoria-h";
	case 2: return "Assocphoria/assocphoria-v";
	case 3: return "Assocphoria/assocphoria-x";
	}
}

ChartAssoc.prototype.GetNumOptotypes = function()
{
	return 4;
}

ChartAssoc.prototype.GetOptotypeName = function(index)
{
	switch(index) {
	case 0: return "dot";
	case 1: return "h";
	case 2: return "v";
	case 3: return "x";
	}
}

ChartAssoc.prototype.UpDownMode = function()
{
	return "optotype";
}

ChartAssoc.prototype.Modify = function(svg)
{
	switch( this.GetOptotypeIndex() ) {
	case 0:
	
		var el = svg.getElementById("g3831");
		$(el).find("rect").css("fill", this.GetSettingValue("col1") );
		
		var el = svg.getElementById("g3564");
		$(el).find("path").first().css("fill", this.GetSettingValue("col2") );
		$(el).find("path").first().next().css("fill", this.GetSettingValue("col4") );
		
		var el = svg.getElementById("g3560");
		$(el).find("path").css("fill", this.GetSettingValue("col3") );
		
		break;
		
	case 1:
		
		$(svg.getElementById("rect2987")).css("fill", this.GetSettingValue("col1"));
		$(svg.getElementById("rect3003")).css("fill", this.GetSettingValue("col2"));
		$(svg.getElementById("rect3001")).css("fill", this.GetSettingValue("col3"));
		
		
		$(svg.getElementById("path3047")).css("stroke", this.GetSettingValue("col4"));
		$(svg.getElementById("path3049")).css("stroke", this.GetSettingValue("col4"));
		$(svg.getElementById("path3035")).css("fill", this.GetSettingValue("col4"));
		
	case 2:
		
		$(svg.getElementById("rect2987")).css("fill", this.GetSettingValue("col1"));
		$(svg.getElementById("rect3003")).css("fill", this.GetSettingValue("col2"));
		$(svg.getElementById("rect3001")).css("fill", this.GetSettingValue("col3"));
		
		$(svg.getElementById("path3047")).css("stroke", this.GetSettingValue("col4"));
		$(svg.getElementById("path3049")).css("stroke", this.GetSettingValue("col4"));
		$(svg.getElementById("path3035")).css("fill", this.GetSettingValue("col4"));
		
		break;
		
	case 3:
		
		$(svg.getElementById("rect2987")).css("fill", this.GetSettingValue("col1"));
		
		$(svg.getElementById("rect3003")).css("fill", this.GetSettingValue("col2"));   //r
		$(svg.getElementById("rect3001")).css("fill", this.GetSettingValue("col3")); //l
		
		$(svg.getElementById("rect3016")).css("fill", this.GetSettingValue("col3"));   //t
		$(svg.getElementById("rect3018")).css("fill", this.GetSettingValue("col2")); //b
		
		
		
		$(svg.getElementById("path3047")).css("stroke", this.GetSettingValue("col4"));
		$(svg.getElementById("path3049")).css("stroke", this.GetSettingValue("col4"));
		$(svg.getElementById("path3035")).css("fill", this.GetSettingValue("col4"));
		
		break;
	}
	
	
	
	
}


ChartType.Register(new ChartAssoc());

			
