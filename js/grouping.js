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
				  $('<div>', {'class' : 'float_left type'}).appendTo(divGroup).html(this.parameters.type);		
		var selType	= $('<div>', {'class' : 'float_right'}).appendTo(divGroup);
				  $('<div>', {'class' : 'clear'}).appendTo(divGroup);
 		
		var len = this.parameters.values.length;
		var vals = this.parameters.values;
		for (var i = 0;i < len;i++)
		{
			var labelWidth = parseInt(this.parameters.width) - 63;
			this.controls['lbl_' + vals[i].id] 	= $('<div>', {'class' : 'float_left smlabel ellipsis', 'style' : 'color:#3b5998;margin-top:3px;width:' + labelWidth + 'px;'}).appendTo(divGroup).html(vals[i].name);
			var divToggle 				= $('<div>', {'class' : 'float_right'}).appendTo(divGroup);
			this.controls['val_' + vals[i].id]	= new titan.controls.toggle({
				'container' 	: divToggle,
				'textOn'	: 'Show',
				'textOff'	: 'Hide',
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
