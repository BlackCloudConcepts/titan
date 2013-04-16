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
