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
