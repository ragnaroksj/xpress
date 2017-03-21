(function(root, factory){
    if( typeof exports === "object" ) module.exports = factory();
    else if( typeof define === "function" && define.amd) define(factory);
    else root.Backtotop = factory();
}(this,function(){
    "use strict";

    var backtop = {
        coodinateElm : "#portfolio-list",
        coodinateBottom : 300,
        backtopObj : ""
    }
    
    return{

        _construct : function(){
            return this;
        },
        
        productToTop : function(){
            backtop.backtopObj = this._construct();
            jQuery(window)
                .scroll(function(){         
                    if(backtop.backtopObj.elementTouchTop(jQuery(backtop.coodinateElm))){
                        if(!jQuery(".goToTop").length){
                            var elm = "<div class='goToTop'>GoToTop</div>";
                            backtop.backtopObj.generateGoToTopSymbol(jQuery(elm));
                        }
                        jQuery(".goToTop").css("top",jQuery(window).height()-backtop.coodinateBottom);
                        backtop.backtopObj.setPosition(jQuery(".goToTop"));
                    }else{
                        if(jQuery(".goToTop").length){
                            backtop.backtopObj.removeSymbol(jQuery(".goToTop"));
                        }
                    }
                }) 
                .resize(function(){
                    if(jQuery(".goToTop").length !=0){
                        backtop.backtopObj.setPosition(jQuery(".goToTop"));
                    }
                })
                .trigger("scroll");

            return this;     
        },

        elementTouchTop : function(elm){
            if(elm.offset().top - jQuery(window).scrollTop() < 0){
                return 1;
            }
            return 0 ;
        },

        generateGoToTopSymbol : function(elm){
            jQuery("body").append(elm);
            this.setPosition(elm);
            elm.click({param: elm},this.attachClickEvent);
            return this;
        },

        attachClickEvent : function(elm){
            jQuery("body,html").animate({
                scrollTop : 0
            },1000,(function(elm){
                backtop.backtopObj.removeSymbol(elm.data.param);
            })(elm));

            return this;
        },

        removeSymbol : function(elm){
            elm.delay(500).fadeOut(500,function(){
                jQuery(this).remove();
            });

            return this;
        },

        setPosition : function(elm){
            var coodinateTop;
            if(elm.offset().top >= jQuery(backtop.coodinateElm).height()+jQuery(backtop.coodinateElm).offset().top){
                coodinateTop = jQuery(backtop.coodinateElm).height()
                                +jQuery(backtop.coodinateElm).offset().top
                                -jQuery(window).scrollTop();
            }else{
                coodinateTop = jQuery(window).height()-backtop.coodinateBottom;
            }

            elm.css("left",jQuery(backtop.coodinateElm).offset().left
                            +jQuery(backtop.coodinateElm).width()
                            +"px");
            elm.css("top", coodinateTop +"px");

            return this;
        }
    }
}));




