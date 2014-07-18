define([
  "jquery",
  "text!templates/mapInfo.html",
  "text!templates/videoInfo.html"
  ],function($, mapInfoHtml, videoInfoHtml){ 

    /*global require */
  "use strict";

  var expeditionItem = Backbone.Model.extend({
      
      defaults : {
        mid : "0",
        title : "0",
        excerpt : "0",
        imgSrc : "0",
        place : "0",
        position : "0",
        icon : "0",
        category : "0",
        order : "0",
        link : "0",
        date : "0"
      },

      formatItem : function(item,zoom){
        var formatItemData = {};
        formatItemData.lat = item.get("position").split(",")[0];
        formatItemData.lon = item.get("position").split(",")[1];
        formatItemData.title = item.get("title");
        formatItemData.icon = item.get("icon");
        formatItemData.animation = google.maps.Animation.DROP;
        formatItemData.category = item.get("category");
        if(item.get("template") == "mapInfoHtml"){
          formatItemData.html = _.template(mapInfoHtml, { item : item });
        }else{
          formatItemData.html = _.template(videoInfoHtml, { item : item });
        }
        formatItemData.zoom = zoom;

        return formatItemData;
      }

  });
 
  return expeditionItem;

});
