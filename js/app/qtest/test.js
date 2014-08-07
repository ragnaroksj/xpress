define([
	/*load the module which has the funciton you want to test*/
	"modules/simpleslider"
	],function(Dummyobj){
		"use strict";
		return {
			run : function(){
				/*testing code here*/
				/*QUnit.test("ok  test", function( assert){
					assert.ok(true, "true");	
				});*/
				QUnit.test("object merge function", function( assert ){
					
					var result =Dummyobj.merge({ speed : 700,"abc":"abcd"});

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
					}

					assert.deepEqual(result, expect,"two objects is equal");
		
				})
				
				
			}
		}
	});