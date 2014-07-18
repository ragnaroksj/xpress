define([
  "jquery",
  "models/phin-model",
  ],function($, PhinModel){ 

  /*global require */
  "use strict";

  var phinCollection = Backbone.Collection.extend({

  	updateModel : function(cat){
  		_.each(this.models, function(modelItem){
  			if(modelItem.get("cat") == cat){
  				modelItem.set({"active" : "active"});
  			}else{
  				modelItem.set({"active" : "inactive"});
  			}
  		});
  	}

  });
 
  return phinCollection;

});
