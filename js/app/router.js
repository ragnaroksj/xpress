define([
  'jquery',
  'pages/partials/header',
  'pages/partials/footer'
], function ($) {

  /*global require */
  "use strict";

  var AppRouter = Backbone.Router.extend({

      routes : {
        "get/:mainCategory/:subCategory" : "loadCategory",
        "video/:id" : "reloadVideo",
        "filter/:key" : "filterMap",
        "wp-content/themes/xpress/pagetemplates/contact.php" : "contactRender",
        "wp-content/themes/xpress/pagetemplates/lab.html" : "labLoad",
        "*action" : "defaultRouter"
      },

      loadCategory : function(maincategory,subcategory){
        require( [("pages/blog/"+maincategory.toLowerCase())] );
      },

      reloadVideo : function(id){
        
        require([
          "pages/blog/video"
          ], function(Video){
            
            Video.videoM.loadVideo(id);
            Video.videoV.render();
        });  
      },

      filterMap : function(key){
        require([
         "pages/blog/expedition"
          ],function(Expedition){
            Expedition.map.filterMarker( key, Expedition.map);
          });
        
      },

      labLoad : function(){
        require( ["pages/blog/lab"] );
      },

      contactRender : function(){
        require([
          "pages/blog/contact",
          "pages/blog/me"
          ], function(ContactApp){
            new ContactApp({el : "#content"});
        });
      },

      defaultRouter : function(){
          //var $page = $("#page-type"); // <meta id="page-type" class="<?php echo $this->getBodyClass(); ?>"/> in head template
          //var $wp_page = $("#wp-page-name"); // <meta id="p-page-name" class="<?php echo $this->getBodyClass(); ?>"/> in head template
          var $wp_page = $("meta[name='title']").attr("content").split(" ");
          // For wordpress
          if($wp_page[0] == "Ragnaroksj" ){
            $wp_page[0] = "homepage";
          }
          var fileName = 'pages/blog/'+$wp_page[0].toLowerCase();
          require([fileName]);

          // For magento
          /*if ($page.hasClass("cms-home") || $page.hasClass("cms-index-index")) {
            require(['pages/home']);
          } else if ($page.hasClass("catalog-category-view")) {
            //require(['pages/listing']);
          } else if ($page.hasClass("catalogsearch-result-index")) {
            //require(['pages/listing']);
          } else if ($page.hasClass("catalog-product-view")) {
            require(['pages/detail']);
          } else if ($page.hasClass("checkout-cart-index")) {
            //require(['pages/cart']);
          } else if ($page.hasClass("checkout-onepage-index")) {
            //require(['pages/checkout']);
          }*/      
      }
  });

  var appRouter = new AppRouter();
  Backbone.history.start();
  //console.log(Backbone.history.fragment);

});