// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.spiderweb = $.klass(titan.controls.base,
{

	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - title
		// - subtitle
		// - middlePictureUrl
		// - middlePictureHexColor
		// - displayHexColor
		// - data [{'display': '', 'id': '', 'name' : '', 'pictureUrl'}]
		// - onclick (callback function)

		this.parameters.container.addClass('titanspider');
		this.data = this.parameters.data;
		this.layout = [];
		this.getLayout();
		this.render();
	},

	getLayout : function(){

		this.layout.push({'left' : 130, 'top' : 30, 'radius' : 70, 'num' : 1});
		this.layout.push({'left' : 300, 'top' : 500, 'radius' : 69, 'num' : 2});
		this.layout.push({'left' : 480, 'top' : 65, 'radius' : 68, 'num' : 3});
		this.layout.push({'left' : 35, 'top' : 450, 'radius' : 67, 'num' : 4});
		this.layout.push({'left' : 490, 'top' : 305, 'radius' : 66, 'num' : 5});

		this.layout.push({'left' : 65, 'top' : 200, 'radius' : 65, 'num' : 6});
		this.layout.push({'left' : 25, 'top' : 120, 'radius' : 64, 'num' : 7});
		this.layout.push({'left' : 480, 'top' : 480, 'radius' : 63, 'num' : 8});
		this.layout.push({'left' : 450, 'top' : 230, 'radius' : 62, 'num' : 9});
		this.layout.push({'left' : 215, 'top' : 65, 'radius' : 61, 'num' : 10});

		this.layout.push({'left' : 300, 'top' : 25, 'radius' : 60, 'num' : 11});
		this.layout.push({'left' : 100, 'top' : 520, 'radius' : 59, 'num' : 12});
		this.layout.push({'left' : 200, 'top' : 480, 'radius' : 58, 'num' : 13});
		this.layout.push({'left' : 25, 'top' : 30, 'radius' : 57, 'num' : 14});
		this.layout.push({'left' : 490, 'top' : 150, 'radius' : 56, 'num' : 15});
		
		this.layout.push({'left' : 60, 'top' : 365, 'radius' : 55, 'num' : 16});
		this.layout.push({'left' : 450, 'top' : 380, 'radius' : 54, 'num' : 17});
		this.layout.push({'left' : 25, 'top' : 285, 'radius' : 53, 'num' : 18});
		this.layout.push({'left' : 390, 'top' : 40, 'radius' : 52, 'num' : 19});
		this.layout.push({'left' : 380, 'top' : 460, 'radius' : 51, 'num' : 20});
	},

	render : function(){
		var _this = this;
		if (this.parameters.title != undefined)
			$('<div>', {'class' : 'title'}).appendTo(this.parameters.container).html(this.parameters.title);
		if (this.parameters.subtitle != undefined)
			$('<div>', {'class' : 'subtitle'}).appendTo(this.parameters.container).html(this.parameters.subtitle);
		$('<div>', {'id' : 'spiderdiv', 'style' : 'position:absolute;z-index:0;'}).appendTo(this.parameters.container);
		$('<canvas>', {'id' : 'spidercanvas', 'style' : ''}).appendTo(this.parameters.container);
		$('#spidercanvas')[0].height = 590;
		$('#spidercanvas')[0].width = 590;
		if (this.isIE8())
			G_vmlCanvasManager.initElement($('#spidercanvas')[0]);
		var ctx = $('#spidercanvas')[0].getContext("2d");
		var loop = 0;
		$.each(this.data, function(idx, val){                
			// connecting line
			ctx.beginPath();
			var lineLeft = _this.layout[loop].left+Math.round(_this.layout[loop].radius/2);
			var lineTop = _this.layout[loop].top+Math.round(_this.layout[loop].radius/2);
			ctx.moveTo(lineLeft, lineTop);
			ctx.lineTo(290,290);
			ctx.strokeStyle = '#666666';
			ctx.closePath();
			ctx.stroke();
			var nameLeft = _this.layout[loop].left-Math.round(_this.layout[loop].radius/2);
			var nameTop = _this.layout[loop].top;
			var nameWidth = _this.layout[loop].radius*2;
			var countLeft = _this.layout[loop].left-Math.round(_this.layout[loop].radius/2);
			var countTop = _this.layout[loop].top+_this.layout[loop].radius-45;
			var countWidth = _this.layout[loop].radius*2;
			var dvName = undefined;
			var dvCount = undefined;
			dvName = $('<div>', {'style' : 'cursor:pointer;color:#'+_this.parameters.displayHexColor+';font-weight:bold;font-family:arial;font-size:9pt;position:absolute;z-index:15;margin-left:'+nameLeft+'px;margin-top:'+(nameTop-15)+'px;width:'+nameWidth+'px;text-align:center;'}).appendTo($('#spiderdiv')).html(val.name).hide();
			dvCount = $('<div>', {'style' : 'cursor:pointer;text-shadow: -0px -0px 3px #000000;color:#aaf4b1;font-weight:bold;font-family:arial;font-size:16pt;position:absolute;z-index:15;margin-left:'+countLeft+'px;margin-top:'+countTop+'px;width:'+countWidth+'px;text-align:center;'}).appendTo($('#spiderdiv')).html(val.display); 
			dvName.bind('click', function(){
				_this.parameters.onclick(val);
			});
			dvCount.bind('click', function(){
				_this.parameters.onclick(val);
			});
			dvCount.bind('mouseenter', function(){
				dvName.show();
			});
			dvCount.bind('mouseleave', function(){
				dvName.hide();
			});
			var actionLeft = _this.layout[loop].left;
			var actionTop = _this.layout[loop].top;
			var dvAction = $('<div>', {'style' : 'position:absolute;z-index:10;margin-left:'+actionLeft+'px;margin-top:'+actionTop+'px;cursor:pointer;'}).appendTo($('#spiderdiv'));
			// http://css3pie.com/documentation/getting-started/
			$('<img>', {'src' : val.pictureUrl, 'style' : 'border-width:1px;border-color:#aaaaaa;border-style:solid;border-radius:'+Math.round(_this.layout[loop].radius/2)+'px;-webkit-border-radius:'+Math.round(_this.layout[loop].radius/2)+'px;-moz-border-radius:'+Math.round(_this.layout[loop].radius/2)+'px;height:'+_this.layout[loop].radius+'px;width:'+_this.layout[loop].radius+'px;behavior: url(/js/libraries/PIE.htc);'}).appendTo(dvAction);
			dvAction.bind('click', function(){
				_this.parameters.onclick(val);
			});
			dvAction.bind('mouseenter', function(){
				dvName.show();
			});
			dvAction.bind('mouseleave', function(){
				dvName.hide();
			});
			loop++;
		});
		// draw me
		ctx.beginPath();
		ctx.arc(290,290, 75, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = "#"+this.parameters.middlePictureHexColor;
		ctx.fill();
		ctx.stroke();
		var nameLeft = 290-50;
		var nameTop = 290-50;
		$('<img>', {'src' : this.parameters.middlePictureUrl, 'style' : 'position:absolute;font-size:12pt;z-index:5;margin-left:'+nameLeft+'px;margin-top:'+nameTop+'px;text-align:center;'}).appendTo($('#spiderdiv'));

	},

	isIE8 : function(){
		var browserName = BrowserDetect.browser;
		var versionName = BrowserDetect.version;
	
		if (browserName == 'Explorer' && versionName == 8)
			return true;	
		else
			return false;	
	},

	isIE9 : function(){
		var browserName = BrowserDetect.browser;
		var versionName = BrowserDetect.version;
	
		if (browserName == 'Explorer' && versionName == 9)
			return true;	
		else
			return false;	
	}

});
