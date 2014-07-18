define([
  "jquery",
  "models/video-model",
  "views/video-view"
  ],function($, videoModel,videoView){
  
  /*var video = {
	 	videoM : new videoModel(),  
   	videoV : new videoView( { model : videoM } )
	}*/
	var videoM = new videoModel();
	var videoV = new videoView({el : $("body"), model : videoM});

    return {
    	videoM : videoM,
    	videoV : videoV
    }
});
