define([
	"jquery",
	"models/expedition-model",
	"collections/expedition-collection",
	"views/expedition-view",
	"modules/map"
	],
	function($, ExpeditionModel, ExpeditionCollection, ExpeditionView){
  	//default js file for defualt page. 
   		
  		/*var expeditioncollection = new ExpeditionCollection([
  			
  			new  ExpeditionModel({
  				id : "1",
    			title : "test1", 
    			excerpt : "testExcerpt1", 
    			imgSrc : "http://www.google.com",
    			place : "textCity" ,
    			position : "0,0", 
    			icon : "icon.jpg", 
    			category : "alaska", 
    			order : "1", 
    			link : "http://www.google.com", 
    			date : "2014-01-01"
  			})
      */


  	var expeditioncollection = new ExpeditionCollection();
  	_.each(postData,function(postDataItem){
      expeditioncollection.add( new ExpeditionModel(postDataItem) );
    });
    
    new ExpeditionView.expeditionView( { el : $("#controls"), collection : expeditioncollection } );
    
    return ExpeditionView;

  });
