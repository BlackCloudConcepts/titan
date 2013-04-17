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
