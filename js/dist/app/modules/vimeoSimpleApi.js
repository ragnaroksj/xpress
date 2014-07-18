define([
	'jquery',
	'jquery.pubsub'
	], function($){

	/*global require */
 	"use strict";

	var vimeoSimpleApi = function(){}

	vimeoSimpleApi.prototype = {
		onReady : function(){
			console.log("ready");

			this.post('addEventListener', 'play');
			this.post('addEventListener', 'pause');
			this.post('addEventListener', 'finish');
			this.post('addEventListener', 'playProgress');
			
		},

		onMessageReceived : function(e){
			var _data = JSON.parse(e.data);
			var _this = vimeoSimpleApi.prototype;
			
			if( _data.event == "ready" ){
				_this.onReady();
			}else{
				//play, playProgress,pause, finish
				_this.onAction( _data.event, "video" );
			}
		},

		post : function(action, value){
			var data = { method : action};
			if(value){
				data.value = value;
			}
			
			var url = window.location.protocol + "//" +$("iframe").eq(0).attr('src').split('?')[0];
			$("iframe")[0].contentWindow.postMessage(JSON.stringify(data),url);
		},

		/*must load tiny pubsub plugin*/
		onAction : function(action, type){
			$.publish(action, type);
		}
	}

	$(function(){

		var vimeosimpleapi = new vimeoSimpleApi();
        if(window.addEventListener){
          window.addEventListener('message', vimeosimpleapi.onMessageReceived, false);
        }else{
          window.attachEvent('onmessage', vimeosimpleapi.onMessageReceived, false);
        } 

	});
});

