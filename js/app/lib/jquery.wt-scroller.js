/**
 * jQuery Image Scroller
 * Copyright (c) 2012 Allan Ma (http://codecanyon.net/user/webtako)
 * Version: 1.4 (02/26/2012)
 */
;(function($) {
	var TOP = "top";
	var BOTTOM = "bottom";
	var OUTSIDE = "outside";
	var INSIDE = "inside";
	var SLIDE_OPACITY = 0.8;	
	var SCROLL_SPEED = 1000;
	var DEFAULT_DURATION = 600;
	var ANIMATE_SPEED = 300;
	var DEFAULT_DELAY = 4000;
	var SWIPE_MIN = 50;
	var UPDATE_BUTTONS ="update_buttons";
	var UPDATE_THUMB = 	"update_thumb";
	var UPDATE_INDEX = 	"update_index";
	var UPDATE_TEXT =	"update_text";
	var START_TIMER = 	"start_timer";
	var LB_OPEN = "lightbox_open";
	var LB_CLOSE = "lightbox_close";
	
	//Class Scroller
	function Scroller($obj, opts) {
		this._numDisplay = 		getPosNumber(opts.num_display,3);
		this._slideWidth = 		getPosNumber(opts.slide_width,300);
		this._slideHeight = 	getPosNumber(opts.slide_height,200);
		this._slideMargin = 	getNonNegNumber(opts.slide_margin,1);
		this._margin = 			getNonNegNumber(opts.margin,10);
		this._buttonWidth =		getPosNumber(opts.button_width,35);
		this._ctrlHeight =		getPosNumber(opts.ctrl_height,20);
		this._autoScroll = 		opts.auto_scroll;
		this._delay = 			getPosNumber(opts.delay,DEFAULT_DELAY);
		this._duration = 		getPosNumber(opts.scroll_speed,SCROLL_SPEED);
		this._easing = 			opts.easing;
		this._autoScale =		opts.auto_scale;
		this._displayButtons = 	opts.display_buttons;
		this._mouseoverButtons = window.Touch ? false : opts.mouseover_buttons;
		this._ctrlType =		opts.ctrl_type.toLowerCase();
		this._displayCaption = 	opts.display_caption;
		this._mouseoverCaption = window.Touch ? false : opts.mouseover_caption;
		this._captionPos = 		opts.caption_position.toLowerCase();
		this._captionAlign = 	opts.caption_align.toLowerCase();
		this._moveBy1 = 		opts.move_one;
		this._contNav = 		opts.cont_nav;
		this._shuffle =			opts.shuffle;
		this._mousewheelScroll = opts.mousewheel_scroll;
		this._playOnce =		opts.play_once;
		this._captionEffect = 	opts.caption_effect.toLowerCase();
		
		this._$scroller;
		this._$slidePanel;
		this._$slideList;
		this._$slides;
		this._$prevBtn;			
		this._$nextBtn;
		this._$cbar;
		this._$indexes;			
		this._$scrollbar;
		this._$thumb;
		
		this._numItems;
		this._unitSize;
		this._prevSlots;
		this._nextSlots;
		this._maxSlots;	
		this._range;
		this._pos;	
		this._timerId;
		this._extOffset;
		this._extHeight;
		this._prevPct;
		this._slideCoord;
		this._$obj = $obj;
		
		this.init();
	}

	Scroller.prototype.init = function() {
		this._$scroller =   $(".wt-scroller", this._$obj);
		this._$slidePanel = this._$scroller.find(">.slides");
		this._$slideList =  this._$slidePanel.find(">ul:first");
		this._$slides =	  	this._$slideList.find(">li");
		this._$cbar = 	  	this._$scroller.find(">.lower-panel");
		this._$prevBtn =    this._$scroller.find(">.prev-btn");			
		this._$nextBtn =    this._$scroller.find(">.next-btn");
		this._extOffset = 0;
		this._extHeight = 0;
		this._pos = 0;
		this._prevPct = -1;
		this._timerId = null;
		this._numItems = this._$slides.size();
		if (this._numItems <= this._numDisplay) {
			this._displayButtons = false;
			this._ctrlType = "none";
			this._numDisplay = this._numItems;
		}
		if (this._ctrlType == "index") {
			this._moveBy1 = false;
		}
		
		if (this._shuffle) {
			this.shuffleItems();
		}
		
		//init components
		this.initItems();
		this.initSlidePanel();
		this.initCtrls();
		
		this._$scroller.css({width:this._$slidePanel.width() + this._$prevBtn.outerWidth(true) + this._$nextBtn.outerWidth(true), 
							 height:this._$slidePanel.height() + this._$cbar.outerHeight(), paddingTop: this._margin});
		this.updateCPanel();
		
		if (window.Touch) {
			this._slideCoord = {start:-1, end:-1};
			this._$slidePanel.bind("touchstart", {elem:this}, this.touchStart).bind("touchmove", {elem:this}, this.touchMove).bind("touchend", {elem:this}, this.touchEnd);
		}
		else if (this._mousewheelScroll) {
			this._$scroller.bind("mousewheel", {elem:this}, this.scrollContent).bind("DOMMouseScroll", {elem:this}, this.scrollContent);
		}
		
		$(document).bind(LB_CLOSE, {elem:this}, this.onFocus).bind(LB_OPEN, {elem:this}, this.onBlur);
		this._$scroller.trigger(LB_CLOSE);
	}
	
	//init slides
	Scroller.prototype.initItems = function() {
		this.initCaptions();
		for (var i = 0; i < this._numItems; i++) {
			var $slide = this._$slides.eq(i);
			var $img;
			var $link = $slide.find(">a:first");
			
			if ($link.size() == 0) {	
				$slide.click(preventDefault);
				$link.css("cursor", "default");
				$img = $slide.find(">img");
			}
			else {
				$link.data("text", $slide.find(">p:first").html());
				$img = $link.find(">img");
			}
			
			if ($img.size() > 0) {
				if ($img[0].complete || $img[0].readyState == "complete") {
					this.processImg($img) 
				}
				else {
					$img.bind("load", {elem:this}, this.processLoadedImg);				
				}
			}
			
			if (this._displayCaption && this._captionPos == INSIDE) {
				this.initCaption($slide);						
			}
		}		
	}
	
	//init captions
	Scroller.prototype.initCaptions = function() {
		var $captions = this._$slides.find(">p:first");
		if (this._displayCaption) {
			var padding = $captions.outerWidth() - $captions.width();
			$captions.css({width:this._slideWidth - padding, visibility:"visible"}).click(preventDefault);
			if (this._captionPos == OUTSIDE) {
				var heights = $captions.map(function() { return $(this).height(); }).get();
				var maxHeight = Math.max.apply(Math, heights);					
				$captions.css({top:this._captionAlign == TOP ? 0 : this._slideHeight, height:maxHeight});
				
				this._extHeight = $captions.outerHeight();					
				if (this._captionAlign == TOP) {
					this._extOffset = this._extHeight;
				}
				$captions.addClass("outside");
			}
			else {
				if (jQuery.browser.msie && parseInt(jQuery.browser.version) > 6 && parseInt(jQuery.browser.version) < 9) {
					$captions.addClass("ie-inside");
				}
				else {
					$captions.addClass("inside");
				}
			}					
		}
		else {
			$captions.hide();
		}
	}
	
	//init caption
	Scroller.prototype.initCaption = function($item) {
		var $caption = $item.find(">p:first");				
		if ($caption.size() == 0 || $caption.html() == "") {
			$caption.remove();
			return;
		}
		$caption.css("top", this._captionAlign == TOP ? 0 : this._slideHeight - $caption.outerHeight());
		if (this._mouseoverCaption) {
			switch(this._captionEffect) {
				case "slide":
					$caption.css("top", this._captionAlign == TOP ? -$caption.outerHeight() : this._slideHeight);
					$item.bind("mouseenter", {elem:this}, this.slideInCaption).bind("mouseleave", {elem:this}, this.slideOutCaption);
					break;
				case "fade":
					$caption.css("opacity", 0);
					$item.bind("mouseenter", {elem:this}, this.fadeInCaption).bind("mouseleave", {elem:this}, this.fadeOutCaption);
					break;
				default:
					$caption.css("visibility", "hidden");
					$item.bind("mouseenter", this.showCaption).bind("mouseleave", this.hideCaption);
			}			
		}
	}
	
	//init slide panel
	Scroller.prototype.initSlidePanel = function() {
		this._$slides.css({width:this._slideWidth, height:this._slideHeight + this._extHeight, marginRight:this._slideMargin})
					 .bind("mouseenter", {elem:this}, this.itemMouseover).bind("mouseleave", {elem:this}, this.itemMouseout);
		this._$slidePanel.css({width:(this._numDisplay * this._$slides.width()) + ((this._numDisplay - 1) * this._slideMargin), height:this._$slides.height()});
		this._unitSize = this._$slides.outerWidth(true);
		var num = (this._ctrlType == "index") ? (this._numDisplay * Math.ceil(this._numItems/this._numDisplay)) : this._numItems;
		
		this._$slideList.width(num * this._unitSize);
		this._maxSlots = num - this._numDisplay;
		this._prevSlots = 0;
		this._nextSlots = this._maxSlots;
			
		this._range = ((this._$slideList.width() - this._slideMargin) - this._$slidePanel.width());
	}
	
	Scroller.prototype.initCtrls = function() {
		this.initButtons();
		this._$cbar.css({width:this._$slidePanel.width(), paddingLeft:this._$prevBtn.outerWidth(true), paddingRight:this._$nextBtn.outerWidth(true)});
		switch(this._ctrlType) {
			case "scrollbar":
				this.initScrollbar();
				var ctrlMargin = Math.max((this._ctrlHeight - this._$scrollbar.height())/2, 0);
				this._$cbar.css({paddingTop:ctrlMargin, paddingBottom:ctrlMargin});
				break;
			case "index":
				this.initIndexes();
				var ctrlMargin = Math.max((this._ctrlHeight - this._$indexes.height())/2, 0);
				this._$cbar.css({paddingTop:ctrlMargin, paddingBottom:ctrlMargin});
				break;
			default:
				this._$cbar.remove();
				this._$scroller.css("paddingBottom", this._margin);
		}				
	}
	
	//init buttons
	Scroller.prototype.initButtons = function() {							
		if (this._displayButtons) {
			if (this._mouseoverButtons) {
				this.removeButtons();
				
				this._$slidePanel.append("<div class='m-prev'>&laquo;</div><div class='m-next'>&raquo;</div>");
				var $mPrev = this._$slidePanel.find(">.m-prev").mousedown(preventDefault).bind("click", {elem:this}, this.moveBack);						
				var $mNext = this._$slidePanel.find(">.m-next").mousedown(preventDefault).bind("click", {elem:this}, this.moveFwd);
				if (!window.Touch) {
					$mPrev.css("left", -$mPrev.width());
					$mNext.css("marginLeft", 0);
					
					this._$slidePanel.hover(
								function() {
									$mPrev.stop(true).animate({left:0}, ANIMATE_SPEED);	
									$mNext.stop(true).animate({marginLeft:-$mNext.width()}, ANIMATE_SPEED);	
								}, 
								function() {
									$mPrev.stop(true).animate({left:-$mPrev.width()}, ANIMATE_SPEED);	
									$mNext.stop(true).animate({marginLeft:0}, ANIMATE_SPEED);	
								});
				}
				
				if (!this._contNav) {
					this._$scroller.bind(UPDATE_BUTTONS, {elem:this, prevBtn:$mPrev, nextBtn:$mNext}, this.updateButtons);
				}
			}
			else {
				var outerMargin = Math.max(Math.round((this._buttonWidth - this._$prevBtn.width())/2), 0);
				var innerMargin = Math.max(this._buttonWidth - outerMargin - this._$prevBtn.width(), 0);
				this._$prevBtn.css({marginLeft:outerMargin, marginRight:innerMargin, height:this._$slidePanel.height()}).mousedown(preventDefault).bind("click", {elem:this}, this.moveBack);
				this._$nextBtn.css({marginLeft:innerMargin, marginRight:outerMargin, height:this._$slidePanel.height()}).mousedown(preventDefault).bind("click", {elem:this}, this.moveFwd);
				if (!this._contNav) {
					this._$scroller.bind(UPDATE_BUTTONS, {elem:this, prevBtn:this._$prevBtn, nextBtn:this._$nextBtn}, this.updateButtons);
				}
			}					
		}
		else {
			this.removeButtons();
		}
	}
	
	//remove main buttons
	Scroller.prototype.removeButtons = function() {
		this._$prevBtn.remove();
		this._$nextBtn.remove();
		this._$scroller.css({paddingLeft:this._margin, paddingRight:this._margin});
	}
	
	//update buttons
	Scroller.prototype.updateButtons = function(e) {
		var that = e.data.elem;
		var begIndex = Math.abs(that._pos/that._unitSize);
		var endIndex = begIndex + that._numDisplay;
		e.data.prevBtn.toggleClass("off", begIndex <= 0);
		e.data.nextBtn.toggleClass("off", endIndex >= that._numItems);
	}
	
	//init scrollbar
	Scroller.prototype.initScrollbar = function() {
		var that = this;
		this._$cbar.append("<div class='scroll-bar'><div class='thumb'></div></div>");
		this._$scrollbar = this._$cbar.find(">.scroll-bar");
		this._$thumb = 	 this._$scrollbar.find(">.thumb");				
		this._$scrollbar.width(this._$cbar.width()).bind("click", {elem:this}, this.trackClick).mousedown(preventDefault);				
		this._$thumb.width(Math.ceil((this._numDisplay/this._numItems) * this._$scrollbar.width())).click(preventDefault);

		var scrollRange = this._$scrollbar.width() - this._$thumb.width();
		var moveRatio = this._range/scrollRange;
		try {
			this._$thumb.draggable({containment: "parent"})
				  .bind("drag", function() { that._$slideList.css({left: Math.round(-that._$thumb.position().left * moveRatio)}); })
				  .bind("dragstop", function() { that.autoStop(that._$thumb.position().left/scrollRange); });
		}
		catch (ex) { //not draggable. 
		}
		
		this._$scroller.bind(UPDATE_THUMB, 
						function() {
							var move = Math.round(Math.abs(that._pos)/moveRatio);				
							that._$thumb.stop(true, true).animate({left:move}, that._duration, that._easing);
						});
	}
	
	//init indexes
	Scroller.prototype.initIndexes = function() {
		var n = Math.ceil(this._numItems/this._numDisplay);
		var str = "";
		for (var i = 0; i < n; i++) {
			var beg = i * this._numDisplay;
			var end = Math.min(beg + this._numDisplay, this._numItems);
			str += "<span class='index' title='" + ((beg + 1) + "-" + end) + "'></span>";
		}
		this._$cbar.prepend(str);
		this._$indexes = this._$cbar.find(".index").mousedown(preventDefault).bind("click", {elem:this}, this.goToIndex);
		this._$scroller.bind(UPDATE_INDEX, {elem:this}, this.updateIndexes);				
	}
		
	//update indexes
	Scroller.prototype.updateIndexes = function(e) {
		var that = e.data.elem;
		var i = Math.ceil(that._prevSlots/that._numDisplay);
		that._$indexes.filter(".index-hl").removeClass("index-hl");
		that._$indexes.eq(i).addClass("index-hl");
	}
	
	//update slide list
	Scroller.prototype.updateSlideList = function() {
		var that = this;
		this._pos = -this._prevSlots * this._unitSize;
		this._$slideList.stop(true, true).animate({left:this._pos}, this._duration, this._easing, 
													function() { 
														that._$scroller.trigger(START_TIMER); 
													});
		this.updateCPanel();
		
		if (this._playOnce) {
			this.pauseLast();
		}
	}
	
	//update controls
	Scroller.prototype.updateCPanel = function() {
		this._$scroller.trigger(UPDATE_BUTTONS).trigger(UPDATE_THUMB).trigger(UPDATE_INDEX);					
	}
	
	//track click
	Scroller.prototype.trackClick = function(e) {
		var that = e.data.elem;
		that.autoStop((e.pageX - that._$scrollbar.offset().left)/that._$scrollbar.width());
	}
	
	//auto stop
	Scroller.prototype.autoStop = function(pct) {
		if (pct != this._prevPct) {
			this._prevPct = pct;
			var move;
			var newPos = pct * this._range;
			if (newPos > Math.abs(this._pos)) {
				move = Math.ceil(newPos/this._unitSize);			
			}
			else if (newPos < Math.abs(this._pos)) {
				move = Math.floor(newPos/this._unitSize);
			}
			else {
				return;
			}
			var slots = move + (this._pos/this._unitSize);			
			this._prevSlots += slots;
			this._nextSlots -= slots;
			this.updateSlideList();
		}
	}
	
	//go to index			
	Scroller.prototype.goToIndex = function(e) {
		var that = e.data.elem;
		that.stopTimer();
		that._prevSlots = $(this).index() * that._numDisplay;
		that._nextSlots = that._maxSlots - that._prevSlots;
		that.updateSlideList();
		return false;
	}
	
	//move slides back
	Scroller.prototype.moveBack = function(e) {
		var that = (typeof e != "undefined") ? e.data.elem : this;
		that.stopTimer();
		if (that._nextSlots < that._maxSlots) {
			var slots = that._moveBy1 ? 1 : Math.min(that._maxSlots - that._nextSlots, that._numDisplay);
			that._nextSlots += slots;
			that._prevSlots -= slots;
		}
		else if (that._contNav) {
			that._nextSlots = 0;
			that._prevSlots = that._maxSlots;
		}
		else {
			return;
		}
		that.updateSlideList();
	}
	
	//move slides forward
	Scroller.prototype.moveFwd = function(e) {
		var that = (typeof e != "undefined") ? e.data.elem : this;
		that.stopTimer();
		if (that._prevSlots < that._maxSlots) {
			var slots = that._moveBy1 ? 1 : Math.min(that._maxSlots - that._prevSlots, that._numDisplay);
			that._prevSlots += slots;
			that._nextSlots -= slots;
		}
		else if (that._contNav) {
			that._prevSlots = 0;
			that._nextSlots = that._maxSlots;		
		}
		else {
			return;
		}
		that.updateSlideList();
	}
	
	//process loaded image size & position
	Scroller.prototype.processLoadedImg = function(e) {
		e.data.elem.processImg($(this));
	}
	
	//process image
	Scroller.prototype.processImg = function($img) {
		if (this._autoScale && $img.width() > 0 && $img.height() > 0) {
			var sizeRatio = $img.height()/$img.width();
			$img.css({width:this._slideWidth, height:sizeRatio * this._slideWidth});
			if ($img.height() > this._slideHeight) {
				$img.css({width:(1/sizeRatio) * this._slideHeight, height:this._slideHeight});
			}
		}
		$img.css({left:Math.round((this._slideWidth - $img.width())/2), top:this._extOffset + Math.round((this._slideHeight - $img.height())/2)});
	}
	
	//scroller blur
	Scroller.prototype.onBlur = function(e) {
		var that = e.data.elem;
		that._$scroller.unbind(START_TIMER).unbind("mouseenter").unbind("mouseleave");
		that.stopTimer();
	}
	
	//scroller focus
	Scroller.prototype.onFocus = function(e) {
		var that = e.data.elem;
		if (that._autoScroll) {
			that._$scroller.bind(START_TIMER, {elem:that}, that.startTimer)
						   .bind("mouseenter", {elem:that}, that.scrollerOver)
						   .bind("mouseleave", {elem:that}, that.scrollerOut)
						   .trigger(START_TIMER);
		}
	}
	
	//item mouseover
	Scroller.prototype.itemMouseover = function(e) {
		$(this).find("img:first").stop().animate({opacity:SLIDE_OPACITY}, ANIMATE_SPEED);				
	}
	
	//item mouseout
	Scroller.prototype.itemMouseout = function(e) {
		var that = e.data.elem;
		$(this).find("img:first").stop().animate({opacity:1}, ANIMATE_SPEED, 
			function() {
				if (jQuery.browser.msie) {
					this.style.removeAttribute('filter');						
				}
			});
	}
	
	//slide in caption
	Scroller.prototype.slideInCaption = function(e) {
		var that = e.data.elem;
		var $caption = $(this).find(">p:first");
		$caption.stop().animate({top:that._captionAlign == BOTTOM ? that._slideHeight - $caption.outerHeight() : 0}, ANIMATE_SPEED);
	}
	
	//slide out caption
	Scroller.prototype.slideOutCaption = function(e) {
		var that = e.data.elem;
		var $caption = $(this).find(">p:first"); 
		$caption.stop().animate({top:that._captionAlign == BOTTOM ? that._slideHeight : -$caption.outerHeight()}, ANIMATE_SPEED);
	}
	
	//fade in caption
	Scroller.prototype.fadeInCaption = function(e) {
		$(this).find(">p:first").stop(true).animate({opacity:1}, ANIMATE_SPEED);
	}
	
	//fade out caption
	Scroller.prototype.fadeOutCaption = function(e) {
		$(this).find(">p:first").stop(true).animate({opacity:0}, ANIMATE_SPEED);
	}
	
	//show caption
	Scroller.prototype.showCaption = function() {
		$(this).find(">p:first").css("visibility", "visible");
	}
	
	//hide caption
	Scroller.prototype.hideCaption = function() {
		$(this).find(">p:first").css("visibility", "hidden");	
	}
	
	//scroller over
	Scroller.prototype.scrollerOver = function(e) {
		var that = e.data.elem;
		that._$scroller.unbind(START_TIMER);
		that.stopTimer();
	}
	
	//scroller out
	Scroller.prototype.scrollerOut = function(e) {
		var that = e.data.elem;
		that._$scroller.bind(START_TIMER, {elem:that}, that.startTimer).trigger(START_TIMER);
	}
	
	//shuffle items
	Scroller.prototype.shuffleItems = function() {
		var items = this._$slides.toArray();
		for (var i = 0; i < this._numItems; i++) {
			var ri = Math.floor(Math.random() * this._numItems);
			var temp = items[i];
			items[i] = items[ri];
			items[ri] = temp;
		}
		
		for (var i = 0; i < this._numItems; i++) {
			this._$slideList.append($(items[i]));
		}
		
		this._$slides = this._$slideList.find(">li");
	}
	
	//start timer
	Scroller.prototype.startTimer = function(e) {
		var that = e.data.elem;
		if (that._timerId == null) {
			that._timerId = setTimeout(
				function() {
					that.stopTimer();
					if (that._prevSlots < that._maxSlots) {
						var slots = that._moveBy1 ? 1 : Math.min(that._maxSlots - that._prevSlots, that._numDisplay);
						that._prevSlots += slots;
						that._nextSlots -= slots;					
					}
					else {
						that._prevSlots = 0;
						that._nextSlots = that._maxSlots;		
					}
					that.updateSlideList();
				}, that._delay);
		}
	}
	
	//stop timer
	Scroller.prototype.stopTimer = function() {
		clearTimeout(this._timerId);
		this._timerId = null;
	}
	
	//pause on last items
	Scroller.prototype.pauseLast = function(i) {
		if (this._prevSlots == this._maxSlots) {
			this._autoScroll = false;
			this._$scroller.unbind(START_TIMER).unbind("mouseenter").unbind("mouseleave");
			this.stopTimer();
		}
	}
	
	//mousewheel scroll content
	Scroller.prototype.scrollContent = function(e) {
		var that = e.data.elem;
		if (!that._$slideList.is(":animated")) {
			var delta = (typeof e.originalEvent.wheelDelta == "undefined") ?  -e.originalEvent.detail : e.originalEvent.wheelDelta;
			delta > 0 ? that.moveBack() : that.moveFwd();
		}
		return false;
	}
	
	Scroller.prototype.touchStart = function(e) {
		e.data.elem._slideCoord.start = e.originalEvent.touches[0].pageX;
	}
	
	Scroller.prototype.touchMove = function(e) {
		e.preventDefault();
		e.data.elem._slideCoord.end = e.originalEvent.touches[0].pageX;
	}
	
	Scroller.prototype.touchEnd = function (e) {
		var that = e.data.elem;
		if (that._slideCoord.end >= 0) {
			if (Math.abs(that._slideCoord.start - that._slideCoord.end) > SWIPE_MIN) {
				if (that._slideCoord.end < that._slideCoord.start) {
					that.moveFwd();
				}
				else {
					that.moveBack();					
				}
			}
		}
		that._slideCoord.start = that._slideCoord.end = -1;
	}
	
	//prevent default behavior
	function preventDefault() {
		return false;
	}
	
	//get positive number
	function getPosNumber(val, defaultVal) {
		if (!isNaN(val) && val > 0) {
			return val;
		}
		return defaultVal;
	}
	
	//get nonnegative number
	function getNonNegNumber(val, defaultVal) {
		if (!isNaN(val) && val >= 0) {
			return val;
		}
		return defaultVal;
	}
		
	$.fn.wtScroller = function(params) {		
		var defaults = { 
			num_display:3,
			slide_width:300,
			slide_height:200,
			slide_margin:1,
			button_width:35,
			ctrl_height:20,
			margin:10,	
			auto_scroll:true,
			delay:DEFAULT_DELAY,
			scroll_speed:SCROLL_SPEED,
			easing:"",
			auto_scale:true,
			move_one:false,
			ctrl_type:"scrollbar",
			display_buttons:true,
			mouseover_buttons:false,
			display_caption:true,
			mouseover_caption:false,
			caption_align:BOTTOM,
			caption_position:INSIDE,
			cont_nav:true,
			shuffle:false,
			mousewheel_scroll:false,
			play_once:false,
			caption_effect:"slide"
		};
		
		var opts = $.extend(true, {}, defaults, params);		
		return this.each(
			function() {
				var scroller = new Scroller($(this), opts);
			}
		);
	}
})(jQuery);