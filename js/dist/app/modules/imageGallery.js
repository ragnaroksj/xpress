define([
	"jquery"
	], function($){

	"use strict";

	/*
	* $thisObj.imageGallery
	* popup the image with next previous button
	* accept 3 parameters : 
	*    imgUrl : original image url from attribute of data-url 
	*    imageGalleryList : image collection,
	*    orderId : image order from attribute of data-order
	* ragnaroksj@gmail.com
	* Literal Model
	*/

	var imageGalleryList = "";
	var $thisObj = {};
	
	return {
		_construct : function(){
			return this;
		},

		init : function(imgUrl,imageGalleryList,orderId){
			$thisObj = this._construct();
			$thisObj.imageGalleryCollection = imageGalleryList;
			$thisObj.preloadImage(imgUrl,orderId);
			$thisObj.overlayGenerate();
		},

		preloadImage : function(imgUrl,orderId){
			var image = new Image();
			image.src = imgUrl;
			image.onload = function(){
				$(".overlayBg").animate({
					"opacity":"0.8"
				},function(){
					$thisObj.contentShown(imgUrl,orderId);	
					$(window).resize($thisObj.setPostion).trigger("resize");
				});
				
			}
		},

		overlayGenerate : function(){
			$("body").append($("<div class='overlayBg'></div>"));
			$(".overlayBg").css({
				"z-index":"9999",
				"width":"100%",
				"height":"100%",
				"position":"fixed",
				"top":"0px",
				"left":"0px",
				"background" : "#000",
				"opacity" : 0
			});
			$thisObj.controllerGenerate();
			$thisObj.eventAdd();
		},

		controllerGenerate : function(){
			$("body").append("<div class='close controller glyphicon glyphicon-remove'></div>");
			$("body").append("<div class='prev controller glyphicon glyphicon-chevron-left'></div>");
			$("body").append("<div class='next controller glyphicon glyphicon-chevron-right-after'></div>");
		},

		contentShown : function(imgUrl,orderId){
			$("body").append($("<img class='img' src='"+imgUrl+"' />"));
			$(".img").css({
				"display":"none",
				"z-index":"99999",
				"position":"fixed",
				"max-width":"60%",
				"max-height":"90%"
			}).attr("orderId",orderId);
		},

		setPostion : function(image){
			$(".img").css(
				"left", ($(window).width()-$(".img").width())*0.5+"px"
			);
			$(".img").css(
				"top", ($(window).height()-$(".img").height())*0.5+"px"
			);
			$(".img").fadeIn(500);
		},

		eventAdd : function(){
			$(".overlayBg")
				.on("click",$thisObj.close)
				.on("mouseover", function(){
					$(".close").addClass("linkactive");
				})
				.on("mouseout",function(){
					$(".close").removeClass("linkactive");
				});
			$(".close").on("click",$thisObj.close);
			$(".next").on("click",{command : "next"},$thisObj.swap);
			$(".prev").on("click",{command : "prev"},$thisObj.swap);
			$(document).on("keydown",{command : ""}, $thisObj.swap);
		},

		swap : function(event){
			if(event.keyCode != undefined){
				if(event.keyCode == 39){
					event.data.command ="next";
				}else if(event.keyCode == 37){
					event.data.command ="prev";
				}else{
					return 0;
				}
			}

			var orderId = parseInt($(".img").attr("orderId"));
			if(event.data.command == "next"){
				var nextId = (orderId+1)%$thisObj.imageGalleryCollection.length;
				var nextUrl = $thisObj.imageGalleryCollection
								.eq(nextId)
								.attr("data-url");
			}else{
				if(orderId == 0){
					var nextId = $thisObj.imageGalleryCollection.length-1;
				}else{
					var nextId = (orderId-1)%$thisObj.imageGalleryCollection.length;
				}
				var nextUrl = $thisObj.imageGalleryCollection
								.eq(nextId)
								.attr("data-url");	
			}
			$(".img").fadeOut(500,function(){
				$(this).remove();
				$thisObj.preloadImage(nextUrl,nextId);
			});
			
		},

		close : function(){
			$(".overlayBg").css("background-image","none");
			$(".img").fadeOut(500);
			$(".controller").fadeOut(500);
			$(".overlayBg").fadeOut(800,function(){
				$(".img").remove();
				$(".controller").remove();
				$(".overlayBg").remove();
			});
		}
	}
});
