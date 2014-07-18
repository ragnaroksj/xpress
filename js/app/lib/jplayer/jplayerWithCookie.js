define([
  "jquery",
  "jplayer/jplayer"
  ],function($){

  /*add cookie function to jPlayer*/

  return{

    _construct : function(){
      return this;
    },

    jPlayerInit : function(){
      var $thisObj = this._construct();
		  $("#jquery_jplayer_1").jPlayer({
        	ready: function () {
          		$(this).jPlayer("setMedia", {
            		mp3: "http://dev.xpress.com/wp-content/themes/xtheme/res/music/ant.mp3",
            		oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
          		}).jPlayer("play",parseInt($thisObj.getCookie("starttime")));
        	},
        	supplied: "mp3, oga"
      });

      /*set default configuration*/
      if($thisObj.getCookie("play") == 1 ){
        $("#jquery_jplayer_1").bind($.jPlayer.event.ready,function(event){
            $("#jquery_jplayer_1").jPlayer("play",parseInt($thisObj.getCookie("starttime")));
        });
      }else if($thisObj.getCookie("play") == 0 && this.getCookie("play") != ""){
        $("#jquery_jplayer_1").bind($.jPlayer.event.ready,function(event){
            $("#jquery_jplayer_1").jPlayer("pause");
        });
      }

      if($thisObj.getCookie("volume") !=""){
        $("#jquery_jplayer_1").jPlayer("volume",$thisObj.getCookie("volume"));
      }
      
      if($thisObj.getCookie("mute") == 1){
        $("#jquery_jplayer_1").jPlayer("mute");
      }else{
        $("#jquery_jplayer_1").jPlayer("unmute");
      }
      
      /*bind jPlayer status and set cookies*/
      $("#jquery_jplayer_1")
            .bind($.jPlayer.event.play, function(event) { 
                $thisObj.setCookie("play",1,1);
            })
            .bind($.jPlayer.event.pause, function(event){
              $thisObj.setCookie("play",0,1);
            })
            .bind($.jPlayer.event.volumechange,function(event){
              $thisObj.setCookie("volume",event.jPlayer.options.volume,1);
            })
            .bind($.jPlayer.event.seeking,function(event){
              $thisObj.setCookie("starttime",event.jPlayer.status.currentTime);
            })
            .bind($.jPlayer.event.timeupdate,function(event){
              if(event.jPlayer.status.currentTime !=0){
                $thisObj.setCookie("starttime",event.jPlayer.status.currentTime);
              }
            })
            .bind($.jPlayer.event.ended,function(event){
              $thisObj.setCookie("starttime",0);
            });


      $(".volume-button").on("click",function(){
        if($("#jquery_jplayer_1").data('jPlayer').options.muted){
          $("#jquery_jplayer_1").jPlayer("unmute");
          $thisObj.setCookie("mute",0,1);
        }else{
          $("#jquery_jplayer_1").jPlayer("mute");
          $thisObj.setCookie("mute",1,1);
        }
      });

      $(".volume-amp-button").on("click",function(){
        $("#jquery_jplayer_1").jPlayer("unmute");
        $("#jquery_jplayer_1").jPlayer("option","volume",1);
        $thisObj.setCookie("volume",1,1);
        $thisObj.setCookie("mute",0,1);
      });

      $(".jp-volume-bars").hover(function(){
        $(this).find(".jp-volume-bar").animate({width:'56px'},500);
      },function(){
        $(this).find(".jp-volume-bar").animate({width:'0px'},500);
      });

      $("#jquery_jplayer_1").on($.jPlayer.event.volumechange,function(event){
          volumePercentage = Math.ceil(event.jPlayer.options.volume*100);
          if(volumePercentage == 0 || $("#jquery_jplayer_1").data('jPlayer').options.muted ){
            $(".volume-amp-button").css("background-position","0px -80px");
          }else if(volumePercentage <30 ){
            $(".volume-amp-button").css("background-position","0px -60px");
          }else if(volumePercentage <80){
            $(".volume-amp-button").css("background-position","0px -40px");
          }else{
            $(".volume-amp-button").css("background-position","0px -20px");
          }
      });
    },

    /*play=1:0,volume=0~1,startime*/
    setCookie : function(cname,cvalue,exdays){
      var d = new Date();
      d.setTime(d.getTime()+(exdays*24*60*60*1000));
      var expires = "expires="+d.toGMTString();
      document.cookie = cname+"="+cvalue+";"+expires+";path=/";
    },

    getCookie : function(cname){
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for(var i = 0; i<ca.length; i++){
        var c =ca[i].trim();
        if(c.indexOf(name) == 0){
          return c.substring(name.length,c.length);
        }
      }
      return "";
    }
  }
});