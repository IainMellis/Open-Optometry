

ChartAssocSplit = function()
{
	ChartTypeModify.call(this, "AssocSplit", ["mode3d"]);
}


ChartAssocSplit.prototype = new ChartTypeModify();
ChartAssocSplit.constructor = ChartAssocSplit;

ChartAssocSplit.prototype.GetNumRows = function()
{
	return 1;
}

ChartAssocSplit.prototype.GetRowScale = function(index)
{
	return 120;
}

ChartAssocSplit.prototype.GetRowElements = function(index)
{
	return 1;
}

ChartAssocSplit.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartAssocSplit.prototype.GetImage = function(index) 
{
	switch(this.optotypeIndex) {
	case 0: return "Assocphoria/split/3dassoc1";
	case 1: return "Assocphoria/split/3dassoc2";
	case 2: return "Assocphoria/split/3dassoc3";
	case 3: return "Assocphoria/split/3dassoc4";
	case 4: return "Assocphoria/split/3dHouse";
	case 5: return "Assocphoria/split/stereo1";
	}
}

ChartAssocSplit.prototype.GetNumOptotypes = function()
{
	return 6;
}

ChartAssocSplit.prototype.GetOptotypeName = function(index)
{
	switch(index) {
	case 0: return "a";
	case 1: return "b";
	case 2: return "c";
	case 3: return "d";
	case 4: return "e";
	case 5: return "f";
	}
}

ChartAssocSplit.prototype.UpDownMode = function()
{
	return "optotype";
}

ChartAssocSplit.prototype.canvas = null;
ChartAssocSplit.prototype.imgElement = null;

ChartAssocSplit.prototype.createImageElement = function(fileName, rowIndex, elementIndex)
{
	this.imgElement = document.createElement("img");

	var self = this;
	
	this.imgElement.addEventListener("load", function() { self.Loaded(this.imgElement, rowIndex, elementIndex); } );

	$(this.imgElement).attr("src", "assets/" + fileName + ".svg");
	
	//$(i).click(function(event){event.preventDefault()});
	$(this.imgElement).css("pointer-events", "none")
	
	
	document.body.appendChild(this.imgElement);
	$(this.imgElement).css("display", "none");

	//

	this.canvas = document.createElement("canvas"); 

	$(this.canvas).attr("width", 1);
	$(this.canvas).attr("height",1);
	
	$(this.canvas).css("pointer-events", "none")
	
	return this.canvas;
}

ChartAssocSplit.prototype.Loaded = function(image, rowIndex, elementIndex)
{
	this.Modify();
}

ChartAssocSplit.prototype.Modify = function(imgElement, rowIndex, elementIndex)
{
	this.Redraw();
}

ChartAssocSplit.prototype.Redraw = function()
{
	if( this.canvas == null || this.imgElement == null )
		return;
	
	var imgAspect = (this.imgElement.width/2) / this.imgElement.height;
	
	var ch = parseFloat( $(this.canvas).css("height") );
	
	//var ch = $(this.canvas).height();
	var cw = Math.floor(ch * imgAspect);
	 
	$(this.canvas).attr("width", cw);
	$(this.canvas).attr("height", ch);

	var ctx = this.canvas.getContext('2d');
	
	//ctx.clearRect(0, 0, cw, ch);
	ctx.fillRect(0, 0, cw, ch);

	var imageDatas = this.GetSplitImageData(this.imgElement, ctx, cw, ch) 
	
	if( this.GetSettingValue("mode3d") == "0" )
		this.Interlace(ctx, imageDatas[0], imageDatas[1]);
	
	else
		this.Anaglyph(ctx, imageDatas[0], imageDatas[1]);
}

ChartAssocSplit.prototype.GetSplitImageData = function(srcImage, dstCtx, dstW, dstH)
{
	var w = srcImage.width / 2;
	var h = srcImage.height;
	
	//alert("a");
	
	var a = this.GetImageData(srcImage, 0, 0, w, h, dstCtx, dstW, dstH);
	
	//alert("b");
	
	var b = this.GetImageData(srcImage, w, 0, w, h, dstCtx, dstW, dstH);
	
	
	//alert("c");
	return [a, b];
}

ChartAssocSplit.prototype.GetImageData = function(srcImg, srcX, srcY, srcW, srcH, dstCtx, dstW, dstH)
{
	dstCtx.drawImage(srcImg, srcX, srcY, srcW, srcH, 0, 0, dstW, dstH);

	//alert(dstW + ", "+ dstH);
	
	try {
	var id =dstCtx.getImageData(0, 0, dstW, dstH);
	
	return id;
	}
		
	catch(err)
	{
		alert(err);
	}
	
	
	//return 
}

ChartAssocSplit.prototype.Anaglyph = function(dstCtx, imageDataL, imageDataR)
{
	if( imageDataL.width != imageDataR.width || imageDataL.height != imageDataR.height )
		throw new Error("");
	
	var width  = imageDataL.width;
	var height = imageDataL.height;
	
	var brightnessR = 0.299;
	var brightnessG = 0.587;
	var brightnessB = 0.114;
	
	for (var y = 0; y < height ; y ++ )
	{
		for (x = 0 ; x < width ; x++)
		{
			var rl = imageDataL.data[4 * y * width + x * 4 + 0];
			var gl = imageDataL.data[4 * y * width + x * 4 + 1];
			var bl = imageDataL.data[4 * y * width + x * 4 + 2];
			var rr = imageDataR.data[4 * y * width + x * 4 + 0];
			var gr = imageDataR.data[4 * y * width + x * 4 + 1];
			var br = imageDataR.data[4 * y * width + x * 4 + 2];

			var r = Math.floor(brightnessR * rl + brightnessG * gl + brightnessB * bl); if(r > 255) r = 255;
			var g = Math.floor(brightnessR * rr + brightnessG * gr + brightnessB * br);	if(g > 255) g = 255;
			var b = g;
			
			
			
			imageDataR.data[4 * y * width + x * 4 + 0] = r;
			imageDataR.data[4 * y * width + x * 4 + 1] = g;
			imageDataR.data[4 * y * width + x * 4 + 2] = b;
		}
	}
	
	dstCtx.putImageData(imageDataR,0,0);
}

ChartAssocSplit.prototype.Interlace = function(dstCtx, imageDataL, imageDataR)
{
	if( imageDataL.width != imageDataR.width || imageDataL.height != imageDataR.height )
		throw new Error("");
	
	var width  = imageDataL.width;
	var height = imageDataL.height;
	
	for (var y = 0; y < height ; y += 2)
	{
		for (x = 0 ; x < width ; x++)
		{
			imageDataR.data[4 * y * width + x * 4 + 0] = imageDataL.data[4 * y * width + x * 4 + 0];
			imageDataR.data[4 * y * width + x * 4 + 1] = imageDataL.data[4 * y * width + x * 4 + 1];
			imageDataR.data[4 * y * width + x * 4 + 2] = imageDataL.data[4 * y * width + x * 4 + 2];
		}
	}
	
	dstCtx.putImageData(imageDataR,0,0);
}

ChartType.Register(new ChartAssocSplit());

			
