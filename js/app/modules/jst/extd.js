/*
* deepcopy.js
* Author : Jun Su
* Email : ragnaroksj@gmail.com
* Website : jimtravelphoto.com
* Object deepcopy, Object extend
* Parameters : 
	p : parent Object,
	c : child Object
* Dependency : none 
*/
/* 
*  Use deepCopy method to inherit: p = p.prototype, c = c.prototype
*  Notice:  this is a protoytpe-based inheritance. child only inherits parent's functions and properties in prototype
*  Use apply/call method in child construct function to inherit parent's own properties and functons
*/
(function(root, factory){
	if(typeof exports == "object") module.exports = factory();
	else if(typeof define == "function" && define.amd) define(factory);
	else root.deepCopy = factory();  
}(this, function(p,c){
	
	"use strict";

	/*unit function can be inserted into any js application global parts*/
	var extd = function(p,c){
		var c = c || {};
		for( var i in p){
			if( typeof p[i] === "object"){	
				c[i] = ( p[i].constructor === Array ? [] : {});
				extd(p[i], c[i]);
			}else{				
				c[i] = p[i];
			}
		}
		c.uber = p;
		return c;		
	};
	
	return extd;
}));