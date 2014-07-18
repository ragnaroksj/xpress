define([
  "jquery",
  "vimeoSimpleApi"
  ],function($, VimeoSimpleApi){ 

    /*global require */
  "use strict";

  var videoModel = Backbone.Model.extend({

      videoIndex : "",

      loadVideo : function(index){
        this.videoIndex = index;
        var newVideo = "";
        if(arguments.length !=0){
           newVideo = $(".video-nav li").eq(index).find("img").attr("data-url");
        }else{
          newVideo = $(this).find("img").attr("data-url");
        }
        $(".video.container").html( newVideo );
        $(window).trigger("resize");
        $("iframe").css({"opacity" : 1}); 
      },


  });
 
  return videoModel;

});
