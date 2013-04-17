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
