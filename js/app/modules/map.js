define([
	"jquery",
	"maplace"
	], function($, Maplace){

	"use strict";
	
	//map constructor
	var map =function(options){
		this.Load(options);
	};

	//extend Maplace
	var F = function(){};
	F.prototype = new Maplace();
	map.prototype = new F();
	map.prototype.constructor = map;

	//add functions
	map.prototype.updateMap = function(mapOptions, _callback){
		this.Load(mapOptions);
		if(this.Loaded() && arguments.length != 0){
			_callback();
		}
	};

	map.prototype.filterMarker = function(key, mapObj){
		_(mapObj.markers).each(function(data){
			var keyArrays = key.split("-");
			if( keyArrays.length > 1){
				var keyStr = keyArrays.join(" ");
			}else{
				var keyStr = key;
			}
			if(data.category.toLowerCase() != keyStr ){
				data.setVisible(false);
			}else{
				data.setVisible(true);
			}
		});
		mapObj.CloseInfoWindow();
		mapObj.oMap.setZoom(2);
	};
	
	return map;
});
