define([
	'jquery',
	'jquery.ajaxy'
	],function($, Ajaxy){

    var $body = $(document.body),
        $menu = $('#menu'),
        $content = $('#content'),
        /*fix content exchange flickr issue*/
        $promise = "";
   
    $.Ajaxy.configure({
        /**
         * Ajaxy supports a whole bunch of different configuration options.
         * By default some things are enabled such as "debug" etc - these should be turned turned off in production environments.
         * We don't cover any of the options in this demo as they are outside the demo's scope.
         * You can however learn about the options by reading the README.txt attached within the Ajaxy project.
         */
       
        /**
         * For this demo, it may be hosted on a server which does not support AJAX POST requests, so let's use AJAX GET requests instead
         * For production you'll want to use POST which is the default - as this will allow you to send forms via ajaxy too.
         */
        'method': 'get',
       
        /**
         * Define our Ajaxy Controllers.
         * If you have ever done some work with the Model View Controller architecture for applications, then this should be quite familiar to you.
         * If not I'll explain it anyway :-)
         * Controllers are what handles our application states, so if a state has changed we will rely on the appropriate controller to tell us what to do.
         * We'll explain this more as we go along. But this is the core of building an Ajaxy application.
         */
        'Controllers': {
            /**
             * The Essential Generic Controller
             * In jQuery Ajaxy, we will always have a "_generic" controller, hence why it is deemed essential.
             * This controller is called for every single request and response Ajaxy recieves.
             * You can use it to (and probably should) use it to display loading animations so our user knows something is happening when a Ajax request is performing, as well as using it to update the document.title with the current states title, and displaying error information.
             */
            '_generic': {
                /**
                 * The Request Action
                 * As this is part of our Generic Controller, this will be called for every Ajax request that is performed.
                 * It allows us to do such things as display the loading animation, and debug requests.
                 */
                request: function(){
                    // Prepare
                    var Ajaxy = $.Ajaxy;
                    // Log what is happening
                    if ( Ajaxy.options.debug ) window.console.debug('$.Ajaxy.Controllers._generic.request', [this,arguments]);
                    // Loading
                    $body.addClass('loading');
                    // Done
                    return true;
                },
               
                /**
                 * The Response Action
                 * This one will fire when a Ajax request receives a successful response, and as it is part of the Generic Controller it'll fire for every response.
                 * It allows us to do such things as hide the loading animation, update the document.title with the current state's title, and debug responses.
                 */
                response: function(){
                    // Prepare
                    var Ajaxy = $.Ajaxy; var data = this.State.Response.data; var state = this.state||'unknown';
                    // Log what is happening
                    if ( Ajaxy.options.debug ) window.console.debug('$.Ajaxy.Controllers._generic.response', [this,arguments], data, state);
                    // Title
                    var title = data.title||false; // if we have a title in the response JSON
                    if ( !title && this.state||false ) title = 'jQuery Ajaxy - '+this.state; // if not use the state as the title
                    if ( title ) document.title = title; // if we have a new title use it
                    // Loaded
                    $body.removeClass('loading');
                    // Display State
                    // Return true
                    return true;
                },
               
                /**
                 * The Error Action
                 * This one will fire when a Ajax request fails (be it we got a 404, invalid data, or whatever).
                 * It's important as it allows us to display a error message to the user.
                 * If an error occurs, only the Error action will be called and not the Response action, as such we should still do generic things like remove the loading animation.
                 */
                error: function(){
                    // Prepare
                    var Ajaxy = $.Ajaxy; var data = this.State.Error.data||this.State.Response.data; var state = this.state||'unknown';
                    // Error
                    var error = data.error||data.responseText||'Unknown Error.';
                    var error_message = data.content||error;
                    // Log what is happening
                    window.console.error('$.Ajaxy.Controllers._generic.error', [this, arguments], error_message);
                    // Loaded
                    $body.removeClass('loading');
                    // Display State
                    $('#current').text('Our current state is: ['+state+']');
                    // Done
                    return true;
                }
            },
           
            /**
             * Our Page Controller
             * This is what makes the example in this demo come alive.
             * It handles our page requests to do with the three fruits (apricots,bananas and coconuts).
             * We can call this whatever we like.
             */
            'page': {
                /**
                 * Our Page Controller's Classname [optional]
                 * This associates our controller with the particular elements which match this classname.
                 * It allows for when one of our Ajax links to be clicked, Ajaxy will know to fire the Page Controller's Request action.
                 * This is important as without this there would be no possible way for us to know that the Ajax Request is for our Controller.
                 */
                classname: 'ajaxy-page',
               
                /**
                 * Our Page Controller's Matches [optional]
                 * This can be a string, an array of strings, or a regular expression which is used to match the applications state.
                 * For this demo, we have chosen to use a regular expression that will match against anything which starts with "/pages"
                 * This variable follows the same reasoning as providing a selector, as it covers some more uses cases which the selector does not and vice versa.
                 * To provide ane example of such a use case. Consider our page was bookmarked with the following state active: "/pages/apricots.html"
                 * This would cause Ajaxy to perform the Ajax request necessary to recreate that state when the page has loaded.
                 * However, as this request has not come from a link, we cannot use the Controller's selector to associate the request with a particular controller.
                 * Instead we use this to match against the proposed state, and if it does then we know that this is the controller that should be used.
                 */
                matches: /^\/pages\/?/,
               
                /**
                 * Our Page Controller's Request Action
                 * This just like our Request Action in the Generic Controller will be fired for all Ajaxy requests.
                 * However this will only be fired for those Ajaxy requests which are known to be for the Page controller.
                 * For instance, we could have another Controller called "Subpage", if a request is determined to be for that controller, their request action will fire and not this one.
                 * We use this to prepare our tab area for incoming content, so we deselect all items in the tab menu, and fade out the content.
                 */
                request: function(){
                    // Prepare
                    var Ajaxy = $.Ajaxy;
                    // Log what is happening
                    if ( Ajaxy.options.debug ) window.console.debug('$.Ajaxy.Controllers.page.request', [this,arguments]);
                    // Adjust Menu
                    $menu.find('.active').removeClass('active');
                    // Hide Content
                    $promise = $content.stop(true,true).fadeOut(100);
                    // Return true
                    return true;
                },
               
                /**
                 * Our Page Controller's Response Action
                 * This is just like our Page Controller's Request Action, however for responses instead.
                 * We will use this to mark the appropriate item in the tab menu as active, to load the content into the tab area, and fade it in.
                 * This is all we have to do :-)
                 */
                response: function(){
                    // Prepare
                    var Ajaxy = $.Ajaxy; var data = this.State.Response.data; var state = this.state; var State = this.State;
                    // Log what is happening
                    if ( Ajaxy.options.debug ) window.console.debug('$.Ajaxy.Controllers.page.response', [this,arguments], data, state);
                    // Adjust Menu
                    $menu.children(':has(a[href*="'+State.raw.state+'"])').addClass('active').siblings('.active').removeClass('active');
                    // Show Content
                    var Action = this;
                    
                    $promise.promise().done(function(){
                        $content.html(data.content).fadeIn(400,function(){
                    
                            Action.documentReady($content);
                            /**
                             * The above line calls our Action's documentReady function.
                             * This is a special function which is always there as it is automaticly provided by Ajaxy.
                             * We assign this to the variable Action, as inside the callback function for our jQuery effect the variable this will be point to somewhere else then!
                             *
                             * So what does this function do?
                             * 1. It tells Ajaxy that the document is now ready for post processing.
                             * 2. Ajaxy will then determine if the state included a anchor that we want to scroll to and initiate, and do that.
                             * 3. Ajaxy will ajaxify the new content (provided the option [auto_ajaxify_documentReady] is true).
                             * 4. Ajaxy will sparkle the new contnet (provided the option [auto_sparkle_documentReady] is true, and jQuery Sparkle exists).
                             *    This is optional as there are no dependencies with jQuery Sparkle, but it is a nifty project which is worth a look:
                             *    http://www.balupton.com/projects/jquery-sparkle/
                             */
                        });
                        // Return true
                    });
                    return true;
                }
            }
        }
    });

});
