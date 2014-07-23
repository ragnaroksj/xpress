/*
*  arrowBounce
*  @Jun Su
*  new ArrowBounce({ elemid : "arrowbtn", speed : 1000, range : 30, direction : 1 or -1});
*  dependency : jQuery
*/

(function(root, factory){
  if(typeof exports == 'object') module.exports = factory();
  else if(typeof define == 'function' && define.amd) define(factory);
  else root.ArrowBounce = factory();
}(this, function(){

  'use strict';

  function merge(obj){
    for( var i = 1 ; i < arguments.length; i++){
      var def = arguments[i];
      for(var n in def){
        if(obj[n] === undefined) obj[n] = def[n];
      }
    }
    return obj;
  }

  var defaults = {
    speed : 1000, 
    range : 30,
    elemid : "",
    direction : 1
  };

  function ArrowBounce(o){
    this.opts = merge( o || {}, ArrowBounce.defaults, defaults);
    if(!this.opts.elemid) return false;
    this.arrow = document.querySelector("#"+this.opts.elemid);
    this.timer = "";
    this.bounce().events();
  }

  ArrowBounce.defaults = {};

  ArrowBounce.prototype.bounce = function(){
    var self = this;
    this.timer = setInterval(function(){
      $(self.arrow).animate({ bottom: "-="+(self.opts.direction*self.opts.range)}, self.opts.speed)
      self.opts.direction = 0 - self.opts.direction;

    }, this.opts.speed);
    return this;
  };

  ArrowBounce.prototype.events = function(){
    var self = this;
    $(this.arrow).hover(function(){
        clearInterval(self.timer);
      }, 
      function(){
        self.bounce();
      });
  }

  return ArrowBounce;
}));