
ChartText = function()
{
	ChartTypeModify.call(this, "Text", []);
	
	this.arrGroups = [];
	
	for(var i = 0 ; i < this.arrTexts.length ; i++)
	{
		var text = this.arrTexts[i];
		
		var arrParaStrings = text.split("\t");
		
		var arrParas = [];
		
		for(var j = 0 ; j < arrParaStrings.length ; j++)
		{
			var arrLines = arrParaStrings[j].split("\n");
			
			arrParas.push(arrLines);
		}
		
		this.arrGroups.push(arrParas);
	}
	
}


ChartText.prototype = new ChartTypeModify();
ChartText.constructor = ChartText;

ChartText.prototype.arrTexts = [
                                "Up into the cherry tree\nWho should climb but little me?\nI held the trunk with both my hands\nAnd looked abroad on foreign lands.\tI saw the next door garden lie,\nAdorned with flowers, before my eye,\nAnd many pleasant places more\nThat I had never seen before.\tI saw the dimpling river pass\nAnd be the sky's blue looking-glass;\nThe dusty roads go up and down\nWith people tramping into town.\tIf I could find a higher tree\nFarther and farther I should see,\nTo where the grown-up river slips\nInto the sea among the ships.\tTo where the roads on either hand\nLead onward into fairy land,\nWhere all the children dine at five,\nAnd all the playthings come alive."
                               ,"Summer fading, winter comes—\nFrosty mornings, tingling thumbs,\nWindow robins, winter rooks,\nAnd the picture story-books.\tWater now is turned to stone\nNurse and I can walk upon;\nStill we find the flowing brooks\nIn the picture story-books.\tAll the pretty things put by\nWait upon the childrens' eye,\nSheep and shepherds, trees and crooks,\nIn the picture story-books.\tWe may see how all things are,\nSeas and cities, near and far,\nAnd the flying fairies' looks,\nIn the picture story-books.\tHow am I to sing your praise,\nHappy chimney-corner days,\nSitting safe in nursery nooks,\nReading picture story-books?"
                               ,"The lamps now glitter down the street;\nFaintly sound the falling feet\nAnd the blue even slowly falls\nAbout the garden trees and walls.\tNow in the falling of the gloom\nThe red fire paints the empty room;\nAnd warmly on the roof it looks,\nAnd flickers on the backs of books.\tArmies march by tower and spire\nOf cities blazing, in the fire;—\nTill as I gaze with staring eyes,\nThe armies fade, the lustre dies.\tThen once again the glow returns;\nAgain the phantom city burns;\nAnd down the red-hot valley, lo!\nThe phantom armies marching go!\tBlinking embers, tell me true\nWhere are those armies marching to,\nAnd what the burning city is\nThat crumbles in your furnaces!"
                               ,"Late lies the wintry sun a-bed,\nA frosty, fiery sleepy-head;\nBlinks but an hour or two; and then,\nA blood-red orange, sets again.\tBefore the stars have left the skies,\nAt morning in the dark I rise;\nAnd shivering in my nakedness,\nBy the cold candle, bathe and dress.\tClose by the jolly fire I sit\nTo warm my frozen bones a bit;\nOr with a reindeer-sled, explore\nThe colder countries round the door.\tWhen to go out, my nurse doth wrap\nMe in my comforter and cap;\nThe cold wind burns my face and blows\nIts frosty pepper up my nose.\tBlack are my steps on silver sod;\nThick blows my frosty breath abroad;\nAnd tree and house, and hill and lake,\nAre frosted like a wedding-cake."
                               ,"What are you able to build with your blocks?\nCastles and palaces, temples and docks.\nRain may keep raining and others go roam,\nBut I can be happy and building at home.\tLet the sofa be mountains, the carpet be sea,\nThere I'll establish a city for me:\nA kirk and a mill and a palace beside,\nAnd a harbor as well where my vessels may ride.\tGreat is the palace with pillar and wall,\nA sort of a tower on the top of it all,\nAnd steps coming down in an orderly way\nTo where my toy vessels lay safe in the bay.\tThis one is sailing and that one is moored:\nHark to the song of the sailors on board!\nAnd see the steps of my palace, the kings\nComing and going with presents and things!\tNow I have done with it, down let it go!\nAll in a moment the town is laid low.\nBlock upon block lying scattered and free,\nWhat is there left of my town by the sea?"
                               ,"ball, book, choo–choo, train, bike, rain,\n bubbles, car, truck, boat, plane, baby, bowl,\nsock, shoe, shirt, pants, hat, star,\n flower, house, tree, brush, towel, bath,\t chair, table, bed, spoon, light, cookie,\n cracker, chip, cheese, apple, banana,\n ice cream, cereal, candy, milk, juice,\n water, dog, cat, fish, bird, duck, cow,\t horse, bunny, bear, pig, lion, elephant,\n giraffe, zebra, monkey, chicken, butterfly, bee,\n frog, alligator, snake, big, little, hot,\n cold, loud, quiet, yucky, icky, scary, funny, silly, \t eat, drink, go, stop, run, jump, walk,\n sleep/night-night, wash, kiss, open, close,\n push, pull, fix, broke, play,want, hug,\n love, hurt, tickle, give, all gone, all done, dance,\t help, fall, shake, see, watch, look, sit, stand up,\n throw, catch, blow, cry, throw, swing, slide, climb, ride, rock, come"
                               ];

ChartText.prototype.arrGroups = null;

ChartText.prototype.UpDownMode = function()
{
	return "row";
}

ChartText.prototype.GetNumRows = function()
{
	return this.pointScales.length;
}

ChartText.prototype.GetRowElements = function(index)
{
	return 1;
}

ChartText.prototype.GetScaleFormatString = function(isNear) //%SM = SnellenMetre  %LM = LogMar  %NS = NSeries
{
	return "%NS";
}

ChartText.prototype.GetNumOptotypes = function()
{
	return this.arrGroups.length;
}

ChartText.prototype.GetOptotypeName = function(index)
{
	return "" + (index+1);
}

ChartText.prototype.pointScales = [80, 64, 48, 40, 32, 24, 20, 16, 12, 10, 8, 6, 5];

//1 inch scale on screen - printers block is 1 inch, or 72 points, x-height usaully 50% of block, cap to cap of capital EM, 70% of block

ChartText.prototype.GetRowScale = function(index, forLayout)
{
	var i = this.RowScaleInch();

	i /= 72;
	
	i *= this.pointScales[index];
	
	if( forLayout )
		i *= this.GetLinesPerParagraph() / 2;
	
	return i;
	
	//return i * this.lines.length;
	
	//return (this.scales[index] * this.lines.length);
}

ChartText.prototype.GetNumImages = function() //in optotype.
{
	return 1;
}

ChartText.prototype.GetHeightFactor = function()
{
	return 1.0 * this.GetLinesPerParagraph();
}

ChartText.prototype.GetLinesPerParagraph = function()
{
	return this.arrGroups[0][0].length;
}

/*
ChartText.prototype.GetNumOptotypes = function()
{
	return 1;
}*/

/*
ChartText.prototype.GetOptotypeName = function(index)
{
	return index == 0? "Horizontal" : "Vertical";
}*/

ChartText.prototype.GetImage = function(index, row) //it's the only image, for the currently selected bank of images, which roughly corresponds to optotype.
{
	return "Text/blank"; 
							
}


				
//row scale being manipulated messes up n scale calculation

ChartText.prototype.Modify = function(svg, rowIndex, elementIndex)
{
	
	
	var width 	   = 1500;
	var lineHeight = 50;
	
	var height     = lineHeight*1.1 * this.GetLinesPerParagraph();
	
	var s = svg.firstChild;
	
	var t = document.createElementNS('http://www.w3.org/2000/svg', "text");	
	
	s.appendChild(t);
	
	t.setAttribute("font-family", "Verdana");
	t.setAttribute("font-size", "" + lineHeight);
	t.setAttribute("stroke", "black");
	t.setAttribute("fill", "black");
	
	var arrParas = this.arrGroups[this.GetOptotypeIndex()];
	var arrLines = arrParas[rowIndex%5];
	
	width = 0;
	
	for(var i = 0 ; i < this.GetLinesPerParagraph() ; i++)
	{
		var line = document.createElementNS('http://www.w3.org/2000/svg', "tspan");
		
		line.textContent = arrLines[i];
		line.setAttribute("x", "0");
		line.setAttribute("dy", "" + lineHeight);
		
		t.appendChild(line);
		
		//var w = line.getBoundingClientRect().width + 50;
		
		//var w = line.getBoundingClientRect? ling.getBoundingClientRect().width : line.offsetWidth;
		var w = 1000;
		
		if( w > width ) width = w;
	}
	
	
	s.setAttribute("viewBox", "0 0 " + width  + " " + height );
	//s.setAttribute("preserveAspectRatio", "xMidYMid slice");
	
	//s.setAttribute("width",""  + width);
	//s.setAttribute("height","" + height );
	
	
	
}

ChartText.prototype.GetBackgroundCol = function()
{
	return "#ffffff";
}

ChartType.Register(new ChartText());


		

			
