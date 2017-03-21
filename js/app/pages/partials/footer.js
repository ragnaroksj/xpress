define([
	'jquery',
	'jplayer/jplayerWithCookie',
	'views/footer-view'
], function ($, Jplayerinit, FooterView) {
	
	//var footerView = new FooterView({ el : "#footer"});

	$(document).ready(function(){
		
		Jplayerinit.jPlayerInit();
		
		$(".jp-playlist-btn").on("click",function(){
			$(".playlist").slideToggle();
		});

		$(".playlist").on("click",".playlist-item",function(){
			var dataSrc = $(this).data("src");
			Jplayerinit.jumpPlay(RSJ.fullurl + "/" + dataSrc, $(this).data("id"));
		});
	});
	
});