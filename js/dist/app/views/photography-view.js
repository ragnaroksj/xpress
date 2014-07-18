define([
  "jquery",
  "jquery.imageGallery"
  ],function($, ImageGallery){
  
  var photographyView = Backbone.View.extend({
    
    initialize : function(){
        var self = this;
        var _i = 0;
        $(".photography img").each(function(){
          $(this).attr("data-order",(_i++));
          self.imgEvent($(this));
        });
        this.imgGridDisplay($(".photography"));
    },
  
    imgGridDisplay  : function(elm){
      var _i = 0;
      elm.find("img").each(function(){
        $(this).delay(_i*400).animate({
          "opacity" : "1"
        },500);
        _i++;
      });
    },

    imgEvent : function(elm){
      elm.on("click",function(){
        ImageGallery.init($(this).attr("data-url"),$(".photography img"),$(this).attr("data-order"));
      });
    }
  });

  return photographyView;

});
