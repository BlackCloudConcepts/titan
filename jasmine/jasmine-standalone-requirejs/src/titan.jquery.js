// License: (MIT) Copyright (C) 2013 Scott Gay
if (titan == null)
{
	var titan = {
		'controls' : {}
	};
}



titan.controls.base = $.klass(
{

});
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {   string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {       // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
{       // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
 dataOS : [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
               string: navigator.userAgent,
               subString: "iPhone",
               identity: "iPhone/iPod"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]

};
BrowserDetect.init();
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.button = $.klass(titan.controls.base,
{
	
	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - buttonText
		// - buttonSize [small, medium, large] default small
		// - buttonColor  [red, green, blue] default blue
		// - hoverEffect  (default true)
		// - onclick
		
		this.parameters.container.addClass('titan');
			
		if (this.parameters.buttonSize == undefined)
			this.parameters.buttonSize = 'small';
		if (this.parameters.buttonColor == undefined)
			this.parameters.buttonColor = 'blue';
		if (this.parameters.hoverEffect == undefined)
			this.parameters.hoverEffect = true;

		this.render();
	},

	render : function()
	{
		var _this = this;
		this.button = $('<button>', {'class' : 'button '+this.parameters.buttonSize+' '+this.parameters.buttonColor}).appendTo(this.parameters.container).html(this.parameters.buttonText);

		if (this.parameters.hoverEffect){
			this.button.hover( 
				function() {
					$(this).addClass("hover");
					$(this).removeClass(_this.parameters.buttonColor);
				},
				function() {
					$(this).removeClass("hover");
					$(this).addClass(_this.parameters.buttonColor);
				}	
			);
		}

		this.button.bind('click', function(event){
			_this.parameters.onclick();
		});
	}	

});
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.dropdown = $.klass(titan.controls.base,
{
	// TODO: Support for nested items in dropdown
	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - data [{'name' : '', 'value' : '', 'image' : ''}]
		// - width (default: 300)
		// - onchange
		
		this.parameters.container.addClass('titan');
		if (this.parameters.width == undefined)
			this.parameters.width = 300;

		this.render();
	},

	render : function()
	{
		var _this = this;
		this.ddlBody = $('<div>', {'class' : 'ddlBody', 'style' : 'width:'+this.parameters.width+'px;'}).appendTo(this.parameters.container);	
		this.ddlInput = $('<div>', {'class' : 'ddlInput float_left', 'contentEditable' : 'true', 'style' : 'width:'+(this.parameters.width-35)+'px;'}).appendTo(this.ddlBody);
		this.ddlSelected = $('<div>', {'class' : 'float_left'}).appendTo(this.ddlBody).hide();
		this.ddlArrow = $('<div>', {'class' : 'ddlArrow float_right'}).appendTo(this.ddlBody);
		this.ddlRemove = $('<div>', {'class' : 'ddlRemove float_right'}).appendTo(this.ddlBody).hide();
		$('<div>', {'class' : 'clear'}).appendTo(this.ddlBody);

		if (this.parameters.placeholder != undefined)
			this.placeholder = $('<div>', {'class' : 'placeholderdd'}).appendTo(this.parameters.container).html(this.parameters.placeholder);

		this.ddlDropdown = $('<div>', {'class' : 'ddlDropdown', 'style' : 'width:'+(this.parameters.width-35)+'px;'}).appendTo(this.ddlBody).hide();

		this.ddlBody.bind('click', function(event){
			event.stopPropagation();
		});

		this.ddlInput.bind('keydown', function(evt){ // this blocks enter from actually recording in the input area on keydown.  must use keyup on the actual event so that values exist in the input area for processing
			if (!evt)
                                evt = window.event;
                        var keyCode = evt.keyCode;
                        if (evt.charCode && keyCode == 0)
                                keyCode = evt.charCode;
			if (keyCode == 13)
				evt.preventDefault();	
		});

		this.ddlInput.bind('keyup', function(evt){
			var arrSelected = $('.ddlSelectedItem');
			if (!evt)
                                evt = window.event;
                        var keyCode = evt.keyCode;
                        if (evt.charCode && keyCode == 0)
                                keyCode = evt.charCode;
			switch (keyCode) {
				case 13 : //enter
					evt.preventDefault();
					if (arrSelected.length != 0){
						var liData = undefined;
						$.each(_this.parameters.data, function(k, v){
							if (v.value == arrSelected.eq(0).attr('id'))
								liData = v;
						});
						var li = $('<div>', {'id' : liData.value, 'class' : 'ddlListItem', 'style' : 'width:'+(_this.parameters.width-45)+'px;'});
						var image = $('<div>', {'class' : 'float_left ddlImage'}).appendTo(li);
						$('<div>', {'class' : 'float_left ellipsis', 'style' : 'width:'+(_this.parameters.width-100)+'px;'}).appendTo(li).html(liData.name);
						$('<div>', {'class' : 'clear'}).appendTo(li);

						$('<img>', {'src' : liData.image, 'style' : 'height:20px;width:20px;'}).appendTo(image);
						_this.selectItem(li, liData, true);	
					}
					break;
				case 38 : // arrow up
					evt.preventDefault();
					if (arrSelected[0] != undefined){
						if (arrSelected.eq(0).prev() != undefined){
							arrSelected.eq(0).prev().addClass('ddlSelectedItem');
							arrSelected.eq(0).removeClass('ddlSelectedItem');
						}
					}
					break;
				case 40 : // arrow down
					evt.preventDefault();
					if (arrSelected.length == 0){ // top of list
						if (_this.ddlDropdown.children().length != 0){ // select first item in list if exists 
							_this.ddlDropdown.children().eq(0).addClass('ddlSelectedItem');
						}
					}
					else {
						if (arrSelected.eq(0).next().length != 0){ // move to next sibling if exists
							arrSelected.eq(0).next().addClass('ddlSelectedItem');
							arrSelected.eq(0).removeClass('ddlSelectedItem');
						}
					}
					break;
				default : 	
					_this.displayDDL();
					break;
			}
		});
		
		this.ddlArrow.bind('click', function(event){
			event.stopPropagation();
			_this.displayDDL();
		});

		this.ddlRemove.bind('click', function(event){
			event.stopPropagation();
			_this.ddlSelected.empty();
			_this.ddlSelected.hide();
			_this.ddlInput.empty();
			_this.ddlInput.show();
			_this.selected = undefined;
			_this.ddlRemove.hide();
			_this.ddlArrow.show();
			_this.ddlDropdown.hide();
		});
		
		// close the dropdown on background click
		$(document).bind('click', function(event){
			event.stopPropagation();
			_this.ddlDropdown.empty();
		});
	},

	displayDDL : function(){
		var _this = this;
		this.ddlDropdown.empty();
		$.each(this.parameters.data, function(key, value){
			if (value.name.toLowerCase().indexOf(_this.ddlInput.html().replace(/\<br\>/g,'').toLowerCase()) != -1){
				var li = $('<div>', {'id' : value.value, 'class' : 'ddlListItem', 'style' : 'width:'+(_this.parameters.width-45)+'px;'})
					.appendTo(_this.ddlDropdown)
					.bind('click', function(){
						li.removeClass('ddlSelectedItem');
						_this.selectItem(li, value, true);
					});
				var image = $('<div>', {'class' : 'float_left ddlImage'}).appendTo(li);
				$('<div>', {'class' : 'float_left ellipsis', 'style' : 'width:'+(_this.parameters.width-100)+'px;'}).appendTo(li).html(value.name);
				$('<div>', {'class' : 'clear'}).appendTo(li);

				$('<img>', {'src' : value.image, 'style' : 'height:20px;width:20px;'}).appendTo(image);
				li.bind('mouseenter', function(event){
					event.stopPropagation();
					li.addClass('ddlSelectedItem');
				});
				li.bind('mouseleave', function(event){
					event.stopPropagation();
					li.removeClass('ddlSelectedItem');
				});
			}
		});
		if (this.ddlDropdown.html() != '')
			this.ddlDropdown.show();
	},

	selectItem : function(li, value, fireOnchange){
		this.selected = value;
		li.appendTo(this.ddlSelected);
		this.ddlDropdown.hide();
		this.ddlInput.hide();
		this.ddlInput.empty();
		this.ddlSelected.show();
		this.ddlArrow.hide();	
		this.ddlRemove.show();
		if (fireOnchange){
			if (this.parameters.onchange != undefined)
				this.parameters.onchange(this.selected);
		}
	},

	clearValue : function(){
		this.ddlSelected.empty();
		this.ddlSelected.hide();
		this.ddlInput.empty();
		this.ddlInput.show();
		this.selected = undefined;
		this.ddlRemove.hide();
		this.ddlArrow.show();
		this.ddlDropdown.hide();
	},

	getValue : function(){
		return this.selected;
	},	

	setValue : function(value){
		var li = $('<div>', {'id' : value.value, 'class' : 'ddlListItem', 'style' : 'width:'+(this.parameters.width-45)+'px;'});
		var image = $('<div>', {'class' : 'float_left ddlImage'}).appendTo(li);
		$('<div>', {'class' : 'float_left ellipsis', 'style' : 'width:'+(this.parameters.width-100)+'px;'}).appendTo(li).html(value.name);
		$('<div>', {'class' : 'clear'}).appendTo(li);

		$('<img>', {'src' : value.image, 'style' : 'height:20px;width:20px;'}).appendTo(image);
		this.selectItem(li, value, false);	
	}

});
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.grouping = $.klass(titan.controls.base,
{

	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - width
		// - values
		// - type
		// - onChange (function call)

		this.parameters.container.addClass('titan');

		this.controls = [];
		this.render();
	},

	render : function()
	{
		var divGroup	= $('<div>', {'class' : 'group', 'style' : 'width:' + this.parameters.width + 'px;'}).appendTo(this.parameters.container);
				  $('<div>', {'class' : 'type'}).appendTo(divGroup).html(this.parameters.type);		
	
		$('<div>', {'style' : 'height:10px;width:10px;'}).appendTo(divGroup); 	
	
		var len = this.parameters.values.length;
		var vals = this.parameters.values;
		for (var i = 0;i < len;i++)
		{
			var labelWidth = parseInt(this.parameters.width) - 73;
			this.controls['lbl_' + vals[i].id] 	= $('<div>', {'class' : 'float_left smlabel ellipsis', 'style' : 'width:' + labelWidth + 'px;'}).appendTo(divGroup).html(vals[i].name);
			var divToggle 				= $('<div>', {'class' : 'float_right'}).appendTo(divGroup);
			this.controls['val_' + vals[i].id]	= new titan.controls.toggle({
				'container' 	: divToggle,
				'textOn'	: 'Win',
				'textOff'	: 'Lose',
				'checked'	: vals[i].visible
			});
			var _this = this;
			this.controls['val_' + vals[i].id].divOuter.bind('click', {myid:vals[i].id}, function(event) {
				var val = _this.controls['val_' + event.data.myid].getValue();
				_this.parameters.onChange(event.data.myid, val);
			});	
								  $('<div>', {'class' : 'clear'}).appendTo(divGroup);
		}

		$('<div>', {'class' : 'clear'}).appendTo(this.parameters.container);
        	$('<div>', {'class' : 'float_left', 'style' : 'height:5px;'}).appendTo(this.parameters.container);
        	$('<div>', {'class' : 'clear'}).appendTo(this.parameters.container);


	}	

});
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.inputTextbox = $.klass(titan.controls.base,
{
	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - placeholder
		// - width (default 300)
		// - validationRegex 
		
		this.parameters.container.addClass('titan');
		
		if (this.parameters.width == undefined)
			this.parameters.width = 300;
	
		this.render();
	},

	render : function()
	{
		var _this = this;

		var dvInput = $('<div>', {'class' : 'float_left'}).appendTo(this.parameters.container);
		this.txtbox = $('<input>', {'type' : 'textbox', 'class' : 'txtbox', 'style' : 'width:'+this.parameters.width+'px;'}).appendTo(dvInput);
		if (this.parameters.validationRegex != undefined){
			this.dvValidation = $('<div>', {'class' : 'float_left valFail'}).appendTo(this.parameters.container);
		}
		$('<div>', {'class' : 'clear'}).appendTo(this.parameters.container);
		
		if (this.parameters.placeholder != undefined)
			this.placeholder = $('<div>', {'class' : 'placeholder'}).appendTo(this.parameters.container).html(this.parameters.placeholder);

		// validation
		if (this.parameters.validationRegex != undefined){
			this.txtbox.bind('keyup', function(){
				_this.runValidation();
			});
		}
	},

	runValidation : function(){
		var valid = this.parameters.validationRegex.test(this.getValue());
		if (valid){
			this.dvValidation.removeClass('valFail');
			this.dvValidation.addClass('valPass');
		}
		else {
			this.dvValidation.removeClass('valPass');
			this.dvValidation.addClass('valFail');	
		}
	},

	isValid : function(){
		return this.parameters.validationRegex.test(this.getValue());
	},

	setValue : function(val)
	{
		this.txtbox.val(val);
		if (this.parameters.validationRegex != undefined){
			this.runValidation();
		}
	},

	getValue : function()
	{
		return this.txtbox.val();
	}

});
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.popup = $.klass(titan.controls.base,
{

	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container (req)
		// - width (default 300)
		// - height (default 300)
		// - minWidth (default 250)
		// - maxWidth (default 1000)
		// - minHeight (default 250)
		// - maxHeight (default 1000)
		// - headerText (req)
		// - headerExtra (optional : div to be placed to right of text)
		// - content (req)
		// - blackout (default false)
		// - draggable (default true)
		// - resizable (default true)
		// - resizeCallback
		// - closeCallback

		this.parameters.container.addClass('titan');

		// set defaults
		if (this.parameters.width == undefined)
			this.parameters.width = 300;
		if (this.parameters.height == undefined)
			this.parameters.height = 300;
		if (this.parameters.minWidth == undefined)
			this.parameters.minWidth = 250;
		if (this.parameters.maxWidth == undefined)
			this.parameters.maxWidth = 1000;
		if (this.parameters.minHeight == undefined)
			this.parameters.minHeight = 250;
		if (this.parameters.maxHeight == undefined)
			this.parameters.maxHeight = 1000;
		if (this.parameters.resizable == undefined)
			this.parameters.resizable = true;
		if (this.parameters.draggable == undefined)
			this.parameters.draggable = true;
		if (this.parameters.blackout == undefined)
			this.parameters.blackout = false;

		this.render();
	},

	render : function()
	{
		var _this = this;
		
		if (this.parameters.blackout != undefined){
			this.blackout = $('<div>', {'class' : 'blackout'}).appendTo(this.parameters.container);
			this.blackout.bind('click', function(event){ event.stopPropagation(); });  // don't let clicks on popup trigger clicks on the elements its attached to
		}
		
		this.popupContainer = $('<div>', {
			'id' : 'popup',
			'class' : 'popup',
			'style' : 'width:' + this.parameters.width + 'px;height:' + this.parameters.height + 'px;'
		}).appendTo(this.parameters.container);
		this.popupContainer.bind('click', function(event){ event.stopPropagation(); });  // don't let clicks on popup trigger clicks on the elements its attached to
		this.popupContainer.css('position', 'absolute');
		
		// render header
		var popupHeader 	= $('<div>', {'class' : 'pheader'}).appendTo(this.popupContainer);
					  $('<div>', {'class' : 'float_left ellipsis', 'style' : 'width:150px;'}).appendTo(popupHeader).html(this.parameters.headerText);

		// render extra div to the right of the header text if specified
		if (this.parameters.headerExtra != undefined)
		{
			this.parameters.headerExtra.addClass('float_left');
			this.parameters.headerExtra.appendTo(popupHeader);
		}

		// render close button
		var right 		= $('<div>', {'class' : 'float_right'}).appendTo(popupHeader);
					  $('<div>', {'class' : 'clear'}).appendTo(popupHeader);
			  		  $('<div>', {'class' : 'content'}).appendTo(this.popupContainer).html(this.parameters.content);
		var ctrlButton = new titan.controls.button({
		 	'container' : right,
			'buttonText' : 'close'	
		});
		// mouseup rather than click cause IE8 is registering a keypress as a click	
		ctrlButton.button.bind('mousedown', function(event){ 
			event.stopPropagation();
			if (_this.parameters.closeCallback != undefined)
				_this.parameters.closeCallback();
			_this.close();  
		});
	
		// make draggable if specified	
		if (this.parameters.draggable)
			this.popupContainer.draggable({handle : "div.pheader"});

		// make resizable if specified
		if (this.parameters.resizable){
			this.popupContainer.resizable({
				minWidth: _this.parameters.minWidth, 
				maxWidth: _this.parameters.maxWidth,
				minHeight: _this.parameters.minHeight,
				maxHeight: _this.parameters.maxHeight,
				resize : function(event,ui) { 
					var height = _this.popupContainer.height();
            				_this.parameters.resizeCallback(height);
      				}
			});
		}

	},

	// close popup
	close : function()
	{
		if (this.blackout != undefined)
			this.blackout.remove();
		this.popupContainer.remove();
	},

	// hide popup
	hide : function()
	{
		if (this.blackout != undefined)
			this.blackout.hide();
		this.popupContainer.hide();
	},

	// show popup
	show : function()
	{
		if (this.blackout != undefined)
			this.blackout.show();
		this.popupContainer.show();
	}	

});
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
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.toggle = $.klass(titan.controls.base,
{

	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - textOn
		// - textOff
		// - checked

		this.parameters.container.addClass('titan');

		if (this.parameters.textOn != undefined && this.parameters.textOff != undefined)
		{
			this.on = this.parameters.textOn;
			this.off = this.parameters.textOff;
		}
		else
		{
			this.on = 'Yes';
			this.off = 'No';
		}
		this.render();

		if (this.parameters.checked != undefined)
		{	
			if (this.parameters.checked == '1')
			{
				this.setValue(1);
			}
			else
			{
				this.setValue(0);
			}
		}
	},

	render : function()
	{
		this.divOuter 		= $('<div>', {'class' : 'toggle outer float_left'}).appendTo(this.parameters.container);
		this.divInnerCtrl	= $('<div>', {'class' : 'inner on'}).appendTo(this.divOuter);
		this.divInnerText	= $('<div>', {'class' : 'innertext float_right'}).appendTo(this.divOuter).html(this.on);
					  $('<div>', {'class' : 'clear'}).appendTo(this.parameters.container);
					  $('<div>', {'style' : 'height:5px;'}).appendTo(this.parameters.container);
					  $('<div>', {'class' : 'clear'}).appendTo(this.parameters.container);
		
		var _this = this;
		this.divOuter.bind('click',
			function(event){
				if (_this.divInnerCtrl.hasClass('on'))
				{
					_this.divInnerCtrl.addClass('off');
					_this.divInnerCtrl.removeClass('on');
					_this.divInnerText.html(_this.off);
					_this.divInnerText.removeClass('float_right');
					_this.divInnerText.addClass('float_left');
				}	
				else
				{
					_this.divInnerCtrl.addClass('on');
					_this.divInnerCtrl.removeClass('off');
					_this.divInnerText.removeClass('float_left');
					_this.divInnerText.addClass('float_right');
					_this.divInnerText.html(_this.on);
				}
			}
		);

	},

	getValue : function()
	{
		if (this.divInnerCtrl.hasClass('on'))
			return 1;
		else
			return 0;
	},

	setValue : function(val)
	{
		if (val == 1)
		{
			this.divInnerCtrl.addClass('on');
			this.divInnerCtrl.removeClass('off');
			this.divInnerText.removeClass('float_left');
			this.divInnerText.addClass('float_right');
			this.divInnerText.html(this.on);
		}
		else
		{
			this.divInnerCtrl.addClass('off');
			this.divInnerCtrl.removeClass('on');
			this.divInnerText.removeClass('float_right');
			this.divInnerText.addClass('float_left');
			this.divInnerText.html(this.off);
		}
	}	   

});
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.tooltip = $.klass(titan.controls.base,
{

	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - width
		// - xOffset
		// - yOffset
		// - text

		this.parameters.container.addClass('titan');

		// set defaults
		if (this.parameters.width == undefined)
			this.parameters.width = 300;
		if (this.parameters.xOffset == undefined)
			this.parameters.xOffset = 0;
		if (this.parameters.yOffset == undefined)
			this.parameters.yOffset = 0;

		this.render();
	},

	render : function()
	{
		var _this = this;
		
		this.tooltip = $('<div>', {
			'class' : 'tooltip',
			'style' : 'width:' + this.parameters.width + 'px;margin-top:'+this.parameters.yOffset+'px;margin-left:'+this.parameters.xOffset+'px;'
		}).appendTo(this.parameters.container).html(this.parameters.text);

		this.hide();

		this.parameters.container.bind('mouseenter', function(){
			_this.show();
		});
		this.parameters.container.bind('mouseleave', function(){
			_this.hide();
		});
	},

	hide : function()
	{
		this.tooltip.hide();
	},

	show : function()
	{
		this.tooltip.show();
	}	

});
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.radioGroup = $.klass(titan.controls.base,
{
	
	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - items
		// - selected
		// - onchange
	
		this.parameters.container.addClass('titan');
			
		this.render();
	},

	render : function()
	{
		var _this = this;
		this.selected = undefined;
		$.each(this.parameters.items, function(key, value){
			var stateClass = 'unchecked';
			if (_this.parameters.selected != undefined){
				if (value.value == _this.parameters.selected.value){
					_this.selected = value;
					stateClass = 'checked';
				}
			}
			_this.radio = $('<div>', {'id' : 'rdo_'+value.value, 'class' : 'radio float_left '+stateClass}).appendTo(_this.parameters.container);
			$('<div>', {'class' : 'radiolabel float_left'}).appendTo(_this.parameters.container).html(value.name);
			$('<div>', {'class' : 'clear'}).appendTo(_this.parameters.container);

			_this.radio.bind('click', function(){
				_this.switchSelected(value, true);
			});
		});
	},

	switchSelected : function(value, fireCallback){
		if (this.selected != undefined){
			if (value.value != this.selected.value){
				this.selected = value.value;
				$('.radio').removeClass('checked').addClass('unchecked');
				$('#rdo_'+value.value).removeClass('unchecked').addClass('checked');
				if (this.parameters.onchange != undefined && fireCallback)
					this.parameters.onchange();
			}
		}
		else {
			this.selected = value.value;
			$('#rdo_'+value.value).removeClass('unchecked').addClass('checked');
			if (this.parameters.onchange != undefined && fireCallback)
				this.parameters.onchange();
		}
	},
		
	getValue : function(){
		return this.selected;
	},

	setValue : function(val){
		this.switchSelected(val, false);
	}

});
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.checkbox = $.klass(titan.controls.base,
{
	
	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - label
		// - checked (default false)
		// - onchange

		this.parameters.container.addClass('titan');

		if (this.parameters.label == undefined)
			this.parameters.label = '';
		if (this.parameters.checked == undefined)
			this.parameters.checked = false;
		
		this.render();
	},

	render : function()
	{
		var _this = this;
		this.checked = this.parameters.checked;
		this.cbox = $('<div>', {'class' : 'cbox float_left'}).appendTo(this.parameters.container);
		$('<div>', {'class' : 'checkboxlabel float_left'}).appendTo(this.parameters.container).html(this.parameters.label);
		$('<div>', {'class' : 'clear'}).appendTo(this.parameters.container);

		if (this.checked)
			this.cbox.addClass('checked');
		else
			this.cbox.addClass('unchecked');

		this.cbox.bind('click', function(){
			if (_this.checked){
				_this.checked = false;
				_this.cbox.removeClass('checked');
				_this.cbox.addClass('unchecked');
			}
			else {
				_this.checked = true;
				_this.cbox.removeClass('unchecked');
				_this.cbox.addClass('checked');
			}
			if (_this.parameters.onchange != undefined)
				_this.parameters.onchange();
		});
	},

	getValue : function(){
		return this.checked;
	},
	
	setValue : function(val){
		this.checked = val;
		if (this.checked){
			this.checked = true;
			this.cbox.removeClass('unchecked');
			this.cbox.addClass('checked');
		}
		else {
			this.checked = false;
			this.cbox.removeClass('checked');
			this.cbox.addClass('unchecked');
		}
	}

});
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.textarea = $.klass(titan.controls.base,
{
	
	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - placeholder
		// - height
		// - width
		// - value
		// - onchange

		this.parameters.container.addClass('titan');	

		if (this.parameters.width == undefined)
			this.parameters.width = 300;
		if (this.parameters.height == undefined)
			this.parameters.height = 100;
	
		this.render();
	},

	render : function()
	{
		var _this = this;
		
		$('<div>', {'class' : 'taplaceholder'}).appendTo(this.parameters.container).html(this.parameters.placeholder);
		var dvTextarea = $('<div>').appendTo(this.parameters.container);
		this.txtarea = $('<textarea>', {'class' : 'textarea', 'style' : 'width:'+this.parameters.width+'px;height:'+this.parameters.height+'px;'}).appendTo(dvTextarea);
		if (this.parameters.value != undefined)
			this.setValue(this.parameters.value);

		this.txtarea.bind('change', function(){
			if (_this.parameters.onchange != undefined)
				_this.parameters.onchange();
		});
	},

	getValue : function(){
		return this.txtarea.val()
	},
	
	setValue : function(val){
		this.txtarea.val(val);
	}

});
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.doubleMultiselect = $.klass(titan.controls.base,
{
	
	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - items
		// - height (default 300)
		// - width (default 600)
		// - onchange
	
		this.parameters.container.addClass('titan');
			
		if (this.parameters.height == undefined)
			this.parameters.height = 300;
		if (this.parameters.width == undefined)
			this.parameters.width = 600;

		this.multiselectWidth = (this.parameters.width - 50) / 2;
		this.arrowMarginTop = (this.parameters.height / 2) - 30;

		this.render();
	},

	render : function()
	{
		var _this = this;
		this.selected = [];
		this.dvLeft = $('<div>', {'class' : 'multiselect float_left', 'style' : 'width:'+this.multiselectWidth+'px;height:'+this.parameters.height+'px;'}).appendTo(this.parameters.container);
		$('<div>', {'class' : 'multiarrow float_left', 'style' : 'margin-top:'+this.arrowMarginTop+'px;'}).appendTo(this.parameters.container);
		this.dvRight = $('<div>', {'class' : 'multiselect float_left', 'style' : 'width:'+this.multiselectWidth+'px;height:'+this.parameters.height+'px;'}).appendTo(this.parameters.container);
		$('<div>', {'class' : 'clear'}).appendTo(this.parameters.container);

		$.each(this.parameters.items, function(key, value){
			var dvItem = $('<div>', {'id' : 'multi_'+value.id, 'class' : 'multiitem'}).appendTo(_this.dvLeft);
			var dvImg = $('<div>', {'class' : 'float_left'}).appendTo(dvItem);
			$('<img>', {'src' : value.picture_url, 'style' : 'height:26px;width:26px;margin:2px;'}).appendTo(dvImg);
			$('<div>', {'class' : 'float_left itemtext'}).appendTo(dvItem).html(value.name);
			$('<div>', {'class' : 'clear'}).appendTo(dvItem);

			dvItem.bind('mouseenter', function(){ dvItem.addClass('multihover'); });
			dvItem.bind('mouseleave', function(){ dvItem.removeClass('multihover'); });
			dvItem.bind('click', function(){ 
				_this.selectItem(value, true);
			});
		});
	},

	selectItem : function(value, runonchange){
		var _this = this;
		var dvItem = $('#multi_'+value.id);
		if ($.inArray(value, _this.selected) == -1){
			_this.selected.push(value);
			var dvSelected = dvItem.clone().attr('id', 'multiS_'+value.id).appendTo(_this.dvRight);
			dvItem.addClass('multiselected');
			dvSelected.unbind('mouseenter');
			dvSelected.unbind('mouseleave');
			dvSelected.removeClass('multihover');
			dvSelected.bind('mouseenter', function(){ dvSelected.addClass('multihover'); });
			dvSelected.bind('mouseleave', function(){ dvSelected.removeClass('multihover'); });
			dvSelected.bind('click', function(){
				var arr = [];
				arr.push(value);
				_this.removeValues(arr);
			});
			if (_this.parameters.onchange != undefined && runonchange)
				_this.parameters.onchange();
		}
	},

	getValues : function(){
		return this.selected;
	},

	setValues : function(vals){
		var _this = this;
		$.each(vals, function(key, value){
			_this.selectItem(value, false);
		});
	},

	removeValues : function(vals){
		var _this = this;
		$.each(vals, function(key, value){
			var dvItem = $('#multi_'+value.id);
			var dvSelected = $('#multiS_'+value.id);
			dvItem.removeClass('multiselected');
			var newArr = [];
			$.each(_this.selected, function(key, sel){
				if (sel.id != dvSelected.attr('id').replace('multiS_',''))
					newArr.push(sel);
			});
			_this.selected = newArr;
			dvSelected.remove();
			if (_this.parameters.onchange != undefined)
				_this.parameters.onchange();
		});
	}

});
// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.videoPlayer = $.klass(titan.controls.base,
{

	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - videoFormats [{"format" : "mp4", "url" : "http://..."}, {"format" : "mp4", "url" : "http://..."}]
		// - thumbnail
		// - height (default 400)
		// - width (default 600)
		// - controls (default true)
		// - autoplay (default false)
		// - playcallback 
		// - pausecallback

		this.parameters.container.addClass('titan');

		if (this.parameters.height == undefined)
			this.parameters.height = 400;
		if (this.parameters.width == undefined)
			this.parameters.width = 600;
		if (this.parameters.controls == undefined)
			this.parameters.controls = true;
		if (this.parameters.autoplay == undefined)
			this.parameters.autoplay = false;

		this.render();

	},

	render : function()
	{
		var _this = this;
		this.video = $("<video>", {"poster" : this.parameters.thumbnail, "height" : this.parameters.height, "width" : this.parameters.width, "controls" : this.parameters.controls, "autoplay" : this.parameters.autoplay}).appendTo(this.parameters.container);
		$.each(this.parameters.videoFormats, function(key, value){
			$("<source>", {"src" : value.url, "type" : "video/"+value.format}).appendTo(_this.video);
		});

		this.video.html(this.video.html()+"Your browser does not support HTML video.");


		if (this.parameters.playcallback != undefined){
			this.video.bind("play", function(){
				_this.parameters.playcallback();
			});
		}

		if (this.parameters.pausecallback != undefined){
			this.video.bind("pause", function(){
				_this.parameters.pausecallback(_this.video.get(0).played.start(0), _this.video.get(0).played.end(0));
			});
		}
	},

	play : function(){
		this.video.get(0).play();
	},

	pause : function(){
		this.video.get(0).pause();
	},

	stop : function(){
		this.video.get(0).load();
	}


});
