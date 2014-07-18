define([
	"jquery",
	"models/phin-model",
	"collections/phin-collection",
	"views/homepage-view"
	],
	function($, PhinModel, PhinCollection, HomepageView){
    
      new HomepageView.headlineView({ el : ".headline" });
      new HomepageView.homeBlockView({ el : ".homeblocks", collection : new PhinCollection(), model : PhinModel });
    
  });
