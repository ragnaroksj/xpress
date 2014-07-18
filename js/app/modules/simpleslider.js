define([
'jquery'
], function ($) {

    "use strict";

    /*
    *
    *
    *<div id="slide" style="height: 400px; width: 984px;">
        <div data-gtm="trending slider,left" data-rel="prev" class="prev">prev</div>
        <div data-gtm="trending slider,right" data-rel="next" class="next">next</div>
            <div data-rel="container" class="slide-container">
                <div class="slide-inner">       
                </div>
            </div>
        </div>
    *</div>
    *
    *
    */

    var slide =  (function(){
    
        var _default = {
            el : "",
            speed : 400,
            interval : 1000,
            /*width : 940,*/
            number : 4,
            height : "200px",
            marginSpace : 5,
            autoPlay : 0,
            unitImgWidth : 226
        };

        var _data = {
            safeIntervalTime : 100,
            container : {},
            maxWidth : 940
        };

        var _event ={
            play : function(_pause){
                if(_pause == 1){
                    clearInterval(_data.animate);
                }else{
                    _event.play(1);  
                    _data.animate = setInterval( _private._slideAnimate,_data.safeIntervalTime+_data.speed+_data.interval);
                }
            },

            responsive : function(_el){
                _event.play(1);
                _private._adjustFrame(_event.play, _el);
            }
        };

        var _private = {

            _init : function(options){
                this._setData(options)
                    ._render()
                    ._bindEvents();
                _data.autoPlay ? _event.play() : _event.play(1);
            },

            _setData : function(options){
                $.each(_default, function( _key, _value){
                    _data[_key] = options[_key] || _value;
                });
                return this;
            },

            _render : function(){
                $(_data.el).css({"height" :  _data.height}); 
                _data.container = $(_data.el).find('[data-rel="container"]');
                _data.container.css({
                    "max-width" : _data.maxWidth + "px",
                    "display" : "block",
                    "overflow" : "hidden",
                    "width" : "100%",
                    "height" : "0px"
                });
                _data.container.children().children().each(function(){
                    if( parseInt($(this).css("margin-left")) < 0 ){
                        $(this).css({
                            "width" : (_data.unitImgWidth+"px"),
                            "margin-left" : -(_data.unitImgWidth+_data.marginSpace*2)+"px"
                        });
                    }else{
                        $(this).css({
                            "width" : (_data.unitImgWidth+"px"),
                            "float" : "left",
                            "margin" : "0 "+_data.marginSpace+"px"
                        });
                    }
                });
                _data.container.children().css({
                    "width" : _data.marginSpace*(_data.container.children().children().length+1)*2
                                +_data.unitImgWidth*(_data.container.children().children().length+1)
                                +"px",
                    "height" : _data.height,
                    "display" : "block" 
                });
                _data.container.children().eq(0).prepend(
                    _data.container.children().children().last().clone()
                );
                _data.container.children().children().eq(0).css({"margin-left":-(_data.unitImgWidth+_data.marginSpace*2)+"px" });
                _data.container.animate({
                    "height" : _data.height
                },400);

                return this;
            },

            _adjustFrame : function(_callback, _el){
                var unitBlock = _data.unitImgWidth+_data.marginSpace*2;
                var imgNumber = Math.floor(($(_el).parent().parent().parent().parent().width() - $(".next").width()-$(".prev").width())/_data.unitImgWidth);
                $(_el).parent().css("width", imgNumber * unitBlock + "px");
                $(_el).parent().parent().css("width", imgNumber * unitBlock + $(".next").width()+$(".prev").width()+"px");
                arguments.length != 0 ? _callback() : "";
            },

            _slideAnimate : function(r){    
                var self = this;
                _data.container = $(this).parent().find('[data-rel="container"]');
                r = r == undefined ? 0 : (r || 0);
                if( !r ){
                    var _firstSlide = _data.container.children().children().eq(1);
                    _firstSlide.stop().animate({
                        marginLeft : "-="+(_data.unitImgWidth+_data.marginSpace*2+"px")
                    },_data.speed,function(){

                        _data.container.children().children().eq(0).remove();
                        _firstSlide = _data.container.children().children().eq(0);
                        var _lastAddSlide = _firstSlide.clone();
                        _lastAddSlide.css({ "margin-left": _data.marginSpace+"px"});
                        _data.container.children().eq(0).append(_lastAddSlide);
                    });
                }else if( !!r ){
                    var _zeroSlide = _data.container.children().children().eq(0);
                    _zeroSlide.stop().animate({
                        marginLeft : "5px"
                    }, _data.speed, function(){
                        _data.container.children().children().last().remove();
                        var _lastSlide = _data.container.children().children().last();
                        var _zeroAddSlide = _lastSlide.clone();
                        _zeroAddSlide.css({ "margin-left": -(_data.unitImgWidth+_data.marginSpace*2)+"px"});
                        _data.container.children().eq(0).prepend(_zeroAddSlide);
                    });
                }
            },

            _bindEvents : function(){            
                var self = this;
                $(_data.el).on({ 
                    mouseover : function(){
                        _data.autoPlay ? _event.play(1) : "";
                    },
                    mouseout : function(){
                        _data.autoPlay ? _event.play() : "";
                    }
                });
                $(_data.el).find('[data-rel="prev"]').length ? $(_data.el).find('[data-rel="prev"]').on("click", function(){
                        self._slideAnimate.call(this,1);
                    }) : "";
                $(_data.el).find('[data-rel="next"]').length ? $(_data.el).find('[data-rel="next"]').on("click", function(){
                    self._slideAnimate.call(this,0);
                    }) : "";       
                $(window).on("resize",function(){
                    _event.responsive.call(this,".slide-container");
                }).trigger("resize");
            }
        };

        return {
            start : function(args){  
                _private._init(args);
            }
        }
    }());   
  
    return slide;
});
    