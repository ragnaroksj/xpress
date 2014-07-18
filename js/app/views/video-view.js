define([
  "jquery"
  ],function($){
  
  var videoView = Backbone.View.extend({

    initialize : function(){
    	var self = this;
    	$(window).on("resize", function(){
        if($(this).width() <= 824 && $("#video-mobile").length == 0){
    			$(".video").append("<div id='video-mobile'></div>");
    			var videoObjs = $("ul.video-nav li img");
    			videoObjs = videoObjs.not(videoObjs.eq(self.model.videoIndex));
    			videoObjs.each(function(){
    				$("#video-mobile").append($(this).attr("data-url"));
    			});
    		}else if($(this).width() >824 && $("#video-mobile").length != 0){
    			$("#video-mobile").remove();
    		}
    	});
    },

    render : function(){
      $("ul.video-nav").on("click", "li", this.model.loadVideo); 
      $("iframe").css({"opacity" : 1}); 
    }



  });

  return videoView;

});
