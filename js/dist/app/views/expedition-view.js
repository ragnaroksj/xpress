define([
  "jquery",
  "models/expedition-model",
  "collections/expedition-collection",
  "modules/map"
  ],function($, ExpeditionItem, ExpeditionCollection,Map){
  
  var _map = new Map();

  var expeditionView = Backbone.View.extend({  

    initialize : function(options){
      
      var self = this;
      var _el = options.el;
      
    	_(this.collection.models).each(function(item){
            self.renderItem(item);
        });
        _map.updateMap({ map_options : { zoom : 2 } },function(){
          console.log(_map.oMap.getZoom());
        });
    },

    renderItem : function(item){
      item = item.formatItem(item,12);
      _map.AddLocation(item);
    }

  });

  return {
    expeditionView : expeditionView,
    map : _map
  }
});
