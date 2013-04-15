// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.button = $.klass(titan.controls.base,
{
	
	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - buttonText
		// - buttonSize [small, medium, large]
		// - onclick
			
		if (this.parameters.buttonSize == undefined)
		{
			this.buttonSize = 'small';
		}
		else
		{
			this.buttonSize = this.parameters.buttonSize
		}

		this.render();
	},

	render : function()
	{
		var _this = this;
		this.button = $('<button>', {'class' : 'ui-state-default ui-corner-all button ' + this.buttonSize}).appendTo(this.parameters.container).html(this.parameters.buttonText);

		this.button.hover( 
			function() {
				$(this).addClass("ui-state-hover");
			},
			function() {
				$(this).removeClass("ui-state-hover");
			}	
		);

		this.button.bind('click', function(event){
			_this.parameters.onclick();
		});
	}	

});
