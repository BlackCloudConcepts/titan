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
