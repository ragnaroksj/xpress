define([
	'jquery',
	'views/header-view',
	'jquery.pubsub'
	], function ($, HeaderView) {

		$(function(){
			new HeaderView( {el : $(".nav") } );

			$.subscribe("play",function(e,type){
				console.log(type + "getPlay");
			});
		});
});