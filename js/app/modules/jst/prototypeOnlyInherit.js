/*
* prototypeOnlyInherit.js
* Author : Jun Su
* Email : ragnaroksj@gmail.com
* Website : jimtravelphoto.com
* Prototype inheritance
* Parameters : 
	p : parent Object,
	c : child Object
* Dependency : none 
*/
/*
* Child prototype will be removed in this method
*/
(function(root, factory){
	if(typeof exports == "object") module.exports = factory();
	else if(typeof define == "function" && define.amd) define(factory);
	else root.prototypeOnlyInherit = factory();  
}(this, function(p,c){
	
	"use strict";

	/*unit function can be inserted into any js application global parts*/
	var prototypeOnlyInherit = function(p,c){
		var F = function(){};
		F.prototype = p.prototype;
		c.prototype = new F();
		c.prototype.constructor = c;
		c.uber = p.prototype;
		return c;
	}
	
	return prototypeOnlyInherit;
}));