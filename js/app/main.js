// Config for requireJs
require.config({

  /*The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout.*/
  waitSeconds : 0,
  /*Magento BaseUrl*/
  //baseUrl : "/skin/frontend/enterprise/cache/js/app",
  /*wordpress BaseUrl*/
  baseUrl : "/wp-content/themes/xpress/js/app",
  paths : {
      "pace" : "lib/pace/pace",
      "underscore" : "lib/underscore",
      "backbone" : "lib/backbone",
      "text" : 'lib/text',
      "async" : 'lib/async',
      "jquery" : "lib/jquery-1.11.0.min",
      /*experiment project*/
      "jst" : "modules/jst/inherit",
      /********************/
      "jquery.easing" : "lib/jquery.easing",
      "jquery.transit" : "lib/jquery.transit",
      "jquery.mousewheel" : "lib/jquery.mousewheel.min",
      "jquery.mwheelintent" : "lib/jquery.mwheelintent",
      "jquery.jscrollpane" : "lib/jquery.jscrollpane",
      "jquery.imagesloaded" : "lib/jquery.imagesloaded.min",
      "jquery.hoverflow" : "lib/jquery.hoverflow.min",
      "jquery.ui" : "lib/jquery-ui-1.8.10.custom.min",
      "jquery.pubsub" : "lib/jquery.pubsub",
      "jquery.cycle" : "lib/jquery.cycle",
      "jquery.ajaxy" : "lib/jquery.ajaxy",
      "jquery.countdown" : "lib/jquery.countdown",
      "jquery.zoom" : "lib/jquery.zoom",
      "spin" : "lib/spin",
      "modernizr" : "lib/modernizr-2.0.6",
      "maplace" : "lib/maplace",
      "handlebar" : "lib/handlebars-v1.3.0",
      /*date and time */
      "date" : "lib/date",
      "moment" : "lib/moment",
      "jquery.imageGallery" : "modules/imageGallery",
      "jquery.simplesldier" : "modules/simpleslider",
      "vimeoSimpleApi" : "modules/vimeoSimpleApi",
      "jplayer" : "lib/jplayer/",
      "d3" : "lib/d3",
      "jquery.postmessage" : "lib/jquery.ba-postmessage",
      "googleMap" : "async!http://maps.google.com/maps/api/js?key=AIzaSyCEAexlU6R7cWMKaxHF7maBdvVivPMQSgs&sensor=false"
  },

  shim : {
    underscore : {
      exports: "_"
    },
    backbone : {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    modernizr: {
      deps: ["jquery"],
      exports: "Modernizr"
    },
    'jquery.easing': {
      deps: ["jquery"]
    },
    'jquery.transit': {
      deps: ["jquery"]
    },
    'jquery.mousewheel': {
      deps: ["jquery"]
    },
    'jquery.mwheelintent': {
      deps: ["jquery"]
    },
    'jquery.jscrollpane': {
      deps: ["jquery", "jquery.mousewheel", "jquery.mwheelintent"]
    },
    'jquery.imagesloaded': {
      deps: ["jquery"]
    },
    'jquery.hoverflow': {
      deps: ["jquery"]
    },
    'jquery.pubsub' : {
      deps : ["jquery"]
    },
    'jquery.cycle' : {
      deps : ["jquery"]
    },
    'jquery.ajaxy' : {
      deps : ["jquery"]
    },
    'jquery.countdown' : {
      deps : ["jquery", "lib/jquery.countdown.plugin"]
    },
    'jquery.zoom' : {
      deps : ["jquery"]
    },
    'maplace' : {
      //deps : ["jquery", "async!http://maps.google.com/maps/api/js?key=AIzaSyCEAexlU6R7cWMKaxHF7maBdvVivPMQSgs&sensor=false"]
      deps : ["jquery", "googleMap"]
    },
    'jquery.imageGallery' : {
      deps : ["jquery"]
    },
    'vimeoSimpleApi' : {
      deps : ["jquery", "jquery.pubsub"]
    },
    'jquery.postmessage' : {
      deps : ["jquery"]
    }
  }

});

//define project namespace 
var RSJ = (function (RSJ) { return RSJ; } (RSJ || {}));
window.RSJ = RSJ;
window.RSJ.fullurl = location.protocol + "//" + window.location.hostname;

/* Console fallback for ie8 */
window.console = window.console || {"log":function(){}};

/* Example of using gloable var */
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  RSJ.mobile = true;
}


require([
  /*require libs*/
  "pace",
  "jquery",
  "underscore",
  "backbone",
  "jquery.easing",
  "jquery.transit",
  "jquery.imagesloaded",
  //"jquery.jscrollpane",
  "jquery.hoverflow",
  "jquery.cycle",
  "jquery.pubsub",
  /*require modules*/
  "jquery.imageGallery",
  "vimeoSimpleApi"
], function (pace,$) {

    var n = Math.floor(2*Math.random())+1;
    $(".pace-bg-img").addClass("pace-bg-img-"+n);
    pace.on("start",function(){
      $(".pace-bg-img").addClass("pacebg-active").removeClass("pacebg-inactive");
    });
    pace.start();
    var loadingInterval = setInterval(function(){
      
      $(".pace").css("height",(100-pace.bar.progress)+"%");
      if(pace.bar.progress == 100){
        clearInterval(loadingInterval);
      }

    },30);

    pace.on("hide",function(){

      require(["router"]); 
      $(".pace-bg").addClass("pacebg-inactive").removeClass("pacebg-active");
      $(".pace-bg").on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){
        $(this).remove();
      });
       
    });

});