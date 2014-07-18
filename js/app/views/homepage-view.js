define([
  "jquery",
  "jquery.countdown",
  "jquery.simplesldier", 
  "text!templates/phin.html",
  "text!../../../homepage/homeblocks/headline.html"
  ],function($,countdown, SimpleSlide,PhinHtml, HeadLine){
  
  var homepageView  =  homepageView ||{};

  homepageView.headlineView = Backbone.View.extend({
    
    initialize : function(){
      
      //ticker module
      this.$el.find(".ticker").length != 0 ? this.ticker(this.$el.find(".ticker").attr("data-expire")) : "";
      //video module
      //imageGaller module
    
    },

    ticker : function(endTime){
      var self = this;
      this.$el.find(".ticker").countdown({
        until : new Date(endTime), 
        layout : '<ul><li class="d">{dn}&nbsp;DAYS</li><br /><li>{hnn}</li>{sep}<li>{mnn}</li>{sep}<li>{snn}</li></ul>',
        alwaysExpire : true,
        onExpiry : self.renderHeadline.call(self, endTime)
      });

      setTimeout(function(){
        self.$el.css({"height" : "420px" });
        $(".homeblocks").css({"top" : "-56px"});
      },1500);
    },

    renderHeadline : function(dateIndex){
      var self = this;
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy= today.getFullYear();
      if(dd<10){
        dd = '0'+dd;
      }
      if(mm < 10){
        mm = '0'+mm;
      }
      today = yyyy+mm+dd;

      if(parseInt(today) >= dateIndex.split("T")[0].split("-").join("") ){
        setTimeout(function(){
          self.$el.css({"background" : "#000"}); 
        }, 1800);
        self.$el.on("transitionend",self.loadHeadlineData.call(this,dateIndex));
      }
    },

    loadHeadlineData : function(dateIndex){
      $.ajax({
        url : "wp-content/themes/xtheme/homepage/homeblocks/headline.json",
        dataType : "json"
      }).done(function(data){
        var headlineId = dateIndex.split("T")[0].split("-").join("");
        $(".headline").html(_.template(HeadLine, { item : data[headlineId]}));
        $(".headline").addClass("onair");
      });
    }

  });

  homepageView.homeBlockView = Backbone.View.extend({
    
    events : {
      "click .phin-tab-li" : "updateStatus"
    },

    initialize : function(){
      this.fetchData();
      this.collection.on("change:active",function(){
        this.render(1);
      },this);
    },

    fetchData : function(){
      var self = this;
      $.ajax({
        url : "wp-content/themes/xtheme/homepage/homeblocks/phin.json",
        dataType : "json"
      }).done(function(data){
        $.each(data,function(key,value){
            self.collection.add( new self.model(value) );
        });
        self.render();
      }); 
    },
    
    render : function(updatedflag){
      var self = this;
      $.each(self.collection.models,function(key, value){
        self.renderTab(value,updatedflag);
      });
    },

    renderTab : function(valObj,updatedflag){
     //console.log(valObj.get("cat"));
      var tab = this.$el.find(".phin-tab");
      var content = this.$el.find(".phin-content");
      var cat = tab.find( "."+valObj.get("cat"));
      
      if( !cat.length ){
        tab.append("<li class='"+valObj.get("cat")+" phin-tab-li "+valObj.get("active")+"' data-cat='"+valObj.get("cat")+"'>"+valObj.get("catname")+"</li>");
        content.append("<div class='"+valObj.get("cat")+"-container "+valObj.get("active")+"'></div>");
      }else{
        if(cat.hasClass("active") &&  valObj.get("active") != "active"){
          cat.addClass("inactive").removeClass("active");
          content.find("."+valObj.get("cat")+"-container ").addClass("inactive").removeClass("active");
        }else if(cat.hasClass("inactive") && valObj.get("active") != "inactive" ){
          cat.addClass("active").removeClass("inactive");
          content.find("."+valObj.get("cat")+"-container ").addClass("active").removeClass("inactive");
        }
      }
      
      if(!updatedflag){
        var html = _.template(PhinHtml,{ item : valObj} );
        this.$el.find("."+valObj.get("cat")+"-container").append(html);

        SimpleSlide.start({ el : ("#slide_"+valObj.get("id")), number : 4 , height : "149px", unitImgWidth : 222});
      }
    },

    updateStatus : function(e){
      this.collection.updateModel(e.currentTarget.dataset.cat);
    }

  });

  return homepageView;

});
