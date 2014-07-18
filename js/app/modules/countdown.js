define([
    "jquery",
    "jquery.countdown"
    ],function($){
    
    "use strict";

    /*
    * countdown
    * ragnaroksj@gmail.com 
    * countdown the time
    * accept 1 parameters :
    *   timeString : YYYY-MM-DD-HH-mm-ss
    * dependence : jquery, jquery.countdown
    * Usage:
    *   create an element with classname of "ticker"
    *   this.init(timeString);
    */

    return{
        init : function(timeString){
           if($(".ticker").length != 0){
                var time = timeString.split("-");
                var endTime = new Date();
                endTime = new Date(time[0],parseInt(time[1])-1,time[2],time[3],time[4],time[5]); 
                $(".ticker").countdown({'until': endTime,
                    onExpiry: function(){
                       /* var newEndTime = new Date();
                        newEndTime = new Date(newEndTime.getFullYear(),newEndTime.getMonth(),newEndTime.getDate()+1); 
                        jQuery(".ticker").countdown('option','until',newEndTime);*/
                    },
                    layout: '<ul><li>{dnn}</li><li>{hnn}</li><li>{mnn}</li><li>{snn}</li></ul>'
                }); 
            }
        }
    }
});

