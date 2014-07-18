define([
  'jquery'
], function ($) {

  /*global require */
  "use strict";

  var headerView = Backbone.View.extend({

      initialize : function(){

        $("#sub-nav").cycle({
          pause : 1,
          fx : "scrollHorz",
          speed : 600,
          timeout : 0,
          cssBefore : { opacity : 0},
          animOut : { opacity : 0},
          animIn : { opacity : 1}  
        });
        
        $("#sub-nav ul.photography-nav a").each(function(){
          var _originalLinks = $(this).attr("href").split("/");
          var _newLink = $(this).attr("href") 
                              + "#/get/" + _originalLinks[ _originalLinks.length-3 ] 
                              + "/" + _originalLinks[ _originalLinks.length-2 ];
          $(this).attr( "href", _newLink );
        });

         $("#sub-nav ul.video-nav li").each(function(){
          var _tempLink = $("header#header h1 a").attr("href") + "video/#/video/";
          var _newMainLink = _tempLink + "0";
          var _newLink =  _tempLink + $("#sub-nav ul.video-nav li").index(this);
         
          $(this).on("click", function(){ window.location.href = _newLink} );
          $("#main-nav .page-item-5 a").attr("href",_newMainLink);
        });

        var classList = ["icon-camera","icon-camera2","icon-location"];
        $("#main-nav li a").each(function(index){
          $(this).addClass(classList[index]);
          $(this).on("mouseover",function(index){
            var slideIndex = $(this).parent("li").parent().children()
                                .index($(this).parent("li"));
            $("#sub-nav").cycle(slideIndex);
          });
        });

        $(".expedition-nav > li > a").each(function(){
          var filterKeys = $(this).attr("href").split("/");
          $(this).attr("data-filter",filterKeys[filterKeys.length-2]);
          var parentUrls = $(this).parents("ul").attr("class").split("-");
          $(this).attr("href",  $("head").attr("id") + "/" + parentUrls[0] +
                                "/#/filter/"+ filterKeys[filterKeys.length-2]);
        });
  
        this.$el.on({
          mouseover : function(){
            //use stop and delay to do debounce
            $("#sub-nav").stop(true).delay(500).slideDown(400,"jswing");
          },
          mouseleave : function(){
            $("#sub-nav").stop(true).delay(500).slideUp(400,"jswing");
          }
        });
      }
  });

  return headerView;
});