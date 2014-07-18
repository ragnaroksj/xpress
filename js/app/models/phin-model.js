define([
  "jquery"
  ],function($){ 

  /*global require */
  "use strict";

  var phinItem = Backbone.Model.extend({
      
      defaults : {
        "title" : "",
        "image" : [],
        "location" : "",
        "coordinate" : "",
        "content" : ""  ,
        "cat" : "",
        "active" : "inactive"
      }

  });
 
  return phinItem;

});
