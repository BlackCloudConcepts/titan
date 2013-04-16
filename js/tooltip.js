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
