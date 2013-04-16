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
