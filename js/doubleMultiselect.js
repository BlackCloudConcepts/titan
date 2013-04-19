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
				_this.selectItem(dvItem, value, true);
			});
		});
	},

	selectItem : function(dvItem, value, runonchange){
		var _this = this;
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
			var dvItem = $('#multi_'+value.id);
			_this.selectItem(dvItem, value, false);
		});
	}

});
