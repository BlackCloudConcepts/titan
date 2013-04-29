// License: (MIT) Copyright (C) 2013 Scott Gay
titan.controls.videoPlayer = $.klass(titan.controls.base,
{

	initialize : function(parameters)
	{
		this.parameters = parameters;
		// parameters:
		// - container
		// - videoFormats [{"format" : "mp4", "url" : "http://..."}, {"format" : "mp4", "url" : "http://..."}]
		// - thumbnail
		// - height (default 400)
		// - width (default 600)
		// - controls (default true)
		// - autoplay (default false)
		// - playcallback 
		// - pausecallback

		this.parameters.container.addClass('titan');

		if (this.parameters.height == undefined)
			this.parameters.height = 400;
		if (this.parameters.width == undefined)
			this.parameters.width = 600;
		if (this.parameters.controls == undefined)
			this.parameters.controls = true;
		if (this.parameters.autoplay == undefined)
			this.parameters.autoplay = false;

		this.render();

	},

	render : function()
	{
		var _this = this;
		this.video = $("<video>", {"poster" : this.parameters.thumbnail, "height" : this.parameters.height, "width" : this.parameters.width, "controls" : this.parameters.controls, "autoplay" : this.parameters.autoplay}).appendTo(this.parameters.container);
		$.each(this.parameters.videoFormats, function(key, value){
			$("<source>", {"src" : value.url, "type" : "video/"+value.format}).appendTo(_this.video);
		});

		this.video.html(this.video.html()+"Your browser does not support HTML video.");


		if (this.parameters.playcallback != undefined){
			this.video.bind("play", function(){
				_this.parameters.playcallback();
			});
		}

		if (this.parameters.pausecallback != undefined){
			this.video.bind("pause", function(){
				_this.parameters.pausecallback(_this.video.get(0).played.start(0), _this.video.get(0).played.end(0));
			});
		}
	},

	play : function(){
		this.video.get(0).play();
	},

	pause : function(){
		this.video.get(0).pause();
	},

	stop : function(){
		this.video.get(0).load();
	}


});
