define([
	"jquery",
	"spin",
  "text!templates/error.html"
	],
	function($,Spin, Error){
  		
		var contactApp = Backbone.View.extend({
        
        initialize : function(){
          var self = this;
  				this.$el.on("click", ".contact .send",{data : self},self.sendProcess);
  			},

  			sendProcess : function(e){
          var self = e.data.data;
          if(!!self.checkValue()){
            if(self.$el.find(".contact .error").length != 0){
              self.$el.find(".contact .error").fadeOut(function(){
                $(this).remove();
              });
            }
  					self.sendMail();
  				}else{
            if(self.$el.find(".contact .error").length == 0){
              self.$el.find(".send").before(_.template(Error,{ errorMessage : "write something!"}));
            }
          }
  			},

  			sendMail : function(){
  				
          var spinner = new Spin({length : 2, width : 4, radisu : 5}).spin();
          $(".send").text("").append(spinner.el);
          this.$el.off("click");

          $.ajax({ 
            url : $(".contact-menu").data("ajaxurl"), 
            type : "post",  
            data : { action : 'send_mail', address : $(".contact #email").val() ,content : $(".contact .message").val()}
          }).done(function(data){
            spinner.stop();
            $(".contact .send").text("Thank you");
          });

  			},

  			checkValue : function(){
  				return this.$el.find(".message").val().trim();
  			}

  				
		});

    return contactApp;		
});
  	
