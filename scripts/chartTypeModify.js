
ChartTypeModify = function(name, arrSettingNames)
{
	ChartTypeRows.call(this, name);
	
	if (! arrSettingNames) return;
	
	this.arrSettingNames = arrSettingNames;
	this.arrSettingValues = {};
}



ChartTypeModify.prototype = new ChartTypeRows();
ChartTypeModify.constructor = ChartTypeModify;

ChartTypeModify.prototype.arrSettingNames = null;
ChartTypeModify.prototype.arrSettingValues = null;

ChartTypeModify.prototype.GetNumSettings = function()
{
	return this.arrSettingNames.length;
}

ChartTypeModify.prototype.GetSettingName = function(index)
{
	return this.arrSettingNames[index];
}

ChartTypeModify.prototype.GetSettingValue = function(name)
{
	return this.arrSettingValues[name];
}

ChartTypeModify.prototype.SetSettingValue = function(name, value)
{
	this.arrSettingValues[name] = value;
}

//ChartTypeModify.imageDoc = null;
ChartTypeModify.svg = null;

ChartTypeModify.prototype.createImageElement = function(fileName, rowIndex, elementIndex)
{
	var i = document.createElement("embed");
		
	//this.imageDoc = i;
	
	var self = this;
	
	i.addEventListener("load", function() { self.Loaded(i, rowIndex, elementIndex); } );
	
	$(i).attr("type", "image/svg+xml");
	
	$(i).attr("src", "assets/" + fileName + ".svg");
	
	//$(i).click(function(event){event.preventDefault()});
	$(i).css("pointer-events", "none")
	
	return i;
}

ChartTypeModify.prototype.Loaded = function(imageDoc, rowIndex, elementIndex)
{
	this.svg = imageDoc.getSVGDocument();
	
	this.Modify(this.svg, rowIndex, elementIndex);
}

ChartTypeModify.prototype.Modify = function(svg, rowIndex, elementIndex)
{
}

