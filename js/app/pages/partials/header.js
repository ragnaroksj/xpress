define([
	'jquery',
	'views/header-view',
	'jquery.pubsub'
	], function ($, HeaderView) {

		$(function(){
			new HeaderView( {el : $(".nav") } );

			$.subscribe("play",function(e,type){
				if(type == "video"){
					$("#jquery_jplayer_1").jPlayer("pause");
				}
			});

			$.subscribe("pause", function(e, type){
				if(type == "video"){
					$("#jquery_jplayer_1").jPlayer("play");
				}
			});
		});
});