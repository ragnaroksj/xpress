define([
	/*load the module which has the funciton you want to test*/
	//"modules/simpleslider"
	"modules/jst/deepCopy"
	],function(Dummyobj){
		"use strict";
		return {
			run : function(){
				/*testing code here*/
				/*QUnit.test("ok  test", function( assert){
					assert.ok(true, "true");	
				});*/
				QUnit.test("deepCopy: object inherit", function( assert ){
					
					/*var result =Dummyobj.merge({ speed : 700,"abc":"abcd"});
					var expect = {
						container : {},
						maxWidth : 940,
						safeIntervalTime : 100,
						el : "",
    			        speed : 700,
	        		    interval : 1000,
			            number : 4,
            			height : "200px",
            			marginSpace : 5,
            			autoPlay : 0,
            			unitImgWidth : 226
					}*/

					/*Testing Data*/
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
					
					/*Run*/
					var result = Dummyobj(iphone, macbook);
					assert.deepEqual(result, expect,"two objects is equal");
				});
			}
		}
	});