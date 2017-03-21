define([
	/*load the module which has the funciton you want to test*/
	"modules/jst/extd"
	],function(Dummyobj){
		"use strict";
		return {
			run : function(){
				/*testing code here*/

				/*QUnit.test("deepCopy: object no constructor inherit", function( assert ){

					var iphone = {
						iphone1 : "iphone1",
						iphone2 : "iphone2",
						iphone3 : {
							iphone3n : "iphone3n",
							iphone3gs : "iphone3gs"
						},
						iphone4 : ["iphone4n", "ihpone4s"]
					};
					var macbook = {
						macbook2011 : "macbook2011",
						macbook2012 : "macbook2012",
						macbook2013 : "macbook2013"
					};

					var result = Dummyobj(iphone, macbook);
					var expect ={
						iphone1 : "iphone1",
						iphone2 : "iphone2",
						iphone3 : {
							iphone3n : "iphone3n",
							iphone3gs : "iphone3gs"
						},
						iphone4 : ["iphone4n", "ihpone4s"],
						macbook2011 : "macbook2011",
						macbook2012 : "macbook2012",
						macbook2013 : "macbook2013"
					};
					
					//assert.deepEqual(result, expect,"two objects is equal");
		
				});*/

				QUnit.test("Object inherit",function( assert ){
					
					/*define parent object*/
					function Animal(){
						this.area = "earth";
						this.gender = "na";
						this.number = "100+";
					}

					Animal.prototype = {
						extinction : true,

						getArea : function(){
							return this.area;
						},

						getGender : function(){
							return this.gender;
						},

						getNumber : function(){
							return this.number;
						},

						getExtinction : function(){
							return this.extinction;
						}
					} 

					//define child object
					function Cat(){
						//inherit parent constructor
						Animal.apply(this,arguments);
						this.size = "small";
						this.name = "cat";
						this.color = "white";
					}


					Cat.prototype = {
						age : "1",

						getSize : function(){
							return this.size;
						},

						getName : function(){
							return this.name;
						},

						getColor : function(){
							return this.color;
						},

						getAge : function(){
							return this.age;
						}
					}

					Dummyobj(Animal.prototype, Cat.prototype);
					
					var cat = new Cat();
					cat.getSize();
					var result = cat.getExtinction();
					var expect = true;
					assert.deepEqual(result, expect, "object inherit with constructor");

				});
				
				
			}
		}
	});